import React, { useState } from 'react';
import { MessageSquare, ShoppingBag, Calendar, Cpu, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onOpenAuth: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenAuth }) => {
  const [activeIndustry, setActiveIndustry] = useState<'shipping' | 'healthcare' | 'ecommerce' | 'saas'>('shipping');

  const industryData = {
    shipping: {
      title: 'Logistics & Express Shipping',
      desc: 'Automate courier tracking, shipping rate calculations, pick-up booking, and delivery updates over WhatsApp.',
      examples: [
        'Customer: "What is shipping rate for 2kg to Mumbai?" → AI: "Standard domestic rate is ₹50/kg, total ₹100!"',
        'Customer: "Where is order ORD-101?" → AI: "Order ORD-101 is IN_TRANSIT, estimated delivery tomorrow 5 PM."'
      ]
    },
    healthcare: {
      title: 'Healthcare & Dental Clinics',
      desc: 'Allow patients to check doctor availability, book clinic slots, and receive prep instructions 24/7.',
      examples: [
        'Patient: "Are slots open for Dr. Smith tomorrow?" → AI: "Available slots tomorrow: 10:30 AM, 2:15 PM, 5:00 PM."',
        'Patient: "What is consultation fee?" → AI: "Dr. Smith consultation fee is ₹500."'
      ]
    },
    ecommerce: {
      title: 'E-Commerce & Retail Stores',
      desc: 'Qualify buyer leads, recommend products, process refund requests, and boost store conversions.',
      examples: [
        'Buyer: "Do you have blue sneakers size 9?" → AI: "Yes! Size 9 is in stock. Order now for 10% off!"',
        'Buyer: "What is your refund policy?" → AI: "100% full refund within 14 days of purchase."'
      ]
    },
    saas: {
      title: 'SaaS & Tech Companies',
      desc: 'Answer technical support FAQs, explain subscription plans, and book product demo calls automatically.',
      examples: [
        'User: "How do I connect API keys?" → AI: "Go to Dashboard → API Keys & Webhooks to paste your key!"',
        'User: "Can I upgrade my plan?" → AI: "Yes! Upgrade anytime for custom MCP API access."'
      ]
    }
  };

  return (
    <div style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto', color: '#0f172a' }}>
      {/* Title Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
        <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enterprise Services</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginTop: '8px', letterSpacing: '-0.03em' }}>
          AI Solutions Engineered for Every Industry
        </h1>
        <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '12px', lineHeight: 1.6 }}>
          Whether you run a courier service, medical clinic, e-commerce store, or SaaS, Swastiai equips your WhatsApp account with sub-second AI intelligence.
        </p>
      </div>

      {/* Services Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '32px', marginBottom: '80px' }}>
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(37, 99, 235, 0.1)', display: 'inline-flex', marginBottom: '20px' }}>
            <MessageSquare size={28} color="#2563eb" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>24/7 Automated Customer Support</h3>
          <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.6 }}>
            Eliminate human support queue bottlenecks. Resolve 90%+ of customer inquiries instantly using your uploaded business knowledge documents.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(124, 58, 237, 0.1)', display: 'inline-flex', marginBottom: '20px' }}>
            <ShoppingBag size={28} color="#7c3aed" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>AI Lead Qualification & Sales</h3>
          <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.6 }}>
            Engage prospective buyers on WhatsApp, recommend tailored products, capture phone numbers, and close sales automatically.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(5, 150, 105, 0.1)', display: 'inline-flex', marginBottom: '20px' }}>
            <Calendar size={28} color="#059669" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Smart Appointment Booking</h3>
          <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.6 }}>
            Schedule patient or client appointments directly over WhatsApp. Check open slots, confirm bookings, and reduce no-shows.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(219, 39, 119, 0.1)', display: 'inline-flex', marginBottom: '20px' }}>
            <Cpu size={28} color="#db2777" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Custom Business MCP APIs</h3>
          <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.6 }}>
            Connect your custom database or webhooks via Model Context Protocol (MCP) to query live order tracking, stock, or custom quotes.
          </p>
        </div>
      </div>

      {/* Interactive Industry Showcase */}
      <div className="glass-panel" style={{ padding: '48px', border: '1px solid #cbd5e1' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '0.8rem', color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Interactive Use Cases</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>See How Swastiai Works for Your Industry</h2>
        </div>

        {/* Industry Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
          {(['shipping', 'healthcare', 'ecommerce', 'saas'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActiveIndustry(key)}
              style={{
                padding: '10px 22px',
                borderRadius: '20px',
                border: activeIndustry === key ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: activeIndustry === key ? 'rgba(37, 99, 235, 0.1)' : '#ffffff',
                color: activeIndustry === key ? '#2563eb' : '#475569',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              {key === 'shipping' && '🚢 Logistics & Express'}
              {key === 'healthcare' && '🏥 Medical & Clinics'}
              {key === 'ecommerce' && '🛍️ E-Commerce & Retail'}
              {key === 'saas' && '💻 SaaS & Tech Support'}
            </button>
          ))}
        </div>

        {/* Selected Industry Details */}
        <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>{industryData[activeIndustry].title}</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
              {industryData[activeIndustry].desc}
            </p>
            <button onClick={onOpenAuth} className="btn-primary">
              Deploy AI Agent for {activeIndustry.toUpperCase()} <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 800 }}>LIVE WHATSAPP CHAT EXAMPLES:</div>
            {industryData[activeIndustry].examples.map((ex, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '14px', borderRadius: '10px', fontSize: '0.825rem', color: '#1e293b', fontFamily: 'monospace', lineHeight: 1.5 }}>
                {ex}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
