import React, { useState } from 'react';
import { X, Check, Zap, Crown, Shield, CreditCard, Sparkles, Tag } from 'lucide-react';
import { paymentService } from '../lib/paymentService';
import { soundFx } from '../utils/soundUtils';

export default function PricingModal({ isOpen, onClose, onUpgradeSuccess }) {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);

  if (!isOpen) return null;

  const isLiveMode = paymentService.isLiveGatewayConfigured();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'MONEY50') {
      soundFx.playSuccess();
      setDiscountApplied(true);
    } else {
      alert('Invalid promo code. Try "MONEY50" for 50% off!');
    }
  };

  const handleCheckout = async (planId, rawPrice) => {
    soundFx.playClick();
    setLoadingPlan(planId);

    const price = discountApplied ? rawPrice * 0.5 : rawPrice;
    const result = await paymentService.triggerCheckout(planId, price);

    setTimeout(() => {
      setLoadingPlan(null);
      onUpgradeSuccess(planId);
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '840px',
          width: '100%',
          padding: '36px',
          position: 'relative',
          border: '1px solid var(--border-glow)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="badge badge-gold" style={{ marginBottom: '8px' }}>
            <Crown size={14} /> UNLOCK LUMINA PRO
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Scale Your AI Creator Empire</h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Get unlimited prompt generations, 16:9 canvas exports, and high-ticket agency proposal builders.
          </p>
        </div>

        {/* Promo Code Input Bar */}
        <div style={{
          background: 'rgba(10, 12, 20, 0.7)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px',
          border: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }} className="responsive-grid-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main)' }}>
            <Tag size={16} color="var(--accent-gold)" /> Have a launch promo code? Use <strong style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-code)' }}>MONEY50</strong> for 50% OFF!
          </div>

          <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '6px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="MONEY50"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              style={{ padding: '6px 10px', fontSize: '0.8rem', width: '110px' }}
            />
            <button type="submit" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              Apply
            </button>
          </form>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px'
        }} className="responsive-grid-2">
          {/* PRO PLAN */}
          <div style={{
            background: 'rgba(15, 17, 26, 0.9)',
            border: '2px solid var(--accent-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '20px',
              background: 'var(--gradient-gold)',
              color: '#08090e',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              MOST POPULAR
            </div>

            <div style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px' }}>Creator PRO</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>For YouTubers & Solopreneurs</div>

            <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--accent-gold)', marginBottom: '16px' }}>
              ${discountApplied ? '9.50' : '19'} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ month</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-emerald)" /> Unlimited AI Prompt Generations</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-emerald)" /> 16:9 Canvas Thumbnail Studio Export</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-emerald)" /> Viral Script & Hook Generator</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-emerald)" /> Private Workspace Vault Storage</li>
            </ul>

            <button
              onClick={() => handleCheckout('pro', 19)}
              disabled={loadingPlan === 'pro'}
              className="btn-gold"
              style={{ width: '100%', padding: '12px', justifyContent: 'center', marginTop: 'auto' }}
            >
              <CreditCard size={16} /> {loadingPlan === 'pro' ? 'Redirecting to Checkout...' : 'Checkout & Unlock PRO'}
            </button>
          </div>

          {/* AGENCY PLAN */}
          <div style={{
            background: 'rgba(15, 17, 26, 0.7)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px' }}>Agency VIP</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>For High-Ticket Agencies & Freelancers</div>

            <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '16px' }}>
              ${discountApplied ? '24.50' : '49'} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ month</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}><Check size={16} color="var(--accent-emerald)" /> Everything in PRO Plan</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}><Check size={16} color="var(--accent-emerald)" /> $8.5k Agency Client Proposal Generator</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}><Check size={16} color="var(--accent-emerald)" /> Paid Ads ROAS & Lead Cost Simulator</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}><Check size={16} color="var(--accent-emerald)" /> Commercial License & Priority Support</li>
            </ul>

            <button
              onClick={() => handleCheckout('agency', 49)}
              disabled={loadingPlan === 'agency'}
              className="btn-primary"
              style={{ width: '100%', padding: '12px', justifyContent: 'center', marginTop: 'auto' }}
            >
              <Crown size={16} /> {loadingPlan === 'agency' ? 'Redirecting to Checkout...' : 'Unlock Agency VIP'}
            </button>
          </div>
        </div>

        {/* Gateway Status Badge */}
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          textAlign: 'center',
          background: 'rgba(10, 12, 20, 0.5)',
          padding: '10px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)'
        }}>
          {isLiveMode ? (
            <span style={{ color: 'var(--accent-emerald)' }}>
              🔒 Live Stripe / LemonSqueezy Gateway Active. SSL Encrypted Checkout.
            </span>
          ) : (
            <span>
              ℹ️ <strong>Demo Preview Mode Active</strong>: Paste your Stripe / LemonSqueezy keys in <code>.env</code> to receive live credit card payments.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
