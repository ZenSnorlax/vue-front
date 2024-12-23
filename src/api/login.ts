import service from "@/utils/request";

// 通用接口参数定义
interface LoginData {
  username: string; // 后端管理人员
  password: string; // 密码
}

/** 管理人员登录 */
export function login(data: LoginData) {
  return service({
    url: "/api/login",
    method: "post",
    data,
  });
}
