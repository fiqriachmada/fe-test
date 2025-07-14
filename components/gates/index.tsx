"use client";
import { useGatesIndex } from "@/hooks/gates/index/useGatesIndex";
import { ITEMS_PER_PAGE } from "@/lib/constants/item-per-page";
import { TablePagination } from "@mui/material";
import React from "react";
import TableGates from "./index/table";
import ModalDelete from "./index/modal-delete";

type Props = {};

function GatesPageIndex({}: Props) {
  const {
    data,
    totalCount,
    handleChangePage,
    handleChangeRowsPerPage,
    total,
    page,
    handleClickOpen,
    handleClose,
  } = useGatesIndex();
  return (
    <div>
      <TableGates data={data} handleClickOpen={handleClickOpen} />
      <TablePagination
        rowsPerPageOptions={ITEMS_PER_PAGE}
        component="div"
        count={totalCount}
        rowsPerPage={total}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Baris per halaman:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} dari ${count !== -1 ? count : `lebih dari ${to}`}`
        }
        sx={{
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
          "& .MuiTablePagination-toolbar": {
            paddingLeft: 3,
            paddingRight: 3,
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontWeight: 500,
              color: "#666",
            },
        }}
      />
      <ModalDelete
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </div>
  );
}

export default GatesPageIndex;
