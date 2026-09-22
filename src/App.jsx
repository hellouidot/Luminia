import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromptArchitect from './components/PromptArchitect';
import ViralCopyGenerator from './components/ViralCopyGenerator';
import RevenueCalculator from './components/RevenueCalculator';
import ThumbnailStudio from './components/ThumbnailStudio';
import AiDirectory from './components/AiDirectory';
import PricingModal from './components/PricingModal';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('architect');
  const [credits, setCredits] = useState(5);
  const [userTier, setUserTier] = useState('FREE');
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Credit deduction logic
  const deductCredit = () => {
    if (userTier === 'PRO' || userTier === 'AGENCY') {
      return true;
    }
    if (credits > 0) {
      setCredits(prev => prev - 1);
      return true;
    } else {
      setIsPricingOpen(true);
      return false;
    }
  };

  const addCredits = (amount) => {
    setCredits(prev => prev + amount);
  };

  const handleUpgradeSuccess = (planId) => {
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
