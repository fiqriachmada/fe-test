"use client";
import { useLalinIndex } from "@/hooks/lalin/index/useLalinIndex";
import React from "react";
import { PaymentTabs } from "./index/payment-tabs";
import PaymentDataTableLalin from "./index/table";
import { FilterLalin } from "./index/filter";

type Props = {};

function LalinPageIndex({}: Props) {
  const {} = useLalinIndex();
  return (
    <div>
      <FilterLalin />
      <PaymentTabs />
      <PaymentDataTableLalin />
    </div>
  );
}

export default LalinPageIndex;
