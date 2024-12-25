import service from "@/utils/request";

export interface RevenueParams {
  timeframe?: "yearly" | "monthly" | "weekly";
}

export async function getRevenue(params: RevenueParams) {
  return service({
    url: "/api/revenue",
    method: "get",
    params,
  });
}
