import React, { useState, useEffect } from 'react';
import { RefreshCw, Send, Smartphone, Sparkles, CheckCircle2, Save } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export const CredentialsManager: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Credentials State
  const [whatsappToken, setWhatsappToken] = useState('');
  const [whatsappPhoneId, setWhatsappPhoneId] = useState('');
  const [groqApiKey, setGroqApiKey] = useState('');

  const [quickPhone, setQuickPhone] = useState('');

  // Baileys Real WhatsApp Web QR & Pairing State
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [pairingCode, setPairingCode] = useState<string>('');
  const [phoneForCode, setPhoneForCode] = useState<string>('');
  const [generatingCode, setGeneratingCode] = useState(false);
  const [qrStatus, setQrStatus] = useState<'READY' | 'SCANNING' | 'CONNECTED'>('READY');
  const [connectedPhone, setConnectedPhone] = useState<string | null>(null);

  // Live Test Message State
  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('Hello! Swastiai WhatsApp AI test connection.');
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const fetchCredentials = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/credentials`);
      const data = await res.json();
      if (data.success && data.data) {
        setWhatsappToken(data.data.whatsappToken || '');
        setWhatsappPhoneId(data.data.whatsappPhoneId || '');
        setGroqApiKey(data.data.groqApiKey || '');

        const activePhone = data.data.activePhone || data.data.userPhoneNumber;
        if (activePhone || data.data.baileysStatus === 'CONNECTED') {
          setQrStatus('CONNECTED');
          setConnectedPhone(activePhone || data.data.activePhone || 'Connected Phone');
          setQuickPhone(activePhone || '');
        } else {
          setQrStatus('READY');
          setConnectedPhone(null);
        }
      }
    } catch (err) {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  const fetchQRCode = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/whatsapp/qr-code`);
      const data = await res.json();
      if (data.success && data.data) {
        if (data.data.qrDataUrl) {
          setQrDataUrl(data.data.qrDataUrl);
        }
        if (data.data.pairingCode) {
          const rawCode = data.data.pairingCode.replace(/[^A-Z0-9]/gi, '');
          const formatted = rawCode.length >= 8 ? `${rawCode.slice(0, 4)} - ${rawCode.slice(4, 8)}` : rawCode;
          setPairingCode(formatted);
        }
        if (data.data.status === 'CONNECTED' || data.data.activePhone) {
          setQrStatus('CONNECTED');
          if (data.data.activePhone) {
            setConnectedPhone(data.data.activePhone);
          }
        }
      }
    } catch (err) {
      // Fallback
    }
  };

  useEffect(() => {
    fetchCredentials();
    fetchQRCode();
    const interval = setInterval(() => {
      fetchQRCode();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRequestPairingCode = async () => {
    if (!phoneForCode.trim()) {
      alert('Please enter your WhatsApp phone number with country code (e.g. 919084553059).');
      return;
    }
    setGeneratingCode(true);
    try {
      const cleanPhone = phoneForCode.replace(/[^0-9]/g, '');
      const res = await fetch(`${API_BASE_URL}/api/v1/whatsapp/request-pairing-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone })
      });
      const data = await res.json();
      if (data.success && data.data?.pairingCode) {
        const rawCode = data.data.pairingCode.replace(/[^A-Z0-9]/gi, '');
        const formatted = rawCode.length >= 8 ? `${rawCode.slice(0, 4)} - ${rawCode.slice(4, 8)}` : rawCode;
        setPairingCode(formatted);
      } else {
        alert(`Could not generate pairing code: ${data.error || 'Please scan the QR code directly instead.'}`);
      }
    } catch (err: any) {
      alert(`Error requesting pairing code: ${err.message || 'Please scan the QR code.'}`);
    } finally {
      setGeneratingCode(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDisconnectWhatsApp = async () => {
    if (!window.confirm('Are you sure you want to disconnect current WhatsApp account? This will allow any other WhatsApp account to scan QR or pair.')) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/whatsapp/logout`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setQrStatus('READY');
        setConnectedPhone(null);
        setQrDataUrl(null);
        setPairingCode('');
        alert('Disconnected successfully! You can now pair or scan with any other WhatsApp account.');
        setTimeout(() => {
          fetchQRCode();
        }, 1500);
      }
    } catch (err) {
      setQrStatus('READY');
      setConnectedPhone(null);
    }
  };

  const handleSaveCredentials = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/credentials/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsappToken,
          whatsappPhoneId,
          provider: 'qrcode',
          groqApiKey,
          userPhoneNumber: quickPhone
        })
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      } else {
        alert('Error saving credentials: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Failed to save credentials: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSendTestMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPhone.trim() || testing) return;

    setTesting(true);
    setTestStatus('Sending test message via WhatsApp...');
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/whatsapp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testPhone.trim(),
          message: testMessage
        })
      });
      const data = await res.json();
      if (data.success) {
        setTestStatus(`✅ Test WhatsApp message delivered successfully to ${testPhone}!`);
      } else {
        setTestStatus(`❌ Delivery failed: ${data.error || 'Check Phone ID & Token'}`);
      }
    } catch (err: any) {
      setTestStatus(`❌ Network error: ${err.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#0f172a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>WhatsApp Numbers & Connection Studio</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Add, connect, and manage multiple business WhatsApp numbers for your AI agent.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => { fetchCredentials(); fetchQRCode(); }} className="btn-secondary">
            <RefreshCw size={15} className={loading ? 'spin' : ''} /> Refresh Status
          </button>
          <button onClick={handleSaveCredentials} disabled={saving} className="btn-primary">
            <Save size={18} /> {savedSuccess ? 'Saved! ✅' : (saving ? 'Saving...' : 'Save Config')}
          </button>
        </div>
      </div>

      {/* WhatsApp Web QR Code & Pairing Code Studio */}
      <div className="glass-panel" style={{ padding: '28px', background: '#ffffff', border: '2px solid #25d366', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '14px', background: 'rgba(37, 211, 102, 0.1)', color: '#25d366', fontSize: '0.75rem', fontWeight: 800, marginBottom: '6px' }}>
              <Sparkles size={14} /> WHATSAPP WEB CONNECTION STUDIO
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Scan Native QR Code or Enter 8-Digit Pairing Code</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#64748b' }}>Connect your phone's WhatsApp application directly in 10 seconds.</p>
          </div>

          {qrStatus === 'CONNECTED' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#dcfce7', color: '#15803d', padding: '8px 16px', borderRadius: '20px', fontWeight: 800, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={18} /> Linked to {connectedPhone}
              </div>
              <button
                onClick={handleDisconnectWhatsApp}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: '1px solid #ef4444',
                  background: '#fef2f2',
                  color: '#dc2626',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Disconnect & Allow Other Login 🚪
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'center' }}>
          <div style={{
            background: '#f8fafc',
            border: '2px dashed #cbd5e1',
            borderRadius: '20px',
            padding: '20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ background: '#ffffff', padding: '12px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', marginBottom: '12px' }}>
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="WhatsApp Web Native QR Code"
                  style={{ width: '180px', height: '180px', display: 'block' }}
                />
              ) : (
                <div style={{ width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                  Generating Real QR...
                </div>
              )}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>
              {qrStatus === 'SCANNING' ? '🔄 Connecting phone...' : (qrStatus === 'CONNECTED' ? '🟢 Linked & Active' : '📲 Scan QR with WhatsApp App')}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* 8-Digit Custom Pairing Code Box */}
            <div style={{ background: 'rgba(37, 211, 102, 0.08)', border: '1px solid rgba(37, 211, 102, 0.3)', borderRadius: '16px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#075e54', textTransform: 'uppercase' }}>REAL 8-DIGIT PAIRING CODE FOR WHATSAPP APP</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '0.14em', marginTop: '2px', fontFamily: 'monospace' }}>
                    {pairingCode || 'Click below to generate code'}
                  </div>
                </div>
                {pairingCode && (
                  <button
                    onClick={() => copyToClipboard('pairing', pairingCode.replace(/[^A-Z0-9]/gi, ''))}
                    style={{ padding: '8px 14px', borderRadius: '12px', border: '1px solid #25d366', background: '#ffffff', color: '#25d366', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    {copiedField === 'pairing' ? 'Copied! ✅' : 'Copy Code'}
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <input
                  type="text"
                  className="input-field"
                  value={phoneForCode}
                  onChange={(e) => setPhoneForCode(e.target.value)}
                  placeholder="Enter phone with country code (e.g. 919084553059)"
                  style={{ background: '#ffffff', fontSize: '0.825rem' }}
                />
                <button
                  onClick={handleRequestPairingCode}
                  disabled={generatingCode}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', padding: '8px 14px' }}
                >
                  {generatingCode ? 'Generating Code...' : 'Get Code for My Phone'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#25d366', color: '#fff', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>1</div>
              <div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.925rem' }}>Open WhatsApp on your mobile phone</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>Open your regular WhatsApp or WhatsApp Business application.</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#25d366', color: '#fff', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>2</div>
              <div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.925rem' }}>Go to Settings / Menu ➔ Linked Devices</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>Tap <b>Settings (iPhone)</b> or <b>3 dots ⋮ (Android)</b> ➔ <b>Linked Devices</b> ➔ <b>Link with Phone Number</b> (or scan QR code).</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Test WhatsApp Message Card */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff', border: '1.5px solid #2563eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
            <Smartphone size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>🧪 Live WhatsApp Test Dispatcher</h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Send a real test message to any WhatsApp number to verify your connection instantly.</p>
          </div>
        </div>

        <form onSubmit={handleSendTestMessage} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>
              Destination WhatsApp Phone Number (with country code):
            </label>
            <input
              type="text"
              className="input-field"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              placeholder="e.g. 919084553059"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>
              Test Message Text:
            </label>
            <input
              type="text"
              className="input-field"
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={testing || !testPhone.trim()} className="btn-primary" style={{ padding: '12px', justifyContent: 'center' }}>
            <Send size={16} /> {testing ? 'Sending Test Message...' : 'Send Live Test Message Now'}
          </button>

          {testStatus && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: testStatus.includes('✅') ? '#dcfce7' : '#fee2e2',
              color: testStatus.includes('✅') ? '#15803d' : '#b91c1c',
              fontWeight: 700,
              fontSize: '0.875rem'
            }}>
              {testStatus}
            </div>
          )}
        </form>
      </div>

    </div>
  );
};
