package com.shopmind.controller;

import com.shopmind.service.AiIntegrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private AiIntegrationService aiService;

    @GetMapping("/forecast/{productId}")
    public ResponseEntity<?> getForecast(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "Product") String productName,
            @RequestParam(defaultValue = "1") Long branchId,
            @RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(aiService.getForecast(productId, productName, branchId, days));
    }

    @PostMapping("/reorder-calculation")
    public ResponseEntity<?> calculateReorder(@RequestBody Map<String, Object> product) {
        return ResponseEntity.ok(aiService.getReorderRecommendation(product));
    }

    @GetMapping("/market-basket")
    public ResponseEntity<?> getMarketBasket() {
        return ResponseEntity.ok(aiService.getMarketBasketRules());
    }

    @GetMapping("/anomalies")
    public ResponseEntity<?> getAnomalies() {
        return ResponseEntity.ok(aiService.getAnomalies());
    }

    @GetMapping("/dead-stock")
    public ResponseEntity<?> getDeadStock() {
        return ResponseEntity.ok(aiService.getDeadStock());
    }

    @GetMapping("/expiry-intelligence")
    public ResponseEntity<?> getExpiryIntelligence() {
        return ResponseEntity.ok(aiService.getExpiryIntelligence());
    }

    @PostMapping("/simulation")
    public ResponseEntity<?> runSimulation(@RequestBody Map<String, Object> params) {
        return ResponseEntity.ok(aiService.runSimulation(params));
    }

    @PostMapping("/assistant")
    public ResponseEntity<?> assistantChat(@RequestBody Map<String, String> req) {
        String query = req.getOrDefault("query", "");
        return ResponseEntity.ok(aiService.queryAssistant(query));
    }
}
