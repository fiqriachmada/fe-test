import { apiFetch } from "@/api/api-fetch";
import { GATES_PATH } from "@/lib/constants/api";
import { Row } from "@/types/gates/gates-types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateGates({ data }: { data: Row }): Promise<any> {
  
  
  const response = await apiFetch.put(GATES_PATH, {
    data: data,
  });

  return response as any;
}

export function useUpdateGates() {
  const queryClient = useQueryClient();

  const queryUpdateGates = useMutation({
    mutationFn: ({ data }: { data: Row }) => updateGates({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gates"],
      });
    },
  });

  return { ...queryUpdateGates };
}
