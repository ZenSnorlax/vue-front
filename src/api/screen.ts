import service from "@/utils/request";

export interface ScreenData {
  id?: string;
  movieName?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  cinemaName?: string;
}

interface PaginationParams {
  page: number;
  pageSize: number;
}

interface TimeRange {
  startTime?: string;
  endTime?: string;
}

interface FilterParams extends Partial<ScreenData & TimeRange> {
  [key: string]: any;
}

export async function getScreensPaginated(
  params: PaginationParams & FilterParams
) {
  return await service({
    url: "/api/screens",
    method: "get",
    params,
  });
}

export async function createScreen(data: ScreenData) {
  return await service({
    url: "/api/screens",
    method: "post",
    data,
  });
}

export async function updateScreen(id: string, data: ScreenData) {
  return await service({
    url: `/api/screens/${id}`,
    method: "put",
    data,
  });
}

export async function deleteScreen(id: string) {
  return await service({
    url: `/api/screens/${id}`,
    method: "delete",
  });
}

export async function getRecentMovieRate() {
  return await service({
    url: `/api/screen/recentMovieRate`,
    method: "get",
  });
}
