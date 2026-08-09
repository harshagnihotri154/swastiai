import React, { useState } from 'react';
import { BarChart3, TrendingUp, Zap, CheckCircle2, Download, MessageSquare } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const stats = [
    { title: 'Total Conversations', value: '4,892', change: '+18.4% vs last week', icon: MessageSquare, color: '#2563eb' },
    { title: 'AI Resolution Rate', value: '94.2%', change: '+3.1% automated', icon: CheckCircle2, color: '#059669' },
    { title: 'Avg Groq Latency', value: '118 ms', change: 'Sub-second turns', icon: Zap, color: '#7c3aed' },
    { title: 'Lead Conversion Rate', value: '38.6%', change: 'High converting', icon: TrendingUp, color: '#db2777' },
  ];

  const dailyData = [
    { day: 'Mon', count: 420, aiHandled: 395 },
    { day: 'Tue', count: 580, aiHandled: 540 },
    { day: 'Wed', count: 720, aiHandled: 685 },
    { day: 'Thu', count: 650, aiHandled: 610 },
    { day: 'Fri', count: 890, aiHandled: 840 },
    { day: 'Sat', count: 940, aiHandled: 895 },
    { day: 'Sun', count: 692, aiHandled: 652 }
  ];

  const topQuestions = [
    { question: 'What is shipping delivery time for my order?', count: 1240, category: 'Order Tracking' },
    { question: 'Are clinic consultation slots open tomorrow?', count: 890, category: 'Appointments' },
    { question: 'What is the price for Pro Business subscription?', count: 650, category: 'Pricing' },
    { question: 'How do I upload custom PDF knowledge base?', count: 420, category: 'Setup' },
    { question: 'What is the refund and cancellation policy?', count: 310, category: 'Policy' },
  ];

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Day,Total Conversations,AI Handled\n"
      + dailyData.map(e => `${e.day},${e.count},${e.aiHandled}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Swastiai_Analytics_Report_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const maxCount = Math.max(...dailyData.map(d => d.count));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#0f172a' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>AI Analytics & Conversion Insights</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Track WhatsApp message volume, response speeds, top FAQs, and customer sentiment.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: '#ffffff', padding: '4px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: timeRange === range ? '#2563eb' : 'transparent',
                  color: timeRange === range ? '#ffffff' : '#64748b',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
              </button>
            ))}
          </div>

          <button onClick={exportCSV} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Download size={15} /> Export CSV Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
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
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{stat.value}</div>
              <div style={{ fontSize: '0.775rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={13} /> {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bar Chart & Sentiment Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Daily Conversations Bar Chart */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={20} color="#2563eb" /> Daily Conversation Volume
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#2563eb', borderRadius: '2px', marginRight: '6px' }} /> Total Messages
              <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#059669', borderRadius: '2px', margin: '0 6px 0 16px' }} /> AI Handled
            </div>
          </div>

          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '18px', paddingTop: '20px', borderBottom: '1px solid #e2e8f0' }}>
            {dailyData.map((d, idx) => {
              const heightPercent = (d.count / maxCount) * 100;
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a' }}>{d.count}</div>
                  <div style={{ width: '100%', maxWidth: '36px', height: `${heightPercent}%`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: '6px 6px 0 0', overflow: 'hidden', background: '#e2e8f0' }}>
                    <div style={{ height: `${(d.aiHandled / d.count) * 100}%`, background: 'linear-gradient(180deg, #059669 0%, #2563eb 100%)', borderRadius: '6px 6px 0 0' }} />
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Sentiment Breakdown */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Customer Sentiment</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#059669' }}>😃 Positive / Satisfied</span>
                <span>84.2%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '84.2%', height: '100%', background: '#059669' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#2563eb' }}>😐 Neutral Inquiries</span>
                <span>12.5%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '12.5%', height: '100%', background: '#2563eb' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#dc2626' }}>⚠️ Needs Human Agent</span>
                <span>3.3%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '3.3%', height: '100%', background: '#dc2626' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Customer Questions Table */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '18px' }}>
          Top Frequently Asked Customer Questions (FAQs)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {topQuestions.map((q, idx) => (
            <div key={idx} style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.9rem' }}>#{idx + 1}</div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{q.question}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ padding: '4px 10px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', fontSize: '0.75rem', fontWeight: 700 }}>
                  {q.category}
                </span>
                <span style={{ fontWeight: 800, color: '#059669', fontSize: '0.9rem' }}>{q.count} asked</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
