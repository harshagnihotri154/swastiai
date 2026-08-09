import React, { useState } from 'react';
import { Send, Smartphone, Bot, CheckCheck, RefreshCw, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  status?: string;
}

export const LivePlayground: React.FC = () => {
  const [phone, setPhone] = useState('919084553059');
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Hi Swastiai! What are 3 cool things you can do as an AI Agent?',
      timestamp: '09:16 AM'
    },
    {
      id: '2',
      sender: 'ai',
      text: "Hello! I'm happy to help. As an AI Agent, 3 cool things I can do are:\n\n1. Answer Questions on any topic\n2. Generate custom text & replies\n3. Provide 24/7 Automated WhatsApp Support",
      timestamp: '09:16 AM',
      status: 'Groq Llama 3.3 (0.12s)'
    }
  ]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Call backend API /api/v1/whatsapp/ask-ai
      const res = await fetch('http://localhost:5001/api/v1/whatsapp/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: phone,
          question: userText
        })
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.aiReply || 'Hello! Thank you for contacting Swastiai.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: data.whatsappStatus || 'Delivered'
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: '⚠️ Network error communicating with Swastiai Backend. Ensure http://localhost:5001 is running.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Error'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>Live WhatsApp AI Simulator & Test Console</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Type any prompt below to chat with your AI Agent in real-time and deliver responses to your WhatsApp phone.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px', alignItems: 'start' }}>
        {/* WhatsApp Phone Mockup */}
        <div style={{
          background: '#0b141a',
          borderRadius: '24px',
          border: '12px solid #1f2937',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 0 2px var(--border-color)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '620px'
        }}>
          {/* Phone Header */}
          <div style={{
            background: '#111b21',
            padding: '14px 20px',
            borderBottom: '1px solid #222d34',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#fff',
                fontSize: '1.1rem'
              }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#e9edef', fontSize: '1rem' }}>Swastiai AI Agent</div>
                <div style={{ fontSize: '0.75rem', color: '#00a884', fontWeight: 600 }}>online • Groq Llama 3.3 70B</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#8696a0' }}>Test Phone:</span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 919084553059"
                style={{
                  width: '150px',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid #222d34',
                  background: '#202c33',
                  color: '#e9edef',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace'
                }}
              />
            </div>
          </div>

          {/* Chat Messages Body */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            backgroundImage: 'radial-gradient(#202c33 1px, transparent 0)',
            backgroundSize: '16px 16px'
          }}>
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    background: isUser ? '#005c4b' : '#202c33',
                    color: '#e9edef',
                    padding: '10px 14px',
                    borderRadius: isUser ? '12px 0 12px 12px' : '0 12px 12px 12px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontSize: '0.9rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '4px',
                    marginTop: '4px',
                    fontSize: '0.675rem',
                    color: isUser ? '#8696a0' : '#8696a0'
                  }}>
                    {msg.timestamp}
                    {isUser ? <CheckCheck size={14} color="#53bdeb" /> : null}
                  </div>
                  {msg.status && !isUser && (
                    <div style={{ fontSize: '0.65rem', color: '#00a884', fontWeight: 600, marginTop: '2px' }}>
                      ⚡ {msg.status}
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div style={{
                alignSelf: 'flex-start',
                background: '#202c33',
                color: '#8696a0',
                padding: '10px 16px',
                borderRadius: '0 12px 12px 12px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <RefreshCw size={14} className="spin" /> Swastiai AI is thinking...
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSend} style={{ background: '#202c33', padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a WhatsApp message..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                background: '#2a3942',
                color: '#e9edef',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: 'none',
                background: '#00a884',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: loading || !inputMessage.trim() ? 0.5 : 1
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>

        {/* Real WhatsApp Phone Delivery Guide Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Smartphone size={20} color="#25d366" /> Live WhatsApp Mobile Delivery
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Every time you type a question on the left simulator, Swastiai processes it with <strong>Groq Llama 3.3 AI</strong> and dispatches the response straight to your physical WhatsApp mobile app!
            </p>

            <div style={{ padding: '14px', borderRadius: '10px', background: '#0b1220', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: 600 }}>TARGET PHONE NUMBER</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#25d366', marginTop: '2px' }}>
                +{phone}
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', background: '#0b1220', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: 600 }}>RESPONSE SPEED</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#a78bfa', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} /> ~120 ms (Ultra-Fast Groq Inference)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
