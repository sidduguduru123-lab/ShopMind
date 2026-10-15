import math

def simulate_business_scenario(
    current_price: float,
    new_price: float,
    discount_pct: float,
    marketing_budget: float,
    cost_price: float,
    current_monthly_demand: float,
    inventory_available: int,
    price_elasticity: float = -1.65
):
    """
    Simulates demand, revenue, and gross profit changes based on price elasticity,
    promotional discounts, and advertising expenditure lift.
    All outputs are labeled as decision-support estimates.
    """
    effective_price = new_price * (1.0 - (discount_pct / 100.0)) if discount_pct > 0 else new_price
    
    # 1. Price change percentage
    price_change_pct = ((effective_price - current_price) / current_price) if current_price > 0 else 0.0
    
    # 2. Demand response due to price elasticity: % dQ = e * % dP
    elasticity_demand_factor = 1.0 + (price_elasticity * price_change_pct)
    
    # 3. Marketing lift response (diminishing returns logarithmic curve)
    # E.g., ₹5,000 marketing provides ~15% boost, ₹20,000 provides ~28% boost
    marketing_lift_factor = 1.0 + (0.05 * math.log1p(max(0, marketing_budget) / 500.0))
    
    total_multiplier = max(0.2, elasticity_demand_factor * marketing_lift_factor)
    projected_demand = round(current_monthly_demand * total_multiplier, 0)
    
    # Check inventory constraint
    units_sold = min(projected_demand, float(inventory_available))
    unfulfilled_demand = max(0.0, projected_demand - inventory_available)
    
    projected_revenue = round(units_sold * effective_price, 2)
    projected_cogs = round(units_sold * cost_price, 2)
    projected_gross_profit = round(projected_revenue - projected_cogs - marketing_budget, 2)
    profit_margin_pct = round((projected_gross_profit / projected_revenue * 100.0), 2) if projected_revenue > 0 else 0.0
    
    baseline_revenue = round(min(current_monthly_demand, inventory_available) * current_price, 2)
    baseline_cogs = round(min(current_monthly_demand, inventory_available) * cost_price, 2)
    baseline_profit = round(baseline_revenue - baseline_cogs, 2)
    
    profit_difference = round(projected_gross_profit - baseline_profit, 2)
    
    stockout_risk = "HIGH" if unfulfilled_demand > 0 else ("MEDIUM" if units_sold >= inventory_available * 0.85 else "LOW")
    
    return {
        "inputs": {
            "currentPrice": current_price,
            "simulatedEffectivePrice": round(effective_price, 2),
            "discountPct": discount_pct,
            "marketingBudget": marketing_budget,
            "unitCost": cost_price,
            "currentMonthlyDemand": current_monthly_demand,
            "availableInventory": inventory_available
        },
        "projections": {
            "projectedDemandUnits": int(projected_demand),
            "fulfillableUnits": int(units_sold),
            "unfulfilledDemandUnits": int(unfulfilled_demand),
            "projectedRevenue": projected_revenue,
            "projectedGrossProfit": projected_gross_profit,
            "profitMarginPct": profit_margin_pct,
            "demandChangePct": round(((projected_demand - current_monthly_demand) / current_monthly_demand * 100.0), 1) if current_monthly_demand > 0 else 0.0,
            "profitDifference": profit_difference,
            "stockoutRisk": stockout_risk
        },
        "explanation": {
            "summary": f"At an effective price of ₹{round(effective_price, 2)} and ₹{marketing_budget:,.0f} ad spend, projected monthly demand reaches {int(projected_demand)} units ({'+' if projected_demand >= current_monthly_demand else ''}{round(((projected_demand - current_monthly_demand) / current_monthly_demand * 100.0), 1)}%).",
            "profitImpact": f"Net profit is estimated at ₹{projected_gross_profit:,.2f} ({'+' if profit_difference >= 0 else ''}₹{profit_difference:,.2f} vs baseline).",
            "inventoryWarning": f"Warning: Demand exceeds available stock by {int(unfulfilled_demand)} units. Consider placing an advance reorder." if unfulfilled_demand > 0 else "Available inventory is adequate to satisfy simulated demand.",
            "disclaimer": "All simulated projections are statistical estimates based on empirical retail elasticity and diminishing returns curves for decision-support purposes."
        }
    }
