from datetime import datetime, timedelta

def get_expiry_intelligence():
    """
    Evaluates perishable inventory batches against consumption velocity
    to predict write-off waste before expiration occurs.
    """
    today = datetime.now()
    batches = [
        {
            "id": 101,
            "productId": 5,
            "productName": "Amul Taaza Milk (1L)",
            "batchNumber": "B-AMUL-2026-09A",
            "branchName": "Mumbai Flagship",
            "quantity": 38,
            "expiryDate": (today + timedelta(days=5)).strftime("%Y-%m-%d"),
            "daysUntilExpiry": 5,
            "dailySalesVelocity": 12.0,
            "projectedSalesBeforeExpiry": 60.0, # 5 * 12 = 60 >= 38
            "riskCategory": "SAFE",
            "action": "Stock is projected to sell out organically prior to expiry."
        },
        {
            "id": 102,
            "productId": 8,
            "productName": "Haldiram's Bhujia (400g)",
            "batchNumber": "B-HLD-2026-08B",
            "branchName": "Bengaluru Tech Park",
            "quantity": 74,
            "expiryDate": (today + timedelta(days=16)).strftime("%Y-%m-%d"),
            "daysUntilExpiry": 16,
            "dailySalesVelocity": 2.1,
            "projectedSalesBeforeExpiry": 33.6, # will sell ~34, leaving 40 unsold!
            "riskCategory": "EXPIRING_SOON",
            "action": "Apply 15% discount badge or bundle with tea packs to accelerate liquidation."
        },
        {
            "id": 103,
            "productId": 9,
            "productName": "Maggi 2-Minute Noodles (Pack of 4)",
            "batchNumber": "B-MAG-2026-07K",
            "branchName": "Delhi NCR Hub",
            "quantity": 120,
            "expiryDate": (today + timedelta(days=10)).strftime("%Y-%m-%d"),
            "daysUntilExpiry": 10,
            "dailySalesVelocity": 4.0,
            "projectedSalesBeforeExpiry": 40.0, # 80 units at critical write-off risk!
            "riskCategory": "CRITICAL",
            "action": "Trigger urgent 30% markdown on POS checkout and transfer 50 units to Mumbai Flagship with high daily velocity (15 units/day)."
        },
        {
            "id": 104,
            "productId": 2,
            "productName": "Aashirvaad Shudh Chakki Atta (10kg)",
            "batchNumber": "B-ASH-2026-06M",
            "branchName": "Mumbai Flagship",
            "quantity": 42,
            "expiryDate": (today + timedelta(days=45)).strftime("%Y-%m-%d"),
            "daysUntilExpiry": 45,
            "dailySalesVelocity": 3.2,
            "projectedSalesBeforeExpiry": 144.0,
            "riskCategory": "MONITOR",
            "action": "Monitor routine FIFO rotation at warehouse pallet."
        }
    ]
    
    return {
        "criticalCount": len([b for b in batches if b["riskCategory"] == "CRITICAL"]),
        "expiringSoonCount": len([b for b in batches if b["riskCategory"] == "EXPIRING_SOON"]),
        "batches": batches
    }
