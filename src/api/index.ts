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

export function getAditoriumInfo() {
  return service({
    url: "/api/aditorium/getAditoriumInfo",
    method: "get",
  });
}

export function getAditoriumData() {
  return service({
    url: "/api/aditorium/getAditoriumData",
    method: "get",
  });
}

export function getAditoriumPicture(id: string) {
  return service({
    url: "/api/aditorium/" + id + ".png",
    method: "get",
  });
}
