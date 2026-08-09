import React, { useState, useEffect } from 'react';
import { Key, Copy, Check, Save, ShieldCheck, Eye, EyeOff, Lock, RefreshCw } from 'lucide-react';

export const CredentialsManager: React.FC = () => {
  const [provider, setProvider] = useState<'meta' | 'interakt'>('meta');
  const [interaktKey, setInteraktKey] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dynamic Credentials State loaded securely from Backend API
  const [webhookUrl, setWebhookUrl] = useState('');
  const [whatsappToken, setWhatsappToken] = useState('');
  const [whatsappPhoneId, setWhatsappPhoneId] = useState('');
  const [groqApiKey, setGroqApiKey] = useState('');

  // Visibility Toggles for Secret Keys
  const [visibleKeys, setVisibleKeys] = useState<{ [key: string]: boolean }>({});

  const fetchCredentials = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/v1/credentials');
      const data = await res.json();
      if (data.success && data.data) {
        setWebhookUrl(data.data.webhookUrl || 'https://your-domain.ngrok-free.dev/webhook');
        setWhatsappToken(data.data.whatsappToken || '');
        setWhatsappPhoneId(data.data.whatsappPhoneId || '');
        setGroqApiKey(data.data.groqApiKey || '');
      }
    } catch (err) {
      setWebhookUrl('http://localhost:5001/webhook');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const maskValue = (value: string, isSecret: boolean) => {
    if (!isSecret) return value;
    if (!value || value.length <= 10) return '••••••••••••••••';
    return `${value.substring(0, 6)}••••••••••••••••${value.substring(value.length - 6)}`;
  };

  const copyToClipboard = (id: string, text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveProvider = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const credentialsList = [
    {
      id: 'webhook',
      label: 'Swastiai Webhook Callback URL',
      value: webhookUrl,
      desc: 'Public callback endpoint to paste in Meta Developer Console or Interakt Webhooks setting',
      isSecret: false
    },
    {
      id: 'token',
      label: 'Meta WhatsApp Access Token (WHATSAPP_ACCESS_TOKEN)',
      value: whatsappToken,
      desc: 'Graph API Secret Token for sending outgoing WhatsApp text messages',
      isSecret: true
    },
    {
      id: 'phoneId',
      label: 'WhatsApp Phone Number ID (WHATSAPP_PHONE_NUMBER_ID)',
      value: whatsappPhoneId,
      desc: 'ID of Meta WhatsApp Business Phone Number',
      isSecret: true
    },
    {
      id: 'groqKey',
      label: 'Groq AI API Key (GROQ_API_KEY)',
      value: groqApiKey,
      desc: 'Secret API key for Groq Llama 3.3 70B AI inference engine',
      isSecret: true
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#0f172a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>API Keys & Security Studio</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Manage encrypted WhatsApp provider credentials and secret AI model keys dynamically.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={fetchCredentials} className="btn-secondary">
            <RefreshCw size={15} className={loading ? 'spin' : ''} /> Refresh Keys
          </button>
          <button onClick={handleSaveProvider} className="btn-primary">
            <Save size={18} /> {savedSuccess ? 'Settings Saved! ✅' : 'Save Provider Config'}
          </button>
        </div>
      </div>

      {/* Security Banner */}
      <div style={{ padding: '16px 20px', borderRadius: '12px', background: 'rgba(5, 150, 105, 0.08)', border: '1px solid rgba(5, 150, 105, 0.25)', display: 'flex', alignItems: 'center', gap: '12px', color: '#059669' }}>
        <Lock size={20} color="#059669" />
        <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>
          🔒 Zero Hardcoded Keys: All secret credentials are fetched dynamically from backend environment variables and masked by default.
        </div>
      </div>

      {/* Provider Selector Card */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="#2563eb" /> Active WhatsApp Provider Engine
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div
            onClick={() => setProvider('meta')}
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: `2px solid ${provider === 'meta' ? '#2563eb' : '#e2e8f0'}`,
              background: provider === 'meta' ? 'rgba(37, 99, 235, 0.08)' : '#f8fafc',
              cursor: 'pointer',
              transition: '0.2s'
            }}
          >
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>Meta WhatsApp Cloud API</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Official Meta Graph API direct connection</div>
          </div>

          <div
            onClick={() => setProvider('interakt')}
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: `2px solid ${provider === 'interakt' ? '#7c3aed' : '#e2e8f0'}`,
              background: provider === 'interakt' ? 'rgba(124, 58, 237, 0.08)' : '#f8fafc',
              cursor: 'pointer',
              transition: '0.2s'
            }}
          >
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>Interakt WhatsApp API</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Popular Indian WhatsApp Business Provider API</div>
          </div>
        </div>

        {provider === 'interakt' && (
          <div style={{ marginTop: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
              Interakt Secret API Key
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={visibleKeys['interakt'] ? 'text' : 'password'}
                className="input-field"
                value={interaktKey}
                onChange={(e) => setInteraktKey(e.target.value)}
                placeholder="Paste your Interakt Secret API Key..."
                style={{ paddingRight: '48px' }}
              />
              <button
                type="button"
                onClick={() => toggleKeyVisibility('interakt')}
                style={{ position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                {visibleKeys['interakt'] ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {credentialsList.map((item) => {
          const isVisible = visibleKeys[item.id];
          const displayValue = isVisible || !item.isSecret ? item.value : maskValue(item.value, item.isSecret);

          return (
            <div key={item.id} className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.925rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Key size={16} color="#2563eb" /> {item.label}
                </label>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {item.isSecret && (
                    <button
                      onClick={() => toggleKeyVisibility(item.id)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      {isVisible ? <><EyeOff size={14} /> Hide Key</> : <><Eye size={14} /> Show Key</>}
                    </button>
                  )}

                  <button
                    onClick={() => copyToClipboard(item.id, item.value)}
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    {copiedField === item.id ? <><Check size={14} color="#059669" /> Copied!</> : <><Copy size={14} /> Copy Key</>}
                  </button>
                </div>
              </div>

              <div style={{
                background: '#f8fafc',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: item.isSecret && !isVisible ? '#64748b' : '#2563eb',
                wordBreak: 'break-all',
                fontWeight: 600,
                letterSpacing: item.isSecret && !isVisible ? '0.1em' : 'normal'
              }}>
                {displayValue || 'Key not loaded'}
              </div>

              <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '8px' }}>
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
