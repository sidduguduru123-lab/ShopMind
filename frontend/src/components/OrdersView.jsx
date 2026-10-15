import React, { useState } from 'react';
import {
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';

export default function OrdersView() {
  const [orders] = useState([
    {
      id: 'ORD-2026-00041',
      customer: 'Sneha Reddy',
      phone: '+91 9876543210',
      branch: 'Mumbai Flagship',
      address: 'Flat 4B, Sagar Heights, Bandra West, Mumbai - 400058',
      items: ['boAt Rockerz 450 (1x)', 'Portronics Fast Charger (2x)'],
      total: 3582,
      status: 'DELIVERED',
      date: 'Today, 11:20 AM',
    },
    {
      id: 'ORD-2026-00042',
      customer: 'Divya Menon',
      phone: '+91 9845670123',
      branch: 'Bengaluru Tech Park',
      address: 'Villa 7, Prestige Willow Creek, Outer Ring Road, Bengaluru',
      items: ['Noise ColorFit Pulse Smartwatch (1x)'],
      total: 3499,
      status: 'SHIPPED',
      date: 'Today, 09:45 AM',
    },
    {
      id: 'ORD-2026-00043',
      customer: 'Arjun Kapoor',
      phone: '+91 9912340567',
      branch: 'Mumbai Flagship',
      address: 'A-204, New Swastik CHS, Kandivali East, Mumbai',
      items: ['Dove Daily Shine Shampoo (2x)', 'Nivea Soft Cream (3x)', 'Vim Dishwash Gel (3x)'],
      total: 1404,
      status: 'PROCESSING',
      date: 'Today, 14:10 PM',
    },
  ]);

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
        return <span className="badge badge-success">Delivered</span>;
      case 'SHIPPED':
        return <span className="badge badge-info">In Transit</span>;
      default:
        return <span className="badge badge-warning">Processing</span>;
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Omnichannel Store Orders</h1>
          <span className="badge badge-ai">Ship-from-Store Engine</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Real-time fulfillment tracking for online e-commerce orders routed automatically to nearest store inventory.
        </p>
      </div>

      {/* Orders Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {orders.map((o) => (
          <div key={o.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{o.id}</div>
                {getStatusBadge(o.status)}
              </div>

              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-light)', fontFamily: 'var(--font-display)' }}>
                {formatINR(o.total)}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Customer</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{o.customer}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{o.phone}</div>
              </div>

              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Fulfilling Branch</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{o.branch}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{o.date}</div>
              </div>

              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Delivery Address</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>
                  {o.address}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <strong>Packed SKUs:</strong> {o.items.join(' • ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
