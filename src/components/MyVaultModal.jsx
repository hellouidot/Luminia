import React, { useState, useEffect } from 'react';
import { X, Bookmark, Trash2, Copy, Check, Download, Sparkles, Folder } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function MyVaultModal({ isOpen, onClose }) {
  const [savedItems, setSavedItems] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    const vault = JSON.parse(localStorage.getItem('lumina_saved_vault') || '[]');
    setSavedItems(vault);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id) => {
    soundFx.playClick();
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem('lumina_saved_vault', JSON.stringify(updated));
  };

  const handleCopy = (id, text) => {
    soundFx.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '32px',
          position: 'relative',
          border: '1px solid var(--border-glow)',
          maxHeight: '85vh',
          overflowY: 'auto'
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'var(--gradient-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Folder size={22} color="#08090e" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>My Saved Workspace Vault</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Your private collection of saved prompts, viral scripts, and project assets.
            </p>
          </div>
        </div>

        {savedItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: 'rgba(10, 12, 20, 0.6)',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--border-light)'
          }}>
            <Bookmark size={36} color="var(--text-dim)" style={{ marginBottom: '10px' }} />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '4px' }}>Your Vault is Empty</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Click <strong>"💾 Save To Vault"</strong> on any prompt or script generator to store your projects here!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {savedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(10, 12, 20, 0.8)',
                  border: '1px solid var(--border-light)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                    {item.type || 'PROMPT'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    {item.date ? new Date(item.date).toLocaleDateString() : 'Saved'}
                  </span>
                </div>

                <div style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.82rem',
                  color: 'var(--accent-gold)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '120px',
                  overflowY: 'auto'
                }}>
                  {item.content}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button
                    onClick={() => handleCopy(item.id, item.content)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    {copiedId === item.id ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                    {copiedId === item.id ? 'Copied' : 'Copy'}
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: 'rgba(244, 63, 94, 0.12)',
                      border: '1px solid rgba(244, 63, 94, 0.25)',
                      color: 'var(--accent-rose)',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
