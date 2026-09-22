import React, { useState } from 'react';
import { Shield, Search, ThumbsUp, ExternalLink, Star, Sparkles, PlusCircle } from 'lucide-react';

export default function AiDirectory({ onOpenUpgrade }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [upvotes, setUpvotes] = useState({
    1: 428,
    2: 395,
    3: 312,
    4: 289,
    5: 240,
    6: 198
  });

  const tools = [
    {
      id: 1,
      name: 'Midjourney v6',
      category: 'design',
      tagline: 'Leading AI Image Generation & Hyper-Realistic Art Studio',
      rating: 4.9,
      isFeatured: true,
      affiliateUrl: 'https://midjourney.com',
      badge: 'FEATURED SPONSOR'
    },
    {
      id: 2,
      name: 'CopyForge AI',
      category: 'copywriting',
      tagline: 'Generate high-converting sales letters, ads, and emails in seconds.',
      rating: 4.8,
      isFeatured: true,
      affiliateUrl: '#',
      badge: 'PRO PARTNER'
    },
    {
      id: 3,
      name: 'CodePulse Pro',
      category: 'coding',
      tagline: 'Autonomous AI Coding Assistant & Fullstack Code Generator',
      rating: 4.9,
      isFeatured: false,
      affiliateUrl: '#',
      badge: 'POPULAR'
    },
    {
      id: 4,
      name: 'VoiceSynthetix',
      category: 'video',
      tagline: 'Ultra-realistic AI Voiceovers in 50+ languages with emotional tone control.',
      rating: 4.7,
      isFeatured: false,
      affiliateUrl: '#',
      badge: 'TRENDING'
    },
    {
      id: 5,
      name: 'AutoWorkflow.io',
      category: 'automation',
      tagline: 'Connect 1,000+ apps with AI agent workflows and zero code.',
      rating: 4.8,
      isFeatured: false,
      affiliateUrl: '#',
      badge: 'NEW'
    },
    {
      id: 6,
      name: 'MotionAvatar AI',
      category: 'video',
      tagline: 'Create talking photorealistic AI avatars for TikTok & YouTube Shorts.',
      rating: 4.6,
      isFeatured: false,
      affiliateUrl: '#',
      badge: 'VIRAL'
    }
  ];

  const handleUpvote = (id) => {
    setUpvotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const filteredTools = tools.filter(tool => {
    const matchesCategory = category === 'all' || tool.category === category;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <div className="badge badge-emerald" style={{ marginBottom: '8px' }}>
            <Shield size={14} /> Curated Affiliate Directory
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Trending AI Tool Hub</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Discover top-rated AI tools vetted for high ROI, speed, and creator utility.
          </p>
        </div>

        <button 
          className="btn-primary" 
          onClick={() => alert("Submit your AI tool for sponsorship ($149/mo spotlight listing). Email: sponsor@luminaai.com")}
          style={{ fontSize: '0.85rem' }}
        >
          <PlusCircle size={16} /> Promote Your Tool ($149/mo)
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 100+ AI tools by keyword..."
            style={{ paddingLeft: '42px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all', name: 'All Tools' },
            { id: 'design', name: 'Design & Art' },
            { id: 'copywriting', name: 'Copywriting' },
            { id: 'coding', name: 'Coding' },
            { id: 'video', name: 'Video & Voice' },
            { id: 'automation', name: 'Automation' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                border: category === cat.id ? '1px solid var(--accent-cyan)' : '1px solid var(--border-light)',
                background: category === cat.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: category === cat.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            style={{
              background: 'rgba(7, 9, 19, 0.8)',
              padding: '22px',
              borderRadius: 'var(--radius-md)',
              border: tool.isFeatured ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
              boxShadow: tool.isFeatured ? '0 0 20px rgba(255, 183, 3, 0.15)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className={tool.isFeatured ? 'badge badge-gold' : 'badge badge-cyan'} style={{ fontSize: '0.7rem' }}>
                  {tool.badge}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-gold)', fontSize: '0.85rem' }}>
                  <Star size={14} fill="var(--accent-gold)" /> {tool.rating}
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px', color: '#fff' }}>
                {tool.name}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
                {tool.tagline}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              paddingTop: '14px',
              borderTop: '1px solid var(--border-light)'
            }}>
              <button
                onClick={() => handleUpvote(tool.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-light)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-main)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ThumbsUp size={14} color="var(--accent-cyan)" /> {upvotes[tool.id]} Upvotes
              </button>

              <a
                href={tool.affiliateUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem', textDecoration: 'none' }}
              >
                Try Free <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
