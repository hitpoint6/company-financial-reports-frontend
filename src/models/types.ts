export interface Company {
    id: number;
    name: string;
    industry: string;
    location: string;
    business_model: string;
    feature_set: string;
    founder_quality: string;
  }
  
export interface Report {
    id: number;
    company: number;
    revenue: number;
    cash_burn: number;
    gross_profit: number;
    ebitda: number;
    cash_on_hand: number;
    cac: number;
    ltv: number;
    acv: number;
    customer_count: number;
    next_fundraising: string | null;
    timestamp: string;
}