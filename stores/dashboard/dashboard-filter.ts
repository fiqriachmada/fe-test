import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";

interface DashboardFilterState {
  date: Dayjs | null;
  setDate: (date: Dayjs | null) => void;
}

export const useDashboardFilterStore = create<DashboardFilterState>((set) => ({
  date: dayjs("2023-11-01"),
  setDate: (date) => set({ date }),
}));
