"use client";
import { useCallback } from "react";
import { useGetGates } from "../useGetGates";
import { useGatesFilterStore } from "@/stores/gates/gates-filter-store";

import { Row } from "@/types/gates/gates-types";
import { useGatesActionSelectStore } from "@/stores/gates/gates-action-store";

function useGatesIndex() {
  const { total, setTotal, page, setPage,gateName } = useGatesFilterStore();
  const gates = useGetGates({
    limit: total,
    page,
    namaGerbang: gateName,
    //  tanggal: dateString, limit: total
  });

  const totalCount = gates.data?.data?.rows?.count ?? 0;

  const handleChangePage = useCallback(
    (_event: unknown, newPage: number) => {
      setPage({ page: newPage + 1 });
    },
    [page]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newTotal = parseInt(event.target.value, 10);
      setTotal({ total: newTotal });
      setPage({ page: 1 });
    },
    [setTotal]
  );

  const { setOpen, setRow, setOpenUpdate, setOpenCreate } =
    useGatesActionSelectStore();

  const handleClickOpen = ({ row }: { row?: Row }) => {
    setOpen?.({ open: true });
    setRow?.({ row: row! });
  };
  const handleClickOpenUpdate = ({ row }: { row?: Row }) => {
    setOpenUpdate?.({ openUpdate: true });
    setRow?.({ row: row! });
  };
  const handleClickOpenCreate = ({ row }: { row?: Row }) => {
    setOpenCreate?.({ openCreate: true });
    setRow?.({ row: row! });
  };

  const handleClose = ({ row }: { row?: Row }) => {
    setOpen?.({ open: false });
    setRow?.({ row: null });
  };
  const handleCloseUpdate = ({ row }: { row?: Row }) => {
    setOpenUpdate?.({ openUpdate: false });
    setRow?.({ row: null });
  };
  const handleCloseCreate = ({ row }: { row?: Row }) => {
    setOpenCreate?.({ openCreate: false });
    setRow?.({ row: null });
  };
  const handleOnClickView = ({ row }: { row?: Row }) => {
    setRow?.({ row: row! });
    window.open(
      "/gates/detail/" + row?.id.toString() + row?.IdCabang.toString()
    );
  };

  return {
    ...gates,
    totalCount,
    handleChangePage,
    handleChangeRowsPerPage,
    total,
    page,
    handleClickOpen,
    handleClose,
    handleClickOpenUpdate,
    handleCloseUpdate,
    handleCloseCreate,
    handleClickOpenCreate,
    handleOnClickView,
  };
}

export { useGatesIndex };
