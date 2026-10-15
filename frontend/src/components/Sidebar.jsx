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
} from 'lucide-react';

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
        width: '280px',
        minWidth: '280px',
        height: '100vh',
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        userSelect: 'none',
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.15rem',
              fontFamily: 'var(--font-display)',
            }}
          >
            SM
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', color: '#0f172a' }}>
                Shop<span style={{ color: '#4f46e5' }}>Mind</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#64748b' }}>
              <span className="live-indicator" />
              <span>Omnichannel OS</span>
            </div>
          </div>
        </div>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          style={{
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          title="Toggle Theme"
        >
          {currentTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#94a3b8',
                letterSpacing: '0.08em',
                padding: '0 0.75rem 0.5rem',
                textTransform: 'uppercase',
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
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      background: isActive
                        ? '#eef2ff'
                        : item.highlight
                        ? '#ecfdf5'
                        : 'transparent',
                      borderLeft: isActive ? '3.5px solid #4f46e5' : '3.5px solid transparent',
                      color: isActive
                        ? '#4f46e5'
                        : item.highlight
                        ? '#059669'
                        : '#475569',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        e.currentTarget.style.background = item.highlight
                          ? '#ecfdf5'
                          : 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Icon size={17} style={{ opacity: isActive ? 1 : 0.85 }} />
                      <span>{item.label}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {item.badge && (
                        <span
                          className={item.badge === 'Live' ? 'badge badge-success' : 'badge badge-ai'}
                          style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem' }}
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
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '0.05rem 0.45rem',
                            minWidth: '18px',
                            textAlign: 'center',
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
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5, #0284c7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            {user?.username?.substring(0, 2).toUpperCase() || 'RK'}
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
              {user?.fullName || 'Ravi Kumar'}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
              {user?.role || 'OWNER'} • {user?.branchName || 'Mumbai Flagship'}
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '0.45rem',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
