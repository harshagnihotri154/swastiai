import React, { useState } from 'react';
import { Send, Pause, Play, CheckCheck, Search } from 'lucide-react';

export const LiveInboxView: React.FC = () => {
  const [activeContact, setActiveContact] = useState<string>('+91-9084553059');
  const [replyText, setReplyText] = useState('');
  const [isHumanTakeover, setIsHumanTakeover] = useState<boolean>(false);

  const [conversations, setConversations] = useState([
    {
      phone: '+91-9084553059',
      name: 'Harsh Agnihotri',
      lastMsg: 'Hi Swastiai! What is the price for Pro Business plan?',
      time: '10:42 AM',
      unread: 0,
      isHuman: false,
      messages: [
        { role: 'user', content: 'Hi Swastiai! What is the price for Pro Business plan?', time: '10:41 AM' },
        { role: 'ai', content: 'Hello! 👋 The Pro Business Plan is ₹1,499/month (or ₹1,199/mo yearly). It includes unlimited AI messages, Meta + Interakt provider switcher, and custom MCP tools!', time: '10:42 AM' }
      ]
    },
    {
      phone: '+91-9876543210',
      name: 'Rohan Verma',
      lastMsg: 'Can I book a dental consultation tomorrow at 3 PM?',
      time: '09:15 AM',
      unread: 1,
      isHuman: false,
      messages: [
        { role: 'user', content: 'Can I book a dental consultation tomorrow at 3 PM?', time: '09:15 AM' },
        { role: 'ai', content: 'Hello! Available slots tomorrow are 10:30 AM, 2:15 PM, and 5:00 PM. Would you like me to reserve 2:15 PM for you?', time: '09:15 AM' }
      ]
    },
    {
      phone: '+1-555-677-4399',
      name: 'Meta Developer Tester',
      lastMsg: 'Where is order ORD-101 currently?',
      time: 'Yesterday',
      unread: 0,
      isHuman: true,
      messages: [
        { role: 'user', content: 'Where is order ORD-101 currently?', time: 'Yesterday' },
        { role: 'ai', content: 'Order ORD-101 is currently IN_TRANSIT via Express Courier. Delivery expected tomorrow by 5 PM.', time: 'Yesterday' },
        { role: 'human', content: 'Hi! I have personally verified with logistics. Your order will reach you by 2 PM!', time: 'Yesterday' }
      ]
    }
  ]);

  const currentConv = conversations.find(c => c.phone === activeContact) || conversations[0];

  const handleToggleTakeover = () => {
    const updated = conversations.map(c => {
      if (c.phone === activeContact) {
        return { ...c, isHuman: !c.isHuman };
      }
      return c;
    });
    setConversations(updated);
    setIsHumanTakeover(!isHumanTakeover);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = { role: 'human', content: replyText.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

    const updated = conversations.map(c => {
      if (c.phone === activeContact) {
        return {
          ...c,
          lastMsg: replyText.trim(),
          time: newMsg.time,
          isHuman: true,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    });

    setConversations(updated);
    setReplyText('');

    // Trigger backend webhook test send
    try {
      await fetch('http://localhost:5001/api/v1/whatsapp/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: replyText })
      });
    } catch (err) {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#0f172a' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>Live WhatsApp Inbox & Human Handover Studio</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Monitor active WhatsApp chats in real time. Take over from AI or resume automated AI responses anytime.</p>
        </div>

        <div className="badge badge-live">
          <div className="pulse-dot" /> Live WhatsApp Webhook Connection
        </div>
      </div>

      {/* Main Two-Column Inbox Container */}
      <div className="glass-panel" style={{ padding: 0, display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: '620px', overflow: 'hidden' }}>
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
                placeholder="Search WhatsApp chats..."
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
                  onClick={() => { setActiveContact(c.phone); setIsHumanTakeover(c.isHuman); }}
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
                {currentConv.name[0]}
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
            {currentConv.messages.map((msg, index) => {
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
                    {isUser ? 'Customer' : isHuman ? '👤 Human Agent Reply' : '🤖 AI Agent (Groq)'}
                  </div>
                  {msg.content}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px', fontSize: '0.65rem', color: '#667781' }}>
                    {msg.time} {isUser ? null : <CheckCheck size={14} color="#53bdeb" style={{ marginLeft: '4px' }} />}
                  </div>
                </div>
              );
            })}
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
