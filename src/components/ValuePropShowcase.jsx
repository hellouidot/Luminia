import React from 'react';
import { Sparkles, Flame, DollarSign, Crown, ArrowRight, Shield } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function ValuePropShowcase({ setActiveTab, onOpenUpgrade }) {
  const pillars = [
    {
      id: 'architect',
      badge: 'PILLAR 01',
      title: 'Engineered AI Prompts',
      desc: 'Optimized Midjourney v6 & GPT-4o prompts with visual score gauges (98/100 quality rate).',
      icon: Sparkles,
      color: 'var(--accent-gold)'
    },
    {
      id: 'copy',
      badge: 'PILLAR 02',
      title: 'Viral Script Engine',
      desc: 'High-CTR hook & copywriting frameworks tailored for YouTube, TikTok, and X/Twitter.',
      icon: Flame,
      color: 'var(--accent-rose)'
    },
    {
      id: 'studio',
      badge: 'PILLAR 03',
      title: '16:9 Thumbnail Studio',
      desc: 'HTML5 Canvas thumbnail generator producing clean PNG exports instantly.',
      icon: Crown,
      color: 'var(--accent-violet)'
    },
    {
      id: 'proposal',
      badge: 'PILLAR 04',
      title: 'Agency Pitch & ROAS Suite',
      desc: 'Generate $8.5k scope-of-work proposals and calculate paid ad acquisition ROAS.',
      icon: DollarSign,
      color: 'var(--accent-emerald)'
    }
  ];

  return (
    <div className="glass-card" style={{ padding: '36px', marginBottom: '32px', border: '1px solid var(--border-glow)' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="badge badge-gold" style={{ marginBottom: '10px' }}>
          <Shield size={14} /> WHAT WE GIVE OUR CUSTOMERS
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800 }}>
          Why Lumina <span className="gradient-gold-text">Delivers 10x ROI</span> For Creators & Agencies
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '640px', margin: '8px auto 0 auto' }}>
          Generic AI tools give you random text. Lumina provides a structured revenue suite designed to convert traffic into subscribers and high-ticket clients.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.id}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(pillar.id);
              }}
              style={{
                background: 'rgba(10, 12, 20, 0.7)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = pillar.color;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: '0.68rem',
                color: pillar.color,
                fontWeight: 700,
                fontFamily: 'var(--font-code)',
                marginBottom: '12px',
                letterSpacing: '0.08em'
              }}>
                {pillar.badge}
              </div>

              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Icon size={20} color={pillar.color} />
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                {pillar.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {pillar.desc}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFx.playClick();
                  setActiveTab(pillar.id);
                }}
                className="btn-gold"
                style={{
                  marginTop: '16px',
                  width: '100%',
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  justifyContent: 'center'
                }}
              >
                Launch Tool <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Comparison Grid: Lumina vs Generic AI */}
      <div style={{
        background: 'rgba(10, 12, 20, 0.9)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        border: '1px solid var(--border-light)'
      }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', color: '#fff', textAlign: 'center' }}>
          LUMINA vs GENERIC AI GENERATORS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="responsive-grid-2">
          <div style={{ background: 'rgba(16, 185, 129, 0.06)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '10px', fontSize: '0.85rem' }}>
              ✓ LUMINA AI CREATOR SUITE
            </div>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-main)' }}>
              <li>• Multi-model engineered prompt sliders & health score</li>
              <li>• Native 16:9 Canvas thumbnail exporter</li>
              <li>• Built-in $8.5k Agency client proposal & ROAS engine</li>
              <li>• Lead magnet integration capturing customer emails</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(244, 63, 94, 0.06)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
            <div style={{ fontWeight: 700, color: 'var(--accent-rose)', marginBottom: '10px', fontSize: '0.85rem' }}>
              ✕ OTHER AI GENERATORS
            </div>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)' }}>
              <li>• Generic, repetitive prompt outputs without style controls</li>
              <li>• No thumbnail or graphic export capability</li>
              <li>• No monetization or agency financial calculators</li>
              <li>• Zero email capture or lead generation tools</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
