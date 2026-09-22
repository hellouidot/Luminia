import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromptArchitect from './components/PromptArchitect';
import ViralCopyGenerator from './components/ViralCopyGenerator';
import RevenueCalculator from './components/RevenueCalculator';
import ProposalGenerator from './components/ProposalGenerator';
import AdRoasCalculator from './components/AdRoasCalculator';
import ThumbnailStudio from './components/ThumbnailStudio';
import AiDirectory from './components/AiDirectory';
import PricingModal from './components/PricingModal';
import LeadMagnetModal from './components/LeadMagnetModal';
import SocialProofToast from './components/SocialProofToast';
import Footer from './components/Footer';
import { soundFx } from './utils/soundUtils';

export default function App() {
  const [activeTab, setActiveTab] = useState('architect');
  const [credits, setCredits] = useState(5);
  const [userTier, setUserTier] = useState('FREE');
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);

  // Credit deduction logic
  const deductCredit = () => {
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

  const handleUpgradeSuccess = (planId) => {
    soundFx.playCoin();
    setUserTier(planId === 'agency' ? 'AGENCY' : 'PRO');
    setIsPricingOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background Animated Glow Mesh */}
      <div className="bg-mesh" />

      {/* Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        credits={credits}
        userTier={userTier}
        onOpenUpgrade={() => setIsPricingOpen(true)}
        onOpenLeadMagnet={() => setIsLeadMagnetOpen(true)}
      />

      {/* Main Hero Banner */}
      <Hero
        onOpenUpgrade={() => setIsPricingOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* Dynamic Tab Content Area */}
      <main className="container" style={{ flex: 1, paddingBottom: '40px' }}>
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
      </main>

      {/* Real-time Social Proof Toast Ticker */}
      <SocialProofToast onOpenUpgrade={() => setIsPricingOpen(true)} />

      {/* Lead Magnet Vault Modal */}
      <LeadMagnetModal
        isOpen={isLeadMagnetOpen}
        onClose={() => setIsLeadMagnetOpen(false)}
        onGrantBonusCredits={addCredits}
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
