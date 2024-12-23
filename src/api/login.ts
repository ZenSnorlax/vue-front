import service from "@/utils/request";

// 通用接口参数定义
interface LoginData {
  username: string; // 后端管理人员
  password: string; // 密码
}

/**
 * 管理人员登录
 * @param data - 登录数据，包含用户名和密码
 * @returns 登录结果的 Promise 对象
 */

export async function login(data: LoginData) {
  return await service({
    url: "/api/login",
    method: "post",
    data,
  });
}
