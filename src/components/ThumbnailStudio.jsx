import React, { useState, useRef, useEffect } from 'react';
import { Crown, Download, RefreshCw, Sparkles, Image as ImageIcon, Layout, Type } from 'lucide-react';

export default function ThumbnailStudio({ deductCredit }) {
  const [title, setTitle] = useState('10x YOUR REVENUE WITH AI');
  const [subtitle, setSubtitle] = useState('Secret 2026 Creator Blueprint');
  const [badgeText, setBadgeText] = useState('VIRAL METHOD ⚡');
  const [theme, setTheme] = useState('cyber');
  const canvasRef = useRef(null);

  const themes = [
    { id: 'cyber', name: 'Cyber Cyan', bg: ['#070913', '#00f2fe', '#7f00ff'], textColor: '#ffffff' },
    { id: 'purple', name: 'Neon Purple', bg: ['#0d0614', '#7f00ff', '#e100ff'], textColor: '#ffffff' },
    { id: 'gold', name: 'Sunset Gold', bg: ['#120c02', '#ffb703', '#fb8500'], textColor: '#ffffff' },
    { id: 'emerald', name: 'Deep Emerald', bg: ['#02120d', '#00f5a0', '#00d9f5'], textColor: '#ffffff' },
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  // Render Thumbnail to HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 1280;
    const height = 720;

    canvas.width = width;
    canvas.height = height;

    // Draw Gradient Background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, currentTheme.bg[0]);
    grad.addColorStop(0.5, currentTheme.bg[1]);
    grad.addColorStop(1, currentTheme.bg[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Overlay Subtle Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    for (let x = 0; x < width; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Glowing Accent Circle
    ctx.beginPath();
    ctx.arc(width - 200, 200, 260, 0, Math.PI * 2);
    ctx.fillStyle = currentTheme.bg[1];
    ctx.globalAlpha = 0.25;
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Draw Badge Box
    ctx.fillStyle = '#ffb703';
    ctx.beginPath();
    ctx.roundRect(80, 90, 280, 50, 25);
    ctx.fill();

    ctx.fillStyle = '#070913';
    ctx.font = 'bold 24px "Outfit", sans-serif';
    ctx.fillText(badgeText, 105, 124);

    // Draw Main Title Text (With Glow Shadow)
    ctx.shadowColor = currentTheme.bg[1];
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 76px "Outfit", sans-serif';
    
    // Multi-line wrap support
    const words = title.split(' ');
    let line = '';
    let y = 260;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 900 && n > 0) {
        ctx.fillText(line, 80, y);
        line = words[n] + ' ';
        y += 90;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 80, y);

    // Draw Subtitle
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '500 36px "Inter", sans-serif';
    ctx.fillText(subtitle, 80, y + 80);

    // Bottom Branding watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '600 22px "JetBrains Mono", monospace';
    ctx.fillText('POWERED BY LUMINA AI', 80, height - 60);

  }, [title, subtitle, badgeText, theme]);

  const handleDownload = () => {
    const success = deductCredit();
    if (!success) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `lumina-thumbnail-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
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
          <div className="badge badge-purple" style={{ marginBottom: '8px' }}>
            <Crown size={14} /> AI Graphic Studio
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>AI Thumbnail & Banner Canvas</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Design high-CTR YouTube thumbnails and social graphics with instant PNG export.
          </p>
        </div>

        <button className="btn-gold" onClick={handleDownload} style={{ fontSize: '0.88rem' }}>
          <Download size={16} /> Export High-Res PNG (-1 Credit)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '32px' }}>
        {/* Controls */}
        <div>
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Type size={14} color="var(--accent-cyan)" /> Headline Text
            </label>
            <input
              type="text"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label className="input-label">Subtitle / Hook</label>
            <input
              type="text"
              className="input-field"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label className="input-label">Accent Badge Label</label>
            <input
              type="text"
              className="input-field"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layout size={14} color="var(--accent-gold)" /> Gradient Theme Preset
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    border: theme === t.id ? '1px solid var(--accent-cyan)' : '1px solid var(--border-light)',
                    background: theme === t.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: theme === t.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Canvas Preview */}
        <div style={{
          background: 'rgba(7, 9, 19, 0.9)',
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-glow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justify: 'center'
        }}>
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-light)'
          }}>
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '12px' }}>
            Live 1280x720 16:9 Canvas Output
          </div>
        </div>
      </div>
    </div>
  );
}
