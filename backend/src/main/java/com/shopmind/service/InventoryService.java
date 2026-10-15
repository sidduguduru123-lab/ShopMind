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
public class InventoryService {

    @Autowired private InventoryRepository inventoryRepository;
    @Autowired private InventoryMovementRepository movementRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private BranchRepository branchRepository;

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public List<Inventory> getInventoryByBranch(Long branchId) {
        return inventoryRepository.findByBranchId(branchId);
    }

    public List<Inventory> getLowStockItems() {
        return inventoryRepository.findLowStockItems();
    }

    public Optional<Inventory> getByProductAndBranch(Long productId, Long branchId) {
        return inventoryRepository.findByProductIdAndBranchId(productId, branchId);
    }

    @Transactional
    public void deductStock(Long productId, Long branchId, int quantity, String type, Long refId) {
        Inventory inv = inventoryRepository.findByProductIdAndBranchId(productId, branchId)
            .orElseThrow(() -> new RuntimeException("Inventory not found"));
        if (inv.getAvailableQty() < quantity) {
            throw new RuntimeException("Insufficient stock for product: " + productId);
        }
        inv.setAvailableQty(inv.getAvailableQty() - quantity);
        inv.setUpdatedAt(LocalDateTime.now());
        inventoryRepository.save(inv);
        recordMovement(productId, branchId, type, -quantity, refId, "Stock deducted");
    }

    @Transactional
    public void addStock(Long productId, Long branchId, int quantity, String type, Long refId) {
        Inventory inv = inventoryRepository.findByProductIdAndBranchId(productId, branchId)
            .orElseGet(() -> {
                Inventory newInv = new Inventory();
                newInv.setProduct(productRepository.findById(productId).orElseThrow());
                newInv.setBranch(branchRepository.findById(branchId).orElseThrow());
                newInv.setAvailableQty(0);
                newInv.setReservedQty(0);
                return newInv;
            });
        inv.setAvailableQty(inv.getAvailableQty() + quantity);
        inv.setUpdatedAt(LocalDateTime.now());
        inventoryRepository.save(inv);
        recordMovement(productId, branchId, type, quantity, refId, "Stock added");
    }

    @Transactional
    public void adjustStock(Long productId, Long branchId, int newQty, String notes) {
        Inventory inv = inventoryRepository.findByProductIdAndBranchId(productId, branchId)
            .orElseThrow(() -> new RuntimeException("Inventory not found"));
        int diff = newQty - inv.getAvailableQty();
        inv.setAvailableQty(newQty);
        inv.setUpdatedAt(LocalDateTime.now());
        inventoryRepository.save(inv);
        recordMovement(productId, branchId, "ADJUSTMENT", diff, null, notes);
    }

    private void recordMovement(Long productId, Long branchId, String type, int qty, Long refId, String notes) {
        InventoryMovement movement = new InventoryMovement();
        movement.setProduct(productRepository.findById(productId).orElseThrow());
        movement.setBranch(branchRepository.findById(branchId).orElseThrow());
        movement.setMovementType(type);
        movement.setQuantity(qty);
        movement.setReferenceId(refId);
        movement.setNotes(notes);
        movement.setTimestamp(LocalDateTime.now());
        movementRepository.save(movement);
    }

    public List<InventoryMovement> getMovements(Long branchId, int limit) {
        return movementRepository.findByBranchIdOrderByTimestampDesc(branchId, limit);
    }

    public Map<String, Object> getInventorySummary(Long branchId) {
        List<Inventory> items = branchId != null ? getInventoryByBranch(branchId) : getAllInventory();
        long totalProducts = items.size();
        long lowStock = items.stream().filter(i -> i.getAvailableQty() <= i.getReorderLevel() && i.getAvailableQty() > 0).count();
        long outOfStock = items.stream().filter(i -> i.getAvailableQty() == 0).count();
        double totalValue = items.stream()
            .mapToDouble(i -> i.getAvailableQty() * i.getProduct().getCostPrice().doubleValue())
            .sum();
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalProducts", totalProducts);
        summary.put("lowStockCount", lowStock);
        summary.put("outOfStockCount", outOfStock);
        summary.put("totalInventoryValue", Math.round(totalValue));
        return summary;
    }
}
