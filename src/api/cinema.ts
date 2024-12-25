import service from "@/utils/request";

// 影厅数据定义
interface CinemaData {
  id: string;
  name: string;
  status: string;
  manager: string;
  seats: number;
}

/** 获取影厅列表 */
export async function getCinemas() {
  return await service({
    url: "/api/cinemas",
    method: "get",
  });
}

/** 删除影厅 */
export async function deleteCinema(id: string) {
  return await service({
    url: `/api/cinemas/${id}`,
    method: "delete",
  });
}

/** 新增影厅 */
export async function createCinema(data: CinemaData) {
  return service({
    url: "/api/cinemas",
    method: "post",
    data,
  });
}

/** 修改影厅信息 */
export async function updateCinema(id: string, data: CinemaData) {
  return await service({
    url: `/api/cinemas/${id}`,
    method: "put",
    data,
  });
}
interface CinemaRevenueParams {
  year?: number | null; // 可选年份参数
}

export async function getCinemaRevenue(params: CinemaRevenueParams) {
  return await service({
    url: "/api/cinemas/revenue",
    method: "get",
    params,
  });
}
