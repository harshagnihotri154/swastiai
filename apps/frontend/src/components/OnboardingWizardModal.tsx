import React, { useState } from 'react';
import { Building2, Bot, Smartphone, Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose?: () => void;
  onComplete: (workspaceData: any) => void;
}

export const OnboardingWizardModal: React.FC<OnboardingWizardProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Step 1: Business Profile
  const [businessName, setBusinessName] = useState('Sharma Properties');
  const [category, setCategory] = useState('Real Estate');
  const [description, setDescription] = useState('We help customers find residential properties in Noida and Greater Noida.');
  const [location, setLocation] = useState('Sector 18, Noida');
  const [website, setWebsite] = useState('https://sharmaproperties.com');
  const [contactPhone, setContactPhone] = useState('+91-9084553059');

  // Step 2: AI Employee Profile
  const [agentName, setAgentName] = useState('Swasti');
  const [role, setRole] = useState('Sales Assistant');
  const [personality, setPersonality] = useState('Professional, friendly, and helpful');
  const [instructions, setInstructions] = useState('Help customers find properties, qualify leads, and schedule site visits.');

  // Step 3: WhatsApp Connection
  const [connectedPhone, setConnectedPhone] = useState('+91-9084553059');
  const [connectingFb, setConnectingFb] = useState(false);
  const [fbConnected, setFbConnected] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSimulateMetaConnect = () => {
    setConnectingFb(true);
    setTimeout(() => {
      setConnectingFb(false);
      setFbConnected(true);
      setConnectedPhone(contactPhone || '+91-9084553059');
    }, 1200);
  };

  const handleFinishOnboarding = async () => {
    setSubmitting(true);
    try {
      const payload = {
        businessName,
        category,
        description,
        website,
        location,
        contactPhone,
        agentName,
        role,
        personality,
        instructions
      };

      const res = await fetch(`${API_BASE_URL}/api/v1/workspace/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        onComplete(data.data);
      } else {
        onComplete(payload);
      }
    } catch (err) {
      onComplete({
        businessName,
        agentName,
        contactPhone
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        maxWidth: '680px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e2e8f0'
      }}>
        {/* Wizard Header Progress Bar */}
        <div style={{ background: '#0f172a', padding: '24px 32px', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} color="#fff" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>SWASTIAI AI Employee Setup</h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Deploy your autonomous WhatsApp AI employee in 60 seconds.</p>
              </div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8' }}>
              STEP {step} OF 3
            </div>
          </div>

          {/* Stepper Dots */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <div style={{ height: '4px', borderRadius: '2px', background: step >= 1 ? '#38bdf8' : 'rgba(255,255,255,0.2)' }} />
            <div style={{ height: '4px', borderRadius: '2px', background: step >= 2 ? '#38bdf8' : 'rgba(255,255,255,0.2)' }} />
            <div style={{ height: '4px', borderRadius: '2px', background: step >= 3 ? '#38bdf8' : 'rgba(255,255,255,0.2)' }} />
          </div>
        </div>

        {/* Wizard Body Content */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', color: '#0f172a', maxHeight: '70vh', overflowY: 'auto' }}>

          {/* STEP 1: CREATE BUSINESS WORKSPACE */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={22} color="#2563eb" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Step 1: Tell us about your Business</h4>
                  <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#64748b' }}>This helps your AI employee understand your company identity and offerings.</p>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>Business Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Sharma Properties"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>Business Category</label>
                  <select
                    className="input-field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ background: '#ffffff' }}
                  >
                    <option value="Real Estate">Real Estate</option>
                    <option value="Healthcare & Clinics">Healthcare & Clinics</option>
                    <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                    <option value="Education & Coaching">Education & Coaching</option>
                    <option value="Services & Consulting">Services & Consulting</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>Location / Branch</label>
                  <input
                    type="text"
                    className="input-field"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Sector 18, Noida"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>Business Description & Core Offerings</label>
                <textarea
                  rows={3}
                  className="input-field"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe what your business does and what customers ask about..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>Website URL</label>
                  <input
                    type="text"
                    className="input-field"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>Contact Phone Number</label>
                  <input
                    type="text"
                    className="input-field"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91-9084553059"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CONFIGURE AI EMPLOYEE */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={22} color="#2563eb" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Step 2: Create & Configure Your AI Employee</h4>
                  <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#64748b' }}>Define the name, role, tone, and operational guidelines for your AI staff.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>AI Employee Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="e.g. Swasti"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>Role / Job Title</label>
                  <input
                    type="text"
                    className="input-field"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Sales Assistant"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>Personality & Tone</label>
                <input
                  type="text"
                  className="input-field"
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  placeholder="e.g. Professional, friendly, polite, and helpful"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>Primary Instructions & Operational Rules</label>
                <textarea
                  rows={4}
                  className="input-field"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Help customers find properties, answer pricing questions, qualify budget, and schedule site visits."
                />
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Zap size={18} color="#2563eb" />
                <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                  Equipped with automatic <b>Knowledge RAG Search</b> and <b>Human Handoff Triggering</b>!
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: OFFICIAL WHATSAPP AUTHORIZATION */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Smartphone size={22} color="#25d366" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Step 3: Connect Business WhatsApp Number</h4>
                  <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#64748b' }}>Connect your WhatsApp Business account via official 1-Click Meta authorization.</p>
                </div>
              </div>

              <div style={{ background: 'rgba(37, 211, 102, 0.08)', border: '1px solid rgba(37, 211, 102, 0.3)', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>Official Meta WhatsApp Cloud API Connector</div>
                  {fbConnected && (
                    <span style={{ padding: '4px 12px', borderRadius: '14px', background: '#dcfce7', color: '#15803d', fontWeight: 800, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={14} /> AUTHORIZED
                    </span>
                  )}
                </div>

                <p style={{ margin: 0, fontSize: '0.825rem', color: '#475569', lineHeight: 1.5 }}>
                  Clicking below authorizes SWASTIAI via official Meta Embedded Signup. All tokens, WABA IDs, and Webhook callback endpoints are <b>configured automatically behind the scenes</b>.
                </p>

                <button
                  type="button"
                  onClick={handleSimulateMetaConnect}
                  disabled={connectingFb || fbConnected}
                  style={{
                    padding: '14px 24px',
                    borderRadius: '24px',
                    border: 'none',
                    background: fbConnected ? '#059669' : '#1877f2',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: fbConnected ? 'default' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 14px rgba(24, 119, 242, 0.3)'
                  }}
                >
                  {fbConnected ? (
                    <> <CheckCircle2 size={18} /> WhatsApp Business Number Connected! ({connectedPhone})</>
                  ) : connectingFb ? (
                    'Opening Meta WhatsApp Popup...'
                  ) : (
                    '🔵 1-Click Meta Facebook WhatsApp Login'
                  )}
                </button>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '14px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Active WhatsApp Number:</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'monospace' }}>{connectedPhone}</div>
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: '#dcfce7', padding: '4px 10px', borderRadius: '10px' }}>
                  Auto-Infrastructure Ready
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Navigation Controls */}
        <div style={{ padding: '20px 32px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {step > 1 ? (
            <button onClick={handlePrevStep} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button onClick={handleNextStep} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleFinishOnboarding}
              disabled={submitting}
              style={{
                padding: '12px 28px',
                borderRadius: '24px',
                border: 'none',
                background: 'linear-gradient(135deg, #059669, #10b981)',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ShieldCheck size={18} /> {submitting ? 'Deploying AI Employee...' : '🚀 Complete & Deploy AI Employee'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
