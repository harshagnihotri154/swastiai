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
import { OnboardingWizardModal } from './components/OnboardingWizardModal';

export function App() {
  // Initialize viewMode and activeTab from localStorage to persist across browser refresh
  const [viewMode, setViewMode] = useState<'home' | 'dashboard'>(() => {
    const savedMode = localStorage.getItem('swastiai_view_mode');
    if (savedMode === 'dashboard' || savedMode === 'home') {
      return savedMode;
    }
    const token = localStorage.getItem('swastiai_token');
    return token ? 'dashboard' : 'home';
  });

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('swastiai_active_tab') || 'overview';
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Sync state changes to localStorage
  const changeViewMode = (mode: 'home' | 'dashboard') => {
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
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    changeViewMode('dashboard');
    setIsWizardOpen(true); // Automatically trigger 60-Second Setup Wizard post signup!
  };

  const handleLogout = () => {
    localStorage.removeItem('swastiai_token');
    localStorage.removeItem('swastiai_view_mode');
    localStorage.removeItem('swastiai_active_tab');
    setUser(null);
    changeViewMode('home');
  };

  const handleWizardComplete = (wizardData: any) => {
    setIsWizardOpen(false);
    changeActiveTab('overview');
    alert(`🎉 Setup Complete! Your WhatsApp AI Employee '${wizardData.agentName || "Harsh Agnihotri"}' is live!`);
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
                  onLaunchWizard={() => setIsWizardOpen(true)}
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

      {/* Onboarding 3-Step Setup Wizard Modal */}
      <OnboardingWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onComplete={handleWizardComplete}
      />
    </>
  );
}

export default App;
