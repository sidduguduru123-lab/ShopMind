import React from 'react';
import {
  Layers,
  ArrowRight,
  TrendingUp,
  Percent,
  Sparkles,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { mockMarketBasket } from '../services/mockData';

export default function MarketBasketView({ onNavigate }) {
  const rules = mockMarketBasket;

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Market Basket Affinity & Association Mining</h1>
          <span className="badge badge-ai">Apriori + FP-Growth Algorithm</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Uncovers hidden product co-purchasing patterns from 2,270 POS customer receipts to optimize store shelf placement and cross-sell bundles.
        </p>
      </div>

      {/* Rules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {rules.map((rule, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Rule Header: Pair Representation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                Affinity Rule #{idx + 1}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.9rem' }}>
                <TrendingUp size={16} /> {rule.expectedLiftPct} Lift
              </div>
            </div>

            {/* Visual Antecedent -> Consequent Flow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>PRIMARY ITEM</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                  {rule.antecedent}
                </div>
              </div>

              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)' }}>
                <ArrowRight size={16} />
              </div>

              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>CO-PURCHASED ITEM</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '2px', color: 'var(--primary-light)' }}>
                  {rule.consequent}
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center', fontSize: '0.8rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '6px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Confidence</div>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{Math.round(rule.confidence * 100)}%</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '6px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Support</div>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{Math.round(rule.support * 100)}%</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '6px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Lift Ratio</div>
                <div style={{ fontWeight: 800, color: 'var(--accent-emerald)' }}>{rule.lift}x</div>
              </div>
            </div>

            {/* Merchandising Strategy */}
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, background: 'rgba(99, 102, 241, 0.05)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-accent)' }}>
              <strong>AI Merchandising Strategy:</strong> {rule.strategy}
            </div>

            {/* Trigger POS Action */}
            <button
              onClick={() => onNavigate('pos')}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', justifyContent: 'center' }}
            >
              <ShoppingBag size={15} /> Test Bundle at POS Checkout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
