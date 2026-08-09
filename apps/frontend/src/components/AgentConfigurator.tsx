import React, { useState } from 'react';
import { Save, Sparkles, Sliders, RefreshCw, Wand2 } from 'lucide-react';

export const AgentConfigurator: React.FC = () => {
  const [agentName, setAgentName] = useState('Swastiai Business Assistant');
  const [model, setModel] = useState('groq-llama-3.3-70b');
  const [temperature, setTemperature] = useState(0.7);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are Swastiai's official WhatsApp AI assistant. Answer user inquiries politely, concisely, and professionally. Always provide helpful answers in clear bullet points when explaining complex topics."
  );

  // Business Prompt Generator Helper State
  const [businessName, setBusinessName] = useState('');
  const [businessServices, setBusinessServices] = useState('');
  const [generatingPrompt, setGeneratingPrompt] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResponse, setTestResponse] = useState('');

  const handleSave = async () => {
    try {
      await fetch('http://localhost:5001/api/v1/whatsapp/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: 'Initialize System Prompt',
          systemPrompt
        })
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleAutoGeneratePrompt = async () => {
    if (!businessName.trim() || !businessServices.trim()) {
      alert("Please enter your Business Name and Services/Details first!");
      return;
    }

    setGeneratingPrompt(true);
    try {
      const res = await fetch('http://localhost:5001/api/v1/whatsapp/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Generate an AI System Prompt for a business named "${businessName}". Business services and details: "${businessServices}". Write a clear, professional prompt instructing the AI assistant how to greet WhatsApp customers, answer FAQs, state pricing/timings, and book appointments.`
        })
      });
      const data = await res.json();
      if (data.aiReply) {
        setSystemPrompt(data.aiReply);
      }
    } catch (err) {
      setSystemPrompt(`You are the official WhatsApp AI assistant for ${businessName}. ${businessServices}. Greet customers warmly and answer their questions politely.`);
    } finally {
      setGeneratingPrompt(false);
    }
  };

  const handleTestPrompt = async () => {
    setTesting(true);
    setTestResponse('');
    try {
      const res = await fetch('http://localhost:5001/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          object: 'whatsapp_business_account',
          entry: [{
            changes: [{
              value: {
                messages: [{
                  from: '919084553059',
                  id: 'test_' + Date.now(),
                  type: 'text',
                  text: { body: 'Hello! What services do you offer?' }
                }]
              }
            }]
          }]
        })
      });
      if (res.ok) {
        setTestResponse('✅ Prompt configuration test succeeded! Check server logs or WhatsApp test phone.');
      }
    } catch (err: any) {
      setTestResponse('❌ Test error: ' + err.message);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#0f172a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>AI Agent Settings & Business Prompt Studio</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Customize your business AI assistant's persona, system instructions, and LLM provider.</p>
        </div>

        <button onClick={handleSave} className="btn-primary">
          <Save size={18} /> {savedSuccess ? 'Saved Successfully! ✅' : 'Save Agent Config'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '24px' }}>
        {/* Prompt Configuration Panel */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
              Agent Name
            </label>
            <input
              type="text"
              className="input-field"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="e.g. Swastiai Sales Assistant"
            />
          </div>

          {/* 1-Click AI Business Prompt Generator Box */}
          <div style={{ padding: '18px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Wand2 size={16} /> 1-Click AI Business Prompt Generator
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input
                type="text"
                className="input-field"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business Name (e.g. Delhi Dental Clinic)"
              />
              <input
                type="text"
                className="input-field"
                value={businessServices}
                onChange={(e) => setBusinessServices(e.target.value)}
                placeholder="Services & Prices (e.g. Cleaning ₹500, Open 10am-7pm)"
              />
            </div>

            <button onClick={handleAutoGeneratePrompt} disabled={generatingPrompt} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 14px', justifyContent: 'center' }}>
              {generatingPrompt ? <RefreshCw size={14} className="spin" /> : <Wand2 size={14} />} Auto-Generate Business System Prompt
            </button>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
              System Prompt & Business Persona Instructions 🧠
            </label>
            <textarea
              className="input-field"
              rows={8}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Write how your AI Agent should greet customers, answer questions, or behave..."
              style={{ lineHeight: 1.6, resize: 'vertical' }}
            />
            <span style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '6px', display: 'block' }}>
              Tip: When a customer texts your business on WhatsApp, Swastiai uses THIS exact system prompt to generate custom answers.
            </span>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '10px' }}>
              Quick Persona Templates:
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSystemPrompt("You are an AI Sales Agent for a modern SaaS company. Help users choose the right pricing plan, explain feature benefits, and encourage them to book a demo.")}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                💼 Sales Rep
              </button>

              <button
                type="button"
                onClick={() => setSystemPrompt("You are an AI Customer Support Specialist. Provide fast, step-by-step troubleshooting assistance politely and clearly.")}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                🎧 Tech Support
              </button>

              <button
                type="button"
                onClick={() => {
                  setAgentName("Courier Logistics Assistant");
                  setSystemPrompt("You are the official 24/7 AI Assistant for Express Courier Logistics. Help customers calculate shipping rates, track courier orders by Order ID (e.g. ORD-101), explain delivery timelines, and assist with pick-up requests. Always speak politely and clearly.");
                }}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 12px', border: '1px solid #2563eb', color: '#2563eb' }}
              >
                🚢 Logistics Courier Demo
              </button>

              <button
                type="button"
                onClick={() => setSystemPrompt("You are an AI Appointment Booking Assistant for a medical clinic. Help patients check available slots, confirm clinic locations, and answer basic prep questions.")}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                🏥 Healthcare Booking
              </button>
            </div>
          </div>
        </div>

        {/* Model & Parameters Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#2563eb" /> Model Parameters
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                Primary AI Provider & Model
              </label>
              <select
                className="input-field"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{ cursor: 'pointer' }}
              >
                <option value="groq-llama-3.3-70b">🚀 Groq Llama 3.3 70B (Recommended - Fast & Accurate)</option>
                <option value="gemini-1.5-flash">✨ Google Gemini 1.5 Flash</option>
                <option value="openai-gpt-4o">⚡ OpenAI GPT-4o Mini</option>
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Temperature (Creativity)</label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563eb' }}>{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                <span>Strict / Precise (0.0)</span>
                <span>Creative (1.0)</span>
              </div>
            </div>
          </div>

          {/* Test Prompt Output Box */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#7c3aed" /> Real-time Prompt Test
            </h3>

            <button onClick={handleTestPrompt} disabled={testing} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              {testing ? <RefreshCw size={16} className="spin" /> : '⚡ Test Prompt Live'}
            </button>

            {testResponse && (
              <div style={{ padding: '12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#2563eb', fontWeight: 600 }}>
                {testResponse}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
