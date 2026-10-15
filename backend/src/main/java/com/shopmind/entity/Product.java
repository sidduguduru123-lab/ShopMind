package com.shopmind.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String sku;

    @Column(nullable = false, unique = true, length = 50)
    private String barcode;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 1000)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(length = 100)
    private String brand;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal costPrice;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal sellingPrice;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal taxRate = BigDecimal.valueOf(5.0); // e.g. 5%, 12%, 18%

    private Integer minStockLevel = 10;
    private Integer maxStockLevel = 200;

    @Column(length = 20)
    private String unit = "unit"; // kg, L, pcs, box

    @Column(length = 500)
    private String imageUrl;

    private boolean isPerishable = false;
    private boolean active = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Product() {}

    public Product(String sku, String barcode, String name, String description, Category category,
                   String brand, BigDecimal costPrice, BigDecimal sellingPrice, BigDecimal taxRate,
                   Integer minStockLevel, Integer maxStockLevel, String unit, String imageUrl,
                   boolean isPerishable) {
        this.sku = sku;
        this.barcode = barcode;
        this.name = name;
        this.description = description;
        this.category = category;
        this.brand = brand;
        this.costPrice = costPrice;
        this.sellingPrice = sellingPrice;
        this.taxRate = taxRate;
        this.minStockLevel = minStockLevel;
        this.maxStockLevel = maxStockLevel;
        this.unit = unit;
        this.imageUrl = imageUrl;
        this.isPerishable = isPerishable;
        this.active = true;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getBarcode() { return barcode; }
    public void setBarcode(String barcode) { this.barcode = barcode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public BigDecimal getCostPrice() { return costPrice; }
    public void setCostPrice(BigDecimal costPrice) { this.costPrice = costPrice; }

    public BigDecimal getSellingPrice() { return sellingPrice; }
    public void setSellingPrice(BigDecimal sellingPrice) { this.sellingPrice = sellingPrice; }

    public BigDecimal getTaxRate() { return taxRate; }
    public void setTaxRate(BigDecimal taxRate) { this.taxRate = taxRate; }

    public Integer getMinStockLevel() { return minStockLevel; }
    public void setMinStockLevel(Integer minStockLevel) { this.minStockLevel = minStockLevel; }

    public Integer getMaxStockLevel() { return maxStockLevel; }
    public void setMaxStockLevel(Integer maxStockLevel) { this.maxStockLevel = maxStockLevel; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public boolean isPerishable() { return isPerishable; }
    public void setPerishable(boolean perishable) { isPerishable = perishable; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
