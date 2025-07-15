import { create } from "zustand";

interface GatesFilterState {
  total: number;
  setTotal: ({ total }: { total: number }) => void;
  page: number;
  setPage: ({ page }: { page: number }) => void;
  gateName: string;
  setGateName: ({ gateName }: { gateName: string }) => void;
}

export const useGatesFilterStore = create<GatesFilterState>((set) => ({
  total: 5,
  page: 1,
  gateName: "",
  setTotal({ total }) {
    set({ total });
  },
  setPage({ page }) {
    set({ page });
  },
  setGateName({ gateName }) {
    set({ gateName });
  },
}));
