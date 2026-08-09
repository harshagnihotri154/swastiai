import React from 'react';
import { Bot, Zap, CheckCircle2, MessageSquare, Cpu, ArrowUpRight } from 'lucide-react';

interface DashboardOverviewProps {
  onNavigateToConfig: () => void;
  onNavigateToKnowledge: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateToConfig, onNavigateToKnowledge }) => {
  const stats = [
    { title: 'Total Messages Handled', value: '1,428', change: '+24% today', icon: MessageSquare, color: '#2563eb' },
    { title: 'Avg AI Latency', value: '120 ms', change: 'Ultra-fast (Groq)', icon: Zap, color: '#7c3aed' },
    { title: 'Delivery Success Rate', value: '99.8%', change: 'Meta WhatsApp API', icon: CheckCircle2, color: '#059669' },
    { title: 'Active AI Models', value: 'Llama 3.3 70B', change: 'Gemini + OpenAI ready', icon: Cpu, color: '#db2777' },
  ];

  const recentLogs = [
    { from: '+91-9084553059', prompt: 'Hi Swastiai! What is 12 times 12?', reply: 'Hello! 12 times 12 is 144.', latency: '0.11s', status: 'Delivered' },
    { from: '+91-9084553059', prompt: 'Tell me about Swastiai platform', reply: 'Swastiai is an automated AI business assistant for WhatsApp...', latency: '0.14s', status: 'Delivered' },
    { from: '+91-9084553059', prompt: 'Can you help with customer support?', reply: 'Yes! I can handle customer inquiries 24/7 automatically.', latency: '0.09s', status: 'Delivered' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#0f172a' }}>
      {/* Hero Welcome Banner */}
      <div className="glass-panel" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
        border: '1px solid #cbd5e1',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '20px', backgroundColor: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.25)', color: '#2563eb', fontSize: '0.8rem', fontWeight: 800, marginBottom: '14px' }}>
            <Bot size={15} /> SWASTIAI ENGINE v1.0 ONLINE
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Automated WhatsApp AI Agent Dashboard 🚀
          </h1>
          <p style={{ color: '#475569', fontSize: '1rem', marginBottom: '24px', lineHeight: 1.6 }}>
            Plug in your WhatsApp account, specify your business instructions, upload document PDFs/FAQs, and deploy your intelligent AI agent in seconds powered by Groq Llama 3.3 & Gemini AI.
          </p>

          <div style={{ display: 'flex', gap: '14px' }}>
            <button onClick={onNavigateToKnowledge} className="btn-primary">
              <Bot size={17} /> Upload Knowledge Base & Files
            </button>

            <button onClick={onNavigateToConfig} className="btn-secondary">
              Configure Agent Prompt
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{stat.title}</span>
                <div style={{ padding: '8px', borderRadius: '10px', background: `${stat.color}15` }}>
                  <Icon size={18} color={stat.color} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{stat.value}</div>
              <div style={{ fontSize: '0.775rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowUpRight size={13} /> {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Message Logs Section */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '18px' }}>Recent WhatsApp AI Interactions</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recentLogs.map((log, index) => (
            <div key={index} style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', fontWeight: 800, fontSize: '0.85rem' }}>
                  WA
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>{log.from}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>• Latency: {log.latency}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '2px' }}>
                    Customer: "{log.prompt}"
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 600, marginTop: '2px' }}>
                    AI: "{log.reply}"
                  </div>
                </div>
              </div>

              <span className="badge badge-live">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
