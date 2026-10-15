import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Boxes,
  TrendingUp,
  ArrowRightLeft,
  Users,
} from 'lucide-react';

export default function BranchesView() {
  const [branches] = useState([
    {
      id: 1,
      name: 'Mumbai Flagship',
      code: 'MUM-01',
      address: 'Shop No. 12, Linking Road, Bandra West, Mumbai, Maharashtra',
      phone: '022-26411111',
      revenue: 68400,
      inventoryVal: 485000,
      activeStaff: 6,
      status: 'OPTIMAL',
    },
    {
      id: 2,
      name: 'Bengaluru Tech Park',
      code: 'BLR-01',
      address: 'Unit 45, Prestige Tech Park, Outer Ring Road, Bengaluru, Karnataka',
      phone: '080-67890000',
      revenue: 52300,
      inventoryVal: 362000,
      activeStaff: 5,
      status: 'HIGH_VELOCITY',
    },
    {
      id: 3,
      name: 'Delhi NCR Hub',
      code: 'DEL-01',
      address: 'Plot 8, Sector 18, Noida, Uttar Pradesh',
      phone: '011-45001234',
      revenue: 27950,
      inventoryVal: 298000,
      activeStaff: 4,
      status: 'TRANSFERS_PENDING',
    },
  ]);

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Multi-Store Branch Operations</h1>
          <span className="badge badge-success">3 Online Hubs</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Inter-store stock balancing, regional sales contribution, and physical fulfillment center metrics.
        </p>
      </div>

      {/* Branch Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {branches.map((b) => (
          <div key={b.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{b.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Code: {b.code}</div>
              </div>
              <span className="badge badge-ai">{b.status}</span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} color="var(--text-muted)" /> {b.address}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={14} color="var(--text-muted)" /> {b.phone}
              </div>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Today's Revenue</div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--accent-emerald)', marginTop: '2px' }}>
                  {formatINR(b.revenue)}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Inventory Valuation</div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {formatINR(b.inventoryVal)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
