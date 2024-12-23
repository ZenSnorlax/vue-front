import service from "@/utils/request";

// 用户数据定义
interface UserData {
  username: string; // 用户名
  password: string; // 密码
  role: string; // 用户角色
}

/** 获取用户列表 */
export function getUsers() {
  return service({
    url: "/api/users",
    method: "get",
  });
}

/** 获取用户头像 */
export function getUserAvatar(id: string) {
  return service({
    url: `/api/users/${id}/avatar`,
    method: "get",
    responseType: "blob", // 返回二进制数据（图片）
  });
}

/** 获取用户下单次数 */
export function getUserOrderCount(userId: string) {
  return service({
    url: `/api/users/${userId}/order-count`,
    method: "get",
  });
}

/** 添加用户 */
export function createUser(data: UserData) {
  return service({
    url: "/api/users",
    method: "post",
    data,
  });
}

/** 更新用户信息 */
export function updateUser(id: string, data: UserData) {
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
