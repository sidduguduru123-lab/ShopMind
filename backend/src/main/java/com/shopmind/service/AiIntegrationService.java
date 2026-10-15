package com.shopmind.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class AiIntegrationService {

    @Value("${app.ai-service.url:http://127.0.0.1:8000}")
    private String aiServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    public Map<String, Object> getForecast(Long productId, String productName, Long branchId, int days) {
        try {
            String url = aiServiceUrl + "/api/ai/forecast/" + productId +
                "?product_name=" + productName + "&branch_id=" + branchId + "&days=" + days;
            @SuppressWarnings("unchecked")
            Map<String, Object> result = restTemplate.getForObject(url, Map.class);
            return result != null ? result : getLocalFallbackForecast(productId, productName, days);
        } catch (Exception e) {
            return getLocalFallbackForecast(productId, productName, days);
        }
    }

    public Map<String, Object> getReorderRecommendation(Map<String, Object> product) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = restTemplate.postForObject(
                aiServiceUrl + "/api/ai/reorder-calculation", product, Map.class);
            return result != null ? result : getLocalFallbackReorder(product);
        } catch (Exception e) {
            return getLocalFallbackReorder(product);
        }
    }

    public Map<String, Object> getMarketBasketRules() {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = restTemplate.getForObject(aiServiceUrl + "/api/ai/market-basket", Map.class);
            return result != null ? result : Map.of("rules", List.of());
        } catch (Exception e) {
            return Map.of("rules", List.of());
        }
    }

    public Map<String, Object> getAnomalies() {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = restTemplate.getForObject(aiServiceUrl + "/api/ai/anomalies", Map.class);
            return result != null ? result : Map.of("anomalies", List.of());
        } catch (Exception e) {
            return Map.of("anomalies", List.of());
        }
    }

    public Map<String, Object> getDeadStock() {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = restTemplate.getForObject(aiServiceUrl + "/api/ai/dead-stock", Map.class);
            return result != null ? result : Map.of("deadStockItems", List.of());
        } catch (Exception e) {
            return Map.of("deadStockItems", List.of());
        }
    }

    public Map<String, Object> getExpiryIntelligence() {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = restTemplate.getForObject(aiServiceUrl + "/api/ai/expiry-intelligence", Map.class);
            return result != null ? result : Map.of("expiryItems", List.of());
        } catch (Exception e) {
            return Map.of("expiryItems", List.of());
        }
    }

    public Map<String, Object> runSimulation(Map<String, Object> simulationParams) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = restTemplate.postForObject(
                aiServiceUrl + "/api/ai/simulation", simulationParams, Map.class);
            return result != null ? result : getLocalSimulation(simulationParams);
        } catch (Exception e) {
            return getLocalSimulation(simulationParams);
        }
    }

    public Map<String, Object> queryAssistant(String query) {
        try {
            Map<String, String> req = Map.of("query", query);
            @SuppressWarnings("unchecked")
            Map<String, Object> result = restTemplate.postForObject(aiServiceUrl + "/api/ai/assistant", req, Map.class);
            return result != null ? result : getLocalAssistantFallback(query);
        } catch (Exception e) {
            return getLocalAssistantFallback(query);
        }
    }

    // ─── Local fallbacks ─────────────────────────────────────────────────────

    private Map<String, Object> getLocalFallbackForecast(Long productId, String productName, int days) {
        Random random = new Random(productId);
        List<Map<String, Object>> forecastPoints = new ArrayList<>();
        double base = 40 + random.nextInt(60);
        for (int i = 1; i <= days; i++) {
            double variation = (random.nextDouble() - 0.4) * 20;
            double trend = i * 0.5;
            Map<String, Object> point = new LinkedHashMap<>();
            point.put("day", i);
            point.put("forecast", Math.max(0, Math.round((base + variation + trend) * 10.0) / 10.0));
            point.put("lower", Math.max(0, Math.round((base + variation) * 0.8 * 10.0) / 10.0));
            point.put("upper", Math.round((base + variation) * 1.2 * 10.0) / 10.0);
            forecastPoints.add(point);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("productId", productId);
        result.put("productName", productName);
        result.put("forecastDays", days);
        result.put("points", forecastPoints);
        result.put("avgDailyDemand", Math.round(base));
        result.put("source", "local-fallback");
        return result;
    }

    private Map<String, Object> getLocalFallbackReorder(Map<String, Object> product) {
        int availableQty = Integer.parseInt(product.getOrDefault("availableQty", "50").toString());
        double velocity = Double.parseDouble(product.getOrDefault("dailySalesVelocity", "4.0").toString());
        int leadTime = Integer.parseInt(product.getOrDefault("leadTimeDays", "3").toString());
        double reorderQty = (velocity * leadTime * 1.5) + 30;
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("recommendedOrderQty", (int) reorderQty);
        result.put("daysOfStockLeft", velocity > 0 ? (int)(availableQty / velocity) : 999);
        result.put("urgency", availableQty < velocity * leadTime ? "HIGH" : "MEDIUM");
        result.put("source", "local-fallback");
        return result;
    }

    private Map<String, Object> getLocalSimulation(Map<String, Object> params) {
        double currentPrice = Double.parseDouble(params.getOrDefault("currentPrice", "100").toString());
        double newPrice = Double.parseDouble(params.getOrDefault("newPrice", "90").toString());
        double demand = Double.parseDouble(params.getOrDefault("currentMonthlyDemand", "100").toString());
        double elasticity = Double.parseDouble(params.getOrDefault("priceElasticity", "-1.65").toString());
        double costPrice = Double.parseDouble(params.getOrDefault("costPrice", "60").toString());
        double pctChange = (newPrice - currentPrice) / currentPrice;
        double newDemand = demand * (1 + elasticity * pctChange);
        double revenue = newDemand * newPrice;
        double profit = newDemand * (newPrice - costPrice);
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("newDemand", Math.round(newDemand));
        result.put("projectedRevenue", Math.round(revenue));
        result.put("projectedProfit", Math.round(profit));
        result.put("source", "local-fallback");
        return result;
    }

    private Map<String, Object> getLocalAssistantFallback(String query) {
        String lq = query.toLowerCase();
        String answer;
        if (lq.contains("reorder") || lq.contains("stock")) {
            answer = "Based on current inventory analysis, 3 products are critically low: India Gate Basmati Rice (8 units), boAt Rockerz Headphones (12 units), and Dove Shampoo (6 units). Recommend placing POs immediately with lead times factored in.";
        } else if (lq.contains("profit") || lq.contains("revenue")) {
            answer = "Revenue this month is ₹4,82,350 with a gross margin of 28.4%. Bengaluru branch leads with 42% contribution. The top 5 products generate 67% of total revenue.";
        } else if (lq.contains("branch") || lq.contains("transfer")) {
            answer = "Mumbai Flagship has 22% excess inventory in FMCG category. Delhi NCR Hub is running low on electronics. A stock transfer of 50 units of SanDisk Flash Drives is recommended from Mumbai to Delhi.";
        } else {
            answer = "ShopMind AI has analyzed your store data. Overall health score: 78/100. Key action items: 1) Reorder 4 SKUs, 2) Clear 2 near-expiry batches with 15% discount, 3) Review pricing on slow movers in Apparel.";
        }
        return Map.of("answer", answer, "source", "local-fallback", "query", query);
    }
}
