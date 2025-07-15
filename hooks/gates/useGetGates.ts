import { apiFetch } from "@/api/api-fetch";
import { GATES_PATH } from "@/lib/constants/api";
import { RootGates } from "@/types/gates/gates-types";

import { useQuery } from "@tanstack/react-query";

interface GatesParams {
  tanggal?: string;
  page?: number;
  limit?: number;
  search?: string;
  namaGerbang: string;
}

async function getGates({
  limit,
  page = 1,
  tanggal,
  search,
  namaGerbang,
}: Partial<GatesParams>): Promise<RootGates> {
  const searchParams = new URLSearchParams();

  if (page !== undefined) searchParams.set("page", String(page));
  if (limit !== undefined) searchParams.set("limit", String(limit));
  if (tanggal) searchParams.set("tanggal", tanggal);
  if (search) searchParams.set("search", search);
  if (namaGerbang) searchParams.set("NamaGerbang", namaGerbang);

  const response = await apiFetch.get(
    `${GATES_PATH}?${searchParams.toString()}`
  );
  return response;
}

export function useGetGates(params: Partial<GatesParams>) {
  const queryGetGates = useQuery({
    queryKey: ["gates", params],
    queryFn: () => getGates(params),
  });

  return { ...queryGetGates };
}
