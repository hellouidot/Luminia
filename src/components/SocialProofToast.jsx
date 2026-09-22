import React, { useState, useEffect } from 'react';
import { Sparkles, Crown, Zap, X, ShieldCheck } from 'lucide-react';

export default function SocialProofToast({ onOpenUpgrade }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const notifications = [
    { name: 'Alex R. from San Francisco', action: 'upgraded to Pro Tier ($19/mo)', time: '2m ago', icon: Crown, color: 'var(--accent-gold)' },
    { name: 'Sarah M. from London', action: 'claimed 500+ Master Prompts Vault', time: '4m ago', icon: Sparkles, color: 'var(--accent-cyan)' },
    { name: 'Marcus K. from Austin', action: 'generated 16:9 Viral YouTube Thumbnail', time: '6m ago', icon: Zap, color: 'var(--accent-purple)' },
    { name: 'Apex Media Agency', action: 'unlocked Agency Tier ($49/mo)', time: '9m ago', icon: ShieldCheck, color: 'var(--accent-emerald)' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 400);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = notifications[index];
  const Icon = current.icon;

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: 90,
      background: 'rgba(7, 9, 19, 0.92)',
      backdropFilter: 'blur(16px)',
      border: '1px solid var(--border-glow)',
      padding: '12px 18px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-card)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '380px',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon size={18} color={current.color} />
      </div>

      <div style={{ flex: 1, fontSize: '0.82rem' }}>
        <div style={{ color: '#fff', fontWeight: 600 }}>{current.name}</div>
        <div style={{ color: 'var(--text-muted)' }}>{current.action}</div>
        <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginTop: '2px' }}>{current.time}</div>
      </div>

      <button
        onClick={() => setVisible(false)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-dim)',
          cursor: 'pointer',
          padding: '2px'
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
