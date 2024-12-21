import service from "@/utils/request";

// 通用接口参数定义
interface LoginData {
  username: string;
  password: string;
}

interface AuditoriumData {
  name: string; // 影厅名称
  status: string; // 启用/禁用状态
  manager: string; // 影厅负责人
  totalSeats: number; // 总座位数
}

interface OrderData {
  customer: string; // 客户姓名
  movie: string; // 影片名称
  seat: string; // 座位号
  status: string; // 订单状态（已支付/未支付）
}

/** 用户登录 */
export function login(data: LoginData) {
  return service({
    url: "/api/user/login",
    method: "post",
    data,
  });
}

/** 获取影厅列表 */
export function fetchAuditoriumList() {
  return service({
    url: "/api/auditorium/list",
    method: "get",
  });
}

/** 根据影厅 ID 获取座位示意图 */
export function fetchAuditoriumImageById(id: string) {
  return service({
    url: `/api/auditorium/${id}.png`,
    method: "get",
  });
}

/** 上传影厅座位示意图 */
export function uploadAuditoriumImage(id: string, image: FormData) {
  return service({
    url: `/api/auditorium/upload/${id}`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: image,
  });
}

/** 获取影厅收入数据 */
export function fetchAuditoriumIncome() {
  return service({
    url: "/api/auditorium/income",
    method: "get",
  });
}

/** 删除影厅 */
export function deleteAuditoriumById(id: string) {
  return service({
    url: `/api/auditorium/delete/${id}`,
    method: "delete",
  });
}

/** 新增影厅 */
export function addAuditorium(data: AuditoriumData) {
  return service({
    url: "/api/auditorium/add",
    method: "post",
    data,
  });
}

/** 修改影厅 */
export function updateAuditorium(id: string, data: AuditoriumData) {
  return service({
    url: `/api/auditorium/update/${id}`,
    method: "put",
    data,
  });
}

/** 获取订单列表 */
export function fetchOrderList() {
  return service({
    url: "/api/order/list",
    method: "get",
  });
}

/** 新增订单 */
export function addOrder(data: OrderData) {
  return service({
    url: "/api/order/add",
    method: "post",
    data,
  });
}

/** 删除订单 */
export function deleteOrderById(id: string) {
  return service({
    url: `/api/order/delete/${id}`,
    method: "delete",
  });
}

/** 修改订单 */
export function updateOrder(id: string, data: OrderData) {
  return service({
    url: `/api/order/update/${id}`,
    method: "put",
    data,
  });
}

/** 获取订单详情 */
export function fetchOrderDetails(id: string) {
  return service({
    url: `/api/order/details/${id}`,
    method: "get",
  });
}

/**
 * 数据库设计参考：
 * - 影厅表（Auditorium Table）:
 *   - id: 影厅的唯一标识符
 *   - name: 影厅名称，如“影厅 1”
 *   - status: 是否启用（启用/禁用）
 *   - manager: 负责影厅管理的人员
 *   - totalSeats: 影厅的总座位数
 *
 * - 技术设备表（Technical Equipment Table）:
 *   - auditoriumId: 关联影厅表的编号
 *   - projectorType: 投影设备类型（如数字投影、激光投影等）
 *   - soundSystem: 音响设备类型（如杜比全景声、IMAX 声效等）
 *   - screenType: 屏幕类型（如普通屏幕、IMAX 屏幕等）
 *   - screenSize: 屏幕的具体宽度和高度
 */
