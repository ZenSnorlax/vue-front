import service from "@/utils/request";

// 影厅数据定义
interface CinemaData {
  name: string;
  status: string;
  manager: string;
  totalSeats: number;
  header: string;
}

/** 获取影厅列表 */
export function getCinemas() {
  return service({
    url: "/api/cinemas",
    method: "get",
  });
}

/** 获取影厅座位示意图 */
export function getCinemaImage(id: string) {
  return service({
    url: `/api/cinemas/image/${id}.png`,
    method: "get",
    responseType: "blob", // 返回二进制数据（图片）
  });
}

/** 上传影厅座位示意图 */
export function uploadCinemaImage(id: string, image: FormData) {
  return service({
    url: `/api/cinemas/image/${id}.png`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: image,
  });
}

/** 获取影厅收入 */
export function getCinemaIncome() {
  return service({
    url: "/api/cinemas/income",
    method: "get",
  });
}

/** 删除影厅 */
export function deleteCinema(id: string) {
  return service({
    url: `/api/cinemas/${id}`,
    method: "delete",
  });
}

/** 新增影厅 */
export function createCinema(data: CinemaData) {
  return service({
    url: "/api/cinemas",
    method: "post",
    data,
  });
}

/** 修改影厅信息 */
export function updateCinema(id: string, data: CinemaData) {
  return service({
    url: `/api/cinemas/${id}`,
    method: "put",
    data,
  });
}
