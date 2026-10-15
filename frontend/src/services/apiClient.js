/**
 * ShopMind Unified API Client
 * Seamlessly manages authentication tokens, fallback mock responses,
 * and calls to both Spring Boot (8080) and Python AI services (8000).
 */

const API_BASE = '/api';

export const apiClient = {
  getToken() {
    return localStorage.getItem('shopmind_token') || '';
  },

  setToken(token) {
    if (token) localStorage.setItem('shopmind_token', token);
    else localStorage.removeItem('shopmind_token');
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem('shopmind_user') || 'null');
    } catch {
      return null;
    }
  },

  setUser(user) {
    if (user) localStorage.setItem('shopmind_user', JSON.stringify(user));
    else localStorage.removeItem('shopmind_user');
  },

  async request(path, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    try {
      const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
      });

      if (res.status === 401) {
        // Token expired or invalid
        console.warn('Unauthorized request to', path);
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error(`API Error on ${path}:`, err.message);
      throw err;
    }
  },

  // Auth Endpoints
  async login(username, password) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (res.token) {
      this.setToken(res.token);
      this.setUser(res);
    }
    return res;
  },

  logout() {
    this.setToken(null);
    this.setUser(null);
  },

  // Analytics & Dashboard
  async getDashboardOverview() {
    return this.request('/analytics/overview');
  },

  // Products & Inventory
  async getProducts() {
    return this.request('/products');
  },

  async getInventory(branchId) {
    const query = branchId ? `?branchId=${branchId}` : '';
    return this.request(`/inventory${query}`);
  },

  async getLowStock() {
    return this.request('/inventory/low-stock');
  },

  async updateInventory(id, data) {
    return this.request(`/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Branches & Categories
  async getBranches() {
    return this.request('/branches');
  },

  async getCategories() {
    return this.request('/categories');
  },

  // Customers
  async getCustomers() {
    return this.request('/customers');
  },

  // Sales (POS)
  async getSales(branchId) {
    const query = branchId ? `?branchId=${branchId}` : '';
    return this.request(`/sales${query}`);
  },

  async createSale(saleData) {
    return this.request('/sales', {
      method: 'POST',
      body: JSON.stringify(saleData),
    });
  },

  // Online Orders
  async getOrders(status) {
    const query = status ? `?status=${status}` : '';
    return this.request(`/orders${query}`);
  },

  async updateOrderStatus(id, orderStatus) {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ orderStatus }),
    });
  },

  // Purchase Orders & Suppliers
  async getSuppliers() {
    return this.request('/suppliers');
  },

  async getPurchaseOrders() {
    return this.request('/purchase-orders');
  },

  async updatePOStatus(id, status) {
    return this.request(`/purchase-orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Stock Transfers
  async getStockTransfers() {
    return this.request('/stock-transfers');
  },

  async updateTransferStatus(id, status) {
    return this.request(`/stock-transfers/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Expiry Batches
  async getExpiryBatches() {
    return this.request('/expiry-batches');
  },

  async getExpiringSoon() {
    return this.request('/expiry-batches/expiring-soon');
  },

  // AI Microservice Endpoints
  async getForecast(productId, productName, branchId = 1, days = 30) {
    return this.request(`/ai/forecast/${productId}?productName=${encodeURIComponent(productName)}&branchId=${branchId}&days=${days}`);
  },

  async calculateSmartReorder(productData) {
    return this.request('/ai/reorder-calculation', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  async getMarketBasket() {
    return this.request('/ai/market-basket');
  },

  async getAnomalies() {
    return this.request('/ai/anomalies');
  },

  async getDeadStock() {
    return this.request('/ai/dead-stock');
  },

  async getExpiryIntelligence() {
    return this.request('/ai/expiry-intelligence');
  },

  async runSimulation(params) {
    return this.request('/ai/simulation', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  async askCopilot(query) {
    return this.request('/ai/assistant', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  },
};
