package com.shopmind.repository;

import com.shopmind.entity.StockTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StockTransferRepository extends JpaRepository<StockTransfer, Long> {
    List<StockTransfer> findByStatus(String status);
    List<StockTransfer> findBySourceBranchIdOrDestinationBranchId(Long sourceId, Long destId);
}
