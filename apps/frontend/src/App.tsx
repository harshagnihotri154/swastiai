import { useState, useEffect } from 'react';
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
  const [viewMode, setViewMode] = useState<'home' | 'dashboard'>('home');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('swastiai_token');
    if (token) {
      // Check stored user profile
      fetch('http://localhost:5001/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setViewMode('dashboard'); // Post-login/signup flow: automatically land on Dashboard!
  };

  const handleLogout = () => {
    localStorage.removeItem('swastiai_token');
    setUser(null);
    setViewMode('home'); // Sign out flow: return to Public Home screen
  };

  return (
    <>
      {viewMode === 'home' ? (
        <LandingPage
          onOpenAuth={() => setIsAuthOpen(true)}
          onGoToDashboard={() => setViewMode('dashboard')}
          isLoggedIn={!!user}
        />
      ) : (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
          {/* Sidebar Navigation */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content Area */}
          <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navbar */}
            <Navbar user={user} onOpenAuth={() => setIsAuthOpen(true)} onLogout={handleLogout} />

            {/* Dynamic Screen View */}
            <main style={{ marginTop: '70px', padding: '32px', flex: 1 }}>
              {activeTab === 'overview' && (
                <DashboardOverview
                  onNavigateToKnowledge={() => setActiveTab('knowledge')}
                  onNavigateToConfig={() => setActiveTab('agent')}
                />
              )}

              {activeTab === 'inbox' && <LiveInboxView />}

              {activeTab === 'analytics' && <AnalyticsView />}

              {activeTab === 'guide' && (
                <HowToUseView
                  onNavigateToConfig={() => setActiveTab('agent')}
                  onNavigateToKnowledge={() => setActiveTab('knowledge')}
                  onNavigateToKeys={() => setActiveTab('keys')}
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
