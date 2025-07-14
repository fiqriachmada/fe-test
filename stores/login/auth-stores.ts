import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import Cookies from "js-cookie";
import { AuthState } from "@/types/login/auth-types";

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      setAuth: ({ accessToken, user }) => {
        Cookies.set("auth-storage", accessToken, { expires: 7 });
        const auth = Cookies.get("auth-storage");

        return set({ user, isAuthenticated: auth ? true : false });
      },
      reset: () => {
        Cookies.remove("auth-storage");
        return set({ user: null, isAuthenticated: false });
      },
      isAuthenticated: false,
    }),
    {
      name: "profile",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
