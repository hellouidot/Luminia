import React, { useState, useEffect } from 'react';
import { X, Crown, Check, Zap, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PricingModal({ isOpen, onClose, onUpgradeSuccess }) {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(899); // 14 mins 59 secs

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'MONEY50' || promoCode.trim().toUpperCase() === 'PRO50') {
      setDiscountApplied(true);
    } else {
      alert("Invalid Code. Try code: MONEY50 for 50% off!");
    }
  };

  const handleCheckout = () => {
    // Launch confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    onUpgradeSuccess(selectedPlan);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          maxWidth: '780px',
          width: '100%',
          padding: '36px',
          position: 'relative',
          border: '1px solid var(--border-glow)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Urgency Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '28px'
        }}>
          <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
            <Clock size={14} /> SPECIAL DISCOUNT OFFER ENDS IN: {formattedTime}
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>
            Unlock <span className="gradient-gold-text">Lumina Pro</span> Power Suite
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Supercharge your content workflow and print revenue with unlimited generations.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
          {/* Pro Plan ($19/mo) */}
          <div
            onClick={() => setSelectedPlan('pro')}
            style={{
              background: selectedPlan === 'pro' ? 'rgba(255, 183, 3, 0.1)' : 'rgba(7, 9, 19, 0.6)',
              border: selectedPlan === 'pro' ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
          >
            <span className="badge badge-gold" style={{ position: 'absolute', top: '-12px', right: '16px' }}>
              MOST POPULAR
            </span>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '4px' }}>Pro Creator</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              For solo creators, YouTubers & SaaS builders.
            </p>

            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-code)', marginBottom: '16px' }}>
              ${discountApplied ? '9.50' : '19'} <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 500 }}>/month</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--accent-emerald)" /> <strong>UNLIMITED</strong> Daily AI Credits
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--accent-emerald)" /> Midjourney v6 & GPT-4o Prompts
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--accent-emerald)" /> Viral Script & Hook Engine
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--accent-emerald)" /> Unlimited Canvas PNG Exports
              </li>
            </ul>
          </div>

          {/* Agency Plan ($49/mo) */}
          <div
            onClick={() => setSelectedPlan('agency')}
            style={{
              background: selectedPlan === 'agency' ? 'rgba(0, 242, 254, 0.1)' : 'rgba(7, 9, 19, 0.6)',
              border: selectedPlan === 'agency' ? '2px solid var(--accent-cyan)' : '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '4px' }}>Agency Scale</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              For growth agencies, teams & power users.
            </p>

            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-code)', marginBottom: '16px' }}>
              ${discountApplied ? '24.50' : '49'} <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 500 }}>/month</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--accent-cyan)" /> Everything in Pro Tier
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--accent-cyan)" /> Priority 5x Server Generation
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--accent-cyan)" /> 5 Team Member Seats
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--accent-cyan)" /> White-label Commercial License
              </li>
            </ul>
          </div>
        </div>

        {/* Promo Code Entry */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)'
        }}>
          <input
            type="text"
            className="input-field"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Have a promo code? (Try MONEY50)"
            style={{ padding: '8px 12px', fontSize: '0.88rem' }}
          />
          <button className="btn-secondary" onClick={applyPromo} style={{ whiteSpace: 'nowrap' }}>
            Apply Coupon
          </button>
        </div>

        {discountApplied && (
          <div style={{
            background: 'rgba(0, 245, 160, 0.15)',
            color: 'var(--accent-emerald)',
            padding: '10px',
            borderRadius: 'var(--radius-sm)',
            textAlign: 'center',
            fontSize: '0.88rem',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            🎉 Coupon Applied! 50% Instant Discount Activated!
          </div>
        )}

        {/* Checkout Button */}
        <button
          className="btn-gold"
          onClick={handleCheckout}
          style={{ width: '100%', padding: '16px', fontSize: '1.1rem', justifyContent: 'center' }}
        >
          <Crown size={20} /> Instant Unlock Lumina {selectedPlan.toUpperCase()}
        </button>

        <div style={{
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-dim)',
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <ShieldCheck size={14} color="var(--accent-emerald)" /> 30-Day Money-Back Guarantee • Cancel Anytime
        </div>
      </div>
    </div>
  );
}
