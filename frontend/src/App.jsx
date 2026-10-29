import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView';
import PosView from './components/PosView';
import SmartReorderView from './components/SmartReorderView';
import ForecastingView from './components/ForecastingView';
import MarketBasketView from './components/MarketBasketView';
import AnomaliesView from './components/AnomaliesView';
import ExpiryIntelligenceView from './components/ExpiryIntelligenceView';
import DeadStockView from './components/DeadStockView';
import SimulatorView from './components/SimulatorView';
import CopilotView from './components/CopilotView';
import InventoryView from './components/InventoryView';
import OrdersView from './components/OrdersView';
import CustomersView from './components/CustomersView';
import BranchesView from './components/BranchesView';
import { apiClient } from './services/apiClient';
import { Activity, Network, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [currentUser, setCurrentUser] = useState(() => apiClient.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(apiClient.getToken()));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    apiClient.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigate={setActiveTab} />;
      case 'pos':
        return <PosView />;
      case 'inventory':
        return <InventoryView />;
      case 'orders':
        return <OrdersView />;
      case 'smart-reorder':
        return <SmartReorderView />;
      case 'forecasting':
        return <ForecastingView />;
      case 'market-basket':
        return <MarketBasketView onNavigate={setActiveTab} />;
      case 'anomalies':
        return <AnomaliesView />;
      case 'expiry-intelligence':
        return <ExpiryIntelligenceView />;
      case 'dead-stock':
        return <DeadStockView />;
      case 'simulator':
        return <SimulatorView />;
      case 'copilot':
        return <CopilotView onNavigate={setActiveTab} />;
      case 'customers':
        return <CustomersView />;
      case 'branches':
        return <BranchesView />;
      default:
        return <DashboardView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTheme={theme}
        toggleTheme={toggleTheme}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Dynamic View Area */}
      <main
        style={{
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          background: 'var(--bg-primary)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Synapse Neural Telemetry Banner */}
        <header
          style={{
            height: '46px',
            minHeight: '46px',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="live-indicator" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              <span>Synapse Omnichannel</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>—</span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.74rem' }}>
                Uses a neural metaphor to highlight data connectivity across channels.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.72rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
              <Zap size={13} color="#06b6d4" />
              <span>Channels Linked:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>POS • Online • Warehouse</span>
            </div>
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: 'var(--accent-emerald)',
                padding: '0.15rem 0.55rem',
                borderRadius: '999px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <span className="live-indicator-green" style={{ width: '6px', height: '6px' }} />
              <span>Latency 14ms (100% Synced)</span>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div style={{ flex: 1 }}>
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
}
