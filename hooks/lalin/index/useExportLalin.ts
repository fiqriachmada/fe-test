import { DataRow, PaymentMethod } from "@/stores/lalin/lalin-store";
import { useCallback } from "react";
import * as XLSX from "xlsx";

export const useExcelExport = () => {
  const exportToExcel = useCallback(
    (
      data: DataRow[],
      activeMethod: PaymentMethod,
      filename: string = "laporan-lalin"
    ) => {
      // Format data for Excel
      const formattedData = data.map((row, index) => ({
        No: index + 1,
        Ruas: `Ruas ${row.IdCabang}`,
        Gerbang: `Gerbang ${row.IdGerbang}`,
        Gardu: `Gardu ${row.IdGardu}`,
        Hari: new Date(row.Tanggal).toLocaleDateString("id-ID", {
          weekday: "long",
        }),
        Tanggal: new Date(row.Tanggal).toLocaleDateString("id-ID"),
        Shift: row.Shift,
        Golongan: row.Golongan,
        [activeMethod.name]: row[activeMethod.key] as number,
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(formattedData);

      // Set column widths
      const colWidths = [
        { wch: 5 }, // No
        { wch: 10 }, // Ruas
        { wch: 12 }, // Gerbang
        { wch: 10 }, // Gardu
        { wch: 10 }, // Hari
        { wch: 12 }, // Tanggal
        { wch: 8 }, // Shift
        { wch: 10 }, // Golongan
        { wch: 15 }, // Payment Method
      ];
      ws["!cols"] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, `Laporan ${activeMethod.name}`);

      // Save file
      const timestamp = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(wb, `${filename}-${activeMethod.name}-${timestamp}.xlsx`);
    },
    []
  );

  return { exportToExcel };
};
