package com.shopmind.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "online_orders")
public class OnlineOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fulfilling_branch_id")
    private Branch fulfillingBranch;

    @Column(nullable = false, length = 500)
    private String shippingAddress;

    @Column(nullable = false, length = 20)
    private String paymentStatus = "PAID"; // PENDING, PAID, FAILED

    @Column(nullable = false, length = 20)
    private String orderStatus = "PENDING"; // PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OnlineOrderItem> items = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    public OnlineOrder() {}

    public OnlineOrder(String orderNumber, Customer customer, Branch fulfillingBranch, String shippingAddress,
                       String paymentStatus, String orderStatus, BigDecimal totalAmount) {
        this.orderNumber = orderNumber;
        this.customer = customer;
        this.fulfillingBranch = fulfillingBranch;
        this.shippingAddress = shippingAddress;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.totalAmount = totalAmount;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public Branch getFulfillingBranch() { return fulfillingBranch; }
    public void setFulfillingBranch(Branch fulfillingBranch) { this.fulfillingBranch = fulfillingBranch; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public List<OnlineOrderItem> getItems() { return items; }
    public void setItems(List<OnlineOrderItem> items) { this.items = items; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
