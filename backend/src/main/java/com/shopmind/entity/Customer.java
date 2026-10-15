package com.shopmind.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(unique = true, length = 100)
    private String email;

    @Column(length = 20)
    private String phone;

    private Integer loyaltyPoints = 0;

    @Column(nullable = false, length = 30)
    private String segment = "NEW"; // NEW, REGULAR, HIGH_VALUE, AT_RISK, INACTIVE

    @Column(precision = 12, scale = 2)
    private BigDecimal totalSpent = BigDecimal.ZERO;

    private Integer orderCount = 0;

    private LocalDateTime lastPurchaseDate;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Customer() {}

    public Customer(String name, String email, String phone, Integer loyaltyPoints, String segment, BigDecimal totalSpent, Integer orderCount, LocalDateTime lastPurchaseDate) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.loyaltyPoints = loyaltyPoints;
        this.segment = segment;
        this.totalSpent = totalSpent != null ? totalSpent : BigDecimal.ZERO;
        this.orderCount = orderCount != null ? orderCount : 0;
        this.lastPurchaseDate = lastPurchaseDate;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Integer getLoyaltyPoints() { return loyaltyPoints; }
    public void setLoyaltyPoints(Integer loyaltyPoints) { this.loyaltyPoints = loyaltyPoints; }

    public String getSegment() { return segment; }
    public void setSegment(String segment) { this.segment = segment; }

    public BigDecimal getTotalSpent() { return totalSpent; }
    public void setTotalSpent(BigDecimal totalSpent) { this.totalSpent = totalSpent; }

    public Integer getOrderCount() { return orderCount; }
    public void setOrderCount(Integer orderCount) { this.orderCount = orderCount; }

    public LocalDateTime getLastPurchaseDate() { return lastPurchaseDate; }
    public void setLastPurchaseDate(LocalDateTime lastPurchaseDate) { this.lastPurchaseDate = lastPurchaseDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
