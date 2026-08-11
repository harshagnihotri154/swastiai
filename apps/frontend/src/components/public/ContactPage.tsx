import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMsg(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="public-page-container" style={{ padding: '80px 48px', maxWidth: '1100px', margin: '0 auto', color: '#0f172a' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
        <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Get In Touch</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginTop: '8px', letterSpacing: '-0.03em' }}>
          We Would Love to Hear From You
        </h1>
        <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '14px', lineHeight: 1.6 }}>
          Have questions about custom WhatsApp AI integrations, MCP tools, or enterprise plans? Our engineering team is here to assist.
        </p>
      </div>

      <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }}>
        {/* Contact Form */}
        <div className="glass-panel" style={{ padding: '40px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#059669' }}>
              <Check size={48} style={{ margin: '0 auto 16px', display: 'block' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Enquiry Sent Successfully!</h3>
              <p style={{ color: '#475569', marginTop: '8px' }}>
                Thank you for contacting Swastiai. Your enquiry has been saved and forwarded to <strong>harshagnihotri154@gmail.com</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-secondary"
                style={{ marginTop: '24px', fontSize: '0.9rem' }}
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {errorMsg && (
                <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', fontSize: '0.875rem', fontWeight: 700 }}>
                  {errorMsg}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Your Full Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Harsh Agnihotri"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Business Email</label>
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Your Message / Requirements</label>
                <textarea
                  className="input-field"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your business or custom WhatsApp AI requirements..."
                  required
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '14px', marginTop: '6px' }}>
                {loading ? <Loader2 size={18} className="spin" /> : <Send size={16} />}
                {loading ? 'Submitting Enquiry...' : 'Send Direct Message'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(37, 99, 235, 0.1)' }}>
              <Mail size={26} color="#2563eb" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>DIRECT ENQUIRY EMAIL</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>harshagnihotri154@gmail.com</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(5, 150, 105, 0.1)' }}>
              <Phone size={26} color="#059669" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>WHATSAPP & CALL</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>+91-9084553059</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(124, 58, 237, 0.1)' }}>
              <MapPin size={26} color="#7c3aed" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>HEADQUARTERS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>New Delhi / Noida, India</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
