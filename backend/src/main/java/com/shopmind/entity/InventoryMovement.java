package com.shopmind.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory_movements")
public class InventoryMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(nullable = false, length = 30)
    private String movementType; // POS_SALE, ONLINE_ORDER, PURCHASE_RECEIPT, TRANSFER_IN, TRANSFER_OUT, RETURN, ADJUSTMENT

    @Column(nullable = false)
    private Integer quantity; // positive for addition, negative for deduction

    private Long referenceId;

    @Column(length = 255)
    private String notes;

    private LocalDateTime timestamp = LocalDateTime.now();

    public InventoryMovement() {}

    public InventoryMovement(Product product, Branch branch, String movementType, Integer quantity, Long referenceId, String notes) {
        this.product = product;
        this.branch = branch;
        this.movementType = movementType;
        this.quantity = quantity;
        this.referenceId = referenceId;
        this.notes = notes;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Branch getBranch() { return branch; }
    public void setBranch(Branch branch) { this.branch = branch; }

    public String getMovementType() { return movementType; }
    public void setMovementType(String movementType) { this.movementType = movementType; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Long getReferenceId() { return referenceId; }
    public void setReferenceId(Long referenceId) { this.referenceId = referenceId; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
