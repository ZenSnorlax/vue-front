import service from "@/utils/request";

// 订单模块接口参数定义
interface OrderData {
  orderId?: string;
  userId?: string;
  movieName?: string;
  seat?: number;
  status?: string;
  price?: number;
  orderTime?: string;
  cinemaName?: string;
}

// 分页参数定义
interface PaginationParams {
  page: number; // 当前页码
  pageSize: number; // 每页条数
}

interface TimeRange {
  startTime?: string; // 注册时间范围
  endTime?: string;
}

// 筛选参数定义
interface FilterParams extends Partial<OrderData & TimeRange> {
  [key: string]: any; // 允许扩展其他动态参数
}

// **获取用户列表（分页与筛选）**
export async function getOrdersPaginated(
  params: PaginationParams & FilterParams
) {
  return await service({
    url: "/api/orders",
    method: "get",
    params,
  });
}

/** 删除订单 */
export async function deleteOrder(id: string) {
  return await service({
    url: `/api/orders/${id}`,
    method: "delete",
  });
}

/** 修改订单 */
export async function updateOrder(id: string, data: OrderData) {
  return await service({
    url: `/api/orders/${id}`,
    method: "put",
    data,
  });
}

/** 获取订单反馈列表 */
export async function getOrderFeedback() {
  return await service({
    url: "/api/orders/feedback",
    method: "get",
  });
}
