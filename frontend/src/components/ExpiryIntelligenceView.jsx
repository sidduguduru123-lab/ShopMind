import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  Tag,
  CheckCircle,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { mockExpiryItems } from '../services/mockData';

export default function ExpiryIntelligenceView() {
  const [items, setItems] = useState(mockExpiryItems);
  const [actionNotice, setActionNotice] = useState(null);

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const applyDiscount = (item, discountPct) => {
    setActionNotice(
      `Instant markdown applied: ${item.productName} (Batch ${item.batchNumber}) discounted by ${discountPct}% across POS terminals to liquidate before expiry.`
    );
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Perishable Expiry & Freshness Intelligence</h1>
          <span className="badge badge-warning">FIFO + Markdown Optimization</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Monitors FMCG batches, milk, and shelf-life horizons. Recommends dynamic markdown clearance before write-off deadlines.
        </p>
      </div>

      {actionNotice && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{actionNotice}</span>
          <button onClick={() => setActionNotice(null)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>✕</button>
        </div>
      )}

      {/* Expiry Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {items.map((item) => {
          const isCritical = item.urgency === 'CRITICAL';
          return (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                borderTop: isCritical ? '4px solid var(--danger)' : '4px solid var(--warning)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{item.productName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Batch: {item.batchNumber} • Branch: {item.branch}
                  </div>
                </div>

                <span className={isCritical ? 'badge badge-danger' : 'badge badge-warning'}>
                  {item.expiryDate}
                </span>
              </div>

              {/* Financial Risk Details */}
              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Stock At Risk</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', marginTop: '2px' }}>{item.quantity} units</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Potential Write-Off Cost</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ef4444', marginTop: '2px' }}>
                    {formatINR(item.costAtRisk)}
                  </div>
                </div>
              </div>

              {/* Strategy Dossier */}
              <div style={{ background: 'rgba(99, 102, 241, 0.06)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-accent)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <strong style={{ color: 'var(--primary-light)' }}>AI Preservation Strategy:</strong> {item.strategy}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button
                  onClick={() => applyDiscount(item, 20)}
                  className="btn-primary"
                  style={{ flex: 1, fontSize: '0.8rem', justifyContent: 'center' }}
                >
                  <Tag size={15} /> Apply 20% Markdown
                </button>
                <button
                  onClick={() => applyDiscount(item, 10)}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}
                >
                  10% Flash
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
