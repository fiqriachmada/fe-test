import { Row } from "@/types/gates/gates-types";
import { create } from "zustand";

interface GatesDeleteState {
  open: boolean;
  setOpen: ({ open }: { open: boolean }) => void;
  row: Row | null;
  setRow: ({ row }: { row: Row | null }) => void;
}

export const useGatesDeleteStore = create<GatesDeleteState>((set) => ({
  open: false,
  setOpen({ open }) {
    set({ open });
  },
  row: null,
  setRow({ row }) {
    set({ row });
  },
}));
