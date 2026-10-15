import React, { useState } from 'react';
import {
  Users,
  Award,
  DollarSign,
  ShoppingBag,
  Sparkles,
  Phone,
  Mail,
} from 'lucide-react';

export default function CustomersView() {
  const [customers] = useState([
    { id: 1, name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '9876543210', points: 1820, segment: 'HIGH_VALUE', spent: 42100, orders: 32 },
    { id: 2, name: 'Divya Menon', email: 'divya.m@email.com', phone: '9845670123', points: 890, segment: 'HIGH_VALUE', spent: 38000, orders: 28 },
    { id: 3, name: 'Rohit Sharma', email: 'rohit.s@email.com', phone: '9988112233', points: 540, segment: 'REGULAR', spent: 8200, orders: 12 },
    { id: 4, name: 'Pooja Tiwari', email: 'pooja.t@email.com', phone: '9823456789', points: 380, segment: 'REGULAR', spent: 7200, orders: 9 },
    { id: 5, name: 'Meera Nair', email: 'meera.nair@email.com', phone: '9765432100', points: 210, segment: 'REGULAR', spent: 5600, orders: 8 },
    { id: 6, name: 'Arjun Kapoor', email: 'arjun.k@email.com', phone: '9912340567', points: 120, segment: 'NEW', spent: 1850, orders: 2 },
    { id: 7, name: 'Suresh Iyer', email: 'suresh.i@email.com', phone: '9871230045', points: 0, segment: 'AT_RISK', spent: 12400, orders: 7 },
  ]);

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const getSegmentBadge = (seg) => {
    switch (seg) {
      case 'HIGH_VALUE':
        return <span className="badge badge-success">High Value (VIP)</span>;
      case 'AT_RISK':
        return <span className="badge badge-danger">At-Risk Churn</span>;
      case 'NEW':
        return <span className="badge badge-info">New Customer</span>;
      default:
        return <span className="badge badge-warning">Regular</span>;
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Customer Segments & Loyalty Analytics</h1>
          <span className="badge badge-ai">RFM Segmentation</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Real-time Recency, Frequency, and Monetary (RFM) clustering for targeted personalized promotions.
        </p>
      </div>

      {/* Customer Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {customers.map((c) => (
          <div key={c.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{c.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {c.email} • +91 {c.phone}
                </div>
              </div>
              {getSegmentBadge(c.segment)}
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center', fontSize: '0.8rem' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Total Spent</div>
                <div style={{ fontWeight: 800, marginTop: '2px', color: 'var(--text-primary)' }}>{formatINR(c.spent)}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Orders</div>
                <div style={{ fontWeight: 800, marginTop: '2px', color: 'var(--text-primary)' }}>{c.orders}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Loyalty</div>
                <div style={{ fontWeight: 800, marginTop: '2px', color: 'var(--accent-emerald)' }}>{c.points} pts</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
