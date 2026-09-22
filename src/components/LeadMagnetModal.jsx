import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Download, Send, Gift } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function LeadMagnetModal({ isOpen, onClose, onGrantBonusCredits }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    soundFx.playSuccess();
    setIsSubmitted(true);
    onGrantBonusCredits(10);

    const leads = JSON.parse(localStorage.getItem('lumina_leads') || '[]');
    leads.push({ name, email, date: new Date().toISOString(), type: '500 Prompts Vault' });
    localStorage.setItem('lumina_leads', JSON.stringify(leads));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '36px',
          position: 'relative',
          border: '1px solid var(--border-glow)',
          textAlign: 'center'
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

        {!isSubmitted ? (
          <>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto',
              boxShadow: '0 0 24px rgba(0, 242, 254, 0.4)'
            }}>
              <Gift size={28} color="#ffffff" />
            </div>

            <div className="badge badge-gold" style={{ marginBottom: '10px' }}>
              <Sparkles size={14} /> FREE CREATOR VAULT
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
              Claim 500+ Master AI Prompts Database
            </h2>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
              Get instant access to our curated library of Midjourney, GPT-4o, and Claude prompts + get <strong>+10 Free Credits</strong> instantly.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Your First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                className="input-field"
                placeholder="Your Best Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit" className="btn-primary" style={{ padding: '14px', fontSize: '1rem', width: '100%', justifyContent: 'center' }}>
                Claim Vault & +10 Free Credits <Send size={16} />
              </button>
            </form>
          </>
        ) : (
          <div style={{ padding: '20px 0' }}>
            <CheckCircle2 size={56} color="var(--accent-emerald)" style={{ marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
              Vault Access Granted! 🎉
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              We've added <strong>+10 Credits</strong> to your account! You can download your prompt database below.
            </p>

            <button
              className="btn-gold"
              onClick={() => {
                alert("Downloading 500+ Master AI Prompts PDF Database...");
                onClose();
              }}
              style={{ width: '100%', padding: '14px', justifyContent: 'center' }}
            >
              <Download size={18} /> Download Prompts Vault (PDF)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
