import { ShiftData } from "@/types/dashboard/dashboard-types";
import { PieChart } from "@mui/x-charts";
import React from "react";

interface ShiftPieChartProps {
  data: ShiftData[];
}

function PieChartRuas({ data }: ShiftPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="flex flex-col">
      <div className="">Total Lalin</div>
      <PieChart
        series={[
          {
            data: data.map((item) => ({
              id: item.id,
              value: item.value,
              label:
                item.label + ` ${((item.value / total) * 100).toFixed(0)}%`,
              color: item.color,
            })),
            innerRadius: 60,
            outerRadius: 120,
            paddingAngle: 2,
            cornerRadius: 4,
            highlightScope: {
              //  faded: "global"
              // ,
              //   highlighted: "item",
            },
            faded: { innerRadius: 30, additionalRadius: -30 },
          },
        ]}
        width={300}
        height={300}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      />
    </div>
  );
}

export default PieChartRuas;
