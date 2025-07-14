import { useCallback } from "react";
import { useGetGates } from "../useGetGates";
import { useGatesFilterStore } from "@/stores/gates/gates-filter-store";
import { useGatesDeleteStore } from "@/stores/gates/gates-delete-store";
import { Row } from "@/types/gates/gates-types";

function useGatesIndex() {
  const { total, setTotal, page, setPage } = useGatesFilterStore();
  const gates = useGetGates({
    limit: total,
    page,
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

  const { setOpen, setRow } = useGatesDeleteStore();

  const handleClickOpen = ({ row }: { row?: Row }) => {
    setOpen({ open: true });
    setRow({ row: row! });
  };

  const handleClose = ({ row }: { row?: Row }) => {
    setOpen({ open: false });
    setRow({ row: null });
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
  };
}

export { useGatesIndex };
