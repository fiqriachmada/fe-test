import { apiFetch } from "@/api/api-fetch";
import { DASHBOARD_PATH } from "@/lib/constants/api";
import { RootDashboard } from "@/types/dashboard/dashboard-types";
import { useQuery } from "@tanstack/react-query";

interface LalinParams {
  tanggal?: string;
  page?: number;
  limit?: number;
  search?: string;
}

async function getLalin({
  limit = 5,
  page = 1,
  tanggal,
  search,
}: LalinParams): Promise<RootDashboard> {
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

export function useGetLalin(params: LalinParams) {
  const queryGetLalin = useQuery({
    queryKey: ["lalin", params],
    queryFn: () => getLalin(params),
  });

  return { ...queryGetLalin };
}
