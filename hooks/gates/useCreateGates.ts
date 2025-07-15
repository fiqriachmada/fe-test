import { apiFetch } from "@/api/api-fetch";
import { GATES_PATH } from "@/lib/constants/api";
import { Row } from "@/types/gates/gates-types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createGates({ data }: { data: Row }): Promise<any> {
  const response = await apiFetch.post(GATES_PATH, {
    data: data,
  });

  return response as any;
}

export function useCreateGates() {
  const queryClient = useQueryClient();

  const queryCreateGates = useMutation({
    mutationFn: ({ data }: { data: Row }) => createGates({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gates"],
      });
    },
  });

  return { ...queryCreateGates };
}
