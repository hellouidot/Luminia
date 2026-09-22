import React, { useState } from 'react';
import { Target, TrendingUp, DollarSign, BarChart2, ArrowRight, ShieldAlert } from 'lucide-react';
import { soundFx } from '../utils/soundUtils';

export default function AdRoasCalculator({ onOpenUpgrade }) {
  const [adBudget, setAdBudget] = useState(5000);
  const [cpc, setCpc] = useState(2.20);
  const [convRate, setConvRate] = useState(3.5);
  const [aov, setAov] = useState(120);

  // Calculations
  const clicks = Math.round(adBudget / (cpc || 1));
  const conversions = Math.round(clicks * (convRate / 100));
  const cpa = conversions > 0 ? Math.round(adBudget / conversions) : 0;
  const grossRevenue = conversions * aov;
  const netProfit = grossRevenue - adBudget;
  const roas = adBudget > 0 ? (grossRevenue / adBudget).toFixed(2) : 0;

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
            <Target size={14} /> Performance Marketing Engine
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Paid Ads ROAS & Acquisition Simulator</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Calculate target CPA, break-even ROAS, and net profit before spending a single dollar on ad campaigns.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '36px' }}>
        {/* Sliders Input Panel */}
        <div>
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label" style={{ margin: 0 }}>Monthly Ad Budget ($)</span>
              <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
                ${adBudget.toLocaleString()}
              </strong>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={adBudget}
              onChange={(e) => setAdBudget(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label" style={{ margin: 0 }}>Avg Cost Per Click (CPC)</span>
              <strong style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-code)' }}>
                ${cpc.toFixed(2)}
              </strong>
            </div>
            <input
              type="range"
              min="0.50"
              max="15.00"
              step="0.10"
              value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label" style={{ margin: 0 }}>Landing Page Conv Rate</span>
              <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-code)' }}>
                {convRate}%
              </strong>
            </div>
            <input
              type="range"
              min="0.5"
              max="15.0"
              step="0.1"
              value={convRate}
              onChange={(e) => setConvRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label" style={{ margin: 0 }}>Avg Order Value / LTV ($)</span>
              <strong style={{ color: 'var(--accent-purple)', fontFamily: 'var(--font-code)' }}>
                ${aov}
              </strong>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
            />
          </div>
        </div>

        {/* Results Output */}
        <div style={{
          background: 'rgba(7, 9, 19, 0.9)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-glow)',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Target ROAS</div>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: Number(roas) >= 3 ? 'var(--accent-emerald)' : 'var(--accent-gold)',
                  fontFamily: 'var(--font-code)'
                }}>
                  {roas}x
                </div>
              </div>

              <div style={{
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cost Per Acquisition</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
                  ${cpa}
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '20px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Projected Monthly Net Profit</div>
              <div style={{
                fontSize: '2.4rem',
                fontWeight: 800,
                fontFamily: 'var(--font-code)',
                color: netProfit >= 0 ? 'var(--accent-emerald)' : 'var(--accent-red)'
              }}>
                ${netProfit.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                Gross Sales: ${grossRevenue.toLocaleString()} from {conversions} buyers
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(0, 242, 254, 0.1)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                Need 3x+ ROAS Ad Hooks?
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Use Lumina's AI Copy generator to craft high-converting ads.
              </div>
            </div>
            <button className="btn-primary" onClick={onOpenUpgrade} style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
              Create Ads <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
