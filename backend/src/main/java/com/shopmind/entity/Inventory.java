package com.shopmind.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"product_id", "branch_id"})
})
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(nullable = false)
    private Integer availableQty = 0;

    @Column(nullable = false)
    private Integer reservedQty = 0; // Reserved for online unfulfilled orders

    @Column(nullable = false)
    private Integer reorderLevel = 15;

    @Column(nullable = false)
    private Integer safetyStock = 10;

    private LocalDateTime updatedAt = LocalDateTime.now();

    public Inventory() {}

    public Inventory(Product product, Branch branch, Integer availableQty, Integer reservedQty, Integer reorderLevel, Integer safetyStock) {
        this.product = product;
        this.branch = branch;
        this.availableQty = availableQty;
        this.reservedQty = reservedQty;
        this.reorderLevel = reorderLevel;
        this.safetyStock = safetyStock;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Branch getBranch() { return branch; }
    public void setBranch(Branch branch) { this.branch = branch; }

    public Integer getAvailableQty() { return availableQty; }
    public void setAvailableQty(Integer availableQty) { this.availableQty = availableQty; }

    public Integer getReservedQty() { return reservedQty; }
    public void setReservedQty(Integer reservedQty) { this.reservedQty = reservedQty; }

    public Integer getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; }

    public Integer getSafetyStock() { return safetyStock; }
    public void setSafetyStock(Integer safetyStock) { this.safetyStock = safetyStock; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getStockStatus() {
        int total = availableQty != null ? availableQty : 0;
        if (total <= 0) return "OUT_OF_STOCK";
        if (total <= (safetyStock != null ? safetyStock : 5)) return "CRITICAL";
        if (total <= (reorderLevel != null ? reorderLevel : 15)) return "LOW_STOCK";
        if (total > 250) return "OVERSTOCKED";
        return "IN_STOCK";
    }
}
