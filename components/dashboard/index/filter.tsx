import React from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useDashboardFilterStore } from "@/stores/dashboard/dashboard-filter";

type Props = {};

function DashboardFilter({}: Props) {
  const { date, setDate } = useDashboardFilterStore();

  return (
    <div>
      <DatePicker
        label="Tanggal"
        value={date}
        onChange={(newValue) => setDate(newValue)}
      />
    </div>
  );
}

export default DashboardFilter;
