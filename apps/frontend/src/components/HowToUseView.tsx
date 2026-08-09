import React from 'react';
import { BookOpen, ArrowRight, CheckCircle2, Upload } from 'lucide-react';

interface HowToUseViewProps {
  onNavigateToConfig?: () => void;
  onNavigateToKnowledge?: () => void;
  onNavigateToKeys?: () => void;
}

export const HowToUseView: React.FC<HowToUseViewProps> = ({
  onNavigateToConfig,
  onNavigateToKnowledge,
  onNavigateToKeys
}) => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', color: '#0f172a', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', fontWeight: 800, fontSize: '0.85rem', marginBottom: '16px' }}>
          <BookOpen size={16} /> Complete Setup & User Guide
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>
          How Swastiai WhatsApp AI Works
        </h1>
        <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '12px', maxWidth: '750px', margin: '12px auto 0', lineHeight: 1.6 }}>
          Follow this 5-step visual guide to configure your AI agent persona, train it on business PDFs, and connect your WhatsApp account.
        </p>
      </div>

      {/* Step 1: Configure Agent Persona */}
      <div className="glass-panel" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)', color: '#fff', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            1
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Configure Your AI Agent Persona</h2>
            <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 700 }}>Dashboard → AI Agent Config</span>
          </div>
        </div>

        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
          Set your Agent Name (e.g. <i>Logistics Assistant</i>), select your AI Model (<b>Groq Llama 3.3 70B</b> for 0.12s speed), and write your business system instructions.
        </p>

        {/* Visual Diagram Box */}
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 800, marginBottom: '6px' }}>PROMPT STUDIO EXAMPLE (e.g. Courier & Logistics)</div>
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '14px', borderRadius: '10px', fontSize: '0.85rem', color: '#1e293b', fontFamily: 'monospace', lineHeight: 1.5 }}>
              "You are the official 24/7 AI Assistant for Express Courier Logistics. Help customers calculate shipping rates, track courier orders, and explain delivery timelines..."
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} /> 1-Click Prompt Generator Available</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} /> Instant Groq Llama 3.3 70B Engine</div>
          </div>
        </div>

        {onNavigateToConfig && (
          <button onClick={onNavigateToConfig} className="btn-primary" style={{ width: 'fit-content', marginTop: '6px' }}>
            Go to AI Agent Config <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Step 2: Upload Documents (RAG Knowledge Base) */}
      <div className="glass-panel" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)', color: '#fff', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            2
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Upload Business PDF Documents & FAQs (RAG)</h2>
            <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700 }}>Dashboard → Knowledge & MCP → Knowledge Base</span>
          </div>
        </div>

        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
          Train your WhatsApp AI on exact business facts, return policies, price cards, or FAQs by uploading PDF, TXT, CSV, or DOC files.
        </p>

        {/* Visual Diagram Box */}
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ border: '2px dashed #7c3aed', padding: '20px', borderRadius: '12px', textAlign: 'center', background: 'rgba(124, 58, 237, 0.05)' }}>
            <Upload size={28} color="#7c3aed" style={{ margin: '0 auto 8px', display: 'block' }} />
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>Upload .pdf, .txt, .csv, .doc files</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>e.g. Business_Shipping_Rates_2026.pdf</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563eb' }}>How RAG Knowledge Search Works:</div>
            <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
              1. Customer messages: "What is rate to ship 2kg?"<br />
              2. Swastiai finds "Domestic Rate: ₹50/kg" in uploaded PDF.<br />
              3. AI replies: "Shipping cost for 2kg is ₹100!"
            </div>
          </div>
        </div>

        {onNavigateToKnowledge && (
          <button onClick={onNavigateToKnowledge} className="btn-primary" style={{ width: 'fit-content', marginTop: '6px' }}>
            Go to Knowledge & MCP <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Step 3: Connect WhatsApp Provider */}
      <div className="glass-panel" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: '#fff', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            3
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Connect Meta WhatsApp Cloud API or Interakt</h2>
            <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700 }}>Dashboard → API Keys & Webhooks</span>
          </div>
        </div>

        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
          Select your preferred WhatsApp delivery engine with 1-click:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '1rem', marginBottom: '6px' }}>Meta WhatsApp Cloud API</div>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
              Direct connection via Meta Graph API token and Phone Number ID.
            </p>
          </div>

          <div style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 800, color: '#7c3aed', fontSize: '1rem', marginBottom: '6px' }}>Interakt WhatsApp API</div>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
              Popular Indian WhatsApp Business Provider. Paste Secret API key to send without sandbox restriction!
            </p>
          </div>
        </div>

        {onNavigateToKeys && (
          <button onClick={onNavigateToKeys} className="btn-primary" style={{ width: 'fit-content', marginTop: '6px' }}>
            Go to API Keys & Webhooks <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Step 4: Custom Business MCP APIs */}
      <div className="glass-panel" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', color: '#fff', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            4
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Connect Custom Business MCP APIs & Webhooks</h2>
            <span style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 700 }}>Dashboard → Knowledge & MCP → Custom MCP Tools</span>
          </div>
        </div>

        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
          Model Context Protocol (MCP) enables your WhatsApp AI Agent to trigger live external business APIs (Order Tracking, Calendar Slot Booking, Inventory Lookup).
        </p>

        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.85rem', color: '#b45309' }}>
          Tool Name: order_tracking_api<br />
          Endpoint URL: https://api.yourcompany.com/v1/orders/{'{'}orderId{'}'}
        </div>
      </div>
    </div>
  );
};
