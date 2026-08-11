import React, { useState, useEffect } from 'react';
import { Send, Pause, Play, CheckCheck, Search, RefreshCw, MessageSquare, User, Bot, ShieldAlert, PhoneCall } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface ConvMessage {
  role: 'user' | 'model' | 'human';
  content: string;
  timestamp?: string;
  time?: string;
}

interface ConversationItem {
  phone: string;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
  isHuman: boolean;
  messages: ConvMessage[];
}

const normalizePhone = (p: string) => (p ? p.replace(/[^0-9]/g, '') : '');

export const LiveInboxView: React.FC = () => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [activeContact, setActiveContact] = useState<string>('');
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRealConversations = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/whatsapp/conversations`);
      const data = await res.json();
      if (data.success && Array.isArray(data.conversations) && data.conversations.length > 0) {
        const mapped: ConversationItem[] = data.conversations.map((c: any) => {
          const rawMsgs = c.messages || [];
          const formattedMsgs: ConvMessage[] = rawMsgs.map((m: any) => ({
            role: m.role === 'model' ? 'model' : m.role === 'human' ? 'human' : 'user',
            content: m.content,
            time: m.timestamp
              ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : 'Just now'
          }));

          const last = formattedMsgs[formattedMsgs.length - 1];
          const clean = c.customerPhone.replace(/[^0-9]/g, '');
          const displayPhone = clean.length >= 10 ? `+${clean}` : c.customerPhone;

          return {
            phone: c.customerPhone,
            name: `Customer ${displayPhone.slice(-10)}`,
            lastMsg: last ? last.content : 'No messages yet',
            time: last && last.time ? last.time : 'Just now',
            unread: 0,
            isHuman: !!c.isPaused,
            messages: formattedMsgs
          };
        });

        setConversations(mapped);
        setActiveContact((prev) => {
          if (!prev && mapped.length > 0) return mapped[0].phone;
          return prev;
        });
      } else {
        // Fallback default sample if DB is empty
        const defaultPhone = '+91-9084553059';
        setConversations([
          {
            phone: defaultPhone,
            name: 'Customer +91-9084553059',
            lastMsg: 'Hi Swasti, do you have any 2BHK properties in Noida under 80 lakh?',
            time: '10:42 AM',
            unread: 1,
            isHuman: false,
            messages: [
              { role: 'user', content: 'Hi Swasti, do you have any 2BHK properties in Noida under 80 lakh?', time: '10:41 AM' },
              { role: 'model', content: 'Hello! 👋 We have 2BHK flats in Sector 75 (65L) and Sector 121 (72L) Noida. Would you like to schedule a site visit?', time: '10:42 AM' }
            ]
          }
        ]);
        setActiveContact((prev) => prev || defaultPhone);
      }
    } catch (err) {
      // Keep existing state on transient error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealConversations();
    const interval = setInterval(fetchRealConversations, 3000);
    return () => clearInterval(interval);
  }, []);

  // Match conversation accurately regardless of phone formatting
  const currentConv =
    conversations.find((c) => normalizePhone(c.phone) === normalizePhone(activeContact)) ||
    conversations[0] || {
      phone: '+91-9084553059',
      name: 'Customer',
      lastMsg: 'No chat selected',
      time: '',
      unread: 0,
      isHuman: false,
      messages: []
    };

  const handleSelectContact = (phone: string) => {
    setActiveContact(phone);
  };

  const handleToggleTakeover = async () => {
    const targetPhone = currentConv.phone;
    const nextPaused = !currentConv.isHuman;

    setConversations((prev) =>
      prev.map((c) => (normalizePhone(c.phone) === normalizePhone(targetPhone) ? { ...c, isHuman: nextPaused } : c))
    );

    try {
      await fetch(`${API_BASE_URL}/api/v1/whatsapp/toggle-pause`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: targetPhone, isPaused: nextPaused })
      });
    } catch (err) {}
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const sentText = replyText.trim();
    const targetPhone = currentConv.phone;
    const newMsg: ConvMessage = {
      role: 'human',
      content: sentText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations((prev) =>
      prev.map((c) =>
        normalizePhone(c.phone) === normalizePhone(targetPhone)
          ? {
              ...c,
              lastMsg: sentText,
              time: newMsg.time || 'Just now',
              isHuman: true,
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );

    setReplyText('');

    try {
      await fetch(`${API_BASE_URL}/api/v1/whatsapp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: targetPhone, message: sentText })
      });
    } catch (err) {}
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMsg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#0f172a' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Live WhatsApp Real-Time Inbox
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '2px' }}>
            Manage active customer chats, toggle AI automation, or take over manually.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={fetchRealConversations} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh Inbox ({conversations.length})
          </button>

          <div className="badge badge-live">
            <div className="pulse-dot" /> Live MongoDB Sync
          </div>
        </div>
      </div>

      {/* Main Two-Column Studio Inbox */}
      <div
        className="glass-panel"
        style={{
          padding: 0,
          display: 'grid',
          gridTemplateColumns: '340px 1fr',
          minHeight: '660px',
          height: 'calc(100vh - 240px)',
          maxHeight: '800px',
          overflow: 'hidden',
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}
      >
        {/* Left Column: Conversations Sidebar */}
        <div style={{ borderRight: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
          {/* Search Header */}
          <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '36px', fontSize: '0.875rem', background: '#f1f5f9', border: '1px solid #cbd5e1' }}
                placeholder="Search phone or content..."
              />
            </div>
          </div>

          {/* Conversations Items List */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredConversations.length > 0 ? (
              filteredConversations.map((c) => {
                const isSelected = normalizePhone(c.phone) === normalizePhone(currentConv.phone);
                const initial = c.phone ? c.phone.replace(/[^0-9]/g, '').slice(-2) : 'C';

                return (
                  <div
                    key={c.phone}
                    onClick={() => handleSelectContact(c.phone)}
                    style={{
                      padding: '14px 16px',
                      borderBottom: '1px solid #f1f5f9',
                      background: isSelected ? '#ffffff' : 'transparent',
                      borderLeft: isSelected ? '4px solid #2563eb' : '4px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: isSelected
                            ? 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)'
                            : 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          flexShrink: 0
                        }}
                      >
                        {initial}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {c.phone}
                          </span>
                          <span style={{ fontSize: '0.725rem', color: '#94a3b8', flexShrink: 0 }}>{c.time}</span>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '6px' }}>
                          {c.lastMsg}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {c.isHuman ? (
                            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <User size={10} /> Paused (Human)
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Bot size={10} /> AI Auto-Reply
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                No active conversations match "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Chat Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#efeae2' }}>
          {/* Active Chat Header */}
          <div style={{ background: '#ffffff', padding: '14px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.9rem'
                }}
              >
                <PhoneCall size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 900, color: '#0f172a', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {currentConv.phone}
                </div>
                <div style={{ fontSize: '0.775rem', color: currentConv.isHuman ? '#dc2626' : '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {currentConv.isHuman ? (
                    <>
                      <ShieldAlert size={13} /> AI Agent Paused — Human Takeover Active
                    </>
                  ) : (
                    <>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} /> AI Agent Active (Groq Llama 3.3 70B)
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Toggle Pause / Resume Button */}
            <button
              onClick={handleToggleTakeover}
              style={{
                padding: '9px 18px',
                borderRadius: '10px',
                border: 'none',
                background: currentConv.isHuman ? '#2563eb' : '#dc2626',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                transition: 'all 0.15s ease'
              }}
            >
              {currentConv.isHuman ? <Play size={15} /> : <Pause size={15} />}
              {currentConv.isHuman ? 'Resume AI Agent' : 'Pause AI & Take Over Chat'}
            </button>
          </div>

          {/* Chat Messages Stream */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {currentConv.messages && currentConv.messages.length > 0 ? (
              currentConv.messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                const isHuman = msg.role === 'human';

                return (
                  <div
                    key={index}
                    style={{
                      alignSelf: isUser ? 'flex-start' : 'flex-end',
                      maxWidth: '75%',
                      background: isUser ? '#ffffff' : isHuman ? '#dbeafe' : '#d9fdd3',
                      color: '#111b21',
                      padding: '12px 16px',
                      borderRadius: isUser ? '0 14px 14px 14px' : '14px 0 14px 14px',
                      fontSize: '0.925rem',
                      lineHeight: 1.5,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      border: isHuman ? '1px solid #93c5fd' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '0.725rem', fontWeight: 800, color: isUser ? '#2563eb' : isHuman ? '#1e3a8a' : '#15803d', marginBottom: '4px' }}>
                      {isUser ? 'Customer (WhatsApp)' : isHuman ? '👤 Human Agent Reply' : '🤖 Swasti AI Agent'}
                    </div>
                    {msg.content}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '6px', fontSize: '0.675rem', color: '#667781' }}>
                      {msg.time} {isUser ? null : <CheckCheck size={14} color="#53bdeb" style={{ marginLeft: '4px' }} />}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
                <MessageSquare size={42} color="#2563eb" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.8 }} />
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>No chat messages for {currentConv.phone}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                  Messages sent to or received from this customer will appear here in real-time.
                </div>
              </div>
            )}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} style={{ background: '#f0f2f5', padding: '16px 24px', display: 'flex', gap: '12px', borderTop: '1px solid #cbd5e1' }}>
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={
                currentConv.isHuman
                  ? 'Type direct reply to customer on WhatsApp...'
                  : 'Type reply (sending automatically pauses AI & takes over chat)...'
              }
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '0.925rem',
                outline: 'none',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
              <Send size={16} /> Send to WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
