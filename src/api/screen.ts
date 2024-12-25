import service from "@/utils/request";

export interface ScreenData {
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
  return service({
    url: "/api/screens",
    method: "get",
    params,
  });
}

export async function createScreen(data: ScreenData) {
  return service({
    url: "/api/screens",
    method: "post",
    data,
  });
}

export async function updateScreen(data: ScreenData) {
  return service({
    url: "/api/screens/",
    method: "put",
    data,
  });
}

export async function deleteScreen(cinema: string, startTime: string) {
  return service({
    url: `/api/screens/`,
    method: "delete",
    data: {
      cinema: cinema,
      startTime: startTime,
    },
  });
}
