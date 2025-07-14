import { PaymentMethodData } from "@/types/dashboard/dashboard-types";
import { BarChart } from "@mui/x-charts";
import React from "react";

type Props = {
  data: PaymentMethodData[];
};

function BarChartPayment({ data }: Props) {
  const chartData = data?.map((item) => item.total);

  const xAxisData = data.map((item) => item.method);
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

export default BarChartPayment;
