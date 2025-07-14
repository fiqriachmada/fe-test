import React from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useDashboardFilterStore } from "@/stores/dashboard/dashboard-filter";
import { RootDashboard } from "@/types/dashboard/dashboard-types";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

type Props = {
  data: RootDashboard | undefined;
};

function GatesFilter({ data }: Props) {
  const { date, setDate, setTotal, total } = useDashboardFilterStore();

  return (
    <div className="flex gap-4 items-center">
      <DatePicker
        label="Tanggal"
        value={date}
        onChange={(newValue) => setDate({ date: newValue })}
      />

      <Button
        variant="outlined"
        onClick={() => {
          if (total === data?.data?.count!) {
            toast.success('Data Sudah Muncul Semua')
            return;
          }
          setTotal({ total: data?.data?.count! });
          return;
        }}>
        Tampilkan semua data {data?.data.count}
      </Button>
    </div>
  );
}

export default GatesFilter;
