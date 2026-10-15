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
public class SupplierOrderService {

    @Autowired private PurchaseOrderRepository purchaseOrderRepository;
    @Autowired private SupplierRepository supplierRepository;
    @Autowired private BranchRepository branchRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private InventoryService inventoryService;

    public List<PurchaseOrder> getAllPurchaseOrders() { return purchaseOrderRepository.findAll(); }

    public Optional<PurchaseOrder> getPurchaseOrderById(Long id) { return purchaseOrderRepository.findById(id); }

    @Transactional
    public PurchaseOrder createPurchaseOrder(Map<String, Object> data) {
        PurchaseOrder po = new PurchaseOrder();
        po.setPoNumber("PO-" + System.currentTimeMillis());
        po.setSupplier(supplierRepository.findById(Long.valueOf(data.get("supplierId").toString())).orElseThrow());
        po.setBranch(branchRepository.findById(Long.valueOf(data.get("branchId").toString())).orElseThrow());
        po.setStatus("DRAFT");
        po.setOrderDate(java.time.LocalDate.now());
        po.setNotes(data.getOrDefault("notes", "").toString());

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) data.get("items");
        List<PurchaseOrderItem> poItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (Map<String, Object> item : items) {
            PurchaseOrderItem poi = new PurchaseOrderItem();
            poi.setPurchaseOrder(po);
            poi.setProduct(productRepository.findById(Long.valueOf(item.get("productId").toString())).orElseThrow());
            poi.setQuantity(Integer.parseInt(item.get("quantity").toString()));
            poi.setUnitCost(new BigDecimal(item.get("unitCost").toString()));
            poi.setTotalAmount(poi.getUnitCost().multiply(BigDecimal.valueOf(poi.getQuantity())));
            poItems.add(poi);
            total = total.add(poi.getTotalAmount());
        }

        po.setItems(poItems);
        po.setTotalAmount(total);
        return purchaseOrderRepository.save(po);
    }

    @Transactional
    public PurchaseOrder updateStatus(Long poId, String status) {
        PurchaseOrder po = purchaseOrderRepository.findById(poId)
            .orElseThrow(() -> new RuntimeException("Purchase order not found"));
        po.setStatus(status);

        if ("RECEIVED".equals(status)) {
            // Add received stock to inventory
            for (PurchaseOrderItem item : po.getItems()) {
                inventoryService.addStock(item.getProduct().getId(), po.getBranch().getId(),
                    item.getQuantity(), "PURCHASE_RECEIPT", po.getId());
            }
        }
        return purchaseOrderRepository.save(po);
    }
}
