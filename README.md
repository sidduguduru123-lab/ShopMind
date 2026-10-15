# ShopMind — AI-Powered Omnichannel Retail Intelligence Platform

**ShopMind** is an enterprise-grade Unified Retail Operating System & Decision Intelligence Suite designed for modern omnichannel brick-and-mortar retail networks with e-commerce integration.

---

## 🌟 Architecture Overview

```
                                  +------------------------------------+
                                  |     ShopMind Modern Web UI        |
                                  |  (React 19 + Vite + Design Tokens) |
                                  |        http://localhost:5173       |
                                  +-----------------+------------------+
                                                    |
                                    Reverse Proxy / API Requests
                                                    |
                                                    v
                                  +-----------------+------------------+
                                  |     Spring Boot Backend (Java 21)  |
                                  |        http://localhost:8080       |
                                  |    (JPA / H2 / Spring Security)    |
                                  +--------+------------------+--------+
                                           |                  |
                               Data Seeding & Persistence   REST Call / Fallback
                                           |                  |
                                           v                  v
                       +-------------------+---+      +-------+--------------------+
                       |    Embedded H2 DB     |      |  Python AI Decision Engine |
                       | ./data/shopmind_db.mv |      |    (FastAPI / Port 8000)   |
                       +-----------------------+      +----------------------------+
```

---

## 🚀 Key Modules & Capabilities

1. **Executive Command Center (`DashboardView.jsx`)**:
   - Cross-branch telemetry (Mumbai Flagship, Bengaluru Tech Park, Delhi NCR Hub).
   - Real-time revenue vs profit trajectory charts, AOV, category margin breakdowns.
   - Live AI Decision Dispatch alerts with direct navigation deep-links.

2. **POS Terminal & Instant Billing (`PosView.jsx`)**:
   - Optical barcode scanning simulation (EAN-13 barcodes).
   - Dynamic quantity adjustments, percentage discount triggers, blended GST tax calculation.
   - Customer loyalty points accrual (+1 pt per ₹10 spent).
   - Receipt modal preview with print layout and confetti celebration.

3. **Smart Reorder & EOQ Optimizer (`SmartReorderView.jsx`)**:
   - Dynamic buffer calculations factoring daily sales velocity and vendor lead-times.
   - One-click Purchase Order generation dispatched to suppliers.

4. **Predictive Demand Forecasting (`ForecastingView.jsx`)**:
   - 14/30/60-day unit demand curves with 95% confidence intervals and weekend seasonality factors.

5. **Market Basket Affinity Mining (`MarketBasketView.jsx`)**:
   - Apriori & FP-Growth rule mining (Support, Confidence, and Lift ratios).
   - Retail merchandising and checkout cross-selling recommendations.

6. **Store Anomaly & Shrinkage Radar (`AnomaliesView.jsx`)**:
   - Automated detection of cashier void spikes and abnormal SKU sales drops.

7. **Expiry & Freshness Intelligence (`ExpiryIntelligenceView.jsx`)**:
   - FIFO tracking with dynamic liquidation markdowns (10% and 20%) before expiry write-offs.

8. **Dead Stock & Capital Liquidation (`DeadStockView.jsx`)**:
   - Trapped working capital tracking with inter-branch transfers and clearance bundles.

9. **What-If Scenario Simulation Lab (`SimulatorView.jsx`)**:
   - Live price elasticity modeling ($\epsilon = -1.65$) to simulate demand, revenue, and net profit before price updates.

10. **Retail AI Copilot (`CopilotView.jsx`)**:
    - Conversational assistant for instant executive store inquiries.

---

## 🏃‍♂️ How to Run the Services

### 1. Frontend Web App (Active)
```bash
cd frontend
npm run dev
# Running on http://localhost:5173
```

### 2. Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
# Runs on port 8080 (auto-seeds 32 Indian retail products, 3 branches, users, and transactions)
```

### 3. Python AI Service (Optional)
```bash
cd ai-service
pip install -r requirements.txt
python main.py
# Runs on port 8000
```
