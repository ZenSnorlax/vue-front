import service from "@/utils/request";

// 用户数据接口定义
interface UserData {
  userId?: string;
  userName?: string; // 用户名
  userEmail?: string; // 用户邮箱
  userPhone?: string; // 用户手机
  status?: string; // 用户状态
  registerTime?: string;
  startTime?: string; // 注册时间范围
  endTime?: string;
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
export async function getUsersPaginated(
  params: PaginationParams & FilterParams
) {
  return service({
    url: "/api/users/list",
    method: "get",
    params, // 分页和筛选参数
  });
}

// **创建用户**
export async function createUser(data: UserData) {
  return await service({
    url: "/api/users/create",
    method: "post",
    data, // 新用户数据
  });
}

// **更新用户信息**
export async function updateUser(data: UserData) {
  return await service({
    url: "/api/users/updata",
    method: "put",
    data, // 用户更新数据
  });
}

// **删除用户**
export async function deleteUser(id: string) {
  return await service({
    url: `/api/users/delete`,
    method: "delete",
    data: { id },
  });
}
