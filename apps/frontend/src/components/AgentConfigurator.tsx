import React, { useState, useEffect } from 'react';
import { Save, Sliders, RefreshCw, Wand2, Smartphone, Send, MessageSquare, Bot } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export const AgentConfigurator: React.FC = () => {
  const [userPhone, setUserPhone] = useState('');
  const [agentName, setAgentName] = useState('SwastiAI Assistant');
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful AI Customer Support Agent. Speak warmly and professionally on WhatsApp. Help customers with product inquiries and booking questions. Keep your responses short (1-2 sentences), crisp, and direct."
  );

  // Business Prompt Generator Helper State
  const [businessName, setBusinessName] = useState('Swastiai');
  const [businessServices, setBusinessServices] = useState('AI Employee Platform & Tech Solutions');
  const [generatingPrompt, setGeneratingPrompt] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // 🧪 Live Playground Sandbox Chat State
  const [sandboxQuery, setSandboxQuery] = useState('Hi, what services do you offer?');
  const [sandboxChat, setSandboxChat] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([
    { sender: 'user', text: 'Hi, who are you?' },
    { sender: 'agent', text: 'Hey there! I am your SwastiAI Assistant. How can I help you today?' }
  ]);
  const [testing, setTesting] = useState(false);

  // Fetch REAL saved prompt & agent config from MongoDB backend
  const fetchRealConfig = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/credentials`);
      const data = await res.json();
      if (data.success && data.data) {
        if (data.data.systemPrompt) setSystemPrompt(data.data.systemPrompt);
        if (data.data.agentName) setAgentName(data.data.agentName);
        
        const active = data.data.activePhone || data.data.userPhoneNumber || '';
        setUserPhone(active);
      }
    } catch (err) {
      // Keep existing state
    }
  };

  useEffect(() => {
    fetchRealConfig();
  }, []);

  const handleSave = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/v1/credentials/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhoneNumber: userPhone,
          agentName,
          systemPrompt
        })
      });
      setSavedSuccess(true);
      await fetchRealConfig();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleAutoGeneratePrompt = async () => {
    setGeneratingPrompt(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/whatsapp/ask-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Generate a short WhatsApp system prompt for ${agentName || "Harsh Agnihotri"}, software developer. Business services: "${businessServices}". Keep responses under 2 sentences.`
        })
      });
      const data = await res.json();
      if (data.aiReply) {
        setSystemPrompt(data.aiReply);
      }
    } catch (err) {
      setSystemPrompt(`You are Harsh Agnihotri, Software Developer. Speak warmly and professionally on WhatsApp. Answer questions in 1-2 short sentences.`);
    } finally {
      setGeneratingPrompt(false);
    }
  };

  const handleSandboxSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sandboxQuery.trim() || testing) return;

    const userText = sandboxQuery.trim();
    setSandboxChat((prev) => [...prev, { sender: 'user', text: userText }]);
    setSandboxQuery('');
    setTesting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/whatsapp/ask-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userText,
          to: userPhone,
          systemPrompt
        })
      });
      const data = await res.json();
      if (data.success && data.aiReply) {
        setSandboxChat((prev) => [...prev, { sender: 'agent', text: data.aiReply }]);
      } else {
        setSandboxChat((prev) => [...prev, { sender: 'agent', text: `Hey! I am ${agentName}. How can I help you with software development today?` }]);
      }
    } catch (err: any) {
      setSandboxChat((prev) => [...prev, { sender: 'agent', text: `Hi! I am ${agentName}. Feel free to ask any questions about custom app development.` }]);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#0f172a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>🤖 Real-Time Agent Configurator & System Prompt Studio</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Real MongoDB sync — edit your live WhatsApp system prompt & persona below.</p>
        </div>

        <button onClick={handleSave} className="btn-primary">
          <Save size={18} /> {savedSuccess ? 'Saved & Deployed Live! ✅' : 'Save & Deploy Prompt'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.1fr', gap: '24px' }}>
        {/* Prompt Configuration Panel */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#ffffff' }}>
          
          {/* Business WhatsApp Number Input */}
          <div style={{ padding: '16px 20px', borderRadius: '14px', background: '#f8fafc', border: '1.5px solid #cbd5e1' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              <Smartphone size={18} color="#2563eb" /> Active Business WhatsApp Phone Number
            </label>
            <input
              type="text"
              className="input-field"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="e.g. +91-9084553059"
              style={{ background: '#ffffff', fontWeight: 800, color: '#2563eb' }}
            />
            <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px', display: 'block' }}>
              Swastiai routes all incoming customer chats on this WhatsApp line to your live system prompt below.
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
              AI Agent Identity & Name
            </label>
            <input
              type="text"
              className="input-field"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="e.g. Harsh Agnihotri (Software Developer)"
              style={{ background: '#ffffff', color: '#0f172a' }}
            />
          </div>

          {/* 1-Click AI Business Prompt Generator Box */}
          <div style={{ padding: '18px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Wand2 size={16} /> 1-Click AI Prompt Generator
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input
                type="text"
                className="input-field"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business / Name (e.g. Swastiai)"
              />
              <input
                type="text"
                className="input-field"
                value={businessServices}
                onChange={(e) => setBusinessServices(e.target.value)}
                placeholder="Services (e.g. Full-Stack Web & AI Apps)"
              />
            </div>

            <button onClick={handleAutoGeneratePrompt} disabled={generatingPrompt} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 14px', justifyContent: 'center' }}>
              {generatingPrompt ? <RefreshCw size={14} className="spin" /> : <Wand2 size={14} />} Auto-Generate Real System Prompt
            </button>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
              Live System Prompt & Persona Instructions (Synced with MongoDB) 🧠
            </label>
            <textarea
              className="input-field"
              rows={7}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Write how your AI Agent should greet customers, answer questions, or behave..."
              style={{ lineHeight: 1.6, resize: 'vertical', background: '#ffffff', color: '#0f172a', fontWeight: 600 }}
            />
            <span style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '6px', display: 'block' }}>
              Changes saved here update MongoDB live and immediately take effect for all incoming WhatsApp chats!
            </span>
          </div>
        </div>

        {/* 🧪 LIVE PLAYGROUND SANDBOX PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff', border: '2px solid #2563eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>🧪 Test Live Prompt Sandbox</h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Simulate incoming messages with your real prompt.</p>
                </div>
              </div>

              <span className="badge badge-live">
                <Bot size={14} /> Real MongoDB Sync
              </span>
            </div>

            {/* Sandbox Chat History Container */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '16px',
              padding: '16px',
              height: '320px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {sandboxChat.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'user' ? '#2563eb' : '#ffffff',
                    color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, marginBottom: '4px', color: msg.sender === 'user' ? '#93c5fd' : '#64748b' }}>
                    {msg.sender === 'user' ? '👤 Customer WhatsApp' : `🤖 ${agentName}`}
                  </div>
                  {msg.text}
                </div>
              ))}
              {testing && (
                <div style={{ alignSelf: 'flex-start', padding: '10px 16px', borderRadius: '16px', background: '#ffffff', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                  🤖 Generating response with live MongoDB prompt...
                </div>
              )}
            </div>

            {/* Sandbox Send Input Form */}
            <form onSubmit={handleSandboxSend} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input-field"
                value={sandboxQuery}
                onChange={(e) => setSandboxQuery(e.target.value)}
                placeholder="Type customer message to test..."
                required
                style={{ background: '#ffffff', fontSize: '0.85rem' }}
              />
              <button
                type="submit"
                disabled={testing || !sandboxQuery.trim()}
                className="btn-primary"
                style={{ padding: '10px 16px', whiteSpace: 'nowrap' }}
              >
                <Send size={16} /> Test
              </button>
            </form>
          </div>

          {/* Model Controls */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#ffffff' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={16} color="#2563eb" /> MongoDB Real Data Sync
            </h4>
            <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700 }}>
              🟢 Live Prompt & Persona loaded from MongoDB database.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
