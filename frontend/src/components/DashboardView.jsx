import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Boxes,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  Activity,
  Layers,
  Clock,
  PackageX,
  Zap,
} from 'lucide-react';
import { mockDashboardData } from '../services/mockData';

export default function DashboardView({ onNavigate }) {
  const data = mockDashboardData;
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return { border: 'rgba(239, 68, 68, 0.4)', bg: 'rgba(239, 68, 68, 0.08)', text: '#ef4444' };
      case 'HIGH':
        return { border: 'rgba(245, 158, 11, 0.4)', bg: 'rgba(245, 158, 11, 0.08)', text: '#f59e0b' };
      case 'MEDIUM':
        return { border: 'rgba(59, 130, 246, 0.4)', bg: 'rgba(59, 130, 246, 0.08)', text: '#3b82f6' };
      default:
        return { border: 'rgba(99, 102, 241, 0.4)', bg: 'rgba(99, 102, 241, 0.08)', text: '#818cf8' };
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'REORDER_ALERT':
        return <AlertTriangle size={18} color="#f59e0b" />;
      case 'EXPIRY_RISK':
        return <Clock size={18} color="#ef4444" />;
      case 'DEAD_STOCK':
        return <PackageX size={18} color="#3b82f6" />;
      case 'ANOMALY':
        return <Zap size={18} color="#ec4899" />;
      default:
        return <Sparkles size={18} color="#818cf8" />;
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Top Banner & Branch Filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Executive Command Center</h1>
            <span className="badge badge-ai" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={12} /> Real-Time Telemetry
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Cross-channel visibility across 3 fulfillment branches, live POS counters & AI engine.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Fulfillment Branch:</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="ALL">All Network Branches (3)</option>
            <option value="MUM">Mumbai Flagship (Bandra)</option>
            <option value="BLR">Bengaluru Tech Park</option>
            <option value="DEL">Delhi NCR Hub</option>
          </select>

          <button
            onClick={() => onNavigate('pos')}
            className="btn-primary"
            style={{ padding: '0.5rem 1rem' }}
          >
            <ShoppingCart size={16} /> Open POS Checkout
          </button>
        </div>
      </div>

      {/* KPI Cards Ribbon */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {/* Metric 1: Today Revenue */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>TODAY'S REVENUE</span>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.4rem', borderRadius: '8px', color: 'var(--primary-light)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
            {formatINR(data.todayRevenue)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>
            <ArrowUpRight size={14} />
            <span style={{ fontWeight: 600 }}>+14.2%</span>
            <span style={{ color: 'var(--text-muted)' }}>vs same day last week</span>
          </div>
        </div>

        {/* Metric 2: Today Orders */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>TODAY'S TRANSACTIONS</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.4rem', borderRadius: '8px', color: 'var(--accent-emerald)' }}>
              <ShoppingCart size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
            {data.todayOrders} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>receipts</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>
            <ArrowUpRight size={14} />
            <span style={{ fontWeight: 600 }}>+8.4%</span>
            <span style={{ color: 'var(--text-muted)' }}>AOV: ₹1,198</span>
          </div>
        </div>

        {/* Metric 3: Gross Profit */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>ESTIMATED GROSS PROFIT</span>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '0.4rem', borderRadius: '8px', color: 'var(--accent-cyan)' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
            {formatINR(data.grossProfitToday)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Margin:</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>28.0%</span>
            <span style={{ color: 'var(--text-muted)' }}>healthy</span>
          </div>
        </div>

        {/* Metric 4: Inventory Value */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>ACTIVE INVENTORY ASSETS</span>
            <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '0.4rem', borderRadius: '8px', color: 'var(--accent-violet)' }}>
              <Boxes size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
            {formatINR(data.inventoryValue)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#ef4444', fontWeight: 600 }}>{data.lowStockCount} items critical</span>
            <span style={{ color: 'var(--text-muted)' }}>• 32 SKUs</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Revenue Trend & AI Action Hub */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Weekly Sales & Profit Trajectory */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Sales & Gross Margin Trajectory (Last 7 Days)</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Daily omnichannel revenue vs gross profit margin</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '2px' }} />
                <span>Revenue</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '10px', height: '10px', background: 'var(--accent-emerald)', borderRadius: '2px' }} />
                <span>Gross Profit</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '1.2rem', padding: '1rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            {data.salesTrend.map((item, idx) => {
              const maxRev = 160000;
              const revHeight = (item.revenue / maxRev) * 100;
              const profitHeight = (item.profit / maxRev) * 100;
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', gap: '4px', height: '180px' }}>
                    <div
                      style={{
                        flex: 1,
                        height: `${revHeight}%`,
                        background: 'linear-gradient(180deg, var(--primary-light) 0%, var(--primary-dark) 100%)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease',
                      }}
                      title={`Revenue: ${formatINR(item.revenue)}`}
                    />
                    <div
                      style={{
                        flex: 1,
                        height: `${profitHeight}%`,
                        background: 'linear-gradient(180deg, #34d399 0%, #059669 100%)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease',
                      }}
                      title={`Profit: ${formatINR(item.profit)}`}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{item.day}</span>
                </div>
              );
            })}
          </div>

          {/* Branch Distribution Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', paddingTop: '0.5rem' }}>
            {data.branchComparison.map((b, idx) => (
              <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{b.branch}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.25rem' }}>{formatINR(b.revenue)}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {b.orders} orders • Stock Value: {formatINR(b.inventoryValue)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Action Dispatch Center */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--primary-light)', borderRadius: '50%' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>AI Decision Dispatch</h3>
            </div>
            <span className="badge badge-ai">Automated</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            High-priority operational interventions generated from real-time store telemetry:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, overflowY: 'auto' }}>
            {data.aiInsights.map((insight, idx) => {
              const style = getSeverityStyle(insight.severity);
              return (
                <div
                  key={idx}
                  onClick={() => onNavigate(insight.deepLink)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${style.border}`,
                    background: style.bg,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                >
                  <div style={{ marginTop: '2px' }}>{getInsightIcon(insight.type)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: style.text, textTransform: 'uppercase' }}>
                        {insight.type.replace('_', ' ')} • {insight.severity}
                      </span>
                      <ChevronRight size={14} color="var(--text-muted)" />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.3rem', lineHeight: 1.4 }}>
                      {insight.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => onNavigate('copilot')}
            className="btn-secondary"
            style={{ width: '100%', fontSize: '0.8rem', justifyContent: 'center' }}
          >
            <Sparkles size={15} color="var(--primary-light)" /> Consult Retail AI Copilot
          </button>
        </div>
      </div>

      {/* Category Contribution Section */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Category Revenue & Velocity Matrix</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {data.categoryBreakdown.map((cat, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-tertiary)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                borderLeft: `4px solid ${cat.color}`,
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cat.name}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.4rem', fontFamily: 'var(--font-display)' }}>
                {formatINR(cat.revenue)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {cat.units} units sold today
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
