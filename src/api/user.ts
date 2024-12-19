import service from "@/utils/request";
interface LoginData {
  username: string;
  password: string;
}

export function login(data: LoginData) {
  return service({
    url: "/api/user/login",
    method: "post",
    data,
  });
}

export function getUserInfo() {
  return service({
    url: "/api/user/getUserInfo",
    method: "get",
  });
}

export function logout() {
  return service({
    url: "/api/user/logout",
    method: "post",
  });
}
