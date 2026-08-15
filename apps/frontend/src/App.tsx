import { useState, useEffect } from 'react';
import { API_BASE_URL } from './config/api';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { AgentConfigurator } from './components/AgentConfigurator';
import { KnowledgeBaseManager } from './components/KnowledgeBaseManager';
import { CredentialsManager } from './components/CredentialsManager';
import { LogsView } from './components/LogsView';
import { HowToUseView } from './components/HowToUseView';
import { AnalyticsView } from './components/AnalyticsView';
import { LiveInboxView } from './components/LiveInboxView';
import { AuthModal } from './components/AuthModal';
export function App() {
  // Initialize viewMode and activeTab from localStorage with Auth Guard check
  const [viewMode, setViewMode] = useState<'home' | 'dashboard'>(() => {
    const token = localStorage.getItem('swastiai_token');
    if (!token) return 'home'; // Enforce authentication: default to home if not logged in
    const savedMode = localStorage.getItem('swastiai_view_mode');
    return savedMode === 'dashboard' ? 'dashboard' : 'home';
  });

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('swastiai_active_tab') || 'overview';
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Protected View Switcher: Prevents accessing dashboard without login
  const changeViewMode = (mode: 'home' | 'dashboard') => {
    const token = localStorage.getItem('swastiai_token');
    if (mode === 'dashboard' && !token && !user) {
      setIsAuthOpen(true);
      return;
    }
    setViewMode(mode);
    localStorage.setItem('swastiai_view_mode', mode);
  };

  const changeActiveTab = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('swastiai_active_tab', tab);
  };

  useEffect(() => {
    const token = localStorage.getItem('swastiai_token');
    if (token) {
      fetch(`${API_BASE_URL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            // Invalid or expired token: purge and bounce to landing page
            localStorage.removeItem('swastiai_token');
            localStorage.removeItem('swastiai_view_mode');
            setUser(null);
            setViewMode('home');
          }
        })
        .catch(() => {});
    } else {
      setViewMode('home');
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    changeViewMode('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('swastiai_token');
    localStorage.removeItem('swastiai_view_mode');
    localStorage.removeItem('swastiai_active_tab');
    setUser(null);
    changeViewMode('home');
  };

  return (
    <>
      {viewMode === 'home' ? (
        <LandingPage
          onOpenAuth={() => setIsAuthOpen(true)}
          onGoToDashboard={() => changeViewMode('dashboard')}
          isLoggedIn={!!user}
        />
      ) : (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
          {/* Sidebar Navigation */}
          <Sidebar activeTab={activeTab} setActiveTab={changeActiveTab} />

          {/* Main Content Area */}
          <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navbar */}
            <Navbar user={user} onOpenAuth={() => setIsAuthOpen(true)} onLogout={handleLogout} />

            {/* Dynamic Screen View */}
            <main style={{ marginTop: '70px', padding: '32px', flex: 1 }}>
              {activeTab === 'overview' && (
                <DashboardOverview
                  onNavigateToKnowledge={() => changeActiveTab('knowledge')}
                  onNavigateToConfig={() => changeActiveTab('agent')}
                  user={user}
                />
              )}

              {activeTab === 'inbox' && <LiveInboxView />}

              {activeTab === 'analytics' && <AnalyticsView />}

              {activeTab === 'guide' && (
                <HowToUseView
                  onNavigateToConfig={() => changeActiveTab('agent')}
                  onNavigateToKnowledge={() => changeActiveTab('knowledge')}
                  onNavigateToKeys={() => changeActiveTab('keys')}
                />
              )}

              {activeTab === 'agent' && <AgentConfigurator />}

              {activeTab === 'knowledge' && <KnowledgeBaseManager />}

              {activeTab === 'keys' && <CredentialsManager />}

              {activeTab === 'logs' && <LogsView />}
            </main>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default App;
