import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";

interface DashboardFilterState {
  date: Dayjs | null;
  setDate: ({ date }: { date: Dayjs | null }) => void;
  total: number;
  setTotal: ({ total }: { total: number }) => void;
}

export const useDashboardFilterStore = create<DashboardFilterState>((set) => ({
  date: dayjs("2023-11-01"),
  setDate: ({ date }) => set({ date }),
  total: 20,
  setTotal({ total }) {
    set({ total });
  },
}));
