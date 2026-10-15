package com.shopmind.repository;

import com.shopmind.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findByBranchIdOrderByTimestampDesc(Long branchId);
    List<Sale> findByTimestampBetweenOrderByTimestampDesc(LocalDateTime start, LocalDateTime end);

    @Query("SELECT COALESCE(SUM(s.totalAmount), 0) FROM Sale s WHERE s.timestamp >= :start AND s.timestamp <= :end")
    BigDecimal sumRevenueByPeriod(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(s) FROM Sale s WHERE s.timestamp >= :start AND s.timestamp <= :end")
    Long countByPeriod(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT s FROM Sale s WHERE s.branch.id = :branchId AND s.timestamp >= :start")
    List<Sale> findByBranchAndStartDate(@Param("branchId") Long branchId, @Param("start") LocalDateTime start);
}
