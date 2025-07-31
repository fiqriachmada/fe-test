"use client";

import { toast } from "react-toastify";
import { useGetLogin } from "../useGetLogin";
import { useLoginStore } from "@/stores/login/login-stores";
import { useEffect, useMemo } from "react";
import { useAuthStore } from "@/stores/login/auth-stores";
import useNextHooks from "@/hooks/useNextHooks";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
  // add other properties from your JWT payload if needed
};

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

  const accessToken = Cookies.get(`auth-storage`);

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

  const formatRemainingTime = ({ ms }: { ms: number | null }) => {
    if (ms === null) return "";

    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
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

  return {
    ...getLogin,
    handleOnClickLogin,
    logout,
    accessToken,
    formatRemainingTime,
  };
}

export { useLogin };
