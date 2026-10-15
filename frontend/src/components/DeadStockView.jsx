import React, { useState } from 'react';
import {
  PackageX,
  Coins,
  ArrowRightLeft,
  Tag,
  Clock,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { mockDeadStock } from '../services/mockData';

export default function DeadStockView() {
  const [items, setItems] = useState(mockDeadStock);
  const [transferSuccess, setTransferSuccess] = useState(null);

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const totalLockedCapital = items.reduce((sum, i) => sum + i.lockedCapital, 0);

  const handleInitiateTransfer = (item) => {
    setTransferSuccess(
      `Inter-branch stock transfer initiated for ${item.name} (${item.availableQty} units). Routing to high-velocity branch.`
    );
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header with Capital Metric */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Dead Stock & Capital Liquidation</h1>
            <span className="badge badge-warning">Working Capital Unlocking</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Identifies stagnant SKUs with 30+ days without sales and recommends clearance bundling or inter-branch transfers.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '0.75rem 1.25rem', borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL LOCKED CAPITAL</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ef4444', fontFamily: 'var(--font-display)' }}>
            {formatINR(totalLockedCapital)}
          </div>
        </div>
      </div>

      {transferSuccess && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{transferSuccess}</span>
          <button onClick={() => setTransferSuccess(null)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>✕</button>
        </div>
      )}

      {/* Dead Stock Items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {items.map((item) => (
          <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{item.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  SKU: {item.sku} • Location: {item.branch}
                </div>
              </div>

              <span className="badge badge-danger">
                {item.idleDays} Days Idle
              </span>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Trapped Capital</div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ef4444', marginTop: '2px' }}>
                  {formatINR(item.lockedCapital)}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Holding Cost Rate</div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  ₹{item.dailyHoldingCost} / day
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(99, 102, 241, 0.06)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-accent)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <strong style={{ color: 'var(--primary-light)' }}>Liquidation Directive:</strong> {item.recommendation}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button
                onClick={() => handleInitiateTransfer(item)}
                className="btn-primary"
                style={{ flex: 1, fontSize: '0.8rem', justifyContent: 'center' }}
              >
                <ArrowRightLeft size={15} /> Inter-Branch Transfer
              </button>
              <button
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}
              >
                <Tag size={15} /> Flash Bundle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
