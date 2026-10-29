package com.shopmind.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaRedirectController {

    // Forward any non-API and non-static file routes to index.html for React SPA
    @GetMapping(value = {
        "/dashboard",
        "/pos",
        "/inventory",
        "/orders",
        "/smart-reorder",
        "/forecasting",
        "/market-basket",
        "/anomalies",
        "/expiry-intelligence",
        "/dead-stock",
        "/simulator",
        "/copilot",
        "/customers",
        "/branches",
        "/login"
    })
    public String redirect() {
        return "forward:/index.html";
    }
}
