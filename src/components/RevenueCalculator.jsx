import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Zap, Crown, BarChart3, ArrowRight } from 'lucide-react';

export default function RevenueCalculator({ onOpenUpgrade }) {
  const [visitors, setVisitors] = useState(25000);
  const [conversionRate, setConversionRate] = useState(2.5);
  const [price, setPrice] = useState(29);
  const [churn, setChurn] = useState(4.0);

  // Math calculations
  const newCustomersPerMonth = Math.round(visitors * (conversionRate / 100));
  const avgLifespanMonths = churn > 0 ? (100 / churn) : 24;
  const ltv = Math.round(price * avgLifespanMonths);
  const maxCacTarget = Math.round(ltv * 0.3); // 3:1 LTV:CAC rule of thumb
  const monthlyRevenue = newCustomersPerMonth * price;
  const annualRevenue = monthlyRevenue * 12;

  // Monthly ARR compounding projection for 6 months
  const monthlyProjections = Array.from({ length: 6 }, (_, i) => {
    const month = i + 1;
    // Compounded subscriber base factoring in churn
    let totalSubs = 0;
    for (let m = 0; m < month; m++) {
      totalSubs = (totalSubs * (1 - churn / 100)) + newCustomersPerMonth;
    }
    return {
      month: `M${month}`,
      subs: Math.round(totalSubs),
      mrr: Math.round(totalSubs * price)
    };
  });

  const maxProjectedMrr = monthlyProjections[monthlyProjections.length - 1].mrr || 1;

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
          <div className="badge badge-gold" style={{ marginBottom: '8px' }}>
            <DollarSign size={14} /> Creator Financial Engine
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>SaaS & Creator Revenue Simulator</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Model your traffic, conversion rate, and pricing to see how fast your business can scale to $10k+/mo.
          </p>
        </div>

        <button className="btn-gold" onClick={onOpenUpgrade} style={{ fontSize: '0.88rem' }}>
          <Crown size={16} /> Scale Faster with Pro
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '36px' }}>
        {/* Sliders Input Panel */}
        <div>
          {/* Slider 1: Monthly Visitors */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label" style={{ margin: 0 }}>Monthly Site Visitors</span>
              <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
                {visitors.toLocaleString()} /mo
              </strong>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="1000"
              value={visitors}
              onChange={(e) => setVisitors(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
            />
          </div>

          {/* Slider 2: Conversion Rate */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label" style={{ margin: 0 }}>Visitor Conversion Rate</span>
              <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-code)' }}>
                {conversionRate}%
              </strong>
            </div>
            <input
              type="range"
              min="0.5"
              max="10.0"
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
            />
          </div>

          {/* Slider 3: Product Price */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label" style={{ margin: 0 }}>Subscription / Product Price</span>
              <strong style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-code)' }}>
                ${price} /mo
              </strong>
            </div>
            <input
              type="range"
              min="5"
              max="299"
              step="1"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
            />
          </div>

          {/* Slider 4: Monthly Churn */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label" style={{ margin: 0 }}>Monthly Churn Rate</span>
              <strong style={{ color: 'var(--accent-pink)', fontFamily: 'var(--font-code)' }}>
                {churn}%
              </strong>
            </div>
            <input
              type="range"
              min="1.0"
              max="15.0"
              step="0.5"
              value={churn}
              onChange={(e) => setChurn(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-pink)' }}
            />
          </div>

          {/* Key Output Metrics Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{
              background: 'rgba(7, 9, 19, 0.7)',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Est. Customer LTV</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
                ${ltv}
              </div>
            </div>

            <div style={{
              background: 'rgba(7, 9, 19, 0.7)',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Target Max CAC</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold)', fontFamily: 'var(--font-code)' }}>
                ${maxCacTarget}
              </div>
            </div>
          </div>
        </div>

        {/* Projections & Visual Chart Panel */}
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
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Projected New MRR / Month
            </div>
            <div style={{
              fontSize: '2.6rem',
              fontWeight: 800,
              fontFamily: 'var(--font-code)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px'
            }} className="gradient-gold-text">
              ${monthlyRevenue.toLocaleString()} <span style={{ fontSize: '1rem', color: 'var(--text-dim)', fontWeight: 500 }}>/mo</span>
            </div>

            {/* Visual Bar Chart */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BarChart3 size={14} color="var(--accent-cyan)" /> 6-Month Cumulative Growth Curve
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '140px', paddingTop: '20px' }}>
                {monthlyProjections.map((p) => {
                  const heightPercent = Math.max(15, Math.round((p.mrr / maxProjectedMrr) * 100));
                  return (
                    <div key={p.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
                        ${(p.mrr / 1000).toFixed(1)}k
                      </span>
                      <div
                        style={{
                          width: '100%',
                          height: `${heightPercent}%`,
                          background: 'var(--gradient-primary)',
                          borderRadius: '4px 4px 0 0',
                          boxShadow: '0 0 10px rgba(0, 242, 254, 0.3)',
                          transition: 'height 0.4s ease'
                        }}
                      />
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {p.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Upsell Callout */}
          <div style={{
            background: 'rgba(127, 0, 255, 0.15)',
            border: '1px solid rgba(127, 0, 255, 0.3)',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                Ready to hit ${monthlyRevenue.toLocaleString()}/mo?
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Use Lumina Pro's high-converting copy & prompt suite.
              </div>
            </div>
            <button className="btn-primary" onClick={onOpenUpgrade} style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
              Get Pro <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
