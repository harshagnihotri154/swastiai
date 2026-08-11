import React from 'react';
import { ShieldCheck, Lock, Eye, Server, Key, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="public-page-container" style={{ padding: '80px 48px', maxWidth: '1050px', margin: '0 auto', color: '#0f172a' }}>
      {/* Title Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 56px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 20px',
          borderRadius: '30px',
          backgroundColor: 'rgba(5, 150, 105, 0.08)',
          border: '1px solid rgba(5, 150, 105, 0.2)',
          color: '#059669',
          fontSize: '0.875rem',
          fontWeight: 800,
          marginBottom: '20px'
        }}>
          <ShieldCheck size={16} /> Enterprise Privacy & Security Standard
        </div>

        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 3.4rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
          Privacy Policy & Data Security
        </h1>

        <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '16px', lineHeight: 1.6 }}>
          Last Updated: August 11, 2026 • Effective Immediately
        </p>
      </div>

      {/* Security Highlights Banner */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '56px', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #cbd5e1' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
              <Lock size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>AES-256 Encryption</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Data encrypted at rest & in transit</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
              <Key size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>BYOK Security</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Zero third-party key selling</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
              <Server size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>MongoDB Atlas Cluster</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Isolated database tenancy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Articles Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', lineHeight: 1.7, fontSize: '0.975rem', color: '#334155' }}>
        {/* Section 1 */}
        <section className="glass-panel" style={{ padding: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Eye size={20} color="#2563eb" /> 1. Overview & Commitment to Privacy
          </h2>
          <p style={{ marginBottom: '12px' }}>
            Swastiai ("we", "our", or "platform") respects your business privacy and is committed to protecting your personal data, customer chat histories, and artificial intelligence credentials.
          </p>
          <p>
            This Privacy Policy explains how we collect, process, and safeguard information when you use the Swastiai web application, WhatsApp integration services, vector Knowledge Base tools, and API integrations.
          </p>
        </section>

        {/* Section 2 */}
        <section className="glass-panel" style={{ padding: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} color="#7c3aed" /> 2. Information We Collect
          </h2>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <strong>Account & Profile Information:</strong> Email address, business name, and password hashes (encrypted using bcrypt salt rounds).
            </li>
            <li>
              <strong>WhatsApp Integration Data:</strong> Phone numbers, WhatsApp Web session keys (Baileys credentials), and Meta Cloud API Access Tokens.
            </li>
            <li>
              <strong>Knowledge Base Documents:</strong> PDFs, CSVs, markdown, and text files uploaded to train your AI Agent. These files are processed into vector embeddings solely for your account.
            </li>
            <li>
              <strong>Customer Chat History:</strong> Customer queries and AI Agent replies stored in MongoDB Atlas to enable multi-turn memory and Live Inbox human takeover features.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="glass-panel" style={{ padding: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key size={20} color="#059669" /> 3. Bring Your Own Key (BYOK) Guarantee
          </h2>
          <p style={{ marginBottom: '12px' }}>
            Swastiai operates on a strict <strong>Bring Your Own Key (BYOK)</strong> model for Groq, Google Gemini, and OpenRouter model integrations:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a' }}>
              <CheckCircle2 size={16} color="#059669" /> Your API keys are encrypted before storage and used exclusively to service your account.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a' }}>
              <CheckCircle2 size={16} color="#059669" /> We NEVER sell, share, or train global models on your private API keys or document data.
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="glass-panel" style={{ padding: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server size={20} color="#db2777" /> 4. Data Security & Storage
          </h2>
          <p style={{ marginBottom: '12px' }}>
            We implement industry-standard technical and organizational security measures:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>All HTTP network traffic is secured using TLS 1.3 protocol.</li>
            <li>MongoDB Atlas database collections are protected by IP whitelisting and role-based access control (RBAC).</li>
            <li>WhatsApp webhooks are verified using Meta signature validation.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="glass-panel" style={{ padding: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} color="#2563eb" /> 5. Data Control & Deletion Rights
          </h2>
          <p style={{ marginBottom: '12px' }}>
            You maintain 100% ownership of your data. You may at any time:
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Disconnect your WhatsApp Web session or Meta API token from Credentials Manager.</li>
            <li>Delete knowledge base document embeddings from the Knowledge Base manager.</li>
            <li>Request full account and chat history purge by emailing <strong>harshagnihotri154@gmail.com</strong>.</li>
          </ul>
        </section>

        {/* Contact Info Footer */}
        <div style={{ textAlign: 'center', padding: '32px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>Questions About Privacy or Security?</h4>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px' }}>
            Contact our Data Protection Officer directly at <strong>harshagnihotri154@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
