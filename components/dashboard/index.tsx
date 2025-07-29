"use client";

import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import DashboardFilter from "./index/filter";
import { useDashboardIndex } from "@/hooks/dashboard/index/useDashboardIndex";

import PieChartShift from "./index/pie-chart-shift";
import BarChartPayment from "./index/bar-chart-payment";
import BarChartGates from "./index/bar-chart-gates";
import PieChartRuas from "./index/pie-chart-ruas";
import { cn } from "@/lib/utils";

type Props = {};

function DashboardPageIndex({}: Props) {
  const {
    data,
    processPaymentMethodData,
    processShiftData,
    processGateData,
    processRuasData,
  } = useDashboardIndex();

  const tollData = data?.data?.rows?.rows!;
  const paymentMethodData = processPaymentMethodData({ data: tollData });
  const shiftData = processShiftData({ data: tollData });
  const gatesData = processGateData({ data: tollData });
  const ruasData = processRuasData({ data: tollData });

  const chartSections = [
    {
      gridClass: "grid gap-4 grid-cols-1 md:grid-cols-3",
      items: [
        {
          colSpan: "md:col-span-2",
          title: "Jumlah Lalin by Gerbang",
          content: <BarChartPayment data={paymentMethodData} />,
        },
        {
          colSpan: "",
          title: null,
          content: <PieChartShift data={shiftData} />,
        },
      ],
    },
    {
      gridClass: "grid gap-4 md:grid-cols-3",
      items: [
        {
          colSpan: "col-span-2",
          title: "Jumlah Lalin by Gerbang",
          content: <BarChartGates data={gatesData} />,
        },
        {
          colSpan: "",
          title: null,
          content: <PieChartRuas data={ruasData} />,
        },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <Typography>Dashboard</Typography>
      </div>

      <div className="my-4">
        <DashboardFilter data={data} />
      </div>

      <div className="space-y-6">
        {chartSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className={cn(section.gridClass)}>
            {section.items.map((item, itemIdx) => (
              <Card
                key={itemIdx}
                className={
                  cn(item.colSpan, "hover:shadow-2xl") ||
                  cn("w-full", "hover:shadow-2xl")
                }>
                {item.title && <div className="m-4">{item.title}</div>}
                <CardContent>{item.content}</CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPageIndex;
