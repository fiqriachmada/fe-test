"use client";
import { useDashboardFilterStore } from "@/stores/dashboard/dashboard-filter";
import { useGetDashboard } from "../useGetDashboard";
import {
  PaymentMethodData,
  Row,
  ShiftData,
} from "@/types/dashboard/dashboard-types";
import { useEffect } from "react";

function useDashboardIndex() {
  const { date, total, setTotal } = useDashboardFilterStore();

  const dateString = date?.format("YYYY-MM-DD");

  const dashboard = useGetDashboard({ tanggal: dateString, limit: total });

  const processPaymentMethodData = ({
    data,
  }: {
    data: Row[];
  }): PaymentMethodData[] => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const totals = data?.reduce(
      (acc, row) => {
        acc.eBca += row.eBca;
        acc.eBri += row.eBri;
        acc.eBni += row.eBni;
        acc.eDKI += row.eDKI;
        acc.eMandiri += row.eMandiri;
        acc.eMega += row.eMega;
        acc.eFlo += row.eFlo;
        acc.eNobu += row.eNobu;
        return acc;
      },
      {
        eBca: 0,
        eBri: 0,
        eBni: 0,
        eDKI: 0,
        eMandiri: 0,
        eMega: 0,
        eFlo: 0,
        eNobu: 0,
      }
    );

    return (
      Object?.entries(totals)
        ?.filter(([_, value]) => value > 0)
        ?.map(([method, total], index) => ({
          method: method.replace("e", "").toUpperCase(),
          total,
          //   color: colors[index % colors.length],
        }))! || []
    );
  };

  const processShiftData = ({ data }: { data: Row[] }): ShiftData[] => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const shiftTotals = data.reduce((acc, row) => {
      const total =
        row.eBca +
        row.eBri +
        row.eBni +
        row.eDKI +
        row.eMandiri +
        row.eMega +
        row.eFlo +
        row.eNobu;
      acc[row.Shift] = (acc[row.Shift] || 0) + total;
      return acc;
    }, {} as Record<number, number>);

    const colors = ["#3B82F6", "#10B981", "#F59E0B"];

    return Object.entries(shiftTotals).map(([shift, total], index) => ({
      id: parseInt(shift),
      value: total,
      label: `Shift ${shift}`,
      color: colors[index % colors.length],
    }));
  };
  const processGateData = ({ data }: { data: Row[] }): ShiftData[] => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const shiftTotals = data.reduce((acc, row) => {
      const total =
        row.eBca +
        row.eBri +
        row.eBni +
        row.eDKI +
        row.eMandiri +
        row.eMega +
        row.eFlo +
        row.eNobu;
      acc[row.IdGerbang] = (acc[row.IdGerbang] || 0) + total;
      return acc;
    }, {} as Record<number, number>);

    const colors = ["#3B82F6", "#10B981", "#F59E0B"];

    return Object.entries(shiftTotals).map(([shift, total], index) => ({
      id: parseInt(shift),
      value: total,
      label: `Gerbang ${shift}`,
      color: colors[index % colors.length],
    }));
  };
  const processRuasData = ({ data }: { data: Row[] }): ShiftData[] => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const shiftTotals = data.reduce((acc, row) => {
      const total =
        row.eBca +
        row.eBri +
        row.eBni +
        row.eDKI +
        row.eMandiri +
        row.eMega +
        row.eFlo +
        row.eNobu;
      acc[row.IdCabang] = (acc[row.IdCabang] || 0) + total;
      return acc;
    }, {} as Record<number, number>);

    const colors = ["#3B82F6", "#10B981", "#F59E0B"];

    return Object.entries(shiftTotals).map(([shift, total], index) => ({
      id: parseInt(shift),
      value: total,
      label: `Ruas ${shift}`,
      color: colors[index % colors.length],
    }));
  };

  return {
    ...dashboard,
    processPaymentMethodData,
    processShiftData,
    processGateData,
    processRuasData,
  };
}

export { useDashboardIndex };
