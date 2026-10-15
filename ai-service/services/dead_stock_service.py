def get_dead_stock_items():
    """
    Identifies dormant and slow-moving SKUs locking up working capital,
    ranking them by days idle and capital exposure.
    """
    items = [
        {
            "id": 1,
            "productId": 23,
            "productName": "Classmate Spiral Notebook (300 pgs)",
            "sku": "STA-NOT-023",
            "category": "Stationery",
            "branchName": "Bengaluru Tech Park",
            "currentStock": 145,
            "daysSinceLastSale": 48,
            "dailyVelocity": 0.15,
            "tiedUpCapital": 145 * 110.0, # ₹15,950
            "unitCost": 110.0,
            "riskLevel": "HIGH",
            "aiRecommendation": "Bundle with fast-selling Trimax Pens at 15% promotional combo, or transfer 80 units to Delhi NCR Hub where school season reopened.",
            "actionType": "BUNDLE_AND_TRANSFER"
        },
        {
            "id": 2,
            "productId": 22,
            "productName": "Men's Classic Polo T-Shirt (Navy XL)",
            "sku": "FAS-TSH-022",
            "category": "Fashion",
            "branchName": "Delhi NCR Hub",
            "currentStock": 62,
            "daysSinceLastSale": 62,
            "dailyVelocity": 0.08,
            "tiedUpCapital": 62 * 380.0, # ₹23,560
            "unitCost": 380.0,
            "riskLevel": "CRITICAL",
            "aiRecommendation": "Apply 25% end-of-season markdown flash sale on Online Store.",
            "actionType": "MARKDOWN"
        },
        {
            "id": 3,
            "productId": 15,
            "productName": "SanDisk 64GB Ultra Flash Drive",
            "sku": "ELE-SAN-015",
            "category": "Electronics",
            "branchName": "Mumbai Flagship",
            "currentStock": 80,
            "daysSinceLastSale": 34,
            "dailyVelocity": 0.3,
            "tiedUpCapital": 80 * 280.0, # ₹22,400
            "unitCost": 280.0,
            "riskLevel": "MEDIUM",
            "aiRecommendation": "Include as promotional gift with smartwatches or halt upcoming purchase order replenishment.",
            "actionType": "HALT_PROCUREMENT"
        }
    ]
    
    total_capital = sum(item["tiedUpCapital"] for item in items)
    return {
        "totalDeadStockCapital": total_capital,
        "affectedSkuCount": len(items),
        "items": items
    }
