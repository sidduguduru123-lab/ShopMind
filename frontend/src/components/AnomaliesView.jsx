import React from 'react';
import {
  AlertTriangle,
  Zap,
  TrendingDown,
  Clock,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { mockAnomalies } from '../services/mockData';

export default function AnomaliesView() {
  const anomalies = mockAnomalies;

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Store Anomaly & Shrinkage Radar</h1>
          <span className="badge badge-danger">Isolation Forest + Telemetry</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Real-time detection of cashier void spikes, irregular shelf velocity collapses, and inventory shrinkage patterns.
        </p>
      </div>

      {/* Anomaly Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {anomalies.map((item) => (
          <div
            key={item.id}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderLeft: '4px solid var(--danger)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '0.4rem', borderRadius: '8px' }}>
                  <Zap size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{item.productName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ID: {item.id} • SKU: {item.sku} • Location: {item.branch} • Detected: {item.detectedAt}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge badge-danger">{item.severity} SEVERITY</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ef4444', fontFamily: 'var(--font-mono)' }}>
                  {item.deviationPct}
                </span>
              </div>
            </div>

            {/* Metrics Comparison Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Observed Anomaly Metric</div>
                <div style={{ fontWeight: 700, marginTop: '2px' }}>{item.metric}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Baseline Normal Value</div>
                <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>{item.expectedValue}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Recorded Deviation Value</div>
                <div style={{ fontWeight: 800, marginTop: '2px', color: '#ef4444' }}>{item.actualValue}</div>
              </div>
            </div>

            {/* AI Root-Cause Diagnostic & Remediation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase' }}>
                  AI Root Cause Analysis:
                </div>
                <p style={{ marginTop: '0.35rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.aiDiagnosis}
                </p>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
                  Prescribed Corrective Action:
                </div>
                <p style={{ marginTop: '0.35rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {item.recommendedAction}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
