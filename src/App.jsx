import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValuePropShowcase from './components/ValuePropShowcase';
import PromptArchitect from './components/PromptArchitect';
import ViralCopyGenerator from './components/ViralCopyGenerator';
import RevenueCalculator from './components/RevenueCalculator';
import ProposalGenerator from './components/ProposalGenerator';
import AdRoasCalculator from './components/AdRoasCalculator';
import ThumbnailStudio from './components/ThumbnailStudio';
import AiDirectory from './components/AiDirectory';
import PricingModal from './components/PricingModal';
import LeadMagnetModal from './components/LeadMagnetModal';
import ApiKeyModal from './components/ApiKeyModal';
import MyVaultModal from './components/MyVaultModal';
import AuthModal from './components/AuthModal';
import SocialProofToast from './components/SocialProofToast';
import Footer from './components/Footer';
import { authService, supabase } from './lib/supabaseClient';
import { soundFx } from './utils/soundUtils';
import { Lock, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('architect');
  const [credits, setCredits] = useState(5);
  const [userTier, setUserTier] = useState('FREE');
  const [userSession, setUserSession] = useState(null);

  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRedirectReason, setAuthRedirectReason] = useState('');

  // Check Supabase Auth session on load
  useEffect(() => {
    authService.getSession().then(session => {
      if (session?.user) {
        setUserSession(session.user);
      }
    });

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUserSession(session?.user || null);
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  // Helper to change tab & smoothly scroll down to tool workspace
  const handleSelectTab = (tabId, requireAuth = false) => {
    soundFx.playClick();
    setActiveTab(tabId);

    // If unauthenticated and clicking launch, trigger sign in modal
    if (requireAuth && !userSession) {
      setAuthRedirectReason('Create a free account or sign in to access this Lumina tool.');
      setIsAuthOpen(true);
    }

    // Smooth scroll down to workspace element
    setTimeout(() => {
      const workspaceEl = document.getElementById('tool-workspace');
      if (workspaceEl) {
        workspaceEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Credit deduction & URL Gatekeeper protection
  const deductCredit = () => {
    if (!userSession && credits <= 1) {
      setAuthRedirectReason('Create a free account to save your generated outputs and keep using Lumina AI.');
      setIsAuthOpen(true);
      return false;
    }

    if (userTier === 'PRO' || userTier === 'AGENCY') {
      soundFx.playSuccess();
      return true;
    }
    if (credits > 0) {
      setCredits(prev => prev - 1);
      soundFx.playSuccess();
      return true;
    } else {
      setIsPricingOpen(true);
      return false;
    }
  };

  const addCredits = (amount) => {
    setCredits(prev => prev + amount);
    soundFx.playCoin();
  };

  const handleSignOut = async () => {
    soundFx.playClick();
    await authService.signOut();
    setUserSession(null);
  };

  const handleUpgradeSuccess = (planId) => {
    soundFx.playCoin();
    setUserTier(planId === 'agency' ? 'AGENCY' : 'PRO');
    setIsPricingOpen(false);
  };

  // Tools that require authentication when guest preview credits run out
  const requiresAuthLock = !userSession && (activeTab === 'calculator' || activeTab === 'proposal' || activeTab === 'roas' || activeTab === 'studio') && credits <= 1;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Linear Architectural Background Grid */}
      <div className="bg-mesh" />

      {/* Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(id) => handleSelectTab(id, false)}
        credits={credits}
        userTier={userTier}
        userSession={userSession}
        onOpenUpgrade={() => setIsPricingOpen(true)}
        onOpenLeadMagnet={() => setIsLeadMagnetOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenAuth={(reason) => { setAuthRedirectReason(reason); setIsAuthOpen(true); }}
        onSignOut={handleSignOut}
      />

      {/* Main Hero Banner */}
      <Hero
        onOpenUpgrade={() => setIsPricingOpen(true)}
        setActiveTab={(id) => handleSelectTab(id, true)}
      />

      {/* Main Content Area */}
      <main className="container" style={{ flex: 1, paddingBottom: '40px' }}>
        {/* Core Value Proposition Showcase */}
        <ValuePropShowcase
          setActiveTab={(id) => handleSelectTab(id, true)}
          onOpenUpgrade={() => setIsPricingOpen(true)}
        />

        {/* Scroll Anchor Target */}
        <div id="tool-workspace" style={{ scrollMarginTop: '90px' }}>
          {requiresAuthLock ? (
            /* Protected Lockout Wall Component */
            <div className="glass-card" style={{ padding: '48px 24px', textAlign: 'center', border: '1px solid var(--border-glow)' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--gradient-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                boxShadow: 'var(--shadow-gold-glow)'
              }}>
                <Lock size={30} color="#08090e" />
              </div>

              <div className="badge badge-gold" style={{ marginBottom: '10px' }}>
                <ShieldCheck size={14} /> PROTECTED TOOL SUITE
              </div>

              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '8px' }}>
                Create a Free Account to Unlock Tool
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 24px auto' }}>
                You have reached your guest preview limit. Sign up for a free Lumina account to unlock full access, save projects to your private vault, and claim 5 bonus credits!
              </p>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setAuthRedirectReason('Create a free account to unlock full access to Lumina tools.');
                  setIsAuthOpen(true);
                }}
                className="btn-gold"
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                Sign In / Create Free Account <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <>
              {activeTab === 'architect' && (
                <PromptArchitect
                  deductCredit={deductCredit}
                  onOpenUpgrade={() => setIsPricingOpen(true)}
                />
              )}

              {activeTab === 'copy' && (
                <ViralCopyGenerator
                  deductCredit={deductCredit}
                />
              )}

              {activeTab === 'calculator' && (
                <RevenueCalculator
                  onOpenUpgrade={() => setIsPricingOpen(true)}
                />
              )}

              {activeTab === 'proposal' && (
                <ProposalGenerator
                  deductCredit={deductCredit}
                />
              )}

              {activeTab === 'roas' && (
                <AdRoasCalculator
                  onOpenUpgrade={() => setIsPricingOpen(true)}
                />
              )}

              {activeTab === 'studio' && (
                <ThumbnailStudio
                  deductCredit={deductCredit}
                />
              )}

              {activeTab === 'directory' && (
                <AiDirectory
                  onOpenUpgrade={() => setIsPricingOpen(true)}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Real-time Social Proof Toast Ticker */}
      <SocialProofToast onOpenUpgrade={() => setIsPricingOpen(true)} />

      {/* Supabase User Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(user) => setUserSession(user)}
        redirectReason={authRedirectReason}
      />

      {/* Saved Workspace Vault Modal */}
      <MyVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
      />

      {/* Lead Magnet Vault Modal */}
      <LeadMagnetModal
        isOpen={isLeadMagnetOpen}
        onClose={() => setIsLeadMagnetOpen(false)}
        onGrantBonusCredits={addCredits}
      />

      {/* Free AI API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      {/* Checkout / Upgrade Pro Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onUpgradeSuccess={handleUpgradeSuccess}
      />

      {/* Footer */}
      <Footer onAddCredits={addCredits} />
    </div>
  );
}
