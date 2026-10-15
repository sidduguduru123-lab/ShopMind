from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

from services.forecast_service import generate_forecast
from services.reorder_service import calculate_reorder_recommendation
from services.market_basket_service import get_market_basket_rules
from services.anomaly_service import get_detected_anomalies
from services.customer_service import get_customer_segments_summary
from services.dead_stock_service import get_dead_stock_items
from services.expiry_service import get_expiry_intelligence
from services.simulator_service import simulate_business_scenario
from services.assistant_service import handle_assistant_query

app = FastAPI(
    title="ShopMind AI & Decision Support Intelligence Engine",
    description="Microservice providing demand forecasting, smart reorder, market-basket analysis, anomaly detection, what-if simulations, and retail copilot.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimulationRequest(BaseModel):
    currentPrice: float
    newPrice: float
    discountPct: float = 0.0
    marketingBudget: float = 0.0
    costPrice: float
    currentMonthlyDemand: float = 100.0
    inventoryAvailable: int = 150
    priceElasticity: float = -1.65

class AssistantRequest(BaseModel):
    query: str

class ProductReorderInput(BaseModel):
    id: int
    name: str
    sku: str
    category: str
    branchId: Optional[int] = 1
    branchName: Optional[str] = "Mumbai Flagship"
    availableQty: int
    reservedQty: int = 0
    dailySalesVelocity: float = 4.0
    costPrice: float = 100.0
    leadTimeDays: int = 3
    supplierName: Optional[str] = "Primary Supplier"

@app.get("/health")
def health_check():
    return {"status": "HEALTHY", "service": "ShopMind AI Engine", "version": "1.0.0"}

@app.get("/api/ai/forecast/{product_id}")
def get_forecast(
    product_id: int,
    product_name: str = "Retail Product",
    branch_id: int = 1,
    days: int = Query(default=30, ge=7, le=90)
):
    return generate_forecast(product_id=product_id, product_name=product_name, branch_id=branch_id, days=days)

@app.post("/api/ai/reorder-calculation")
def calculate_reorder(product: ProductReorderInput):
    return calculate_reorder_recommendation(product.model_dump(), lead_time_days=product.leadTimeDays)

@app.get("/api/ai/market-basket")
def get_market_basket():
    return {"rules": get_market_basket_rules()}

@app.get("/api/ai/anomalies")
def get_anomalies():
    return {"anomalies": get_detected_anomalies()}

@app.get("/api/ai/customer-segments")
def get_customer_segments():
    return get_customer_segments_summary()

@app.get("/api/ai/dead-stock")
def get_dead_stock():
    return get_dead_stock_items()

@app.get("/api/ai/expiry-intelligence")
def get_expiry():
    return get_expiry_intelligence()

@app.post("/api/ai/simulation")
def run_simulation(req: SimulationRequest):
    return simulate_business_scenario(
        current_price=req.currentPrice,
        new_price=req.newPrice,
        discount_pct=req.discountPct,
        marketing_budget=req.marketingBudget,
        cost_price=req.costPrice,
        current_monthly_demand=req.currentMonthlyDemand,
        inventory_available=req.inventoryAvailable,
        price_elasticity=req.priceElasticity
    )

@app.post("/api/ai/assistant")
def chat_assistant(req: AssistantRequest):
    return handle_assistant_query(req.query)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
