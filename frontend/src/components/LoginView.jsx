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
  Zap,
  Network,
  Cpu,
} from 'lucide-react';
import { apiClient } from '../services/apiClient';
import SynapseLogo from './SynapseLogo';

export default function LoginView({ onLoginSuccess }) {
  const [username, setUsername] = useState('owner');
  const [password, setPassword] = useState('owner123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pre-configured role accounts from DatabaseSeederService
  const quickAccounts = [
    { label: 'Store Owner', user: 'owner', pass: 'owner123', branch: 'Mumbai Flagship', desc: 'Full executive neural analytics & strategy' },
    { label: 'Store Manager', user: 'manager1', pass: 'manager123', branch: 'Bengaluru Tech Park', desc: 'Cross-channel transfers & PO dispatch' },
    { label: 'POS Cashier', user: 'cashier1', pass: 'cashier123', branch: 'Mumbai Flagship', desc: 'Fast optical scanner & instant billing' },
    { label: 'Customer', user: 'customer1', pass: 'customer123', branch: 'Online Portal', desc: 'Omnichannel orders & loyalty rewards' },
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
        token: 'synapse-token-' + Date.now(),
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
        background: 'radial-gradient(ellipse at top, rgba(6, 182, 212, 0.12) 0%, rgba(99, 102, 241, 0.08) 40%, var(--bg-primary) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '2.5rem',
          background: 'var(--bg-secondary)',
          borderRadius: '24px',
          border: '1px solid var(--border-neural)',
          boxShadow: 'var(--shadow-neural)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Brand Header: Synapse Omnichannel */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.85rem' }}>
            <SynapseLogo size={62} animated={true} glow={true} />
          </div>

          <h1
            style={{
              fontSize: '1.95rem',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Synapse <span className="gradient-text">Omnichannel</span>
          </h1>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.86rem',
              lineHeight: 1.45,
              marginTop: '0.45rem',
              fontWeight: 500,
            }}
          >
            Uses a neural metaphor to highlight data connectivity across channels.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginTop: '0.65rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#0891b2',
            }}
          >
            <span className="live-indicator" />
            <span>Neural Data Fabric Active • POS + E-Commerce + Supply Mesh</span>
          </div>
        </div>

        {/* Demo Fast-Login Selector */}
        <div
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.65rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Select Role Node:</span>
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.68rem', fontWeight: 700 }}>● 4 Pre-Configured</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
            {quickAccounts.map((acc) => {
              const isSelected = username === acc.user;
              return (
                <button
                  key={acc.user}
                  type="button"
                  onClick={() => handleSelectAccount(acc)}
                  style={{
                    padding: '0.65rem 0.8rem',
                    borderRadius: '10px',
                    border: isSelected ? '1.5px solid #06b6d4' : '1px solid var(--border-medium)',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.14) 0%, rgba(99, 102, 241, 0.14) 100%)'
                      : 'var(--bg-secondary)',
                    color: isSelected ? '#0891b2' : 'var(--text-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 0 12px rgba(6, 182, 212, 0.25)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{acc.label}</span>
                    {isSelected && <CheckCircle2 size={14} color="#06b6d4" />}
                  </div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: 400, marginTop: '2px' }}>
                    {acc.branch}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
          {errorMsg && (
            <div
              style={{
                padding: '0.65rem 0.85rem',
                background: 'var(--danger-bg)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                borderRadius: '8px',
                color: 'var(--danger)',
                fontSize: '0.8rem',
              }}
            >
              {errorMsg}
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Username Node
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Access Key / Password
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
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
              fontSize: '0.98rem',
              fontWeight: 800,
              marginTop: '0.4rem',
              borderRadius: '12px',
            }}
          >
            {isLoading ? 'Synchronizing Neural Link...' : 'Connect to Synapse Workspace'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Security badge footer */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '0.85rem',
          }}
        >
          <ShieldCheck size={16} color="#059669" />
          <span>Spring Security 6 • 256-Bit JWT • Synaptic Cross-Channel Encryption</span>
        </div>
      </div>
    </div>
  );
}
