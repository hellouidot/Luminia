import React, { useState } from 'react';
import { Sparkles, Copy, Check, Zap, RefreshCw, Cpu, Layers } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function PromptArchitect({ deductCredit, onOpenUpgrade }) {
  const [engine, setEngine] = useState('midjourney');
  const [subject, setSubject] = useState('Futuristic glass skyscraper in a neon cyberpunk metropolis');
  const [selectedStyles, setSelectedStyles] = useState(['Cinematic 8K', 'Octane Render', 'Volumetric Lighting']);
  const [stylize, setStylize] = useState(750);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const stylePresets = [
    'Cinematic 8K', 'Octane Render', 'Volumetric Lighting', 'Unreal Engine 5',
    'Photorealistic', 'Hyper-Detailed', 'Golden Hour', 'Cyberpunk Accent',
    '80mm Lens', 'Raytracing', 'Minimalist Glass', 'Dark Noir'
  ];

  const toggleStyle = (style) => {
    soundFx.playClick();
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const getGeneratedPrompt = () => {
    const stylesString = selectedStyles.join(', ');
    if (engine === 'midjourney') {
      return `${subject}, ${stylesString}, masterpiece composition, dramatic atmospheric depth, hyper realistic details, 8k resolution --ar ${aspectRatio} --stylize ${stylize} --v 6.0`;
    } else if (engine === 'chatgpt') {
      return `Act as a world-class prompt engineer. Create a highly detailed prompt for ${subject} incorporating stylistic elements: ${stylesString}. Output concise, impactful instructions with zero fluff.`;
    } else if (engine === 'claude') {
      return `System Prompt: Analyze ${subject} through an architectural design perspective. Incorporate: ${stylesString}. Provide a step-by-step structural breakdown and visual description.`;
    } else {
      return `masterpiece, best quality, ${subject}, ${stylesString}, highly detailed, sharp focus, 8k wallpaper, masterpiece lighting`;
    }
  };

  const currentPrompt = getGeneratedPrompt();
  const promptScore = Math.min(99, 70 + selectedStyles.length * 6 + (subject.length > 20 ? 10 : 0));

  const handleGenerate = () => {
    const success = deductCredit();
    if (!success) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 400);
  };

  const handleCopy = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card" style={{ padding: '28px', marginBottom: '32px' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px',
        borderBottom: '1px solid var(--border-light)',
        paddingBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="badge badge-purple" style={{ marginBottom: '6px' }}>
              <Cpu size={14} /> Multi-Model Optimizer
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>AI Prompt Architect</h2>
          </div>

          {/* Engine Switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(7, 9, 19, 0.7)',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            overflowX: 'auto',
            maxWidth: '100%'
          }}>
            {[
              { id: 'midjourney', name: 'Midjourney v6' },
              { id: 'chatgpt', name: 'ChatGPT 4o' },
              { id: 'claude', name: 'Claude 3.5' },
              { id: 'stablediffusion', name: 'Stable Diff XL' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { soundFx.playClick(); setEngine(item.id); }}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  background: engine === item.id ? 'var(--gradient-primary)' : 'transparent',
                  color: engine === item.id ? '#fff' : 'var(--text-muted)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
        {/* Left Inputs */}
        <div>
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label">Core Prompt Concept / Subject</label>
            <textarea
              className="input-field"
              rows={3}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Describe the main visual concept or text task..."
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={14} color="var(--accent-cyan)" /> Style Modifiers
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {stylePresets.map((style) => {
                const isSelected = selectedStyles.includes(style);
                return (
                  <button
                    key={style}
                    onClick={() => toggleStyle(style)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-light)',
                      background: isSelected ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      fontSize: '0.78rem',
                      fontWeight: isSelected ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    {isSelected ? '✓ ' : '+ '}{style}
                  </button>
                );
              })}
            </div>
          </div>

          {engine === 'midjourney' && (
            <div style={{
              background: 'rgba(7, 9, 19, 0.5)',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>Stylize (--stylize)</span>
                    <strong style={{ color: 'var(--accent-cyan)' }}>{stylize}</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={stylize}
                    onChange={(e) => setStylize(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                  />
                </div>

                <div>
                  <div style={{ marginBottom: '4px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Aspect Ratio (--ar)
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {['16:9', '1:1', '9:16', '21:9'].map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => { soundFx.playClick(); setAspectRatio(ratio); }}
                        style={{
                          flex: 1,
                          padding: '4px',
                          fontSize: '0.72rem',
                          background: aspectRatio === ratio ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.05)',
                          border: 'none',
                          borderRadius: '4px',
                          color: aspectRatio === ratio ? '#fff' : 'var(--text-muted)',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            className="btn-primary"
            onClick={handleGenerate}
            disabled={isGenerating}
            style={{ width: '100%', padding: '12px' }}
          >
            {isGenerating ? <RefreshCw size={16} className="animate-pulse" /> : <Sparkles size={16} />}
            Generate Prompt (-1 Credit)
          </button>
        </div>

        {/* Right Output Box */}
        <div style={{
          background: 'rgba(7, 9, 19, 0.9)',
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-glow)',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              marginBottom: '12px'
            }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                Prompt Score
              </span>
              <span style={{
                fontFamily: 'var(--font-code)',
                fontWeight: 700,
                color: promptScore > 90 ? 'var(--accent-emerald)' : 'var(--accent-gold)',
                fontSize: '1rem'
              }}>
                {promptScore}/100 EXCELLENT
              </span>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              fontFamily: 'var(--font-code)',
              fontSize: '0.82rem',
              lineHeight: 1.6,
              color: 'var(--accent-cyan)',
              minHeight: '140px',
              wordBreak: 'break-word',
              marginBottom: '16px'
            }}>
              {currentPrompt}
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{ width: '100%', padding: '10px', justifyContent: 'center' }}
          >
            {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
            {copied ? 'Copied Prompt!' : 'Copy Super Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
}
