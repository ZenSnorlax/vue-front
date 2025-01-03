import service from "@/utils/request";

// 用户数据接口定义
interface UserData {
  userId?: string;
  userName?: string; // 用户名
  userEmail?: string; // 用户邮箱
  userPhone?: string; // 用户手机
  status?: string; // 用户状态
  registerTime?: string;
}
interface TimeRange {
  startTime?: string; // 注册时间范围
  endTime?: string;
}
// 分页参数定义
interface PaginationParams {
  page: number; // 当前页码
  pageSize: number; // 每页条数
}

// 筛选参数定义
interface FilterParams extends Partial<UserData & TimeRange> {
  [key: string]: any; // 允许扩展其他动态参数
}

// **获取用户列表（分页与筛选）**
export async function getUsersPaginated(
  params: PaginationParams & FilterParams
) {
  return service({
    url: "/api/users/list",
    method: "get",
    params, // 分页和筛选参数
  });
}

/**创建用户 */
export async function createUser(data: UserData) {
  return service({
    url: "/api/users",
    method: "post",
    data, // 新用户数据
  });
}

// **更新用户信息**
export async function updateUser(id: string, data: UserData) {
  return service({
    url: `/api/users/${id}`,
    method: "put",
    data, // 用户更新数据
  });
}

// **删除用户**
export async function deleteUser(id: string) {
  return service({
    url: `/api/users/${id}`,
    method: "delete",
  });
}

/**增加用户分布 */
interface UsersAddParams {
  year?: number | null;
}

export async function getUsersAdd(params: UsersAddParams) {
  return await service({
    url: "/api/users/add",
    method: "get",
    params,
  });
}
