import React, { useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { useLalinStore } from "@/stores/lalin/lalin-store";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("id-ID");
const formatDay = (dateStr: string) => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return days[new Date(dateStr).getDay()];
};

const PaymentDataTableLalin: React.FC = () => {
  const {
    filteredData,
    currentPage,
    itemsPerPage,
    activeTab,
    paymentMethods,
    setCurrentPage,
    setItemsPerPage,
  } = useLalinStore();

  const activeMethod = paymentMethods.find((pm) => pm.id === activeTab);

  const clusterMap: Record<string, string[]> = {
    ktp: ["dinasKary", "dinasMitra", "dinasOpr"],
    etoll: ["eBca", "eBni", "eBri", "eDKI", "eMandiri", "eMega", "eNobu"],
    flo: ["eFlo"],
    tunai: ["tunai"],
    umum: [
      "tunai",
      "eFlo",
      "eBca",
      "eBni",
      "eBri",
      "eDKI",
      "eMandiri",
      "eMega",
      "eNobu",
    ], // ⬅️ ini tambahan penting
  };

  const selectedKeys = useMemo(() => {
    // Ambil semua metode yang ada di DataRow (bukan cluster)
    const baseMethods = paymentMethods.filter((pm) =>
      [
        "Tunai",
        "DinasOpr",
        "DinasMitra",
        "DinasKary",
        "eMandiri",
        "eBri",
        "eBni",
        "eBca",
        "eNobu",
        "eDKI",
        "eMega",
        "eFlo",
      ].includes(pm.key)
    );

    if (activeTab === "grandTotal") {
      return baseMethods.map((pm) => pm.key);
    }

    const clusterKeys = clusterMap[activeTab.toLowerCase()];
    if (clusterKeys) {
      return clusterKeys
        .map((id) => paymentMethods.find((m) => m.id === id)?.key)
        .filter(Boolean) as string[];
    }

    const method = paymentMethods.find((pm) => pm.id === activeTab);
    return method ? [method.key] : [];
  }, [activeTab, paymentMethods]);

  const pivotData = useMemo(() => {
    const map = new Map<string, any>();

    filteredData?.forEach((row) => {
      const key = `${row.Tanggal}-${row.Shift}-${row.IdCabang}-${row.IdGerbang}-${row.IdGardu}`;

      if (!map.has(key)) {
        map.set(key, {
          Tanggal: row.Tanggal,
          Shift: row.Shift,
          IdCabang: row.IdCabang,
          IdGerbang: row.IdGerbang,
          IdGardu: row.IdGardu,
          methodTotal: 0,
          paymentMethods: activeMethod?.name,
          Gol1: 0,
          Gol2: 0,
          Gol3: 0,
          Gol4: 0,
          Gol5: 0,
        });
      }

      const item = map.get(key);

      selectedKeys.forEach((key) => {
        const value = Number((row as any)[key] || 0);
        const golonganKey = `Gol${row.Golongan}`;
        if (item[golonganKey] !== undefined) {
          item[golonganKey] += value;
          item.methodTotal += value;
        }
      });
    });

    return Array.from(map.values());
  }, [filteredData, selectedKeys]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return pivotData.slice(start, start + itemsPerPage);
  }, [pivotData, currentPage, itemsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  if (!activeMethod) {
    return (
      <Box p={2}>
        <Typography color="error">
          Metode pembayaran tidak ditemukan.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Rekap Data {activeMethod.name} per Shift & Golongan
        </Typography>
        <Chip
          label={`${pivotData.length} records`}
          size="small"
          sx={{ ml: 2, fontWeight: "bold" }}
        />
      </Box>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Ruas</TableCell>
              <TableCell>Gerbang</TableCell>
              <TableCell>Gardu</TableCell>
              <TableCell>Hari</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell align="center">Shift</TableCell>
              <TableCell align="right">{`Metode Pembayaran`}</TableCell>
              <TableCell align="right">Gol I</TableCell>
              <TableCell align="right">Gol II</TableCell>
              <TableCell align="right">Gol III</TableCell>
              <TableCell align="right">Gol IV</TableCell>
              <TableCell align="right">Gol V</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => {
              const total =
                row.Gol1 + row.Gol2 + row.Gol3 + row.Gol4 + row.Gol5;
              return (
                <TableRow key={index}>
                  <TableCell>
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </TableCell>
                  <TableCell>Ruas {row.IdCabang}</TableCell>
                  <TableCell>Gerbang {row.IdGerbang}</TableCell>
                  <TableCell>Gardu {row.IdGardu}</TableCell>
                  <TableCell>{formatDay(row.Tanggal)}</TableCell>
                  <TableCell>{formatDate(row.Tanggal)}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.Shift}
                      size="small"
                      sx={{
                        backgroundColor: activeMethod.color,
                        color: "white",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {row.paymentMethods}
                  </TableCell>
                  <TableCell align="right">{row.Gol1}</TableCell>
                  <TableCell align="right">{row.Gol2}</TableCell>
                  <TableCell align="right">{row.Gol3}</TableCell>
                  <TableCell align="right">{row.Gol4}</TableCell>
                  <TableCell align="right">{row.Gol5}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {total.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={pivotData.length}
        rowsPerPage={itemsPerPage}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ backgroundColor: "#fafafa", borderTop: "1px solid #eee" }}
      />
    </Paper>
  );
};

export default PaymentDataTableLalin;
