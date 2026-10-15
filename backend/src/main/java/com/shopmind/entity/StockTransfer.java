package com.shopmind.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stock_transfers")
public class StockTransfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String transferNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "source_branch_id", nullable = false)
    private Branch sourceBranch;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destination_branch_id", nullable = false)
    private Branch destinationBranch;

    @Column(nullable = false, length = 30)
    private String status = "SUGGESTED"; // SUGGESTED, REQUESTED, APPROVED, IN_TRANSIT, RECEIVED

    @Column(length = 255)
    private String reason;

    @OneToMany(mappedBy = "stockTransfer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<StockTransferItem> items = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    public StockTransfer() {}

    public StockTransfer(String transferNumber, Branch sourceBranch, Branch destinationBranch, String status, String reason) {
        this.transferNumber = transferNumber;
        this.sourceBranch = sourceBranch;
        this.destinationBranch = destinationBranch;
        this.status = status;
        this.reason = reason;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTransferNumber() { return transferNumber; }
    public void setTransferNumber(String transferNumber) { this.transferNumber = transferNumber; }

    public Branch getSourceBranch() { return sourceBranch; }
    public void setSourceBranch(Branch sourceBranch) { this.sourceBranch = sourceBranch; }

    public Branch getDestinationBranch() { return destinationBranch; }
    public void setDestinationBranch(Branch destinationBranch) { this.destinationBranch = destinationBranch; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public List<StockTransferItem> getItems() { return items; }
    public void setItems(List<StockTransferItem> items) { this.items = items; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
