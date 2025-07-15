import React, { useState } from "react";

import { RootDashboard } from "@/types/dashboard/dashboard-types";
import { Button, IconButton, TextField } from "@mui/material";

import { Row } from "@/types/gates/gates-types";
import { useGatesFilterStore } from "@/stores/gates/gates-filter-store";
import { useGatesActionSelectStore } from "@/stores/gates/gates-action-store";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  data: RootDashboard | undefined;
  handleCloseCreate: ({ row }: { row?: Row }) => void;
  handleClickOpenCreate: ({ row }: { row?: Row }) => void;
};

function GatesFilter({ handleClickOpenCreate }: Partial<Props>) {
  const { setGateName } = useGatesFilterStore();
  const [newGateName, setNewGateName] = useState("");
  const { row } = useGatesActionSelectStore();
  return (
    <div className="flex gap-4 items-center justify-between">
      <div className="flex gap-4">
        <TextField
          label="Cari Nama Gerbang"
          size="small"
          value={newGateName}
          onChange={(e) => {
            setNewGateName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setGateName({ gateName: newGateName.trim() });
            }
          }}
        />
        {newGateName && (
          <IconButton
            className=""
            onClick={() => {
              setGateName({ gateName: "" });
              setNewGateName("");
            }}>
            <CloseIcon />
          </IconButton>
        )}
      </div>
      <Button
        variant="outlined"
        onClick={() => {
          handleClickOpenCreate?.({ row: row! })!;
        }}>
        Tambah Data
      </Button>
    </div>
  );
}

export default GatesFilter;
