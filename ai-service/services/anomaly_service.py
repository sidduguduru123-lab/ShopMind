from datetime import datetime, timedelta

def get_detected_anomalies():
    """
    Returns detected business and inventory anomalies with severity scoring,
    baseline expectations vs observed values, and investigative guidance.
    """
    now = datetime.now()
    return [
        {
            "id": 1,
            "metric": "Sales Velocity Drop",
            "severity": "HIGH",
            "branchName": "Bengaluru Tech Park",
            "branchId": 2,
            "productId": 13,
            "productName": "boAt Rockerz 450 Bluetooth Headphones",
            "expectedValue": "14.2 units/day",
            "actualValue": "2.0 units/day",
            "deviationPercent": -85.9,
            "detectedAt": (now - timedelta(hours=3)).strftime("%Y-%m-%d %H:%M"),
            "status": "OPEN",
            "explanation": {
                "summary": "Sales dropped 86% below 30-day moving average baseline.",
                "potentialCauses": [
                    "Aisle/shelf stockout despite positive system inventory record",
                    "Competitor discount promotion in immediate vicinity",
                    "POS barcode scanning error or misplaced shelf display"
                ],
                "recommendedAction": "Perform physical stock check at Bengaluru Tech Park branch shelf #4.",
                "confidence": "96.4%"
            }
        },
        {
            "id": 2,
            "metric": "Unusual Spike in Discounts",
            "severity": "MEDIUM",
            "branchName": "Mumbai Flagship",
            "branchId": 1,
            "productId": 14,
            "productName": "Noise ColorFit Pulse Smartwatch",
            "expectedValue": "4.5% avg discount",
            "actualValue": "18.2% avg discount",
            "deviationPercent": 304.4,
            "detectedAt": (now - timedelta(hours=6)).strftime("%Y-%m-%d %H:%M"),
            "status": "UNDER_REVIEW",
            "explanation": {
                "summary": "Average cashier discount exceeded permissible 10% threshold across 8 consecutive POS tickets.",
                "potentialCauses": [
                    "Unapproved promotional code applied manually by cashier",
                    "Manager override for open-box or damaged packaging stock"
                ],
                "recommendedAction": "Review POS audit log for Cashier #3 and verify authorization override code.",
                "confidence": "91.0%"
            }
        },
        {
            "id": 3,
            "metric": "Inventory Variance / Shrinkage Risk",
            "severity": "HIGH",
            "branchName": "Delhi NCR Hub",
            "branchId": 3,
            "productId": 4,
            "productName": "Fortune Sunlite Sunflower Oil (1L)",
            "expectedValue": "112 units",
            "actualValue": "88 units (Physical count)",
            "deviationPercent": -21.4,
            "detectedAt": (now - timedelta(hours=14)).strftime("%Y-%m-%d %H:%M"),
            "status": "OPEN",
            "explanation": {
                "summary": "Audit scan revealed 24 units discrepancy between system ledger and warehouse shelf.",
                "potentialCauses": [
                    "Unregistered internal transfer to frontline display",
                    "Receiving dock counting omission during last supplier delivery",
                    "Stock damage or breakage not recorded in waste register"
                ],
                "recommendedAction": "Reconcile delivery manifest PO-2026-089 and perform recount of carton pallet #B-12.",
                "confidence": "94.8%"
            }
        },
        {
            "id": 4,
            "metric": "Sudden Spike in Online Return Rate",
            "severity": "LOW",
            "branchName": "Online Store E-Commerce Hub",
            "branchId": 1,
            "productId": 21,
            "productName": "Sparx Running Shoes (Size 9)",
            "expectedValue": "3.1% return rate",
            "actualValue": "12.8% return rate",
            "deviationPercent": 312.9,
            "detectedAt": (now - timedelta(days=1)).strftime("%Y-%m-%d %H:%M"),
            "status": "INVESTIGATING",
            "explanation": {
                "summary": "Customer returns spiked citing 'size fit smaller than expected'.",
                "potentialCauses": [
                    "Inaccurate size chart specification on product detail page",
                    "Supplier batch sizing inconsistency"
                ],
                "recommendedAction": "Update online sizing guide with notice to order half-size up.",
                "confidence": "88.7%"
            }
        }
    ]
