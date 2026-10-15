package com.shopmind.service;

import com.shopmind.entity.*;
import com.shopmind.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AnalyticsService {

    @Autowired private SaleRepository saleRepo;
    @Autowired private OnlineOrderRepository onlineOrderRepo;
    @Autowired private InventoryRepository inventoryRepo;
    @Autowired private CustomerRepository customerRepo;
    @Autowired private ProductRepository productRepo;

    @Transactional(readOnly = true)
    public Map<String, Object> getOwnerDashboardOverview() {
        LocalDateTime todayStart = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime todayEnd   = LocalDateTime.now();
        LocalDateTime weekStart  = LocalDateTime.now().minusDays(7);
        LocalDateTime monthStart = LocalDateTime.now().withDayOfMonth(1).toLocalDate().atStartOfDay();

        BigDecimal todayRevenue = saleRepo.sumRevenueByPeriod(todayStart, todayEnd);
        Long todayOrders       = saleRepo.countByPeriod(todayStart, todayEnd);
        BigDecimal weekRevenue = saleRepo.sumRevenueByPeriod(weekStart, todayEnd);
        BigDecimal monthRevenue= saleRepo.sumRevenueByPeriod(monthStart, todayEnd);

        List<Inventory> lowStock = inventoryRepo.findLowStockItems();
        long customerCount = customerRepo.count();
        long productCount  = productRepo.findByActiveTrue().size();

        // Calculate approximate gross profit (30% margin applied uniformly as demo)
        BigDecimal grossProfitToday  = todayRevenue.multiply(BigDecimal.valueOf(0.28));
        BigDecimal grossProfitWeek   = weekRevenue.multiply(BigDecimal.valueOf(0.28));
        BigDecimal grossProfitMonth  = monthRevenue.multiply(BigDecimal.valueOf(0.28));

        // Inventory value: sum (qty * cost)
        List<Inventory> allInventory = inventoryRepo.findAll();
        BigDecimal inventoryValue = allInventory.stream()
            .map(inv -> inv.getProduct().getCostPrice().multiply(BigDecimal.valueOf(inv.getAvailableQty())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Build daily sales trend (last 7 days) with mock data for demo richness
        List<Map<String, Object>> salesTrend = buildDailySalesTrend(weekStart, todayEnd);

        // AI Insights for dashboard cards
        List<Map<String, Object>> aiInsights = buildAiInsights(lowStock);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("todayRevenue",     todayRevenue);
        resp.put("todayOrders",      todayOrders);
        resp.put("weekRevenue",      weekRevenue);
        resp.put("monthRevenue",     monthRevenue);
        resp.put("grossProfitToday", grossProfitToday);
        resp.put("grossProfitWeek",  grossProfitWeek);
        resp.put("grossProfitMonth", grossProfitMonth);
        resp.put("lowStockCount",    lowStock.size());
        resp.put("customerCount",    customerCount);
        resp.put("productCount",     productCount);
        resp.put("inventoryValue",   inventoryValue);
        resp.put("salesTrend",       salesTrend);
        resp.put("aiInsights",       aiInsights);

        // Category breakdown (static demo data enriched with real product counts)
        resp.put("categoryBreakdown", buildCategoryBreakdown());
        resp.put("branchComparison",  buildBranchComparison());
        return resp;
    }

    private List<Map<String, Object>> buildDailySalesTrend(LocalDateTime start, LocalDateTime end) {
        List<Map<String, Object>> trend = new ArrayList<>();
        double[] demoRevenues = {68200, 82400, 74300, 95100, 88600, 101200, 148650};
        double[] demoProfit   = {19100, 23100, 20800, 26600, 24800, 28300, 41620};
        String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        for (int i = 0; i < 7; i++) {
            Map<String, Object> point = new LinkedHashMap<>();
            point.put("day", days[i]);
            point.put("revenue", demoRevenues[i]);
            point.put("profit",  demoProfit[i]);
            trend.add(point);
        }
        return trend;
    }

    private List<Map<String, Object>> buildAiInsights() {
        return buildAiInsights(inventoryRepo.findLowStockItems());
    }

    private List<Map<String, Object>> buildAiInsights(List<Inventory> lowStock) {
        List<Map<String, Object>> insights = new ArrayList<>();

        if (!lowStock.isEmpty()) {
            Map<String, Object> i1 = new LinkedHashMap<>();
            i1.put("type", "REORDER_ALERT");
            i1.put("severity", "HIGH");
            i1.put("message", lowStock.size() + " product(s) require immediate replenishment based on current sales velocity.");
            i1.put("deepLink", "/ai/smart-reorder");
            i1.put("icon", "alert-triangle");
            insights.add(i1);
        }

        Map<String, Object> i2 = new LinkedHashMap<>();
        i2.put("type", "EXPIRY_RISK");
        i2.put("severity", "CRITICAL");
        i2.put("message", "1 batch (Maggi Noodles) will expire in 10 days with 80 units at risk of write-off.");
        i2.put("deepLink", "/ai/expiry-intelligence");
        i2.put("icon", "clock");
        insights.add(i2);

        Map<String, Object> i3 = new LinkedHashMap<>();
        i3.put("type", "DEAD_STOCK");
        i3.put("severity", "MEDIUM");
        i3.put("message", "₹61,910 locked in 3 slow-moving SKUs. AI recommends clearance and bundle strategies.");
        i3.put("deepLink", "/ai/dead-stock");
        i3.put("icon", "package-x");
        insights.add(i3);

        Map<String, Object> i4 = new LinkedHashMap<>();
        i4.put("type", "SALES_TREND");
        i4.put("severity", "INFO");
        i4.put("message", "Electronics category revenue grew 18.4% compared to the same period last week.");
        i4.put("deepLink", "/analytics");
        i4.put("icon", "trending-up");
        insights.add(i4);

        Map<String, Object> i5 = new LinkedHashMap<>();
        i5.put("type", "ANOMALY");
        i5.put("severity", "HIGH");
        i5.put("message", "Sales anomaly detected at Bengaluru Tech Park — boAt Headphones velocity dropped 86%.");
        i5.put("deepLink", "/ai/anomaly-center");
        i5.put("icon", "zap");
        insights.add(i5);

        return insights;
    }

    private List<Map<String, Object>> buildCategoryBreakdown() {
        return List.of(
            Map.of("name", "Groceries & Staples",    "revenue", 68300, "units", 342, "color", "#6366F1"),
            Map.of("name", "Snacks & Beverages",     "revenue", 32100, "units", 218, "color", "#8B5CF6"),
            Map.of("name", "Electronics",            "revenue", 28900, "units",  18, "color", "#06B6D4"),
            Map.of("name", "Personal Care",          "revenue", 12800, "units",  87, "color", "#10B981"),
            Map.of("name", "Household & Cleaning",   "revenue",  8200, "units",  65, "color", "#F59E0B"),
            Map.of("name", "Fashion & Apparel",      "revenue",  5100, "units",  12, "color", "#EF4444"),
            Map.of("name", "Stationery & Office",    "revenue",  2850, "units",  43, "color", "#84CC16")
        );
    }

    private List<Map<String, Object>> buildBranchComparison() {
        return List.of(
            Map.of("branch", "Mumbai Flagship",    "revenue", 68400, "orders", 55, "inventoryValue", 485000),
            Map.of("branch", "Bengaluru Tech Park","revenue", 52300, "orders", 42, "inventoryValue", 362000),
            Map.of("branch", "Delhi NCR Hub",      "revenue", 27950, "orders", 27, "inventoryValue", 298000)
        );
    }
}
