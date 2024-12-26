import service from "@/utils/request";

export interface RevenueParams {
  timeframe?: "yearly" | "monthly" | "daily";
}

export async function getRevenue(params: RevenueParams) {
  return await service({
    url: "/api/revenue",
    method: "get",
    params,
  });
}
