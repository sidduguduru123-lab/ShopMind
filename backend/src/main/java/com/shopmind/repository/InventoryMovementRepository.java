package com.shopmind.repository;

import com.shopmind.entity.InventoryMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface InventoryMovementRepository extends JpaRepository<InventoryMovement, Long> {

    @Query("SELECT m FROM InventoryMovement m WHERE m.branch.id = :branchId ORDER BY m.timestamp DESC LIMIT :limit")
    List<InventoryMovement> findByBranchIdOrderByTimestampDesc(@Param("branchId") Long branchId, @Param("limit") int limit);

    List<InventoryMovement> findByProductIdOrderByTimestampDesc(Long productId);
}
