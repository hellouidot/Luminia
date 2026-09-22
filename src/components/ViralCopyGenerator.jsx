import React, { useState } from 'react';
import { Flame, Copy, Check, Sparkles, Video, Share2, Target, BarChart2 } from 'lucide-react';

export default function ViralCopyGenerator({ deductCredit }) {
  const [platform, setPlatform] = useState('youtube');
  const [tone, setTone] = useState('urgency');
  const [topic, setTopic] = useState('How to build a $10k/month AI SaaS tool with zero code');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const platforms = [
    { id: 'youtube', label: 'YouTube Hook', icon: Video },
    { id: 'tiktok', label: 'TikTok Script', icon: Flame },
    { id: 'twitter', label: 'X/Twitter Thread', icon: Share2 },
    { id: 'meta', label: 'FB/Meta Ad Copy', icon: Target },
  ];

  const tones = [
    { id: 'urgency', label: '🚨 FOMO & Urgency' },
    { id: 'curiosity', label: '🧠 Curiosity Gap' },
    { id: 'story', label: '📖 Storyteller' },
    { id: 'saas', label: '💰 High Conversion' },
  ];

  // Dynamic template generation function
  const getGeneratedCopies = () => {
    if (platform === 'youtube') {
      return [
        {
          title: "The 3-Step AI Strategy Everyone Is Hiding",
          hook: `STOP wasting time on manual work! Here is the exact blueprint for "${topic}" that generated over $14,000 in 30 days. Watch line-by-line before this gets taken down!`,
          ctrScore: "98% CTR Potential"
        },
        {
          title: "I Built This In 48 Hours (And It Print Cash)",
          hook: `Everyone told me "${topic}" was impossible without a team of 10 developers. I proved them WRONG using 2 simple AI tools. Here is the full breakdown.`,
          ctrScore: "94% CTR Potential"
        }
      ];
    } else if (platform === 'tiktok') {
      return [
        {
          title: "Viral TikTok 15s Hook + Script",
          hook: `[Visual: Pointing to screen with glowing text]\n"If you are NOT using AI for ${topic} in 2026, you're literally burning money. Here are 3 tools you can start using today for FREE. Tool #1 will blow your mind..."`,
          ctrScore: "99% Watch Retention"
        },
        {
          title: "POV: You Discovered The Secret AI Loophole",
          hook: `[Visual: Confused face transitioning to smiling screen shot]\n"POV: You spent 3 years trying to master ${topic} only to realize an AI can do it in 4 seconds. Save this video before your competitors see it!"`,
          ctrScore: "95% Watch Retention"
        }
      ];
    } else if (platform === 'twitter') {
      return [
        {
          title: "High-Engagement X Thread Starter",
          hook: `How to master ${topic} without working 80h weeks (and make your first $5,000 online).\n\nI tested 20+ methods so you don't have to.\n\nHere is the ultimate cheat sheet 🧵👇`,
          ctrScore: "8.5k Likes Target"
        },
        {
          title: "Controversial Paradigm Shift Thread",
          hook: `Unpopular opinion: Traditional methods for ${topic} are officially DEAD.\n\nAI just changed the rules of the game forever.\n\nHere are 5 unfair advantages you need to exploit right now 🧵:`,
          ctrScore: "12k Retweets Target"
        }
      ];
    } else {
      return [
        {
          title: "High-ROAS Direct Response Ad Copy",
          hook: `🔥 Tired of failing at ${topic}? Discover the exact AI system used by top 1% creators to scale effortlessly.\n\n👉 Click below to claim your free toolkit now (First 50 users only)!`,
          ctrScore: "4.2x ROAS Projection"
        },
        {
          title: "Social Proof Driven Conversion Ad",
          hook: `"This single AI tool completely transformed how I handle ${topic}." - Alex R., SaaS Founder\n\nJoin 10,000+ creators scaling smarter. Try Lumina AI today free!`,
          ctrScore: "3.8x ROAS Projection"
        }
      ];
    };
  };

  const copies = getGeneratedCopies();

  const handleCopy = (text, index) => {
    const success = deductCredit();
    if (!success) return;

    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="glass-card" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        borderBottom: '1px solid var(--border-light)',
        paddingBottom: '20px'
      }}>
        <div>
          <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
            <Flame size={14} /> High-CTR Copy Engine
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Viral Hook & Copy Generator</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Generate irresistible headlines, video hooks, and ad copy tailored for maximum viral reach.
          </p>
        </div>

        {/* Platform Selector */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {platforms.map((p) => {
            const Icon = p.icon;
            const isSelected = platform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-light)',
                  background: isSelected ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Icon size={14} /> {p.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '32px' }}>
        {/* Input Parameters */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Product, Niche, or Video Topic</label>
            <input
              type="text"
              className="input-field"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Scaling an AI SaaS, Fitness habit tracker, etc."
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="input-label">Psychological Angle / Tone</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {tones.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: tone === t.id ? '1px solid var(--accent-purple)' : '1px solid var(--border-light)',
                    background: tone === t.id ? 'rgba(127, 0, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    color: tone === t.id ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(0, 242, 254, 0.05)',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}>
            <strong style={{ color: 'var(--accent-cyan)' }}>Pro Tip:</strong> Viral hooks rely on high pattern interrupts and clear benefit outcomes within the first 3 seconds.
          </div>
        </div>

        {/* Generated Copy Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {copies.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(7, 9, 19, 0.8)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                  {item.title}
                </span>
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                  <BarChart2 size={12} /> {item.ctrScore}
                </span>
              </div>

              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                padding: '14px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                whiteSpace: 'pre-line',
                color: 'var(--text-main)',
                marginBottom: '14px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                {item.hook}
              </div>

              <button
                className="btn-secondary"
                onClick={() => handleCopy(item.hook, idx)}
                style={{ width: '100%', padding: '8px', fontSize: '0.82rem' }}
              >
                {copiedIndex === idx ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                {copiedIndex === idx ? 'Copied to Clipboard!' : 'Copy Script & Deduct Credit'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
