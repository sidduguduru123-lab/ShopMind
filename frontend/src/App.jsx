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

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('light'); // White Theme by default as requested
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
        }}
      >
        {renderActiveView()}
      </main>
    </div>
  );
}
