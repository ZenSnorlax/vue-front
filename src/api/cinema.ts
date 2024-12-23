import service from "@/utils/request";

// 影厅数据定义
interface CinemaData {
  id: string;
  name: string;
  status: string;
  manager: string;
  seats: number;
}

/** 获取影厅列表 */
export async function getCinemas() {
  return await service({
    url: "/api/cinemas",
    method: "get",
  });
}

/** 获取影厅座位示意图 */
export async function getCinemaImage(id: string) {
  return await service({
    url: `/api/cinemas/image/${id}.png`,
    method: "get",
    responseType: "blob", // 返回二进制数据（图片）
  });
}

/** 上传影厅座位示意图 */
export async function uploadCinemaImage(id: string, image: FormData) {
  return await service({
    url: `/api/cinemas/image/${id}.png`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: image,
  });
}

/** 获取影厅收入 */
export async function getCinemaIncome() {
  return await service({
    url: "/api/cinemas/income",
    method: "get",
  });
}

/** 删除影厅 */
export async function deleteCinema(id: string) {
  return await service({
    url: `/api/cinemas/${id}`,
    method: "delete",
  });
}

/** 新增影厅 */
export async function createCinema(data: CinemaData) {
  return service({
    url: "/api/cinemas",
    method: "post",
    data,
  });
}

/** 修改影厅信息 */
export async function updateCinema(id: string, data: CinemaData) {
  return await service({
    url: `/api/cinemas/${id}`,
    method: "put",
    data,
  });
}
