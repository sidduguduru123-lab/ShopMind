package com.shopmind.controller;

import com.shopmind.entity.Sale;
import com.shopmind.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @PostMapping
    public ResponseEntity<?> createSale(@RequestBody Map<String, Object> saleData) {
        try {
            Sale sale = saleService.createSale(saleData);
            return ResponseEntity.ok(sale);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Sale>> getSales(@RequestParam(required = false) Long branchId) {
        if (branchId != null) {
            return ResponseEntity.ok(saleService.getSalesByBranch(branchId));
        }
        return ResponseEntity.ok(saleService.getAllSales());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSaleById(@PathVariable Long id) {
        return saleService.getSaleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getDailySummary(@RequestParam(required = false) Long branchId) {
        return ResponseEntity.ok(saleService.getDailySalesSummary(branchId));
    }
}
