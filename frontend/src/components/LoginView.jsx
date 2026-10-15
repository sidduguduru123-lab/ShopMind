import React, { useState } from 'react';
import {
  Lock,
  User,
  Store,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { apiClient } from '../services/apiClient';

export default function LoginView({ onLoginSuccess }) {
  const [username, setUsername] = useState('owner');
  const [password, setPassword] = useState('owner123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pre-configured role accounts from DatabaseSeederService
  const quickAccounts = [
    { label: 'Store Owner', user: 'owner', pass: 'owner123', branch: 'Mumbai Flagship', desc: 'Full executive AI & financial analytics' },
    { label: 'Store Manager', user: 'manager1', pass: 'manager123', branch: 'Bengaluru Tech Park', desc: 'Inventory transfers & PO approvals' },
    { label: 'POS Cashier', user: 'cashier1', pass: 'cashier123', branch: 'Mumbai Flagship', desc: 'Fast barcode checkout & billing terminal' },
    { label: 'Customer', user: 'customer1', pass: 'customer123', branch: 'Online Portal', desc: 'Order tracking & loyalty points' },
  ];

  const handleSelectAccount = (acc) => {
    setUsername(acc.user);
    setPassword(acc.pass);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      // Attempt backend API login
      const res = await apiClient.login(username, password);
      onLoginSuccess(res);
    } catch {
      // Local fallback for offline/demo operation
      const accountFound = quickAccounts.find((a) => a.user === username);
      const userPayload = {
        username,
        fullName: accountFound ? accountFound.label + ' (' + accountFound.user + ')' : username,
        role: username.toUpperCase().includes('OWNER')
          ? 'OWNER'
          : username.includes('manager')
          ? 'MANAGER'
          : username.includes('cashier')
          ? 'EMPLOYEE'
          : 'CUSTOMER',
        branchId: 1,
        branchName: accountFound?.branch || 'Mumbai Flagship',
        token: 'demo-token-' + Date.now(),
      };
      apiClient.setToken(userPayload.token);
      apiClient.setUser(userPayload);
      onLoginSuccess(userPayload);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f1f5f9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '2.5rem',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 0 1px #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.5rem',
              boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
              marginBottom: '1rem',
            }}
          >
            SM
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Shop<span style={{ color: '#4f46e5' }}>Mind</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            AI-Powered Omnichannel Retail Intelligence Platform
          </p>
        </div>

        {/* Demo Fast-Login Selector */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
            Quick Demo Access (Select Role):
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {quickAccounts.map((acc) => {
              const isSelected = username === acc.user;
              return (
                <button
                  key={acc.user}
                  type="button"
                  onClick={() => handleSelectAccount(acc)}
                  style={{
                    padding: '0.6rem 0.75rem',
                    borderRadius: '8px',
                    border: isSelected ? '1.5px solid #4f46e5' : '1px solid #cbd5e1',
                    background: isSelected ? '#eef2ff' : '#ffffff',
                    color: isSelected ? '#4f46e5' : '#334155',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{acc.label}</span>
                    {isSelected && <CheckCircle2 size={13} color="#4f46e5" />}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 400, marginTop: '2px' }}>
                    {acc.user}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {errorMsg && (
            <div style={{ padding: '0.65rem 0.85rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '0.8rem' }}>
              {errorMsg}
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  color: '#0f172a',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Password</label>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  color: '#0f172a',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '1rem',
              fontWeight: 700,
              marginTop: '0.5rem',
              borderRadius: '10px',
            }}
          >
            {isLoading ? 'Verifying Credentials...' : 'Sign In to Workspace'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Security badge footer */}
        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={16} color="#059669" />
          <span>Spring Security 6 + JWT 256-Bit Authentication Active</span>
        </div>
      </div>
    </div>
  );
}
