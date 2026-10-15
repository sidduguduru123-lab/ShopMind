package com.shopmind.repository;

import com.shopmind.entity.ExpiryBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface ExpiryBatchRepository extends JpaRepository<ExpiryBatch, Long> {
    @Query("SELECT e FROM ExpiryBatch e WHERE e.expiryDate <= :dateThreshold AND e.status != 'EXPIRED'")
    List<ExpiryBatch> findExpiringBefore(@Param("dateThreshold") LocalDate dateThreshold);

    List<ExpiryBatch> findByBranchId(Long branchId);
    List<ExpiryBatch> findByStatus(String status);
}
