import React from 'react';
import { Bot, Zap, Cpu, Globe, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onOpenAuth?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenAuth }) => {
  return (
    <div className="public-page-container" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto', color: '#0f172a' }}>
      {/* Title Hero */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 64px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 20px',
          borderRadius: '30px',
          backgroundColor: 'rgba(37, 99, 235, 0.08)',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          color: '#2563eb',
          fontSize: '0.875rem',
          fontWeight: 800,
          marginBottom: '20px'
        }}>
          <Sparkles size={16} /> Autonomous AI Business Infrastructure
        </div>

        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.035em', lineHeight: 1.15 }}>
          Transforming Business Communication with <span style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sub-Second AI Agents</span>
        </h1>

        <p style={{ color: '#475569', fontSize: '1.15rem', marginTop: '20px', lineHeight: 1.6, fontWeight: 500 }}>
          Swastiai empowers companies, real estate agencies, healthcare clinics, and e-commerce brands to deploy intelligent 24/7 WhatsApp AI agents in under 60 seconds — with zero code and zero markup.
        </p>
      </div>

      {/* Story & Mission Grid */}
      <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '18px', letterSpacing: '-0.02em' }}>
            Why We Built Swastiai
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '18px' }}>
            Over 2.5 billion users interact on WhatsApp every day. Yet, most businesses struggle with slow response times, expensive support teams, and missed customer leads after business hours.
          </p>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
            We created <strong>Swastiai</strong> to bridge the gap between enterprise LLMs (Groq Llama 3.3 70B & Google Gemini 1.5) and direct WhatsApp messaging protocols. With our dual-engine architecture (Baileys Web Sockets & Official Meta Cloud API), businesses get 24/7 customer engagement at sub-second speeds.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
              <CheckCircle2 size={18} color="#2563eb" /> 100% BYOK (Bring Your Own Key) model for maximum privacy & zero AI markup
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
              <CheckCircle2 size={18} color="#2563eb" /> Real-time human handover controls with 1-click pause/resume
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
              <CheckCircle2 size={18} color="#2563eb" /> MongoDB Atlas persistent multi-turn memory & document RAG index
            </div>
          </div>
        </div>

        {/* Metrics Card */}
        <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '28px', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#2563eb', lineHeight: 1 }}>0.12s</div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>Sub-Second Latency</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>Powered by Groq Llama 3.3 70B LPU hardware acceleration.</div>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #e2e8f0' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#7c3aed', lineHeight: 1 }}>99.9%</div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>Enterprise Reliability</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>High-availability MongoDB Atlas multi-turn session persistence.</div>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #e2e8f0' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#059669', lineHeight: 1 }}>100%</div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>Data Privacy & Security</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>Encrypted sessions, BYOK API keys, and strict data isolation.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership & Engineering Vision */}
      <div className="glass-panel" style={{ padding: '48px', marginBottom: '80px', background: '#ffffff', border: '1px solid #cbd5e1' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 900,
            fontSize: '2rem',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)'
          }}>
            HA
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>FOUNDER & LEAD ARCHITECT</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>Harsh Agnihotri</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '8px' }}>
              "Our goal with Swastiai is simple: to make state-of-the-art AI agents accessible, private, and effortless for every business. We build systems that don't just chat, but actively drive sales and support results 24/7."
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span style={{ fontSize: '0.8rem', color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Technical Stack</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>Built on World-Class Architecture</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '28px', background: '#ffffff' }}>
            <Zap size={28} color="#2563eb" style={{ marginBottom: '14px' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Groq Llama 3.3 70B</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px', lineHeight: 1.5 }}>
              Hardware LPU inference engine enabling instant sub-120ms WhatsApp customer replies.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '28px', background: '#ffffff' }}>
            <Bot size={28} color="#7c3aed" style={{ marginBottom: '14px' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Google Gemini 1.5</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px', lineHeight: 1.5 }}>
              High context reasoning for multi-page document PDF parsing, rate cards, and product manuals.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '28px', background: '#ffffff' }}>
            <Cpu size={28} color="#059669" style={{ marginBottom: '14px' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>MongoDB Atlas RAG Memory</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px', lineHeight: 1.5 }}>
              Stores vector embeddings and multi-turn chat history for continuous context awareness.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '28px', background: '#ffffff' }}>
            <Globe size={28} color="#db2777" style={{ marginBottom: '14px' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Dual WhatsApp Engine</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px', lineHeight: 1.5 }}>
              Native integration with Baileys WhatsApp Web Sockets & Official Meta WhatsApp Cloud Graph API.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div style={{
        padding: '56px 40px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', marginBottom: '14px' }}>
          Ready to Automate Your Business WhatsApp?
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto 28px' }}>
          Deploy your first AI Agent in under 60 seconds. Free forever plan available.
        </p>
        <button
          onClick={onOpenAuth}
          style={{
            padding: '14px 36px',
            borderRadius: '12px',
            border: 'none',
            background: '#ffffff',
            color: '#1e3a8a',
            fontWeight: 900,
            fontSize: '1.05rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          Get Started Free <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
