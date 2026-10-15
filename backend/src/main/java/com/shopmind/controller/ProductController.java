package com.shopmind.controller;

import com.shopmind.entity.*;
import com.shopmind.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired private ProductRepository productRepo;
    @Autowired private CategoryRepository categoryRepo;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepo.findByActiveTrue());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
        return productRepo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String q) {
        return ResponseEntity.ok(productRepo.findByNameContainingIgnoreCaseAndActiveTrue(q));
    }

    @GetMapping("/barcode/{barcode}")
    public ResponseEntity<?> getByBarcode(@PathVariable String barcode) {
        return productRepo.findByBarcode(barcode)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> getByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productRepo.findByCategoryIdAndActiveTrue(categoryId));
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Map<String, Object> req) {
        try {
            Product p = mapToProduct(req, null);
            return ResponseEntity.ok(productRepo.save(p));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Map<String, Object> req) {
        return productRepo.findById(id).map(existing -> {
            try {
                Product updated = mapToProduct(req, existing);
                return ResponseEntity.ok(productRepo.save(updated));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body((Object) Map.of("error", e.getMessage()));
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deactivateProduct(@PathVariable Long id) {
        return productRepo.findById(id).map(p -> {
            p.setActive(false);
            productRepo.save(p);
            return ResponseEntity.ok(Map.of("message", "Product deactivated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    private Product mapToProduct(Map<String, Object> req, Product existing) {
        Product p = (existing != null) ? existing : new Product();
        if (req.containsKey("name"))         p.setName(req.get("name").toString());
        if (req.containsKey("sku"))          p.setSku(req.get("sku").toString());
        if (req.containsKey("barcode"))      p.setBarcode(req.get("barcode").toString());
        if (req.containsKey("description"))  p.setDescription(req.get("description").toString());
        if (req.containsKey("brand"))        p.setBrand(req.get("brand").toString());
        if (req.containsKey("unit"))         p.setUnit(req.get("unit").toString());
        if (req.containsKey("imageUrl"))     p.setImageUrl(req.get("imageUrl").toString());
        if (req.containsKey("costPrice"))    p.setCostPrice(new BigDecimal(req.get("costPrice").toString()));
        if (req.containsKey("sellingPrice")) p.setSellingPrice(new BigDecimal(req.get("sellingPrice").toString()));
        if (req.containsKey("taxRate"))      p.setTaxRate(new BigDecimal(req.get("taxRate").toString()));
        if (req.containsKey("minStockLevel"))p.setMinStockLevel(Integer.parseInt(req.get("minStockLevel").toString()));
        if (req.containsKey("maxStockLevel"))p.setMaxStockLevel(Integer.parseInt(req.get("maxStockLevel").toString()));
        if (req.containsKey("isPerishable")) p.setPerishable(Boolean.parseBoolean(req.get("isPerishable").toString()));
        if (req.containsKey("categoryId")) {
            Long catId = Long.valueOf(req.get("categoryId").toString());
            categoryRepo.findById(catId).ifPresent(p::setCategory);
        }
        return p;
    }
}
