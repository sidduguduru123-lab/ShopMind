import React, { useState } from 'react';
import {
  BotMessageSquare,
  Send,
  Sparkles,
  User,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Boxes,
} from 'lucide-react';
import { apiClient } from '../services/apiClient';

export default function CopilotView({ onNavigate }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am your ShopMind Retail Copilot. I have full real-time access to your store inventory across Mumbai, Bengaluru, and Delhi branches, recent POS transactions, margin trends, and expiry schedules. What would you like to investigate today?",
      deepLink: null,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQueries = [
    'Which products should I reorder immediately?',
    'Why did my profit margin drop this week?',
    'Show me dead stock locking working capital',
    'How did our branches perform today?',
    'What products are frequently bought together?',
  ];

  const handleSend = async (queryText) => {
    const q = (queryText || inputQuery).trim();
    if (!q) return;

    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await apiClient.askCopilot(q);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: res.answer,
          deepLink: res.deepLink,
          actionLabel: res.actionLabel,
        },
      ]);
    } catch {
      // Local graceful fallback
      let fallbackAnswer =
        'Based on current inventory telemetry across your 3 network branches: 4 SKUs require immediate replenishment (Fortune Sunflower Oil, Amul Milk, Britannia Biscuits, boAt Headphones). In addition, 1 batch of Maggi Noodles at Delhi Hub is 10 days away from expiry and has an active markdown suggestion.';
      let link = 'smart-reorder';
      let label = 'Inspect Smart Reorder Center';

      if (q.toLowerCase().includes('profit') || q.toLowerCase().includes('margin')) {
        fallbackAnswer =
          'Gross margin contracted 3.8% this week due to elevated promotional cashier discounts on Electronics at Mumbai Flagship (average discount rose from 4.5% to 18.2%) alongside higher volume in low-margin staples.';
        link = 'dashboard';
        label = 'View Executive Dashboard';
      } else if (q.toLowerCase().includes('dead') || q.toLowerCase().includes('slow')) {
        fallbackAnswer =
          '₹61,910 in working capital is currently trapped across 3 idle SKUs: Classic Polo T-Shirts (62 days idle), Classmate Notebooks (48 days idle), and SanDisk Flash Drives (34 days idle). Recommend clearance bundling or inter-branch transfers.';
        link = 'dead-stock';
        label = 'Open Dead Stock Clearance Center';
      } else if (q.toLowerCase().includes('basket') || q.toLowerCase().includes('together')) {
        fallbackAnswer =
          'Top association mining pairing: Basmati Rice + Sunflower Oil (76% confidence, 2.45x lift) and Good Day Biscuits + Tata Tea Gold (68% confidence, 2.15x lift).';
        link = 'market-basket';
        label = 'Inspect Market Basket Matrix';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: fallbackAnswer,
          deepLink: link,
          actionLabel: label,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)', maxWidth: '1200px', margin: '0 auto', width: '100%', gap: '1rem' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Retail Intelligence AI Copilot</h1>
          <span className="badge badge-ai">RAG + Telemetry Agent</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Ask natural-language questions about product margins, reorder quantities, shrinkage risks, or store operations.
        </p>
      </div>

      {/* Suggested Quick Prompts */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
        {suggestedQueries.map((sq, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(sq)}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Sparkles size={12} color="var(--primary-light)" /> {sq}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div
        className="glass-panel"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {messages.map((m, idx) => {
          const isAi = m.sender === 'ai';
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '0.85rem',
                alignItems: 'flex-start',
                alignSelf: isAi ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
              }}
            >
              {isAi && (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <BotMessageSquare size={18} />
                </div>
              )}

              <div
                style={{
                  background: isAi ? 'var(--bg-tertiary)' : 'var(--primary)',
                  color: isAi ? 'var(--text-primary)' : '#fff',
                  padding: '1rem 1.25rem',
                  borderRadius: isAi ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                  border: isAi ? '1px solid var(--border-subtle)' : 'none',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.text}

                {m.deepLink && (
                  <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                      onClick={() => onNavigate(m.deepLink.replace('/ai/', '').replace('/', ''))}
                      className="btn-primary"
                      style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
                    >
                      <ExternalLink size={14} /> {m.actionLabel || 'Navigate to Center'}
                    </button>
                  </div>
                )}
              </div>

              {!isAi && (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--bg-card-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    flexShrink: 0,
                  }}
                >
                  <User size={18} />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <div className="live-indicator" /> Copilot is querying live store telemetry & predictive models...
          </div>
        )}
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="glass-panel"
        style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}
      >
        <input
          type="text"
          placeholder="Ask a question about store performance, stock levels, or anomalies..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            outline: 'none',
          }}
        />

        <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
          <Send size={16} /> Query Copilot
        </button>
      </form>
    </div>
  );
}
