# Synapse Omnichannel — Uses a neural metaphor to highlight data connectivity across channels.

**Synapse Omnichannel** is an enterprise-grade Unified Retail Operating System & Decision Intelligence Suite. It **uses a neural metaphor to highlight data connectivity across channels** — modeling retail touchpoints (in-store POS terminals, e-commerce web carts, mobile apps, distribution centers, and supplier networks) as interconnected neural nodes synchronized through a real-time synaptic data fabric.

---

## 🧠 Neural Omnichannel Architecture

```
                                  +----------------------------------------------------+
                                  |       Synapse Omnichannel Neural UI                |
                                  |     (React 19 + Vite + Synaptic Theme Tokens)       |
                                  |              http://localhost:5173                 |
                                  +-------------------------+--------------------------+
                                                            |
                                             Omnichannel Synaptic Event Bus
                                                            |
                                                            v
                                  +-------------------------+--------------------------+
                                  |    Spring Boot Enterprise Backend (Java 21)        |
                                  |              http://localhost:8080                 |
                                  |         (JPA / H2 / Spring Security 6)             |
                                  +------------+---------------------------+-----------+
                                               |                           |
                                   Multi-Node Persistence         Real-Time AI Telemetry
                                               |                           |
                                               v                           v
                           +-------------------+---+       +---------------+--------------------+
                           |    Embedded Database  |       | Synapse AI Decision Engine         |
                           | ./data/shopmind_db.mv |       |       (FastAPI / Port 8000)        |
                           +-----------------------+       +------------------------------------+
```

### ⚡ Synaptic Channel Nodes
- **Node 1: Mumbai Flagship Node (POS Edge)** — High-frequency optical barcode scanning, offline-first billing, blended GST tax calculations, and instant customer loyalty rewards.
- **Node 2: Bengaluru Tech Park Node (E-Commerce)** — Live ship-from-store order routing, cross-channel basket affinity mining, and real-time stock allocation.
- **Node 3: Delhi NCR Hub (Fulfillment Core)** — Dynamic safety stock buffers, supplier lead-time optimization, and automated PO generation.

---

## 🚀 Key Modules & Capabilities

1. **Executive Command Center (`DashboardView.jsx`)**:
   - Real-time cross-channel telemetry across all network nodes.
   - Live revenue vs profit trajectory charts, AOV, category margin breakdowns.
   - **Synaptic Neural Decision Dispatch** feed with deep-link navigation.

2. **POS Terminal & Instant Billing (`PosView.jsx`)**:
   - Optical barcode scanning simulation (EAN-13 barcodes).
   - Dynamic quantity adjustments, percentage discount triggers, blended GST tax calculation.
   - Customer loyalty points accrual (+1 pt per ₹10 spent).
   - Printable receipt modal with neural verification stamp.

3. **Smart Reorder & EOQ Optimizer (`SmartReorderView.jsx`)**:
   - Dynamic safety stock and Economic Order Quantity (EOQ) calculations factoring daily velocity and vendor lead-times.
   - One-click Purchase Order generation dispatched to suppliers.

4. **Predictive Demand Forecasting (`ForecastingView.jsx`)**:
   - 14/30/60-day unit demand curves with 95% confidence intervals and weekend seasonality factors.

5. **Market Basket Affinity Mining (`MarketBasketView.jsx`)**:
   - Apriori & FP-Growth rule mining (Support, Confidence, and Lift ratios).
   - Checkout cross-selling bundles and physical end-cap merchandising recommendations.

6. **Store Anomaly & Shrinkage Radar (`AnomaliesView.jsx`)**:
   - Isolation-forest detection of cashier void spikes and abnormal SKU sales drops.

7. **Expiry & Freshness Intelligence (`ExpiryIntelligenceView.jsx`)**:
   - FIFO tracking with dynamic liquidation markdowns (10% and 20%) before expiry write-offs.

8. **Dead Stock & Capital Liquidation (`DeadStockView.jsx`)**:
   - Trapped working capital tracking with inter-branch transfers and clearance bundles.

9. **What-If Scenario Simulation Lab (`SimulatorView.jsx`)**:
   - Live price elasticity modeling ($\epsilon = -1.65$) to simulate demand, revenue, and net profit before price updates.

10. **Retail AI Copilot (`CopilotView.jsx`)**:
    - Conversational assistant for instant executive store inquiries across the synaptic network.

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

---

## ☁️ Deployment on Render

### Single Fullstack Web Service (Recommended via Docker)
1. Go to **Render Dashboard** → **New Web Service** → Connect `https://github.com/sidduguduru123-lab/ShopMind`.
2. Configure settings:
   - **Environment / Runtime**: `Docker` *(important: do NOT choose Node for Spring Boot backend)*
   - **Dockerfile Path**: `Dockerfile`
3. Add Environment Variable:
   - `DATABASE_URL`: `postgresql://tt_f1l8_user:iqKceflLib9k0Z7Cji1oQnSkN7xLbSm8@dpg-dbhd0r1srm7s73fgj84g-a/tt_f1l8`
4. Click **Create Web Service**. Render will automatically build the React frontend, package the Spring Boot backend, and start the app connected to your Render PostgreSQL database!

---

## 🔐 Demo Credentials
- **Store Owner**: `owner` / `owner123`
- **Store Manager**: `manager1` / `manager123`
- **POS Cashier**: `cashier1` / `cashier123`
- **Customer**: `customer1` / `customer123`
