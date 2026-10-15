def get_customer_segments_summary():
    """
    Returns RFM (Recency, Frequency, Monetary) customer segmentation breakdown
    and engagement recommendations.
    """
    segments = [
        {
            "segment": "HIGH_VALUE",
            "name": "High-Value VIPs",
            "count": 142,
            "percentage": 14.5,
            "avgOrderValue": 3850.0,
            "avgLifetimeSpend": 42100.0,
            "avgFrequencyPerMonth": 4.8,
            "avgRecencyDays": 5,
            "characteristics": "Frequent high-ticket shoppers with high loyalty retention.",
            "recommendedStrategy": "Provide dedicated concierge support, exclusive early access to festival sales, and personalized anniversary rewards."
        },
        {
            "segment": "REGULAR",
            "name": "Loyal Regulars",
            "count": 485,
            "percentage": 49.6,
            "avgOrderValue": 1450.0,
            "avgLifetimeSpend": 18200.0,
            "avgFrequencyPerMonth": 2.6,
            "avgRecencyDays": 12,
            "characteristics": "Consistent household staple replenishment buyers across POS and online channels.",
            "recommendedStrategy": "Encourage loyalty tier progression with threshold spend bonus points (e.g., Spend ₹2,000 get 200 points)."
        },
        {
            "segment": "NEW",
            "name": "New Shoppers",
            "count": 178,
            "percentage": 18.2,
            "avgOrderValue": 1120.0,
            "avgLifetimeSpend": 1120.0,
            "avgFrequencyPerMonth": 1.0,
            "avgRecencyDays": 8,
            "characteristics": "First-time purchasers acquired during the last 30 days.",
            "recommendedStrategy": "Send 2nd-order welcome incentive coupon (10% off next visit within 14 days)."
        },
        {
            "segment": "AT_RISK",
            "name": "At-Risk Customers",
            "count": 118,
            "percentage": 12.1,
            "avgOrderValue": 1680.0,
            "avgLifetimeSpend": 12400.0,
            "avgFrequencyPerMonth": 0.4,
            "avgRecencyDays": 58,
            "characteristics": "Previously frequent shoppers whose purchase activity has stalled for >45 days.",
            "recommendedStrategy": "Trigger automated 'We Miss You' SMS/Email re-engagement campaign with personalized coupon for their favorite category."
        },
        {
            "segment": "INACTIVE",
            "name": "Dormant / Inactive",
            "count": 55,
            "percentage": 5.6,
            "avgOrderValue": 980.0,
            "avgLifetimeSpend": 4200.0,
            "avgFrequencyPerMonth": 0.1,
            "avgRecencyDays": 140,
            "characteristics": "No purchases for over 90 days.",
            "recommendedStrategy": "Survey for feedback on store experience and deliver reactivation clearance offers."
        }
    ]
    return {
        "totalCustomers": sum(s["count"] for s in segments),
        "activeLoyaltyRate": "78.4%",
        "segments": segments
    }
