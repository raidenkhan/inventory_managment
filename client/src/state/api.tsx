import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import build from "next/dist/build";

export interface Product{
    productId  :String ;
    name        :String;
    price        : number;
    rating  ?     : number;
    stockQuantity: number;
}
export interface NewProduct{
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
    tagTypes:["DashboardMetrics","Products","Users","Expenses"],
    endpoints : (buid)=>({
        getDashboardMetrics:buid.query<DashboardMetrics,void>({
            query:()=>"/dashboard",
            providesTags:["DashboardMetrics"],
        }),
        getProducts:buid.query<Product[],string|void>({
          query:(search)=>({
            url:"/products",
            params:search?{search}:{}
          }),
          providesTags:["Products"],
      }),
      createProduct : buid.mutation<Product,NewProduct>({
        query:(newProduct)=>({
          url:"/products",
          method:"POST",
         body:newProduct
        }),
        invalidatesTags:["Products"]//helps to refetch once we finish posting the product to keep it updated
      }),
      getUsers:buid.query<User[],void>({
        query:()=>"/users",
        providesTags:["Users"],
    }),
    getExpensesByCategory:buid.query<ExpenseByCategorySummary[],void>({
      query:()=>"/expenses",
      providesTags:["Expenses"],
  }),
    }),
        
    },
);
export const {useGetDashboardMetricsQuery,useGetProductsQuery,useCreateProductMutation,useGetUsersQuery,useGetExpensesByCategoryQuery}=api;