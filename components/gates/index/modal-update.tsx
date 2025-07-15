import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { useGatesActionSelectStore } from "@/stores/gates/gates-action-store";
import { Row } from "@/types/gates/gates-types";
import { useDeleteGates } from "@/hooks/gates/useDeleteGates";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { useUpdateGates } from "@/hooks/gates/useUpdateGates";

type Props = {
  handleClickOpenUpdate: ({ row }: { row?: Row }) => void;

  handleCloseUpdate: ({ row }: { row?: Row }) => void;
};

const fieldList = [
  { key: "id", label: "ID" },
  { key: "IdCabang", label: "ID Cabang" },
  { key: "NamaCabang", label: "Nama Cabang" },
  { key: "NamaGerbang", label: "Nama Gerbang" },
];

function ModalUpdate({ handleClickOpenUpdate, handleCloseUpdate }: Props) {
  const { openUpdate, row, updateRowField } = useGatesActionSelectStore();

  const { mutate } = useUpdateGates();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(
      { data: row! },
      {
        onSuccess(data, variables, context) {
          handleCloseUpdate({});
        },
        onError(error, variables, context) {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <div>
      <React.Fragment>
        <Dialog open={openUpdate!} onClose={handleCloseUpdate}>
          <DialogTitle>Yakin untuk menghapus?</DialogTitle>
          <DialogContent sx={{ paddingBottom: 0 }}>
            <DialogContentText>
              Nama Cabang: {row?.NamaCabang} - Nama Gerbeng: {row?.NamaGerbang}
            </DialogContentText>
            <form onSubmit={handleSubmit}>
              {fieldList.map(({ key, label }) => (
                <div className="my-4" key={key}>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    label={label}
                    fullWidth
                    variant="outlined"
                    value={(row as any)?.[key] || ""}
                    onChange={(e) => {
                      console.log("e", e);
                      console.log("key", key);
                      updateRowField?.({
                        field: key as keyof Row,
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              ))}

              <DialogActions>
                <Button onClick={() => handleCloseUpdate({ row: row! })}>
                  Batal
                </Button>
                <Button type="submit">Yakin</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default ModalUpdate;
