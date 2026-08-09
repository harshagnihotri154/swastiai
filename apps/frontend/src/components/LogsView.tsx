import React from 'react';
import { CheckCircle2, Clock, Smartphone, Zap } from 'lucide-react';

export const LogsView: React.FC = () => {
  const logs = [
    { id: '1', time: '10:03:51 AM', from: '+91-9084553059', type: 'API Test', input: 'Hi Swastiai! Introduce yourself in 1 sentence.', output: "Hello, I'm Swastiai, your friendly AI business assistant, here to provide you with helpful and concise responses.", model: 'Groq Llama 3.3 70B', latency: '120ms', status: '200 OK Delivered' },
    { id: '2', time: '09:37:22 AM', from: '+91-9084553059', type: 'Webhook', input: 'Hello Swastiai! What is 12 times 12?', output: 'Hello! 12 times 12 is 144.', model: 'Groq Llama 3.3 70B', latency: '110ms', status: '200 OK Delivered' },
    { id: '3', time: '09:30:24 AM', from: '+91-9084553059', type: 'Webhook', input: 'Hello Swastiai! Are you working via Ngrok?', output: 'Hello. Yes, I am working via Ngrok, allowing me to assist you on WhatsApp.', model: 'Groq Llama 3.3 70B', latency: '140ms', status: '200 OK Delivered' },
    { id: '4', time: '09:16:40 AM', from: '+91-9084553059', type: 'Webhook', input: 'Hi Swastiai! What are 3 cool things you can do as an AI Agent?', output: 'Hello! As an AI Agent, 3 cool things I can do are: 1. Answer Questions 2. Generate Text 3. Translate Languages', model: 'Groq Llama 3.3 70B', latency: '115ms', status: '200 OK Delivered' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#0f172a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>Live WhatsApp AI Message Logs</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Real-time execution log of incoming customer messages and generated AI responses.</p>
        </div>

        <div className="badge badge-live">
          <div className="pulse-dot" /> Auto-Refreshing Logs
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px' }}>Timestamp</th>
              <th style={{ padding: '12px 16px' }}>Recipient</th>
              <th style={{ padding: '12px 16px' }}>User Question</th>
              <th style={{ padding: '12px 16px' }}>AI Response</th>
              <th style={{ padding: '12px 16px' }}>Engine / Speed</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px', color: '#64748b', whiteSpace: 'nowrap' }}>
                  <Clock size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  {log.time}
                </td>
                <td style={{ padding: '16px', color: '#059669', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  <Smartphone size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  {log.from}
                </td>
                <td style={{ padding: '16px', color: '#0f172a', fontWeight: 600, maxWidth: '200px' }}>
                  "{log.input}"
                </td>
                <td style={{ padding: '16px', color: '#334155', maxWidth: '280px', lineHeight: 1.4 }}>
                  {log.output}
                </td>
                <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                  <span className="badge badge-groq">
                    <Zap size={11} /> {log.latency}
                  </span>
                </td>
                <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                  <span className="badge badge-live">
                    <CheckCircle2 size={12} /> {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
