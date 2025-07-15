import { Row } from "@/types/gates/gates-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GatesActionSelectState {
  open: boolean;
  setOpen: ({ open }: { open: boolean }) => void;
  openUpdate: boolean;
  setOpenUpdate: ({ openUpdate }: { openUpdate: boolean }) => void;
  openCreate: boolean;
  setOpenCreate: ({ openCreate }: { openCreate: boolean }) => void;
  row: Row | null;
  setRow: ({ row }: { row: Row | null }) => void;
  updateRowField: ({ field, value }: { field: keyof Row; value: any }) => void;
}

export const useGatesActionSelectStore = create(
  persist<Partial<GatesActionSelectState>>(
    (set) => ({
      open: false,
      setOpen({ open }) {
        set({ open });
      },
      openUpdate: false,
      setOpenUpdate({ openUpdate }) {
        set({ openUpdate });
      },
      openCreate: false,
      setOpenCreate({ openCreate }) {
        set({ openCreate });
      },
      row: null,
      setRow({ row }) {
        set({ row });
      },
      // updateRowField: ({ field, value }) =>
      //   set((state) => ({
      //     row: state.row ? { ...state.row, [field]: value } : state.row,
      //   })),

      updateRowField: ({ field, value }) =>
        set((state) => ({
          row: state.row
            ? { ...state.row, [field]: value }
            : ({ [field]: value } as Row),
        })),
    }),
    {
      name: "gates-action-select-storage",
      partialize: (state): Partial<GatesActionSelectState> => ({
        row: state.row,
      }),
    }
  )
);
