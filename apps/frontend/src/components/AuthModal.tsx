import React, { useState, useEffect } from 'react';
import { Bot, Mail, Lock, User, ArrowRight, X, KeyRound, CheckCircle2, RotateCcw } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [authMode, setAuthMode] = useState<'otp' | 'password'>('otp');
  const [step, setStep] = useState<'email' | 'otp_verify'>('email');
  const [isLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // ⏱️ Resend Countdown State (120 seconds)
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (step === 'otp_verify' && timer > 0) {
      setCanResend(false);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  if (!isOpen) return null;

  // Step 1: Request 6-digit OTP Email
  const handleSendOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim() || loading) return;

    setError('');
    setInfoMsg('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send OTP code');
      }

      setStep('otp_verify');
      setTimer(120);
      setCanResend(false);

      if (data.devOtp) {
        setInfoMsg(`[Dev Mode] Verification code: ${data.devOtp}`);
      } else {
        setInfoMsg(`Verification code sent to ${email.trim()}`);
      }
    } catch (err: any) {
      setError(err.message || 'Error sending verification code');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify 6-digit OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || loading) return;

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'OTP verification failed');
      }

      localStorage.setItem('swastiai_token', data.token);
      onSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  // Legacy password fallback handler
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/v1/auth/login' : '/api/v1/auth/signup';
    const payload = isLogin ? { email, password } : { email, password, name };

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('swastiai_token', data.token);
      onSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '36px',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        border: '1px solid #cbd5e1',
        background: '#ffffff'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
          }}>
            <Bot size={28} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
            {authMode === 'otp'
              ? (step === 'email' ? 'Email OTP Login' : 'Enter Verification Code')
              : (isLogin ? 'Welcome Back' : 'Create Swastiai Account')}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
            {authMode === 'otp'
              ? (step === 'email' ? 'Enter your email to receive a secure 6-digit login code' : `Sent code to ${email}`)
              : 'Log in with password'}
          </p>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#dc2626', fontSize: '0.85rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {infoMsg && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#dcfce7', border: '1px solid #86efac', color: '#15803d', fontSize: '0.85rem', marginBottom: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={16} /> {infoMsg}
          </div>
        )}

        {authMode === 'otp' ? (
          step === 'email' ? (
            <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Full Name (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                  <input
                    type="text"
                    className="input-field"
                    style={{ paddingLeft: '38px' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Harsh Agnihotri"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                  <input
                    type="email"
                    className="input-field"
                    style={{ paddingLeft: '38px' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                {loading ? 'Sending Code...' : 'Send Login OTP Code'} <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>6-Digit Verification Code</label>
                <div style={{ position: 'relative' }}>
                  <KeyRound size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                  <input
                    type="text"
                    className="input-field"
                    style={{ paddingLeft: '38px', letterSpacing: '0.2em', fontSize: '1.1rem', fontWeight: 800 }}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    placeholder="123456"
                    required
                    maxLength={6}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading || otp.length < 6} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                {loading ? 'Verifying...' : 'Verify Code & Sign In'} <ArrowRight size={16} />
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => { setStep('email'); setOtp(''); setError(''); setInfoMsg(''); }}
                  style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  ← Change email address
                </button>

                {canResend ? (
                  <button
                    type="button"
                    onClick={() => handleSendOTP()}
                    disabled={loading}
                    style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <RotateCcw size={14} /> Resend OTP
                  </button>
                ) : (
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                    Resend code in <strong style={{ color: '#2563eb' }}>{timer}s</strong>
                  </span>
                )}
              </div>
            </form>
          )
        ) : (
          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {!isLogin && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                  <input
                    type="text"
                    className="input-field"
                    style={{ paddingLeft: '38px' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Harsh Agnihotri"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                <input
                  type="email"
                  className="input-field"
                  style={{ paddingLeft: '38px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                <input
                  type="password"
                  className="input-field"
                  style={{ paddingLeft: '38px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Free Account')} <ArrowRight size={16} />
            </button>
          </form>
        )}

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.825rem', color: '#64748b' }}>
          <button
            type="button"
            onClick={() => {
              setAuthMode(authMode === 'otp' ? 'password' : 'otp');
              setError('');
              setInfoMsg('');
            }}
            style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer' }}
          >
            {authMode === 'otp' ? '🔐 Prefer Password Login?' : '✉️ Prefer Email OTP Login?'}
          </button>
        </div>
      </div>
    </div>
  );
};
