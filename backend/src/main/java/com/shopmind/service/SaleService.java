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
public class SaleService {

    @Autowired private SaleRepository saleRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private CustomerRepository customerRepository;
    @Autowired private InventoryService inventoryService;
    @Autowired private UserRepository userRepository;
    @Autowired private BranchRepository branchRepository;

    @Transactional
    public Sale createSale(Map<String, Object> saleData) {
        Long branchId = Long.valueOf(saleData.get("branchId").toString());
        String cashierUsername = saleData.getOrDefault("cashierUsername", "cashier").toString();

        Branch branch = branchRepository.findById(branchId).orElseThrow();

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) saleData.get("items");
        List<SaleItem> saleItems = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;

        for (Map<String, Object> item : items) {
            Long productId = Long.valueOf(item.get("productId").toString());
            int qty = Integer.parseInt(item.get("quantity").toString());
            Product product = productRepository.findById(productId).orElseThrow();

            SaleItem si = new SaleItem();
            si.setProduct(product);
            si.setQuantity(qty);
            si.setUnitPrice(product.getSellingPrice());
            BigDecimal itemDiscount = item.containsKey("discount") ?
                new BigDecimal(item.get("discount").toString()) : BigDecimal.ZERO;
            si.setSubtotal(product.getSellingPrice().multiply(BigDecimal.valueOf(qty)).subtract(itemDiscount));
            saleItems.add(si);
            subtotal = subtotal.add(si.getSubtotal());

            // Deduct inventory
            inventoryService.deductStock(productId, branchId, qty, "POS_SALE", null);
        }

        BigDecimal discount = new BigDecimal(saleData.getOrDefault("discount", "0").toString());
        BigDecimal taxableAmount = subtotal.subtract(discount);
        BigDecimal tax = taxableAmount.multiply(new BigDecimal("0.18"));
        BigDecimal total = taxableAmount.add(tax);

        Customer customer = null;
        if (saleData.containsKey("customerId") && saleData.get("customerId") != null) {
            customer = customerRepository.findById(Long.valueOf(saleData.get("customerId").toString())).orElse(null);
        }

        Sale sale = new Sale(
            "INV-" + System.currentTimeMillis(),
            branch,
            cashierUsername,
            customer,
            saleData.getOrDefault("paymentMethod", "CASH").toString(),
            subtotal,
            discount,
            tax,
            total
        );

        for (SaleItem si : saleItems) {
            si.setSale(sale);
        }
        sale.setItems(saleItems);
        Sale saved = saleRepository.save(sale);

        // Accrue loyalty points for customer
        if (customer != null) {
            int points = total.intValue() / 10;
            customer.setLoyaltyPoints(customer.getLoyaltyPoints() + points);
            customer.setTotalSpent(customer.getTotalSpent().add(total));
            customer.setOrderCount(customer.getOrderCount() + 1);
            customer.setLastPurchaseDate(LocalDateTime.now());
            customerRepository.save(customer);
        }

        return saved;
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public List<Sale> getSalesByBranch(Long branchId) {
        return saleRepository.findByBranchIdOrderByTimestampDesc(branchId);
    }

    public Optional<Sale> getSaleById(Long id) {
        return saleRepository.findById(id);
    }

    public Map<String, Object> getDailySalesSummary(Long branchId) {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = startOfDay.plusDays(1);
        List<Sale> todaySales = branchId != null ?
            saleRepository.findByBranchAndStartDate(branchId, startOfDay) :
            saleRepository.findByTimestampBetweenOrderByTimestampDesc(startOfDay, endOfDay);
        double revenue = todaySales.stream().mapToDouble(s -> s.getTotalAmount().doubleValue()).sum();
        Map<String, Object> summary = new HashMap<>();
        summary.put("saleCount", todaySales.size());
        summary.put("revenue", Math.round(revenue));
        summary.put("avgOrderValue", todaySales.isEmpty() ? 0 : Math.round(revenue / todaySales.size()));
        return summary;
    }
}
