import React from 'react';
import { LayoutDashboard, Bot, Key, History, HelpCircle, BarChart3, MessageSquare } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: '📊 Dashboard Overview', icon: LayoutDashboard },
    { id: 'agent', label: '🤖 Agent Configurator', icon: Bot },
    { id: 'keys', label: '🔑 Credentials Manager', icon: Key },
    { id: 'inbox', label: '💬 Live Inbox & Handover', icon: MessageSquare },
    { id: 'analytics', label: '📈 AI Analytics & ROI', icon: BarChart3 },
    { id: 'guide', label: '❓ How to Use Guide', icon: HelpCircle },
    { id: 'logs', label: '📜 Live Message Logs', icon: History },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 50,
      boxShadow: '2px 0 12px rgba(0,0,0,0.03)'
    }}>
      {/* Brand Header */}
      <div style={{ padding: '0 12px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
        }}>
          <Bot size={22} color="#ffffff" />
        </div>
        <div>
          <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', display: 'block', lineHeight: 1 }}>SWASTIAI</span>
          <span style={{ fontSize: '0.65rem', color: '#2563eb', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>WhatsApp Agent</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: isActive ? '#2563eb' : 'transparent',
                color: isActive ? '#ffffff' : '#475569',
                fontSize: '0.875rem',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
            >
              <Icon size={18} color={isActive ? '#ffffff' : '#64748b'} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Status Badge */}
      <div style={{
        padding: '12px 14px',
        borderRadius: '12px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: '#059669'
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669', boxShadow: '0 0 8px #059669' }} />
        Groq Engine v1.0 Active
      </div>
    </aside>
  );
};
