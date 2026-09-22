import React from 'react';
import { Sparkles, TrendingUp, DollarSign, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero({ onOpenUpgrade, setActiveTab }) {
  return (
    <section style={{
      padding: '48px 0 32px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Left Column: Headline & Messaging */}
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '18px', padding: '6px 14px' }}>
              <Sparkles size={14} /> Next-Gen Creator Monetization & AI Suite
            </div>

            <h1 style={{
              fontSize: '3.2rem',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px'
            }}>
              Generate Viral Content & <span className="gradient-text">Print Revenue</span> With AI
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              marginBottom: '28px',
              maxWidth: '560px',
              lineHeight: 1.6
            }}>
              Lumina AI empowers creators, marketers, and SaaS founders to craft high-scoring prompts, viral hooks, dynamic visual thumbnails, and calculate multi-channel growth metrics.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '36px', flexWrap: 'wrap' }}>
              <button 
                className="btn-primary" 
                onClick={() => setActiveTab('architect')}
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                Launch Prompt Architect <ArrowRight size={18} />
              </button>
              
              <button 
                className="btn-secondary" 
                onClick={() => setActiveTab('calculator')}
                style={{ padding: '14px 24px', fontSize: '1rem' }}
              >
                <DollarSign size={18} color="var(--accent-gold)" /> Revenue Simulator
              </button>
            </div>

            {/* Live Proof Stat Ticker */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="var(--accent-cyan)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', fontFamily: 'var(--font-code)' }}>42.8k+</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Active Creators</div>
                </div>
              </div>

              <div style={{ width: '1px', height: '30px', background: 'var(--border-light)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="var(--accent-emerald)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', fontFamily: 'var(--font-code)' }}>1.4M+</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Prompts Generated</div>
                </div>
              </div>

              <div style={{ width: '1px', height: '30px', background: 'var(--border-light)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--accent-purple)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', fontFamily: 'var(--font-code)' }}>99.8%</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic Display */}
          <div className="animate-float" style={{ position: 'relative' }}>
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
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(7, 9, 19, 0.85)',
                backdropFilter: 'blur(12px)',
                padding: '14px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Pro Output Sample</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>
                    Midjourney v6 Photorealistic Cyberpunk Studio
                  </div>
                </div>
                <span className="badge badge-gold">Score: 98/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
