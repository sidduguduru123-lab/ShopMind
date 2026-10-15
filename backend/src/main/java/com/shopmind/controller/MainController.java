package com.shopmind.controller;

import com.shopmind.entity.*;
import com.shopmind.repository.*;
import com.shopmind.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class MainController {

    @Autowired private InventoryRepository inventoryRepo;
    @Autowired private BranchRepository branchRepo;
    @Autowired private CategoryRepository categoryRepo;
    @Autowired private CustomerRepository customerRepo;
    @Autowired private SupplierRepository supplierRepo;
    @Autowired private PurchaseOrderRepository poRepo;
    @Autowired private StockTransferRepository transferRepo;
    @Autowired private ExpiryBatchRepository expiryRepo;
    @Autowired private OnlineOrderRepository onlineOrderRepo;
    @Autowired private AnalyticsService analyticsService;

    // -------- Inventory --------
    @GetMapping("/inventory")
    public ResponseEntity<?> getInventory(@RequestParam(required = false) Long branchId) {
        if (branchId != null) return ResponseEntity.ok(inventoryRepo.findByBranchId(branchId));
        return ResponseEntity.ok(inventoryRepo.findAll());
    }

    @GetMapping("/inventory/low-stock")
    public ResponseEntity<?> getLowStock() {
        return ResponseEntity.ok(inventoryRepo.findLowStockItems());
    }

    @GetMapping("/inventory/product/{productId}")
    public ResponseEntity<?> getInventoryForProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryRepo.findByProductId(productId));
    }

    @PutMapping("/inventory/{id}")
    public ResponseEntity<?> updateInventory(@PathVariable Long id, @RequestBody Map<String, Object> req) {
        return inventoryRepo.findById(id).map(inv -> {
            if (req.containsKey("availableQty")) inv.setAvailableQty(Integer.parseInt(req.get("availableQty").toString()));
            if (req.containsKey("reorderLevel")) inv.setReorderLevel(Integer.parseInt(req.get("reorderLevel").toString()));
            if (req.containsKey("safetyStock"))  inv.setSafetyStock(Integer.parseInt(req.get("safetyStock").toString()));
            inv.setUpdatedAt(java.time.LocalDateTime.now());
            return ResponseEntity.ok(inventoryRepo.save(inv));
        }).orElse(ResponseEntity.notFound().build());
    }

    // -------- Branches --------
    @GetMapping("/branches")
    public ResponseEntity<?> getBranches() {
        return ResponseEntity.ok(branchRepo.findByActiveTrue());
    }

    @GetMapping("/branches/{id}")
    public ResponseEntity<?> getBranch(@PathVariable Long id) {
        return branchRepo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/branches")
    public ResponseEntity<?> createBranch(@RequestBody Branch branch) {
        return ResponseEntity.ok(branchRepo.save(branch));
    }

    // -------- Categories --------
    @GetMapping("/categories")
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok(categoryRepo.findAll());
    }

    // -------- Customers --------
    @GetMapping("/customers")
    public ResponseEntity<?> getCustomers() {
        return ResponseEntity.ok(customerRepo.findAll());
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable Long id) {
        return customerRepo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/customers")
    public ResponseEntity<?> createCustomer(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerRepo.save(customer));
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @RequestBody Map<String, Object> req) {
        return customerRepo.findById(id).map(c -> {
            if (req.containsKey("name"))    c.setName(req.get("name").toString());
            if (req.containsKey("email"))   c.setEmail(req.get("email").toString());
            if (req.containsKey("phone"))   c.setPhone(req.get("phone").toString());
            if (req.containsKey("segment")) c.setSegment(req.get("segment").toString());
            return ResponseEntity.ok(customerRepo.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    // -------- Suppliers --------
    @GetMapping("/suppliers")
    public ResponseEntity<?> getSuppliers() {
        return ResponseEntity.ok(supplierRepo.findByActiveTrue());
    }

    @PostMapping("/suppliers")
    public ResponseEntity<?> createSupplier(@RequestBody Supplier supplier) {
        return ResponseEntity.ok(supplierRepo.save(supplier));
    }

    @PutMapping("/suppliers/{id}")
    public ResponseEntity<?> updateSupplier(@PathVariable Long id, @RequestBody Map<String, Object> req) {
        return supplierRepo.findById(id).map(s -> {
            if (req.containsKey("name"))          s.setName(req.get("name").toString());
            if (req.containsKey("contactPerson")) s.setContactPerson(req.get("contactPerson").toString());
            if (req.containsKey("email"))         s.setEmail(req.get("email").toString());
            if (req.containsKey("phone"))         s.setPhone(req.get("phone").toString());
            if (req.containsKey("leadTimeDays"))  s.setLeadTimeDays(Integer.parseInt(req.get("leadTimeDays").toString()));
            return ResponseEntity.ok(supplierRepo.save(s));
        }).orElse(ResponseEntity.notFound().build());
    }

    // -------- Purchase Orders --------
    @GetMapping("/purchase-orders")
    public ResponseEntity<?> getPurchaseOrders(@RequestParam(required = false) String status) {
        if (status != null) return ResponseEntity.ok(poRepo.findByStatus(status));
        return ResponseEntity.ok(poRepo.findAll());
    }

    @GetMapping("/purchase-orders/{id}")
    public ResponseEntity<?> getPurchaseOrder(@PathVariable Long id) {
        return poRepo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/purchase-orders")
    public ResponseEntity<?> createPurchaseOrder(@RequestBody PurchaseOrder po) {
        return ResponseEntity.ok(poRepo.save(po));
    }

    @PutMapping("/purchase-orders/{id}/status")
    public ResponseEntity<?> updatePOStatus(@PathVariable Long id, @RequestBody Map<String, String> req) {
        return poRepo.findById(id).map(po -> {
            po.setStatus(req.get("status"));
            return ResponseEntity.ok(poRepo.save(po));
        }).orElse(ResponseEntity.notFound().build());
    }

    // -------- Online Orders --------
    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(@RequestParam(required = false) String status) {
        if (status != null) return ResponseEntity.ok(onlineOrderRepo.findByOrderStatusOrderByCreatedAtDesc(status));
        return ResponseEntity.ok(onlineOrderRepo.findAll());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        return onlineOrderRepo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/orders/customer/{customerId}")
    public ResponseEntity<?> getOrdersByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(onlineOrderRepo.findByCustomerIdOrderByCreatedAtDesc(customerId));
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> req) {
        return onlineOrderRepo.findById(id).map(o -> {
            o.setOrderStatus(req.get("orderStatus"));
            return ResponseEntity.ok(onlineOrderRepo.save(o));
        }).orElse(ResponseEntity.notFound().build());
    }

    // -------- Stock Transfers --------
    @GetMapping("/stock-transfers")
    public ResponseEntity<?> getStockTransfers(@RequestParam(required = false) String status) {
        if (status != null) return ResponseEntity.ok(transferRepo.findByStatus(status));
        return ResponseEntity.ok(transferRepo.findAll());
    }

    @PostMapping("/stock-transfers")
    public ResponseEntity<?> createTransfer(@RequestBody StockTransfer transfer) {
        return ResponseEntity.ok(transferRepo.save(transfer));
    }

    @PutMapping("/stock-transfers/{id}/status")
    public ResponseEntity<?> updateTransferStatus(@PathVariable Long id, @RequestBody Map<String, String> req) {
        return transferRepo.findById(id).map(t -> {
            t.setStatus(req.get("status"));
            return ResponseEntity.ok(transferRepo.save(t));
        }).orElse(ResponseEntity.notFound().build());
    }

    // -------- Expiry Batches --------
    @GetMapping("/expiry-batches")
    public ResponseEntity<?> getExpiryBatches() {
        return ResponseEntity.ok(expiryRepo.findAll());
    }

    @GetMapping("/expiry-batches/expiring-soon")
    public ResponseEntity<?> getExpiringSoon() {
        java.time.LocalDate threshold = java.time.LocalDate.now().plusDays(30);
        return ResponseEntity.ok(expiryRepo.findExpiringBefore(threshold));
    }

    // -------- Analytics --------
    @GetMapping("/analytics/overview")
    public ResponseEntity<?> getAnalyticsOverview() {
        return ResponseEntity.ok(analyticsService.getOwnerDashboardOverview());
    }
}
