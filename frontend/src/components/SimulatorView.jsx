import React, { useState } from 'react';
import {
  Sliders,
  DollarSign,
  TrendingUp,
  Percent,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function SimulatorView() {
  const [currentPrice, setCurrentPrice] = useState(399); // e.g. Basmati Rice 5kg
  const [costPrice] = useState(320);
  const [newPrice, setNewPrice] = useState(369);
  const [monthlyDemand, setMonthlyDemand] = useState(120);
  const [marketingBudget, setMarketingBudget] = useState(2500);
  const [elasticity, setElasticity] = useState(-1.65);

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  // Simulation calculation
  const pricePctChange = (newPrice - currentPrice) / currentPrice;
  const organicDemandChange = monthlyDemand * elasticity * pricePctChange;
  const marketingDemandLift = Math.round((marketingBudget / 500) * 4); // each 500 in ads yields ~4 units
  const projectedDemand = Math.max(0, Math.round(monthlyDemand + organicDemandChange + marketingDemandLift));

  const currentRevenue = monthlyDemand * currentPrice;
  const currentProfit = monthlyDemand * (currentPrice - costPrice);

  const projectedRevenue = projectedDemand * newPrice;
  const projectedGrossProfit = projectedDemand * (newPrice - costPrice);
  const projectedNetProfit = projectedGrossProfit - marketingBudget;

  const profitDiff = projectedNetProfit - currentProfit;
  const revenueDiff = projectedRevenue - currentRevenue;

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Retail What-If Scenario Lab</h1>
          <span className="badge badge-ai">Micro-Economic Simulation</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Simulate price adjustments, discount campaigns, and localized ad spend to evaluate projected demand, revenue, and net profit before execution.
        </p>
      </div>

      {/* Main Simulation Board */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.5rem' }}>
        {/* Controls Column */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Simulation Parameters</h3>

          {/* Current Price vs New Price Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Target Selling Price</span>
              <span style={{ fontWeight: 800, color: 'var(--primary-light)' }}>{formatINR(newPrice)}</span>
            </div>
            <input
              type="range"
              min={330}
              max={450}
              step={5}
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              style={{ width: '100%', marginTop: '0.5rem', accentColor: 'var(--primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>Cost Floor: {formatINR(costPrice)}</span>
              <span>Baseline: {formatINR(currentPrice)}</span>
              <span>Premium: ₹450</span>
            </div>
          </div>

          {/* Marketing Budget Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Promotional Ad Budget</span>
              <span style={{ fontWeight: 800, color: 'var(--accent-emerald)' }}>{formatINR(marketingBudget)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={10000}
              step={500}
              value={marketingBudget}
              onChange={(e) => setMarketingBudget(Number(e.target.value))}
              style={{ width: '100%', marginTop: '0.5rem', accentColor: 'var(--accent-emerald)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>₹0 (Organic)</span>
              <span>₹5,000</span>
              <span>₹10,000 (Aggressive)</span>
            </div>
          </div>

          {/* Elasticity Metric */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Price Elasticity of Demand (ε)</span>
              <span style={{ fontWeight: 800, color: 'var(--accent-violet)' }}>{elasticity}</span>
            </div>
            <input
              type="range"
              min={-3.0}
              max={-0.5}
              step={0.05}
              value={elasticity}
              onChange={(e) => setElasticity(Number(e.target.value))}
              style={{ width: '100%', marginTop: '0.5rem', accentColor: 'var(--accent-violet)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>-3.0 (Highly Elastic)</span>
              <span>-1.65 (Grocery Average)</span>
              <span>-0.5 (Inelastic)</span>
            </div>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            Price change: <strong>{((pricePctChange) * 100).toFixed(1)}%</strong>. Projected customer velocity shifts by <strong>{((projectedDemand - monthlyDemand) / monthlyDemand * 100).toFixed(1)}%</strong>.
          </div>
        </div>

        {/* Results Column: Projection Comparisons */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Projected Business Impact</h3>

          {/* Outcome Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {/* Projected Demand */}
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>MONTHLY DEMAND</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.25rem', fontFamily: 'var(--font-display)' }}>
                {projectedDemand} <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}>units</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: projectedDemand >= monthlyDemand ? 'var(--accent-emerald)' : '#ef4444', marginTop: '0.2rem', fontWeight: 600 }}>
                {projectedDemand >= monthlyDemand ? '+' : ''}{projectedDemand - monthlyDemand} units ({((projectedDemand - monthlyDemand) / monthlyDemand * 100).toFixed(1)}%)
              </div>
            </div>

            {/* Projected Revenue */}
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROJECTED REVENUE</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.25rem', fontFamily: 'var(--font-display)' }}>
                {formatINR(projectedRevenue)}
              </div>
              <div style={{ fontSize: '0.75rem', color: revenueDiff >= 0 ? 'var(--accent-emerald)' : '#ef4444', marginTop: '0.2rem', fontWeight: 600 }}>
                {revenueDiff >= 0 ? '+' : ''}{formatINR(revenueDiff)}
              </div>
            </div>

            {/* Projected Net Profit */}
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: profitDiff >= 0 ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROJECTED NET PROFIT</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.25rem', fontFamily: 'var(--font-display)', color: profitDiff >= 0 ? 'var(--accent-emerald)' : '#ef4444' }}>
                {formatINR(projectedNetProfit)}
              </div>
              <div style={{ fontSize: '0.75rem', color: profitDiff >= 0 ? 'var(--accent-emerald)' : '#ef4444', marginTop: '0.2rem', fontWeight: 600 }}>
                {profitDiff >= 0 ? '+' : ''}{formatINR(profitDiff)} vs baseline
              </div>
            </div>
          </div>

          {/* AI Strategy Evaluation Banner */}
          <div style={{ background: profitDiff >= 0 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', border: profitDiff >= 0 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: profitDiff >= 0 ? 'var(--accent-emerald)' : '#ef4444' }}>
              <Sparkles size={18} />
              <span>AI Scenario Evaluation: {profitDiff >= 0 ? 'FEASIBLE & PROFIT-ACCRETIVE' : 'DILUTIVE SCENARIO'}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.5rem', lineHeight: 1.5 }}>
              {profitDiff >= 0
                ? `Reducing price to ${formatINR(newPrice)} with ${formatINR(marketingBudget)} ad budget stimulates unit volume sufficiently to offset margin contraction, yielding a net profit increase of ${formatINR(profitDiff)}.`
                : `The price and ad spend configuration causes margin erosion that outpaces volume expansion. Consider capping promotional ad budget at ₹1,500 or raising price closer to ${formatINR(currentPrice)}.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
