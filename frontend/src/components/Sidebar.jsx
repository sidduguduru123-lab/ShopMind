import React from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  PackageX,
  Clock,
  Sliders,
  Store,
  Layers,
  BotMessageSquare,
  Building2,
  Users,
  LogOut,
  Sun,
  Moon,
  Activity,
  Zap,
} from 'lucide-react';
import SynapseLogo from './SynapseLogo';

export default function Sidebar({ activeTab, setActiveTab, currentTheme, toggleTheme, user, onLogout }) {
  const menuGroups = [
    {
      title: 'COMMAND CENTER',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, badge: 'Live' },
        { id: 'pos', label: 'POS Terminal & Billing', icon: ShoppingCart, highlight: true },
        { id: 'inventory', label: 'Multi-Branch Inventory', icon: Boxes },
        { id: 'orders', label: 'Omnichannel Orders', icon: Store },
      ],
    },
    {
      title: 'AI & DECISION INTELLIGENCE',
      items: [
        { id: 'smart-reorder', label: 'Smart Reorder & EOQ', icon: Sparkles, badge: 'AI' },
        { id: 'forecasting', label: 'Demand Forecasting', icon: TrendingUp },
        { id: 'market-basket', label: 'Market Basket Affinity', icon: Layers },
        { id: 'anomalies', label: 'Anomaly & Shrinkage', icon: AlertTriangle, alertCount: 2 },
        { id: 'expiry-intelligence', label: 'Expiry & Freshness', icon: Clock, alertCount: 3 },
        { id: 'dead-stock', label: 'Dead Stock Clearance', icon: PackageX },
        { id: 'simulator', label: 'What-If Scenario Lab', icon: Sliders },
        { id: 'copilot', label: 'Retail AI Copilot', icon: BotMessageSquare, badge: 'GPT' },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { id: 'customers', label: 'Customer Segments', icon: Users },
        { id: 'branches', label: 'Branch Operations', icon: Building2 },
      ],
    },
  ];

  return (
    <aside
      style={{
        width: '290px',
        minWidth: '290px',
        height: '100vh',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        userSelect: 'none',
        boxShadow: 'var(--shadow-sm)',
        transition: 'background var(--transition-base), border-color var(--transition-base)',
      }}
    >
      {/* Brand Header: Synapse Omnichannel */}
      <div
        style={{
          padding: '1.2rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-secondary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          <SynapseLogo size={36} animated={true} glow={true} />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                Synapse <span className="gradient-text">Omnichannel</span>
              </span>
            </div>
            <div
              style={{
                fontSize: '0.66rem',
                color: 'var(--text-muted)',
                lineHeight: 1.2,
                marginTop: '1px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '185px',
              }}
              title="Synapse Omnichannel — Uses a neural metaphor to highlight data connectivity across channels."
            >
              Neural Omnichannel Fabric
            </div>
          </div>
        </div>

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-medium)',
            borderRadius: '9px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
          title={currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {currentTheme === 'dark' ? <Sun size={15} color="#38bdf8" /> : <Moon size={15} color="#4f46e5" />}
        </button>
      </div>

      {/* Neural Fabric Status Pill */}
      <div
        style={{
          margin: '0.75rem 0.85rem 0.25rem',
          padding: '0.55rem 0.75rem',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
          border: '1px solid var(--border-neural)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="live-indicator" />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.01em' }}>
            Neural Synapse Active
          </span>
        </div>
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            color: '#0891b2',
            background: 'rgba(6, 182, 212, 0.14)',
            padding: '0.15rem 0.45rem',
            borderRadius: '999px',
          }}
        >
          3 Nodes Linked
        </span>
      </div>

      {/* Navigation Groups */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.75rem 0.65rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.1rem',
        }}
      >
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <div
              style={{
                fontSize: '0.66rem',
                fontWeight: 800,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                padding: '0 0.75rem 0.45rem',
                textTransform: 'uppercase',
                opacity: 0.8,
              }}
            >
              {group.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.62rem 0.85rem',
                      borderRadius: '10px',
                      border: 'none',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(99, 102, 241, 0.15) 100%)'
                        : item.highlight
                        ? 'rgba(16, 185, 129, 0.08)'
                        : 'transparent',
                      borderLeft: isActive ? '3.5px solid #06b6d4' : '3.5px solid transparent',
                      color: isActive
                        ? 'var(--primary-light)'
                        : item.highlight
                        ? 'var(--accent-emerald)'
                        : 'var(--text-secondary)',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'var(--bg-tertiary)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        e.currentTarget.style.background = item.highlight
                          ? 'rgba(16, 185, 129, 0.08)'
                          : 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Icon
                        size={17}
                        style={{
                          opacity: isActive ? 1 : 0.8,
                          color: isActive ? '#06b6d4' : 'inherit',
                          filter: isActive ? 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.5))' : 'none',
                        }}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {item.badge && (
                        <span
                          className={item.badge === 'Live' ? 'badge badge-success' : 'badge badge-ai'}
                          style={{ fontSize: '0.62rem', padding: '0.1rem 0.45rem' }}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.alertCount && (
                        <span
                          style={{
                            background: '#dc2626',
                            color: '#fff',
                            borderRadius: '999px',
                            fontSize: '0.64rem',
                            fontWeight: 800,
                            padding: '0.05rem 0.45rem',
                            minWidth: '18px',
                            textAlign: 'center',
                            boxShadow: '0 2px 6px rgba(220, 38, 38, 0.4)',
                          }}
                        >
                          {item.alertCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer Card */}
      <div
        style={{
          padding: '0.85rem 1rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-tertiary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.82rem',
              fontWeight: 800,
              color: '#ffffff',
              boxShadow: '0 3px 8px rgba(6, 182, 212, 0.35)',
              flexShrink: 0,
            }}
          >
            {user?.username?.substring(0, 2).toUpperCase() || 'SO'}
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.fullName || 'Ravi Kumar'}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span className="live-indicator-green" style={{ width: '6px', height: '6px' }} />
              <span>{user?.role || 'OWNER'} • {user?.branchName || 'Mumbai Node'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.45rem',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s',
          }}
          title="Sign Out"
          onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
