import React, { useState } from 'react';
import { Sparkles, Zap, Shield, Crown, Flame, FileText, Target, Gift, Menu, X, Key } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function Navbar({ activeTab, setActiveTab, credits, userTier, onOpenUpgrade, onOpenLeadMagnet, onOpenApiKeyModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'architect', label: 'Prompt Architect', icon: Sparkles },
    { id: 'copy', label: 'Viral Copy Engine', icon: Flame },
    { id: 'calculator', label: 'Revenue Simulator', icon: Zap },
    { id: 'proposal', label: 'Proposal Builder', icon: FileText },
    { id: 'roas', label: 'ROAS Simulator', icon: Target },
    { id: 'studio', label: 'Thumbnail Studio', icon: Crown },
    { id: 'directory', label: 'AI Tool Hub', icon: Shield },
  ];

  const handleTabClick = (id) => {
    soundFx.playClick();
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(8, 9, 14, 0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => handleTabClick('architect')}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--gradient-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-gold-glow)'
          }}>
            <Sparkles size={20} color="#08090e" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '800',
              fontSize: '1.25rem',
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              LUMINA <span className="gradient-gold-text">AI</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }} className="hide-mobile">
              REVENUE SUITE
            </div>
          </div>
        </div>

        {/* Unified Responsive Navigation Bar */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(15, 17, 26, 0.8)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-light)',
          overflowX: 'auto',
          maxWidth: '60%'
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: isActive ? 'var(--gradient-gold)' : 'transparent',
                  color: isActive ? '#08090e' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={14} color={isActive ? '#08090e' : 'var(--text-muted)'} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Custom AI API Key Button */}
          <button
            onClick={() => { soundFx.playClick(); onOpenApiKeyModal(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-muted)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
            title="Configure Free AI API Key"
          >
            <Key size={13} color="var(--accent-gold)" /> <span className="hide-mobile">AI Key</span>
          </button>

          {/* Free Vault Lead Magnet Button */}
          <button
            onClick={() => { soundFx.playClick(); onOpenLeadMagnet(); }}
            className="hide-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(243, 208, 132, 0.12)',
              border: '1px solid rgba(243, 208, 132, 0.3)',
              color: 'var(--accent-gold)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Gift size={13} /> Vault
          </button>

          {/* Credit Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(15, 17, 26, 0.9)',
            border: '1px solid var(--border-light)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem'
          }}>
            <Zap size={13} color="var(--accent-gold)" fill="var(--accent-gold)" />
            <strong style={{ color: userTier === 'PRO' ? 'var(--accent-emerald)' : 'var(--accent-gold)', fontFamily: 'var(--font-code)' }}>
              {userTier === 'PRO' ? 'UNLIMITED' : credits}
            </strong>
          </div>

          {/* Upgrade Pro Button */}
          {userTier !== 'PRO' && (
            <button className="btn-gold" onClick={() => { soundFx.playClick(); onOpenUpgrade(); }} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              <Crown size={13} /> Pro
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
