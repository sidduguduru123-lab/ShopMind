import React, { useState } from 'react';
import {
  Boxes,
  Search,
  Building2,
  AlertTriangle,
  ArrowRightLeft,
  Plus,
  Filter,
  CheckCircle,
} from 'lucide-react';
import { mockProducts } from '../services/mockData';

export default function InventoryView() {
  const [products] = useState(mockProducts);
  const [search, setSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Multi-Branch Inventory Ledger</h1>
            <span className="badge badge-success">3 Branches Online</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Unified real-time inventory ledger with automated reorder levels and safety stock tracking.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Filter by SKU or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 1rem 0.5rem 2.2rem',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
          </div>

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
              outline: 'none',
            }}
          >
            <option value="ALL">All Network Branches</option>
            <option value="MUM">Mumbai Flagship</option>
            <option value="BLR">Bengaluru Tech Park</option>
            <option value="DEL">Delhi NCR Hub</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Product</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>SKU & Barcode</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Category</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Cost Price</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Selling Price</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>On-Hand Stock</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const isLow = p.availableQty <= p.reorderLevel;
                return (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={p.imageUrl}
                        alt=""
                        style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Brand: {p.brand}</div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <div>{p.sku}</div>
                      <div style={{ color: 'var(--text-muted)' }}>{p.barcode}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>{p.category}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>{formatINR(p.costPrice)}</td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>{formatINR(p.sellingPrice)}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isLow ? '#ef4444' : 'var(--text-primary)' }}>
                        {p.availableQty} {p.unit}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Reorder Min: {p.reorderLevel}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      {isLow ? (
                        <span className="badge badge-danger">Low Stock</span>
                      ) : (
                        <span className="badge badge-success">Optimal</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
