def get_market_basket_rules():
    """
    Returns mined association rules based on omnichannel POS and e-commerce transactions,
    including Support, Confidence, Lift, and cross-merchandising strategies.
    """
    rules = [
        {
            "id": 1,
            "antecedentId": 1,
            "antecedentName": "India Gate Basmati Rice (5kg)",
            "consequentId": 4,
            "consequentName": "Fortune Sunlite Sunflower Oil (1L)",
            "support": 0.28,
            "confidence": 0.76,
            "lift": 2.45,
            "bundleDiscountPercent": 8,
            "recommendedPlacement": "Place cooking oil adjacent to staples aisle or offer 'Pantry Essentials Bundle'.",
            "explanation": {
                "recommendation": "Bundle India Gate Basmati Rice with Fortune Sunflower Oil for an 8% combined discount.",
                "reason": "76% of customers purchasing 5kg Basmati Rice also purchase Sunflower Oil in the same ticket (Lift: 2.45x baseline random expectation).",
                "dataFactors": [
                    "Analyzed 1,420 POS transactions and 850 online orders",
                    "Co-occurrence Support: 28% of all grocery carts",
                    "Lift metric: 2.45 indicates strong positive affinity"
                ],
                "suggestedAction": "Feature as 'Frequently Bought Together' widget on Online Store and POS checkout prompt.",
                "confidence": "91.8%"
            }
        },
        {
            "id": 2,
            "antecedentId": 7,
            "antecedentName": "Britannia Good Day Biscuits",
            "consequentId": 6,
            "consequentName": "Tata Tea Gold (500g)",
            "support": 0.22,
            "confidence": 0.68,
            "lift": 2.15,
            "bundleDiscountPercent": 5,
            "recommendedPlacement": "Position premium cookies directly across the tea/coffee beverage shelf.",
            "explanation": {
                "recommendation": "Create 'Evening Chai-Biscuit' promotion combo.",
                "reason": "68% of tea buyers purchase branded tea biscuits within the same billing session (Lift: 2.15x).",
                "dataFactors": [
                    "High evening peak co-purchases (4 PM - 7 PM)",
                    "Cross-category synergy: Snacks + Beverages"
                ],
                "suggestedAction": "Print combo coupon on POS receipt for tea buyers.",
                "confidence": "89.5%"
            }
        },
        {
            "id": 3,
            "antecedentId": 13,
            "antecedentName": "boAt Rockerz 450 Bluetooth Headphones",
            "consequentId": 16,
            "consequentName": "Portronics 20W Fast Charger",
            "support": 0.15,
            "confidence": 0.58,
            "lift": 3.10,
            "bundleDiscountPercent": 10,
            "recommendedPlacement": "Digital accessory cross-sell checkout prompt.",
            "explanation": {
                "recommendation": "Display fast charger add-on at cart drawer with 10% bundle markdown.",
                "reason": "Customers investing in wireless audio have high propensity (58%) to upgrade charging peripherals (Lift: 3.10x).",
                "dataFactors": [
                    "Electronics warranty and accessory purchase history",
                    "Lift: 3.10 represents very high affinity correlation"
                ],
                "suggestedAction": "Enable one-click upsell checkbox at Online Store checkout.",
                "confidence": "93.0%"
            }
        },
        {
            "id": 4,
            "antecedentId": 10,
            "antecedentName": "Dove Daily Shine Shampoo (340ml)",
            "consequentId": 12,
            "consequentName": "Nivea Soft Moisturizing Cream (100ml)",
            "support": 0.18,
            "confidence": 0.62,
            "lift": 2.30,
            "bundleDiscountPercent": 7,
            "recommendedPlacement": "Personal care section side-cap display.",
            "explanation": {
                "recommendation": "Position hair care & winter skincare in dual-facing endcap.",
                "reason": "62% co-purchase rate among urban personal care shoppers.",
                "dataFactors": [
                    "Omnichannel basket analysis",
                    "Repeat buyer loyalty data"
                ],
                "suggestedAction": "Bundle as 'Daily Self-Care Kit'.",
                "confidence": "88.2%"
            }
        },
        {
            "id": 5,
            "antecedentId": 17,
            "antecedentName": "Surf Excel Matic Liquid Detergent (2L)",
            "consequentId": 18,
            "consequentName": "Vim Dishwash Liquid Gel (750ml)",
            "support": 0.24,
            "confidence": 0.71,
            "lift": 2.20,
            "bundleDiscountPercent": 6,
            "recommendedPlacement": "Household cleaning aisle promotional end-cap.",
            "explanation": {
                "recommendation": "Establish Monthly Household Cleaning Replenishment Pack.",
                "reason": "71% of shoppers buying laundry liquid also replenish dishwash liquid.",
                "dataFactors": [
                    "Monthly recurring household purchase cycles",
                    "High basket value correlation"
                ],
                "suggestedAction": "Promote auto-refill or monthly bundle on Online Store.",
                "confidence": "92.4%"
            }
        }
    ]
    return rules
