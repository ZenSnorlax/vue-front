import service from "@/utils/request";

// 用户数据接口定义
interface UserData {
  userName: string; // 用户名
  password?: string; // 密码（仅创建或修改时传递）
  role?: string; // 用户角色
  userEmail?: string; // 用户邮箱
  userPhone?: string; // 用户手机
  status?: string; // 用户状态
  registrationTime?: string[]; // 注册时间范围
}

// 分页参数定义
interface PaginationParams {
  page: number; // 当前页码
  pageSize: number; // 每页条数
}

// 筛选参数定义
interface FilterParams extends Partial<UserData> {
  [key: string]: any; // 允许扩展其他动态参数
}

// **获取用户列表（分页与筛选）**
export function getUsersPaginated(params: PaginationParams & FilterParams) {
  return service({
    url: "/api/users",
    method: "get",
    params, // 分页和筛选参数
  });
}

// **创建用户**
export function createUser(data: UserData) {
  return service({
    url: "/api/users",
    method: "post",
    data, // 新用户数据
  });
}

// **更新用户信息**
export function updateUser(id: string, data: UserData) {
  return service({
    url: `/api/users/${id}`,
    method: "put",
    data, // 用户更新数据
  });
}

// **删除用户**
export function deleteUser(id: string) {
  return service({
    url: `/api/users/${id}`,
    method: "delete",
  });
}

// **获取用户头像**
export function getUserAvatar(id: string) {
  return service({
    url: `/api/users/${id}/avatar`,
    method: "get",
    responseType: "blob", // 返回二进制数据
  });
}

// **获取用户订单统计**
export function getUserOrderCount(id: string) {
  return service({
    url: `/api/users/${id}/order-count`,
    method: "get",
  });
}
