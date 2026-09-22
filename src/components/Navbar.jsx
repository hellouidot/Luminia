import React from 'react';
import { Sparkles, Zap, Shield, Crown, Flame, FileText, Target, Gift } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function Navbar({ activeTab, setActiveTab, credits, userTier, onOpenUpgrade, onOpenLeadMagnet }) {
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
      background: 'rgba(7, 9, 19, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => handleTabClick('architect')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)'
          }}>
            <Sparkles size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '800',
              fontSize: '1.4rem',
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              LUMINA <span className="gradient-text">AI 2.0</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              PROD & REVENUE SUITE
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '5px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-light)',
          overflowX: 'auto'
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
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: isActive ? 'var(--gradient-primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 15px rgba(0, 242, 254, 0.3)' : 'none'
                }}
              >
                <Icon size={14} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Credits & Upgrade & Free Vault */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Free Vault Lead Magnet Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenLeadMagnet();
            }}
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
            <Gift size={14} /> Vault (+10 Credits)
          </button>

          {/* Credit Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid var(--border-light)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem'
          }}>
            <Zap size={14} color="var(--accent-gold)" fill="var(--accent-gold)" />
            <strong style={{ color: userTier === 'PRO' ? 'var(--accent-emerald)' : 'var(--accent-gold)', fontFamily: 'var(--font-code)' }}>
              {userTier === 'PRO' ? 'UNLIMITED' : credits}
            </strong>
          </div>

          {/* User Tier / Upgrade Button */}
          {userTier === 'PRO' ? (
            <div className="badge badge-emerald" style={{ padding: '7px 14px', fontSize: '0.8rem' }}>
              <Crown size={14} /> PRO ACTIVE
            </div>
          ) : (
            <button className="btn-gold" onClick={() => { soundFx.playClick(); onOpenUpgrade(); }} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <Crown size={15} /> Upgrade Pro
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
