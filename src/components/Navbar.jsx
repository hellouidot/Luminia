import React, { useState } from 'react';
import { Sparkles, Zap, Shield, Crown, Flame, FileText, Target, Gift, Key, Folder, User, LogOut } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function Navbar({
  activeTab,
  setActiveTab,
  credits,
  userTier,
  userSession,
  onOpenUpgrade,
  onOpenLeadMagnet,
  onOpenApiKeyModal,
  onOpenVault,
  onOpenAuth,
  onSignOut
}) {
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
          maxWidth: '50%'
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
          {/* User Auth Account Status */}
          {userSession ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: 'var(--accent-emerald)',
                padding: '6px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <User size={12} /> {userSession.email.split('@')[0]}
              </div>
              <button
                onClick={onSignOut}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                title="Sign Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { soundFx.playClick(); onOpenAuth('Sign in to access Lumina tools'); }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-main)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
          )}

          {/* My Saved Vault Button */}
          <button
            onClick={() => { soundFx.playClick(); onOpenVault(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(157, 114, 255, 0.12)',
              border: '1px solid rgba(157, 114, 255, 0.3)',
              color: '#c4b5fd',
              padding: '6px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Folder size={13} /> <span className="hide-mobile">Vault</span>
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
