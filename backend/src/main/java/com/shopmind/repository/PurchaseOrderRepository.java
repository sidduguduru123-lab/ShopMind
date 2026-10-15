package com.shopmind.repository;

import com.shopmind.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    List<PurchaseOrder> findByStatus(String status);
    List<PurchaseOrder> findByBranchIdOrderByCreatedAtDesc(Long branchId);
    List<PurchaseOrder> findBySupplierIdOrderByCreatedAtDesc(Long supplierId);
}
