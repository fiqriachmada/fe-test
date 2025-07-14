"use client";

import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import DashboardFilter from "./index/filter";
import { useDashboardIndex } from "@/hooks/dashboard/index/useDashboardIndex";

import PieChartShift from "./index/pie-chart-shift";
import BarChartPayment from "./index/bar-chart-payment";
import BarChartGates from "./index/bar-chart-gates";
import PieChartRuas from "./index/pie-chart-ruas";

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
  const paymentMethodData = processPaymentMethodData({
    data: tollData,
  });

  const shiftData = processShiftData({ data: tollData });
  const gatesData = processGateData({ data: tollData });
  const ruasData = processRuasData({ data: tollData });

  return (
    <div>
      <div className="mb-4">
        <Typography>Dashboard</Typography>
      </div>

      <div className="my-4">
        <DashboardFilter data={data}/>
      </div>
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card className="md:col-span-2">
            <div className="m-4">Jumlah Lalin by Gerbang</div>
            <CardContent>
              <BarChartPayment data={paymentMethodData} />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="col-span-1">
              <PieChartShift data={shiftData!} />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="col-span-2">
            <div className="m-4">Jumlah Lalin by Gerbang</div>
            <CardContent>
              <BarChartGates data={gatesData} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <PieChartRuas data={ruasData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardPageIndex;
