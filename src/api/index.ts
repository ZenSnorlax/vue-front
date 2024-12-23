import service from "@/utils/request";

// 通用接口参数定义
interface LoginData {
  username: string; // 后端管理人员
  password: string; // 密码
}

interface AditoriumData {
  name: string;
  status: string;
  manager: string;
  totalSeats: number;
  header: string;
}

interface OrderData {
  customer: string; // 客户姓名
  movie: string; // 影片名称
  seat: string; // 座位号
  status: string; // 订单状态（已支付/未支付）
}

/** 管理人员登录 */
export function login(data: LoginData) {
  return service({
    url: "/api/login",
    method: "post",
    data,
  });
}

/** 获取影厅列表 */
export function getAuditoriums() {
  return service({
    url: "/api/auditoriums",
    method: "get",
  });
}

/** 获取影厅座位示意图 */
export function getAditoriumImage(id: string) {
  return service({
    url: `/api/auditoriums/image/${id}.png`,
    method: "get",
    responseType: "blob", // 返回二进制数据（图片）
  });
}

/** 上传影厅座位示意图 */
export function uploadAditoriumImage(id: string, image: FormData) {
  return service({
    url: `/api/auditoriums/image/${id}.png`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: image,
  });
}

/** 获取影厅收入 */
export function getAditoriumIncome() {
  return service({
    url: "/api/auditoriums/income",
    method: "get",
  });
}

/** 删除影厅 */
export function deleteAditorium(id: string) {
  return service({
    url: `/api/auditoriums/${id}`,
    method: "delete",
  });
}

/** 新增影厅 */
export function createAditorium(data: AditoriumData) {
  return service({
    url: "/api/auditoriums",
    method: "post",
    data,
  });
}

/** 修改影厅信息 */
export function updateAditorium(id: string, data: AditoriumData) {
  return service({
    url: `/api/auditoriums/${id}`,
    method: "put",
    data,
  });
}

/** 获取用户列表*/

/**增加用户 */

/**更新用户 */

/**删除用户 */

/** 获取订单列表 */

/**获取用户头像 */

/**获取用户下单次数 后端通过用户id查询订单 */

export function getOrders() {
  return service({
    url: "/api/orders",
    method: "get",
  });
}

/** 删除订单 */
export function deleteOrder(id: string) {
  return service({
    url: `/api/orders/${id}`,
    method: "delete",
  });
}

/** 修改订单 */
export function updateOrder(id: string, data: OrderData) {
  return service({
    url: `/api/orders/${id}`,
    method: "put",
    data,
  });
}

/** 获取订单详情 */
export function getOrderDetails(id: string) {
  return service({
    url: `/api/orders/${id}`,
    method: "get",
  });
}

/** 获取订单反馈列表 */
export function getOrderFeedback() {
  return service({
    url: "/api/orders/feedback",
    method: "get",
  });
}

/** 获取用户列表 */
export function getUsers() {
  return service({
    url: "/api/users",
    method: "get",
  });
}

/** 添加用户 */
export function createUser(data: { username: string; password: string }) {
  return service({
    url: "/api/users",
    method: "post",
    data,
  });
}

/** 更新用户信息 */
export function updateUser(
  id: string,
  data: { username: string; password: string }
) {
  return service({
    url: `/api/users/${id}`,
    method: "put",
    data,
  });
}

/** 删除用户 */
export function deleteUser(id: string) {
  return service({
    url: `/api/users/${id}`,
    method: "delete",
  });
}
