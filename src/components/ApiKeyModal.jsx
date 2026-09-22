import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Check, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState('groq');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem('lumina_user_ai_key');
    if (existing) setApiKey(existing);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    soundFx.playSuccess();
    localStorage.setItem('lumina_user_ai_key', apiKey.trim());
    localStorage.setItem('lumina_user_ai_provider', provider);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '32px',
          position: 'relative',
          border: '1px solid var(--border-glow)'
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

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div className="badge badge-gold" style={{ marginBottom: '8px' }}>
            <Key size={14} /> FREE AI API SETTINGS
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Connect Custom AI Engine</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Lumina runs on built-in free smart engines. You can also connect your own free Groq or OpenRouter key for 10x faster generations.
          </p>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label">Select Provider</label>
            <select
              className="input-field"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              style={{ background: 'var(--bg-input)' }}
            >
              <option value="groq">Groq Cloud (Recommended - 100% Free & Blazing Fast)</option>
              <option value="openrouter">OpenRouter (Free Llama 3.1 & Mistral Models)</option>
              <option value="gemini">Google Gemini API (100% Free Tier)</option>
              <option value="openai">OpenAI (Custom Key)</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="input-label" style={{ margin: 0 }}>API Key</label>
              <a
                href={provider === 'groq' ? 'https://console.groq.com/keys' : 'https://openrouter.ai/keys'}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              >
                Get Free Key <ExternalLink size={12} />
              </a>
            </div>
            <input
              type="password"
              className="input-field"
              placeholder="gsk_... or sk-or-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', justifyContent: 'center' }}>
            {saved ? <Check size={16} /> : <Key size={16} />}
            {saved ? 'Saved Privately!' : 'Save Key in Browser Memory'}
          </button>
        </form>

        <div style={{ marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="var(--accent-emerald)" /> Key is stored 100% locally in your browser storage. Zero server risk.
        </div>
      </div>
    </div>
  );
}
