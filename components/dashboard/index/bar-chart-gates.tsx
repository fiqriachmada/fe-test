import {  ShiftData } from "@/types/dashboard/dashboard-types";
import { BarChart } from "@mui/x-charts";
import React from "react";

type Props = {
  data: ShiftData[];
};

function BarChartGates({ data }: Props) {
  const chartData = data?.map((item) => item.value);

  const xAxisData = data.map((item) => item.label);
  return (
    <div>
      <BarChart
        xAxis={[{ scaleType: "band", data: xAxisData }]}
        series={[
          {
            data: chartData,
            label: "data",
            color: "yellow",
          },
        ]}
        height={300}
        title="Lalin"
        attributeName={"lalin"}
      />
    </div>
  );
}

export default BarChartGates;
