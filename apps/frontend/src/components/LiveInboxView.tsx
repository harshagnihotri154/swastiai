import React, { useState, useEffect } from 'react';
import { Send, Pause, Play, CheckCheck, Search, RefreshCw, MessageSquare } from 'lucide-react';
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

export const LiveInboxView: React.FC = () => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [activeContact, setActiveContact] = useState<string>('');
  const [replyText, setReplyText] = useState('');
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
            time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'
          }));

          const last = formattedMsgs[formattedMsgs.length - 1];
          return {
            phone: c.customerPhone,
            name: c.customerPhone.replace(/[^0-9]/g, '').slice(-10) || c.customerPhone,
            lastMsg: last ? last.content : 'No messages',
            time: last && last.time ? last.time : 'Just now',
            unread: 0,
            isHuman: !!c.isPaused,
            messages: formattedMsgs
          };
        });

        setConversations(mapped);
        if (!activeContact && mapped.length > 0) {
          setActiveContact(mapped[0].phone);
        }
      } else {
        // Fallback default sample if DB is empty
        setConversations([
          {
            phone: '+91-9084553059',
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
        if (!activeContact) setActiveContact('+91-9084553059');
      }
    } catch (err) {
      // Keep state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealConversations();
    const interval = setInterval(fetchRealConversations, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentConv = conversations.find(c => c.phone === activeContact) || conversations[0] || {
    phone: '+91-9084553059',
    name: 'Customer',
    lastMsg: 'No chat selected',
    time: '',
    unread: 0,
    isHuman: false,
    messages: []
  };

  const handleToggleTakeover = async () => {
    const nextPaused = !currentConv.isHuman;
    const updated = conversations.map(c => {
      if (c.phone === activeContact) {
        return { ...c, isHuman: nextPaused };
      }
      return c;
    });
    setConversations(updated);

    try {
      await fetch(`${API_BASE_URL}/api/v1/whatsapp/toggle-pause`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: activeContact, isPaused: nextPaused })
      });
    } catch (err) {}
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: ConvMessage = { role: 'human', content: replyText.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

    const updated = conversations.map(c => {
      if (c.phone === activeContact) {
        return {
          ...c,
          lastMsg: replyText.trim(),
          time: newMsg.time || 'Just now',
          isHuman: true,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    });

    setConversations(updated);
    const sentText = replyText.trim();
    setReplyText('');

    // Dispatch direct message to customer via WhatsApp backend API
    try {
      await fetch(`${API_BASE_URL}/api/v1/whatsapp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: activeContact, message: sentText })
      });
    } catch (err) {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#0f172a' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>Live WhatsApp Real-Time Inbox & Human Handover</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Real-time sync with MongoDB database & live customer WhatsApp chats.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={fetchRealConversations} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh Real Chats
          </button>

          <div className="badge badge-live">
            <div className="pulse-dot" /> Real MongoDB Chat Sync Active
          </div>
        </div>
      </div>

      {/* Main Two-Column Inbox Container */}
      <div className="glass-panel" style={{ padding: 0, display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: '620px', overflow: 'hidden', background: '#ffffff', border: '1px solid #cbd5e1' }}>
        {/* Left Column: Conversations List */}
        <div style={{ borderRight: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
          {/* List Header Search */}
          <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} color="#64748b" style={{ position: 'absolute', left: '10px', top: '12px' }} />
              <input
                type="text"
                className="input-field"
                style={{ paddingLeft: '32px', fontSize: '0.85rem' }}
                placeholder="Search real chats..."
              />
            </div>
          </div>

          {/* Conversations Items */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map((c) => {
              const isSelected = c.phone === activeContact;
              return (
                <div
                  key={c.phone}
                  onClick={() => setActiveContact(c.phone)}
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid #f1f5f9',
                    background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: '0.15s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.925rem' }}>{c.name || c.phone}</span>
                    <span style={{ fontSize: '0.725rem', color: '#64748b' }}>{c.time}</span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '8px' }}>
                    {c.lastMsg}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {c.isHuman ? (
                      <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', fontWeight: 800 }}>
                        👤 Human Handover
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', fontWeight: 800 }}>
                        🤖 AI Active
                      </span>
                    )}

                    {c.unread > 0 && (
                      <span style={{ background: '#2563eb', color: '#fff', fontSize: '0.7rem', fontWeight: 800, borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Window Studio */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#efeae2' }}>
          {/* Chat Window Header */}
          <div style={{ background: '#ffffff', padding: '14px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                {currentConv.name ? currentConv.name[0] : 'C'}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>{currentConv.name} ({currentConv.phone})</div>
                <div style={{ fontSize: '0.75rem', color: currentConv.isHuman ? '#dc2626' : '#059669', fontWeight: 700 }}>
                  {currentConv.isHuman ? '👤 Human Agent In Control' : '🟢 AI Agent Active (Groq Llama 3.3)'}
                </div>
              </div>
            </div>

            {/* Handover Toggle Button */}
            <button
              onClick={handleToggleTakeover}
              style={{
                padding: '8px 16px',
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
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {currentConv.isHuman ? <Play size={15} /> : <Pause size={15} />}
              {currentConv.isHuman ? 'Resume AI Agent' : 'Pause AI & Take Over Chat'}
            </button>
          </div>

          {/* Chat Stream Messages */}
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
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      border: isHuman ? '1px solid #93c5fd' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '0.725rem', fontWeight: 800, color: isUser ? '#2563eb' : isHuman ? '#1e3a8a' : '#15803d', marginBottom: '4px' }}>
                      {isUser ? 'Customer' : isHuman ? '👤 Human Agent Reply' : '🤖 Swasti AI Agent'}
                    </div>
                    {msg.content}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px', fontSize: '0.65rem', color: '#667781' }}>
                      {msg.time} {isUser ? null : <CheckCheck size={14} color="#53bdeb" style={{ marginLeft: '4px' }} />}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                <MessageSquare size={36} color="#2563eb" style={{ margin: '0 auto 8px', display: 'block' }} />
                <div style={{ fontWeight: 800 }}>No chat history for this customer yet.</div>
              </div>
            )}
          </div>

          {/* Direct WhatsApp Text Reply Input Box */}
          <form onSubmit={handleSendReply} style={{ background: '#f0f2f5', padding: '16px', display: 'flex', gap: '12px', borderTop: '1px solid #cbd5e1' }}>
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={currentConv.isHuman ? "Type a direct reply to customer on WhatsApp..." : "Type reply (sending will automatically pause AI & take over)..."}
              style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', fontSize: '0.9rem', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>
              <Send size={16} /> Send to WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
