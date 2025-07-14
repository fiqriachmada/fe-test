import { apiFetch } from "@/api/api-fetch";
import { DASHBOARD_PATH } from "@/lib/constants/api";
import { RootDashboard } from "@/types/dashboard/dashboard-types";
import { useQuery } from "@tanstack/react-query";

interface DashboardParams {
  tanggal?: string;
  page?: number;
  limit?: number;
  search?: string;
}

async function getDashboard({
  limit = 20,
  page = 1,
  tanggal,
  search,
}: DashboardParams): Promise<RootDashboard> {
  const searchParams = new URLSearchParams();

  if (page !== undefined) searchParams.set("page", String(page));
  if (limit !== undefined) searchParams.set("limit", String(limit));
  if (tanggal) searchParams.set("tanggal", tanggal);
  if (search) searchParams.set("search", search);

  const response = await apiFetch.get(
    `${DASHBOARD_PATH}?${searchParams.toString()}`
  );
  return response;
}

export function useGetDashboard(params: DashboardParams) {
  const queryGetDashboard = useQuery({
    queryKey: ["dashboard", params],
    queryFn: () => getDashboard(params),
  });

  return { ...queryGetDashboard };
}
