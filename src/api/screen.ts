import service from "@/utils/request";

interface ScreenData {
  movieName?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  cinemaTime?: string;
}

interface PaginationParams {
  page: number; // 当前页码
  pageSize: number; // 每页条数
}

interface TimeRange {
  startTime?: string;
  endTime?: string;
}

interface FilterParams extends Partial<ScreenData & TimeRange> {
  [key: string]: any;
}

export async function getUsersPaginated(
  params: PaginationParams & FilterParams
) {
  return service({
    url: "/api/screens",
    method: "get",
    params,
  });
}

export async function createUser(data: ScreenData) {
  return service({
    url: "/api/screens",
    method: "post",
    data,
  });
}

export async function updateUser(id: string, data: ScreenData) {
  return service({
    url: `/api/screens/${id}`,
    method: "put",
    data,
  });
}

export async function deleteUser(id: string) {
  return service({
    url: `/api/screens/${id}`,
    method: "delete",
  });
}
