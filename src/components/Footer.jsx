import React, { useState } from 'react';
import { Sparkles, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Footer({ onAddCredits }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    onAddCredits(5);
  };

  return (
    <footer style={{
      background: 'rgba(5, 7, 15, 0.95)',
      borderTop: '1px solid var(--border-light)',
      padding: '60px 0 32px 0',
      marginTop: '60px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr 1fr',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px'
            }}>
              <Sparkles size={22} color="var(--accent-cyan)" />
              LUMINA <span className="gradient-text">AI</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '340px' }}>
              The premier AI creator & revenue suite empowering 40,000+ founders and content creators to turn ideas into income.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                AI Tools
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Prompt Architect</li>
                <li>Viral Hook Engine</li>
                <li>Revenue Calculator</li>
                <li>Thumbnail Studio</li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Monetize
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Affiliate Directory</li>
                <li>Sponsor Listings</li>
                <li>Pro Subscriptions</li>
                <li>API Partnership</li>
              </ul>
            </div>
          </div>

          {/* Newsletter Box */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '6px' }}>
              Get 5 Bonus Credits Free ⚡
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Subscribe to our weekly AI Growth Newsletter & claim 5 free prompt credits instantly.
            </p>

            {subscribed ? (
              <div style={{
                background: 'rgba(0, 245, 160, 0.15)',
                color: 'var(--accent-emerald)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600
              }}>
                <CheckCircle2 size={16} /> Subscribed! +5 Credits Added to Account!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  className="input-field"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: 'var(--text-dim)'
        }}>
          <div>© {new Date().getFullYear()} Lumina AI Suite. All Rights Reserved.</div>
          <div>Built for High-Velocity Creators & Digital Entrepreneurs.</div>
        </div>
      </div>
    </footer>
  );
}
