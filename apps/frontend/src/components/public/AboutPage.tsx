import React from 'react';
import { Bot, Zap, Cpu, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="public-page-container" style={{ padding: '80px 48px', maxWidth: '1100px', margin: '0 auto', color: '#0f172a' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
        <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>About Swastiai</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginTop: '8px', letterSpacing: '-0.03em' }}>
          Building the Future of Automated Business AI on WhatsApp
        </h1>
        <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '14px', lineHeight: 1.6 }}>
          Swastiai empowers companies, clinics, and startups to deploy enterprise-grade AI Agents without expensive infrastructure or complex coding.
        </p>
      </div>

      {/* Story & Mission Grid */}
      <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Our Mission & Vision</h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '16px' }}>
            Over 2 billion people use WhatsApp daily, making it the world's most powerful channel for business customer communication. However, traditional live support agents are slow, expensive, and limited by working hours.
          </p>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7 }}>
            We created Swastiai to combine high-speed LLMs (Groq Llama 3.3 70B, Google Gemini 1.5) with direct WhatsApp Webhooks (Meta Cloud API & Interakt) so any business can deploy a 24/7 AI Sales & Support assistant in 60 seconds.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2563eb' }}>0.12s</div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>Ultra-Fast Inference</div>
              <div style={{ fontSize: '0.825rem', color: '#64748b' }}>Powered by Groq Llama 3.3 70B LPU hardware acceleration.</div>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #e2e8f0' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#7c3aed' }}>99.9%</div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>Enterprise Uptime</div>
              <div style={{ fontSize: '0.825rem', color: '#64748b' }}>High availability MongoDB context & webhook dispatching.</div>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #e2e8f0' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#059669' }}>100%</div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>BYOK Cost Control</div>
              <div style={{ fontSize: '0.825rem', color: '#64748b' }}>Bring Your Own Key model so you pay zero markup on AI models.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Architecture Showcase */}
      <div className="glass-panel" style={{ padding: '48px', border: '1px solid #cbd5e1' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '0.8rem', color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Technical Stack</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>Engineered for Reliability & Scale</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <Zap size={24} color="#2563eb" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Groq Llama 3.3 70B</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>0.12s latency for instantaneous WhatsApp customer conversation turns.</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <Bot size={24} color="#7c3aed" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Google Gemini 1.5</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Long context windows for analyzing multi-page document PDFs and manuals.</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <Cpu size={24} color="#059669" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>MongoDB Multi-Turn Memory</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Persists past customer conversation turns for context-aware responses.</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <Globe size={24} color="#db2777" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Meta & Interakt Router</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Dual-provider routing for Graph API and Interakt REST message APIs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
