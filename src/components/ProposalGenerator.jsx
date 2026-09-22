import React, { useState } from 'react';
import { FileText, Copy, Check, Download, Mail, Lock, Sparkles, DollarSign, Send } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function ProposalGenerator({ deductCredit }) {
  const [agencyName, setAgencyName] = useState('Apex AI Growth Studio');
  const [clientName, setClientName] = useState('Nexus Retail Corp');
  const [budget, setBudget] = useState('8,500');
  const [solution, setSolution] = useState('Automated AI customer support bot + viral video marketing funnel');
  const [userEmail, setUserEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!userEmail || !userEmail.includes('@')) {
      alert('Please enter a valid email address to unlock your proposal.');
      return;
    }
    soundFx.playSuccess();
    setIsUnlocked(true);
    // Store captured lead locally
    const leads = JSON.parse(localStorage.getItem('lumina_leads') || '[]');
    leads.push({ email: userEmail, date: new Date().toISOString(), type: 'Proposal Unlock' });
    localStorage.setItem('lumina_leads', JSON.stringify(leads));
  };

  const getProposalText = () => {
    return `=====================================================
CLIENT PROPOSAL & SCOPE OF WORK
Prepared by: ${agencyName}
Prepared for: ${clientName}
Target Investment: $${budget}
=====================================================

1. EXECUTIVE SUMMARY & PROBLEM STATEMENT
${clientName} is currently losing high-intent leads due to manual response delays and fragmented content distribution. ${agencyName} proposes a high-velocity AI system designed to automate customer engagement and scale organic customer acquisition.

2. PROPOSED DELIVERABLES & AI ARCHITECTURE
- Core Solution: ${solution}
- Automated Lead Intake & Qualifying Agent
- 30-Day High-CTR Content Engine (Viral Video Hooks + Copy)
- Real-time Analytics & CRM Integration

3. PROJECTED ROI & VALUE DELIVERED
By implementing this automated architecture, ${clientName} is projected to:
- Reduce customer acquisition costs (CAC) by 35%
- Increase lead-to-call conversion rates from 2% to 5.5%
- Save an estimated 40+ staff hours per month in routine follow-ups

4. INVESTMENT & MILESTONE TERMS
Total Fixed Project Fee: $${budget}
- Milestone 1 (50% Deposit): $${(parseFloat(budget.replace(/,/g, '')) * 0.5).toLocaleString()} upon contract signing
- Milestone 2 (50% Final): $${(parseFloat(budget.replace(/,/g, '')) * 0.5).toLocaleString()} upon system deployment & handover

Approved By: __________________________
Date: ${new Date().toLocaleDateString()}`;
  };

  const proposalContent = getProposalText();

  const handleCopy = () => {
    const success = deductCredit();
    if (!success) return;

    soundFx.playClick();
    navigator.clipboard.writeText(proposalContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <FileText size={14} /> Enterprise Lead Magnet
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>AI Pitch Deck & Client Proposal Engine</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Generate high-converting $5k–$20k client proposals, contracts, and agency pitch decks in seconds.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '32px' }}>
        {/* Controls */}
        <div>
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label">Your Company / Agency Name</label>
            <input
              type="text"
              className="input-field"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label className="input-label">Target Client Name</label>
            <input
              type="text"
              className="input-field"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label className="input-label">Target Investment / Fee ($)</label>
            <input
              type="text"
              className="input-field"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label className="input-label">Core Solution / Deliverables Description</label>
            <textarea
              className="input-field"
              rows={3}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </div>
        </div>

        {/* Generated Proposal Output & Lead Gate */}
        <div style={{
          background: 'rgba(7, 9, 19, 0.9)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-glow)',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          position: 'relative',
          minHeight: '360px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span className="badge badge-gold">Proposal Preview</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                Estimated Closing Rate: 78%
              </span>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-code)',
              fontSize: '0.82rem',
              lineHeight: 1.6,
              color: 'var(--text-main)',
              maxHeight: '260px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              border: '1px solid var(--border-light)',
              filter: !isUnlocked ? 'blur(3.5px)' : 'none',
              userSelect: !isUnlocked ? 'none' : 'text',
              transition: 'all 0.3s ease'
            }}>
              {proposalContent}
            </div>
          </div>

          {/* Lead Gate Overlay */}
          {!isUnlocked ? (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(7, 9, 19, 0.88)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 183, 3, 0.15)',
                border: '1px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                marginBottom: '14px'
              }}>
                <Lock size={22} color="var(--accent-gold)" />
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>
                Unlock Full Proposal & Export
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px', maxWidth: '320px' }}>
                Enter your work email to view, copy, and export this $8.5k proposal template.
              </p>

              <form onSubmit={handleUnlock} style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '360px' }}>
                <input
                  type="email"
                  className="input-field"
                  placeholder="name@company.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-gold" style={{ whiteSpace: 'nowrap', padding: '10px 16px' }}>
                  Unlock Free <Send size={14} />
                </button>
              </form>
            </div>
          ) : (
            <div style={{ marginTop: '16px' }}>
              <button
                className="btn-primary"
                onClick={handleCopy}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {copied ? <Check size={18} color="var(--accent-emerald)" /> : <Copy size={18} />}
                {copied ? 'Copied Full Proposal!' : 'Copy Proposal Text (-1 Credit)'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
