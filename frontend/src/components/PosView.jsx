import React, { useState } from 'react';
import {
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  QrCode,
  CheckCircle2,
  Percent,
  Sparkles,
  Receipt,
  Printer,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockProducts } from '../services/mockData';

export default function PosView() {
  const [products] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [cart, setCart] = useState([
    { ...mockProducts[0], qty: 2, discount: 0 },
    { ...mockProducts[3], qty: 1, discount: 0 },
  ]);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [discountPct, setDiscountPct] = useState(0);
  const [checkoutCompleted, setCheckoutCompleted] = useState(null);
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [cashierBranch] = useState('Mumbai Flagship (Bandra)');

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const categories = ['ALL', 'Groceries & Staples', 'Snacks & Beverages', 'Electronics & Accessories', 'Fashion & Apparel', 'Stationery & Office'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1, discount: 0 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const rawSubtotal = cart.reduce((sum, item) => sum + item.sellingPrice * item.qty, 0);
  const orderDiscount = Math.round((rawSubtotal * discountPct) / 100);
  const taxableAmount = Math.max(0, rawSubtotal - orderDiscount);
  const gstTax = Math.round(taxableAmount * 0.05); // Average blended 5% GST on grocery/basket
  const grandTotal = taxableAmount + gstTax;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const receipt = {
      invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString('en-IN'),
      branch: cashierBranch,
      items: [...cart],
      rawSubtotal,
      orderDiscount,
      gstTax,
      grandTotal,
      paymentMethod,
      customerPhone,
      loyaltyPointsEarned: Math.floor(grandTotal / 10),
    };

    setCheckoutCompleted(receipt);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const startNewSale = () => {
    setCheckoutCompleted(null);
    setCart([]);
    setDiscountPct(0);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', height: 'calc(100vh - 40px)', gap: '1rem', padding: '1.25rem', overflow: 'hidden' }}>
      {/* LEFT: Product Catalog & Fast Barcode Entry */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
        {/* Search Bar & Scanner Input */}
        <div className="glass-panel" style={{ padding: '0.85rem 1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search product name, SKU or scan EAN barcode (e.g., 8901063111022)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.5rem',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-accent)' }}>
            <Barcode size={18} color="var(--primary-light)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-light)' }}>Optical Scanner Active</span>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: selectedCategory === cat ? '1px solid var(--primary-light)' : '1px solid var(--border-subtle)',
                background: selectedCategory === cat ? 'var(--primary)' : 'var(--bg-secondary)',
                color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '0.85rem',
            paddingRight: '4px',
          }}
        >
          {filteredProducts.map((p) => {
            const isLowStock = p.availableQty <= p.reorderLevel;
            return (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                className="glass-panel glass-panel-hover"
                style={{
                  padding: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Product Thumbnail */}
                <div style={{ width: '100%', height: '100px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#1e293b', marginBottom: '0.5rem' }}>
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{p.brand}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.25, marginTop: '2px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.name}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.65rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {formatINR(p.sellingPrice)}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: isLowStock ? 'var(--danger)' : 'var(--text-muted)' }}>
                      {p.availableQty} {p.unit} left
                    </div>
                  </div>

                  <button
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'var(--primary)',
                      border: 'none',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Register Cart & Instant Billing Terminal */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          borderLeft: '1px solid var(--border-medium)',
        }}
      >
        {/* Terminal Header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800 }}>Billing Terminal #1</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cashierBranch}</div>
          </div>
          <span className="badge badge-success">Online</span>
        </div>

        {/* Customer Phone & Loyalty Sync */}
        <div style={{ padding: '0.75rem 1.25rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Cust:</div>
          <input
            type="text"
            placeholder="Mobile No. for Loyalty Points"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
            }}
          />
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>+1,820 pts</span>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', gap: '0.5rem' }}>
              <Receipt size={36} opacity={0.4} />
              <div style={{ fontSize: '0.85rem' }}>Scan or select products to start order</div>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {formatINR(item.sellingPrice)} × {item.qty}
                  </div>
                </div>

                {/* Qty Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '4px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Minus size={12} />
                  </button>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '4px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '60px', textAlign: 'right' }}>
                  {formatINR(item.sellingPrice * item.qty)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bill Summary & Breakdown */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
            <span>{formatINR(rawSubtotal)}</span>
          </div>

          {/* Quick Discount Trigger */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Bill Discount</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 5, 10, 15].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiscountPct(d)}
                  style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    background: discountPct === d ? 'var(--primary)' : 'var(--bg-tertiary)',
                    color: discountPct === d ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {d}%
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span>GST Output (Blended 5%)</span>
            <span>{formatINR(gstTax)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '0.4rem', borderTop: '1px dashed var(--border-medium)', marginTop: '0.2rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 800 }}>Total Payable</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-light)', fontFamily: 'var(--font-display)' }}>
              {formatINR(grandTotal)}
            </span>
          </div>

          {/* Payment Method Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginTop: '0.5rem' }}>
            {[
              { id: 'UPI', label: 'UPI / QR', icon: QrCode },
              { id: 'CARD', label: 'Card Swipe', icon: CreditCard },
              { id: 'CASH', label: 'Cash Bill', icon: Banknote },
            ].map((pm) => {
              const Icon = pm.icon;
              const isSelected = paymentMethod === pm.id;
              return (
                <button
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: isSelected ? '1px solid var(--primary-light)' : '1px solid var(--border-subtle)',
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-tertiary)',
                    color: isSelected ? 'var(--primary-light)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={16} />
                  <span>{pm.label}</span>
                </button>
              );
            })}
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '1rem',
              fontWeight: 700,
              marginTop: '0.4rem',
              opacity: cart.length === 0 ? 0.5 : 1,
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <CheckCircle2 size={18} /> Complete Sale ({formatINR(grandTotal)})
          </button>
        </div>
      </div>

      {/* Modal: Bill Receipt Print Preview */}
      {checkoutCompleted && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '420px',
              padding: '2rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-accent)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Transaction Successful!</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{checkoutCompleted.invoiceNumber} • {checkoutCompleted.branch}</p>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Customer Mobile</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>+91 {checkoutCompleted.customerPhone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Payment Mode</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{checkoutCompleted.paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Loyalty Points Added</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>+{checkoutCompleted.loyaltyPointsEarned} pts</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem', marginTop: '0.3rem' }}>
                <span>Amount Paid</span>
                <span style={{ color: 'var(--primary-light)' }}>{formatINR(checkoutCompleted.grandTotal)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => window.print()}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Printer size={16} /> Print Receipt
              </button>
              <button
                onClick={startNewSale}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <RotateCcw size={16} /> Next Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
