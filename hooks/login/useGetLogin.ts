import { apiFetch } from "@/api/api-fetch";
import { LOGIN_PATH } from "@/lib/constants/api";
import { LoginCredentials, LoginResponse } from "@/types/login/login-types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function getLogin({
  data,
}: {
  data: LoginCredentials;
}): Promise<LoginResponse> {
  const response = await apiFetch.post(LOGIN_PATH, {
    data: data,
  });

  return response as any;
}

export function useGetLogin() {
  const queryClient = useQueryClient();

  const queryGetLogin = useMutation({
    mutationFn: ({ data }: { data: LoginCredentials }) => getLogin({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["login"],
      });
    },
  });

  return { ...queryGetLogin };
}
