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
public class StockTransferService {

    @Autowired private StockTransferRepository stockTransferRepository;
    @Autowired private BranchRepository branchRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private InventoryService inventoryService;

    public List<StockTransfer> getAllTransfers() { return stockTransferRepository.findAll(); }

    @Transactional
    public StockTransfer createTransfer(Map<String, Object> data) {
        StockTransfer transfer = new StockTransfer();
        transfer.setTransferNumber("TRF-" + System.currentTimeMillis());
        transfer.setSourceBranch(branchRepository.findById(Long.valueOf(data.get("sourceBranchId").toString())).orElseThrow());
        transfer.setDestinationBranch(branchRepository.findById(Long.valueOf(data.get("destBranchId").toString())).orElseThrow());
        transfer.setStatus("REQUESTED");
        transfer.setReason(data.getOrDefault("notes", "").toString());

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) data.get("items");
        List<StockTransferItem> transferItems = new ArrayList<>();
        for (Map<String, Object> item : items) {
            StockTransferItem ti = new StockTransferItem();
            ti.setStockTransfer(transfer);
            ti.setProduct(productRepository.findById(Long.valueOf(item.get("productId").toString())).orElseThrow());
            ti.setQuantity(Integer.parseInt(item.get("quantity").toString()));
            transferItems.add(ti);
        }
        transfer.setItems(transferItems);
        return stockTransferRepository.save(transfer);
    }

    @Transactional
    public StockTransfer updateStatus(Long transferId, String status) {
        StockTransfer transfer = stockTransferRepository.findById(transferId)
            .orElseThrow(() -> new RuntimeException("Transfer not found"));
        transfer.setStatus(status);

        if ("RECEIVED".equals(status)) {
            for (StockTransferItem item : transfer.getItems()) {
                inventoryService.deductStock(item.getProduct().getId(),
                    transfer.getSourceBranch().getId(), item.getQuantity(), "TRANSFER_OUT", transfer.getId());
                inventoryService.addStock(item.getProduct().getId(),
                    transfer.getDestinationBranch().getId(), item.getQuantity(), "TRANSFER_IN", transfer.getId());
            }
        }
        return stockTransferRepository.save(transfer);
    }
}
