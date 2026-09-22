import React from 'react';
import { Sparkles, TrendingUp, DollarSign, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function Hero({ onOpenUpgrade, setActiveTab }) {
  const handleAction = (tabId) => {
    soundFx.playClick();
    setActiveTab(tabId);
  };

  return (
    <section style={{
      padding: '40px 0 24px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div className="responsive-grid-2" style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '36px',
          alignItems: 'center'
        }}>
          {/* Left Column: Headline & Messaging */}
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '16px', padding: '6px 14px' }}>
              <Sparkles size={14} /> Next-Gen Creator Monetization & AI Suite
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '16px'
            }}>
              Generate Viral Content & <span className="gradient-text">Print Revenue</span> With AI
            </h1>

            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'var(--text-muted)',
              marginBottom: '24px',
              maxWidth: '560px',
              lineHeight: 1.6
            }}>
              Lumina AI empowers creators, marketers, and founders to craft high-scoring prompts, viral hooks, 16:9 thumbnails, and calculate multi-channel growth metrics.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
              <button 
                className="btn-primary" 
                onClick={() => handleAction('architect')}
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
              >
                Launch Prompt Architect <ArrowRight size={16} />
              </button>
              
              <button 
                className="btn-secondary" 
                onClick={() => handleAction('calculator')}
                style={{ padding: '12px 20px', fontSize: '0.95rem' }}
              >
                <DollarSign size={16} color="var(--accent-gold)" /> Revenue Simulator
              </button>
            </div>

            {/* Live Proof Stat Ticker */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-light)',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="var(--accent-cyan)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', fontFamily: 'var(--font-code)' }}>42.8k+</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Active Creators</div>
                </div>
              </div>

              <div style={{ width: '1px', height: '24px', background: 'var(--border-light)' }} className="hide-mobile" />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={16} color="var(--accent-emerald)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', fontFamily: 'var(--font-code)' }}>1.4M+</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Prompts Generated</div>
                </div>
              </div>

              <div style={{ width: '1px', height: '24px', background: 'var(--border-light)' }} className="hide-mobile" />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--accent-purple)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', fontFamily: 'var(--font-code)' }}>99.8%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic Display */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-purple-glow)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              background: 'var(--bg-card)'
            }}>
              <img 
                src="/hero-banner.png" 
                alt="Lumina AI Prompt Studio Dashboard" 
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: 'var(--radius-lg)'
                }} 
              />
              
              {/* Floating Overlay Card */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                background: 'rgba(7, 9, 19, 0.88)',
                backdropFilter: 'blur(12px)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pro Output Sample</div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                    Midjourney v6 Cyberpunk Studio
                  </div>
                </div>
                <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>Score: 98/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
