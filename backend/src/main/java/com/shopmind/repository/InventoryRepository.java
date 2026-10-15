package com.shopmind.repository;

import com.shopmind.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByProductIdAndBranchId(Long productId, Long branchId);
    List<Inventory> findByBranchId(Long branchId);
    List<Inventory> findByProductId(Long productId);

    @Query("SELECT i FROM Inventory i WHERE i.availableQty <= i.reorderLevel")
    List<Inventory> findLowStockItems();

    @Query("SELECT i FROM Inventory i WHERE i.availableQty = 0")
    List<Inventory> findOutOfStockItems();
}
