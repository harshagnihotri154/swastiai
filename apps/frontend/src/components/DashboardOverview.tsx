import React, { useState, useEffect } from 'react';
import { Bot, Zap, CheckCircle2, MessageSquare, Cpu, ArrowUpRight, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface DashboardOverviewProps {
  onNavigateToConfig: () => void;
  onNavigateToKnowledge: () => void;
  onLaunchWizard?: () => void;
  user?: any;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigateToConfig,
  onNavigateToKnowledge,
  onLaunchWizard
}) => {
  const [statsData, setStatsData] = useState({
    totalMessages: 0,
    avgLatency: '0 ms',
    successRate: '100%',
    activeModel: 'Llama 3.3 70B'
  });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/dashboard/stats`);
      const data = await res.json();
      if (data.success && data.data) {
        setStatsData({
          totalMessages: data.data.totalMessages || 0,
          avgLatency: data.data.avgLatency || '0 ms',
          successRate: data.data.successRate || '100%',
          activeModel: data.data.activeModel || 'Llama 3.3 70B'
        });
        if (data.data.recentLogs) {
          setRecentLogs(data.data.recentLogs);
        }
      }
    } catch (err) {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    const interval = setInterval(fetchDashboardStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: 'Total Messages Handled', value: statsData.totalMessages.toLocaleString(), change: 'Live WhatsApp Count', icon: MessageSquare, color: '#2563eb' },
    { title: 'Avg AI Latency', value: statsData.avgLatency, change: 'Ultra-fast (Groq)', icon: Zap, color: '#7c3aed' },
    { title: 'Delivery Success Rate', value: statsData.successRate, change: 'Meta WhatsApp API', icon: CheckCircle2, color: '#059669' },
    { title: 'Active AI Models', value: statsData.activeModel, change: 'Gemini + Groq Llama 3.3', icon: Cpu, color: '#db2777' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#0f172a' }}>
      {/* 60-Second Setup Wizard Action Card */}
      {onLaunchWizard && (
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0284c7 100%)',
          borderRadius: '20px',
          padding: '24px 32px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.25)',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '16px', background: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>
              <Sparkles size={14} color="#fde047" /> EASY ONBOARDING
            </div>
            <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900 }}>Need to setup a new WhatsApp AI Agent fast?</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#bfdbfe', fontWeight: 500 }}>
              Use our interactive 3-Step Setup Wizard to configure bot persona, industry FAQs, and WhatsApp keys in 60 seconds!
            </p>
          </div>

          <button
            onClick={onLaunchWizard}
            style={{
              padding: '14px 28px',
              borderRadius: '30px',
              border: 'none',
              background: '#ffffff',
              color: '#2563eb',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            ⚡ Launch Setup Wizard
          </button>
        </div>
      )}

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

      {/* Quick Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-card" style={{ padding: '20px', border: '1px solid #cbd5e1', background: '#ffffff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>{stat.title}</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                  <Icon size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: stat.color, fontWeight: 700 }}>{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Recent WhatsApp Live Logs Table */}
      <div className="glass-card" style={{ padding: '24px', border: '1px solid #cbd5e1', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Live WhatsApp Inquiries Log</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0' }}>Real-time automated responses delivered to WhatsApp contacts</p>
          </div>
          <button onClick={onNavigateToConfig} style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
            View Full Logs <ArrowUpRight size={16} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #cbd5e1', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Sender Phone</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Customer Message</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>AI Generated Response</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Latency</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.length > 0 ? (
                recentLogs.map((log, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, fontFamily: 'monospace' }}>{log.from}</td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>{log.prompt}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 500, maxWidth: '300px' }}>{log.reply}</td>
                    <td style={{ padding: '14px 16px', color: '#7c3aed', fontWeight: 700 }}>{log.latency}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: '#059669', padding: '4px 10px', borderRadius: '12px', fontWeight: 700, fontSize: '0.75rem' }}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                    {loading ? 'Loading live logs...' : 'No WhatsApp messages recorded yet. Connect WhatsApp and send a message to start receiving real live logs!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
