import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product{
    productId  :String ;
    name        :String;
    price        : number;
    rating  ?     : number;
    stockQuantity: number;
}

  
  export interface SalesSummary {
    salesSummaryId: String;
    totalValue: number;
    changePercentage?: number;
    date: string;
  }
  
  export interface PurchaseSummary {
    purchaseSummaryId: String;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
  }
  
  export interface ExpenseSummary {
    expenseSummarId: String;
    totalExpenses: number;
    date: string;
  }
  
  export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: String;
    category: string;
    amount: string;
    date: string;
  }
  
  export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
  }
  
  export interface User {
    userId: number;
    name: string;
    email: string;
  }
  
export interface DashboardMetrics{
    popularProducts:Product[];
    salesSummary:SalesSummary[];
    purchaseSummary:PurchaseSummary[];
    expenseSummary:ExpenseSummary[];
    expenseByCategorySummary:ExpenseByCategorySummary[];
}
//import { getDashboardMetrics } from "../../../server/src/controllers/dashboard";
export const api=createApi({
    baseQuery : fetchBaseQuery({baseUrl : process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: "api",
    tagTypes:["DashboardMetrics"],
    endpoints : (buid)=>({
        getDashboardMetrics:buid.query<DashboardMetrics,void>({
            query:()=>"/dashboard",
            providesTags:["DashboardMetrics"],
        }),
    }),
        
    },
);
export const {useGetDashboardMetricsQuery}=api;