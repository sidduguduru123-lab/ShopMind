import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  Truck,
  ShieldAlert,
  Send,
  Calendar,
  Layers,
} from 'lucide-react';
import { mockReorders } from '../services/mockData';

export default function SmartReorderView() {
  const [reorders, setReorders] = useState(mockReorders);
  const [selectedItem, setSelectedItem] = useState(mockReorders[0]);
  const [poCreated, setPoCreated] = useState(null);

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const handleCreatePo = (item) => {
    setPoCreated({
      poNumber: 'PO-2026-' + Math.floor(100 + Math.random() * 900),
      supplier: item.supplier,
      product: item.name,
      quantity: item.recommendedQty,
      cost: item.recommendedQty * item.costPrice,
      etaDays: item.leadTimeDays,
    });
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>AI Smart Reorder & EOQ Optimizer</h1>
            <span className="badge badge-ai">Dynamic Safety Stock</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Calculates Economic Order Quantities (EOQ) and stockout probabilities by factoring in supplier lead times and daily sales velocity.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', color: '#ef4444', fontSize: '0.85rem', fontWeight: 700 }}>
            {reorders.length} SKU(s) Below Safety Floor
          </div>
        </div>
      </div>

      {/* Main Grid: Reorder Recommendations Table + Detailed Explanatory Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '1.5rem' }}>
        {/* Left: Reorder Candidate Items List */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Critical Stock Replenishment Pipeline</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {reorders.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const isCritical = item.urgency === 'CRITICAL';
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-tertiary)',
                    border: isSelected ? '1px solid var(--primary-light)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {item.name}
                        </span>
                        <span className={isCritical ? 'badge badge-danger' : 'badge badge-warning'}>
                          {item.urgency}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        SKU: {item.sku} • Branch: {item.branch}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stock Depletion Horizon</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: isCritical ? '#ef4444' : '#f59e0b' }}>
                        {item.runoutDays} Days Left
                      </div>
                    </div>
                  </div>

                  {/* Velocity & Stock Progress */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>On Hand</div>
                      <div style={{ fontWeight: 700 }}>{item.availableQty} units</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Daily Run-Rate</div>
                      <div style={{ fontWeight: 700 }}>{item.dailyVelocity} / day</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Lead Time</div>
                      <div style={{ fontWeight: 700 }}>{item.leadTimeDays} days</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>AI Order Size</div>
                      <div style={{ fontWeight: 800, color: 'var(--primary-light)' }}>+{item.recommendedQty} units</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI Reorder Intelligence & PO Generation */}
        {selectedItem && (
          <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.4rem', borderRadius: '8px', color: 'var(--primary-light)' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Decision Support Dossier</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Algorithms: Holt-Winters Smoothing + Wilson EOQ</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {selectedItem.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {selectedItem.reason}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Assigned Vendor</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{selectedItem.supplier}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Estimated Procurement Cost</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    {formatINR(selectedItem.recommendedQty * selectedItem.costPrice)}
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaic Verification Pill */}
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-accent)', background: 'rgba(99, 102, 241, 0.05)', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary-light)' }}>EOQ Reorder Formula:</div>
              <div>Buffer Required = (Daily Velocity {selectedItem.dailyVelocity} × Lead Time {selectedItem.leadTimeDays}) + Safety Stock</div>
              <div>Recommended Batch = {selectedItem.recommendedQty} units to minimize storage carrying cost.</div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleCreatePo(selectedItem)}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
            >
              <Truck size={18} /> Generate Instant Purchase Order
            </button>
          </div>
        )}
      </div>

      {/* PO Generated Banner Modal */}
      {poCreated && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="glass-panel" style={{ maxWidth: '440px', width: '100%', padding: '2rem', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <CheckCircle size={30} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Purchase Order Dispatched!</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {poCreated.poNumber} transmitted to {poCreated.supplier}
              </p>
            </div>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>Product: <strong>{poCreated.product}</strong></div>
              <div>Replenishment Quantity: <strong>{poCreated.quantity} units</strong></div>
              <div>Estimated Total: <strong>{formatINR(poCreated.cost)}</strong></div>
              <div>Estimated Transit Lead Time: <strong>{poCreated.etaDays} business days</strong></div>
            </div>
            <button onClick={() => setPoCreated(null)} className="btn-primary" style={{ width: '100%' }}>
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
