import React, { useState } from 'react';
import { Sparkles, Zap, Shield, Crown, Flame, FileText, Target, Gift, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function Navbar({ activeTab, setActiveTab, credits, userTier, onOpenUpgrade, onOpenLeadMagnet }) {
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
      background: 'rgba(7, 9, 19, 0.92)',
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
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0, 242, 254, 0.4)'
          }}>
            <Sparkles size={20} color="#ffffff" />
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
              LUMINA <span className="gradient-text">AI</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }} className="hide-mobile">
              CREATOR REVENUE SUITE
            </div>
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <nav className="hide-mobile" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-light)'
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
                  padding: '6px 13px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: isActive ? 'var(--gradient-primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={14} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Credits & Upgrade & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Free Vault Lead Magnet Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenLeadMagnet();
            }}
            className="hide-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(0, 242, 254, 0.1)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              color: 'var(--accent-cyan)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Gift size={14} /> Vault (+10)
          </button>

          {/* Credit Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid var(--border-light)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem'
          }}>
            <Zap size={14} color="var(--accent-gold)" fill="var(--accent-gold)" />
            <strong style={{ color: userTier === 'PRO' ? 'var(--accent-emerald)' : 'var(--accent-gold)', fontFamily: 'var(--font-code)' }}>
              {userTier === 'PRO' ? 'UNLIMITED' : credits}
            </strong>
          </div>

          {/* Upgrade Button */}
          {userTier !== 'PRO' && (
            <button className="btn-gold" onClick={() => { soundFx.playClick(); onOpenUpgrade(); }} style={{ padding: '7px 14px', fontSize: '0.82rem' }}>
              <Crown size={14} /> Pro
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              padding: '8px',
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
            className="show-mobile-flex"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Tool Navigation Bar (Always visible on mobile) */}
      <div style={{
        background: 'rgba(12, 16, 36, 0.95)',
        borderTop: '1px solid var(--border-light)',
        padding: '8px 12px',
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
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
                border: isActive ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.06)',
                background: isActive ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.78rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              <Icon size={13} /> {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
