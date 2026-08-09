import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Zap, ShieldCheck, Building2 } from 'lucide-react';

interface PricingPageProps {
  onOpenAuth: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenAuth }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto', color: '#0f172a' }}>
      {/* Title Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
        <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Transparent Commercial Pricing</span>
        <h1 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#0f172a', marginTop: '8px', letterSpacing: '-0.04em' }}>
          Predictable Pricing for Growing Businesses
        </h1>
        <p style={{ color: '#475569', fontSize: '1.15rem', marginTop: '14px', lineHeight: 1.6 }}>
          Choose the right plan to automate your WhatsApp customer service, sales lead generation, and appointment booking.
        </p>

        {/* Monthly vs Yearly Toggle */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '6px 14px', borderRadius: '30px', border: '1px solid #cbd5e1', marginTop: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: 'none',
              background: billingCycle === 'monthly' ? '#2563eb' : 'transparent',
              color: billingCycle === 'monthly' ? '#ffffff' : '#64748b',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Monthly Billing
          </button>

          <button
            onClick={() => setBillingCycle('yearly')}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: 'none',
              background: billingCycle === 'yearly' ? 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)' : 'transparent',
              color: billingCycle === 'yearly' ? '#ffffff' : '#64748b',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Yearly (Save 20%) <Sparkles size={14} />
          </button>
        </div>
      </div>

      {/* Pricing Cards 3-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '80px' }}>
        {/* Starter Plan */}
        <div className="glass-panel" style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', display: 'inline-flex', marginBottom: '16px', width: 'fit-content' }}>
            <Zap size={22} color="#2563eb" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>Starter Plan</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>For small businesses & local stores</p>

          <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '24px 0 16px' }}>
            {billingCycle === 'yearly' ? '₹399' : '₹499'} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>/ month</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#334155' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Up to 2,000 AI Messages / Month</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Groq Llama 3.3 70B (0.12s Speed)</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Custom Business System Prompts</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Multi-Turn Conversation Memory</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> PDF Document & FAQ Uploads</li>
          </ul>

          <button onClick={onOpenAuth} className="btn-secondary" style={{ marginTop: 'auto', justifyContent: 'center', padding: '12px' }}>
            Start Starter Plan
          </button>
        </div>

        {/* Pro Business Plan */}
        <div className="glass-panel" style={{ padding: '36px', display: 'flex', flexDirection: 'column', border: '2px solid #2563eb', background: '#ffffff', boxShadow: '0 12px 40px rgba(37, 99, 235, 0.15)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-14px', right: '28px', background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '4px 14px', borderRadius: '12px', textTransform: 'uppercase' }}>MOST POPULAR</div>

          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'inline-flex', marginBottom: '16px', width: 'fit-content' }}>
            <ShieldCheck size={22} color="#7c3aed" />
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>Pro Business Plan</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>For growing clinics, courier services & companies</p>

          <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '24px 0 16px' }}>
            {billingCycle === 'yearly' ? '₹1,199' : '₹1,499'} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>/ month</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#334155' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Unlimited WhatsApp AI Messages</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Meta WhatsApp API + Interakt Router</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Unlimited Document PDF Indexing</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Custom Business MCP API Tools</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Priority 24/7 Technical Support</li>
          </ul>

          <button onClick={onOpenAuth} className="btn-primary" style={{ marginTop: 'auto', justifyContent: 'center', padding: '12px' }}>
            Get Pro Business Plan <ArrowRight size={16} />
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="glass-panel" style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(219, 39, 119, 0.1)', display: 'inline-flex', marginBottom: '16px', width: 'fit-content' }}>
            <Building2 size={22} color="#db2777" />
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>Enterprise Plan</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>For large enterprises & high volume systems</p>

          <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '24px 0 16px' }}>
            {billingCycle === 'yearly' ? '₹3,999' : '₹4,999'} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>/ month</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#334155' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Everything in Pro Business Plan</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Custom Fine-Tuned LLM Models</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Dedicated Account Manager</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> 99.99% Guaranteed SLA Uptime</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#059669" /> Custom ERP / CRM Webhook Building</li>
          </ul>

          <button onClick={onOpenAuth} className="btn-secondary" style={{ marginTop: 'auto', justifyContent: 'center', padding: '12px' }}>
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </div>
  );
};
