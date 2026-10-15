import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Layers,
  Sparkles,
  BarChart2,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { mockProducts } from '../services/mockData';

export default function ForecastingView() {
  const [selectedProductId, setSelectedProductId] = useState(mockProducts[0].id);
  const [forecastHorizon, setForecastHorizon] = useState(30);

  const product = mockProducts.find((p) => p.id === Number(selectedProductId)) || mockProducts[0];

  // Generate smooth, realistic demand curve points
  const points = Array.from({ length: 14 }, (_, idx) => {
    const day = idx + 1;
    const baseDemand = 28;
    const seasonality = Math.sin(day / 2) * 8;
    const noise = ((day * 7) % 5) - 2;
    const expected = Math.max(10, Math.round(baseDemand + seasonality + noise));
    const upper = Math.round(expected * 1.25);
    const lower = Math.round(expected * 0.78);
    return { day, expected, upper, lower };
  });

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Predictive Demand Forecasting</h1>
            <span className="badge badge-ai">Prophet + LightGBM</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Multi-horizon daily unit demand predictions with 95% confidence intervals and seasonal indexing.
          </p>
        </div>

        {/* Selectors */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(Number(e.target.value))}
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '0.55rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
              maxWidth: '300px',
            }}
          >
            {mockProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={forecastHorizon}
            onChange={(e) => setForecastHorizon(Number(e.target.value))}
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '0.55rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
            }}
          >
            <option value={14}>Next 14 Days</option>
            <option value={30}>Next 30 Days</option>
            <option value={60}>Next 60 Days</option>
          </select>
        </div>
      </div>

      {/* Main Forecast Card */}
      <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{product.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Category: {product.category} • Current Stock: {product.availableQty} units • Unit: {product.unit}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Predicted 30-Day Volume</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-light)' }}>840 units</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stockout Risk Probability</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>4.2% (Low)</div>
            </div>
          </div>
        </div>

        {/* Visual Forecast Chart */}
        <div style={{ height: '260px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
          {points.map((pt, idx) => {
            const maxVal = 45;
            const barHeight = (pt.expected / maxVal) * 100;
            return (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>{pt.expected}</div>
                <div
                  style={{
                    width: '100%',
                    height: `${barHeight}%`,
                    background: 'linear-gradient(180deg, #818cf8 0%, #4f46e5 100%)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease',
                  }}
                  title={`Day ${pt.day}: ${pt.expected} units (Confidence: ${pt.lower} - ${pt.upper})`}
                />
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>D+{pt.day}</div>
              </div>
            );
          })}
        </div>

        {/* Forecast Drivers & Commentary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>SEASONALITY FACTOR</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem', color: 'var(--accent-emerald)' }}>+16.4% Peak Weekend Lift</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Historical surge observed during Friday to Sunday evening hours.</div>
          </div>
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>WEATHER SENSITIVITY</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem', color: 'var(--accent-cyan)' }}>Neutral Index (1.02x)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Pantry staple; minimal volatility from local rainfall telemetry.</div>
          </div>
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>CROSS-CATEGORY ELASTICITY</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem', color: 'var(--accent-violet)' }}>Affinity Co-efficient: 0.76</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Sunflower Oil demand triggers simultaneous 0.72 units of rice.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
