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
public class OnlineOrderService {

    @Autowired private OnlineOrderRepository onlineOrderRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private CustomerRepository customerRepository;
    @Autowired private BranchRepository branchRepository;
    @Autowired private InventoryService inventoryService;

    @Transactional
    public OnlineOrder createOrder(Map<String, Object> orderData) {
        OnlineOrder order = new OnlineOrder();
        Long customerId = Long.valueOf(orderData.get("customerId").toString());
        Long branchId = orderData.containsKey("branchId") ?
            Long.valueOf(orderData.get("branchId").toString()) : 1L;

        order.setCustomer(customerRepository.findById(customerId).orElseThrow());
        order.setFulfillingBranch(branchRepository.findById(branchId).orElseThrow());
        order.setOrderNumber("ORD-" + System.currentTimeMillis());
        order.setCreatedAt(LocalDateTime.now());
        order.setOrderStatus("PENDING");
        order.setPaymentStatus("PAID");
        order.setShippingAddress(orderData.getOrDefault("shippingAddress", "").toString());

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) orderData.get("items");
        List<OnlineOrderItem> orderItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (Map<String, Object> item : items) {
            Long productId = Long.valueOf(item.get("productId").toString());
            int qty = Integer.parseInt(item.get("quantity").toString());
            Product product = productRepository.findById(productId).orElseThrow();

            OnlineOrderItem oi = new OnlineOrderItem();
            oi.setOrder(order);
            oi.setProduct(product);
            oi.setQuantity(qty);
            oi.setUnitPrice(product.getSellingPrice());
            oi.setTotalAmount(product.getSellingPrice().multiply(BigDecimal.valueOf(qty)));
            orderItems.add(oi);
            total = total.add(oi.getTotalAmount());

            // Reserve inventory
            inventoryService.deductStock(productId, branchId, qty, "ONLINE_ORDER", null);
        }

        order.setItems(orderItems);
        order.setTotalAmount(total);
        return onlineOrderRepository.save(order);
    }

    public List<OnlineOrder> getAllOrders() { return onlineOrderRepository.findAll(); }

    public List<OnlineOrder> getOrdersByCustomer(Long customerId) {
        return onlineOrderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    public Optional<OnlineOrder> getOrderById(Long id) { return onlineOrderRepository.findById(id); }

    @Transactional
    public OnlineOrder updateOrderStatus(Long orderId, String status) {
        OnlineOrder order = onlineOrderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus(status);
        return onlineOrderRepository.save(order);
    }
}
