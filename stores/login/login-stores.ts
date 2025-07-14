import { LoginState } from "@/types/login/login-types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useLoginStore = create<LoginState>()(
  persist(
    (set, get) => ({
      username: "",
      password: "",
      timestamp: null,
      setUsername: (username) => {
        const state = get();
        set({
          username,
          // Set timestamp hanya jika belum ada
          timestamp: state.timestamp ?? Date.now(),
        });
      },
      setPassword: (password) => {
        const state = get();
        set({
          password,
          // Set timestamp hanya jika belum ada
          timestamp: state.timestamp ?? Date.now(),
        });
      },
      reset: () => set({ username: "", password: "", timestamp: null }),
    }),
    {
      name: "login-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
