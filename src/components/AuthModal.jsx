import React, { useState } from 'react';
import { X, Lock, Mail, Key, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { authService } from '../lib/supabaseClient';
import { soundFx } from '../utils/soundUtils';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, redirectReason = '' }) {
  const [mode, setMode] = useState('signup'); // 'signup' or 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) return;

    soundFx.playClick();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error } = await authService.signUp(email, password);
        if (error) {
          setErrorMessage(error.message);
        } else {
          soundFx.playSuccess();
          onAuthSuccess(data?.user || { email });
          onClose();
        }
      } else {
        const { data, error } = await authService.signIn(email, password);
        if (error) {
          setErrorMessage(error.message);
        } else {
          soundFx.playSuccess();
          onAuthSuccess(data?.user || { email });
          onClose();
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    soundFx.playClick();
    await authService.signInWithGoogle();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '32px',
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

        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'var(--gradient-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          boxShadow: 'var(--shadow-gold-glow)'
        }}>
          <Lock size={24} color="#08090e" />
        </div>

        <div className="badge badge-gold" style={{ marginBottom: '8px' }}>
          <ShieldCheck size={13} /> SECURE ACCOUNT ACCESS
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>
          {mode === 'signup' ? 'Create Free Lumina Account' : 'Welcome Back to Lumina'}
        </h2>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          {redirectReason || 'Sign up to unlock tools, save your prompts to private workspace vault, and claim 5 free credits.'}
        </p>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          background: 'rgba(10, 12, 20, 0.7)',
          padding: '4px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '20px',
          border: '1px solid var(--border-light)'
        }}>
          <button
            onClick={() => { soundFx.playClick(); setMode('signup'); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              background: mode === 'signup' ? 'var(--gradient-gold)' : 'transparent',
              color: mode === 'signup' ? '#08090e' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>
          <button
            onClick={() => { soundFx.playClick(); setMode('login'); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              background: mode === 'login' ? 'var(--gradient-gold)' : 'transparent',
              color: mode === 'login' ? '#08090e' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </div>

        {errorMessage && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: 'var(--accent-rose)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            marginBottom: '16px'
          }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ textAlign: 'left' }}>
            <label className="input-label">Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-gold" disabled={loading} style={{ width: '100%', padding: '12px', justifyContent: 'center' }}>
            {loading ? 'Authenticating...' : (mode === 'signup' ? 'Create Free Account' : 'Sign In To Lumina')} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '20px 0',
          color: 'var(--text-dim)',
          fontSize: '0.78rem'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          <span>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn-secondary"
          style={{ width: '100%', padding: '10px', justifyContent: 'center' }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
