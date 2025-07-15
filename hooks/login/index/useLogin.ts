"use client";

import { toast } from "react-toastify";
import { useGetLogin } from "../useGetLogin";
import { useLoginStore } from "@/stores/login/login-stores";
import { useEffect, useMemo } from "react";
import { useAuthStore } from "@/stores/login/auth-stores";
import useNextHooks from "@/hooks/useNextHooks";

function useLogin() {
  const { router } = useNextHooks();
  const getLogin = useGetLogin();

  const { reset: resetLoginStore, timestamp } = useLoginStore();

  const {
    setAuth,
    reset: resetAuthStore,
    user,
    isAuthenticated,
  } = useAuthStore();

  const handleOnClickLogin = async ({
    username,
    password,
  }: {
    username: string;

    password: string;
  }) => {
    if (!username.trim() || !password) {
      toast.error("Mohon isi username dan password.");
      return;
    }
    await getLogin.mutate(
      { data: { password, username: username.trim() } },
      {
        onError(error, variables, context) {
          toast.error("Error: " + error.message);
        },
        onSuccess(data, variables, context) {
          const { token } = data;
          setAuth({ accessToken: token, user: { username } });
          toast.success("Login Berhasil");
          resetLoginStore();

          router.push("/dashboard");
        },
      }
    );
    return;
  };

  const logout = () => {
    resetAuthStore();
    resetLoginStore();
    router.push("/");
    return;
  };

  useEffect(() => {
    const checkExpiration = () => {
      if (!timestamp) return;

      const now = Date.now();
      const expirationTime = timestamp + 60 * 1000; // 1 minute expiration
      const remainingTime = expirationTime - now;

      if (remainingTime <= 0) {
        resetLoginStore();
      }
    };

    checkExpiration();
    const interval = setInterval(checkExpiration, 1000);

    return () => clearInterval(interval);
  }, [timestamp, resetLoginStore]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push("/dashboard");
  //   }
  // }, [isAuthenticated]);

  return { ...getLogin, handleOnClickLogin, logout };
}

export { useLogin };
