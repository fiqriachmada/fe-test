import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

import { Row } from "@/types/gates/gates-types";
import { useDeleteGates } from "@/hooks/gates/useDeleteGates";
import { toast } from "react-toastify";
import { useGatesActionSelectStore } from "@/stores/gates/gates-action-store";

type Props = {
  handleClickOpen: ({ row }: { row?: Row }) => void;
  handleClose: ({ row }: { row?: Row }) => void;
};

function ModalDelete({ handleClickOpen, handleClose }: Props) {
  const { open, row } = useGatesActionSelectStore();

  const { mutate } = useDeleteGates();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(
      { data: row! },
      {
        onSuccess(data, variables, context) {
          handleClose({});
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
        <Dialog open={open!} onClose={handleClose}>
          <DialogTitle>Yakin untuk menghapus?</DialogTitle>
          <DialogContent sx={{ paddingBottom: 0 }}>
            <DialogContentText>
              Nama Cabang: {row?.NamaCabang} - Nama Gerbeng: {row?.NamaGerbang}
            </DialogContentText>
            <form onSubmit={handleSubmit}>
              {/* <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              /> */}
              <DialogActions>
                <Button onClick={() => handleClose({ row: row! })}>
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

export default ModalDelete;
