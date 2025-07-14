import { apiFetch } from "@/api/api-fetch";
import { GATES_PATH } from "@/lib/constants/api";
import { Row } from "@/types/gates/gates-types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteGates({ data }: { data: Row }): Promise<any> {
  const payload = {
    id: data.id,
    IdCabang: data.IdCabang,
  };
  const response = await apiFetch.delete(GATES_PATH, {
    data: payload,
  });

  return response as any;
}

export function useDeleteGates() {
  const queryClient = useQueryClient();

  const queryDeleteGates = useMutation({
    mutationFn: ({ data }: { data: Row }) => deleteGates({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gates"],
      });
    },
  });

  return { ...queryDeleteGates };
}
