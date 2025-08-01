import React from "react";
import {
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Grid,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  FileDownload as ExportIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";
import { useLalinStore } from "@/stores/lalin/lalin-store";
import { useExcelExport } from "@/hooks/lalin/index/useExportLalin";

export const FilterLalin: React.FC = () => {
  const {
    searchTerm,
    dateRange,
    data,
    activeTab,
    paymentMethods,
    setSearchTerm,
    setDateRange,
    resetFilters,
  } = useLalinStore();

  const { exportToExcel } = useExcelExport();
  const activeMethod = paymentMethods.find((method) => method.id === activeTab);

  const handleExport = () => {
    if (activeMethod) {
      // Export all 159 records when exporting
      exportToExcel(data, activeMethod, "laporan-lalin");
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography
        variant="h6"
        sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}>
        Laporan Lalin Per Hari
      </Typography>
      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="">
          <DatePicker
            label="Pilih Tanggal"
            value={dateRange.end ? dayjs(dateRange.end) : null}
            onChange={(date) =>
              setDateRange(dateRange.start, dayjs(date?.toDate()!) || null)
            }
            format="DD/MM/YYYY" 
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                sx: {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                },
              },
            }}
          />
        </div>
        <div className="">
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={resetFilters}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              borderColor: "#1976d2",
              color: "#1976d2",
              "&:hover": {
                borderColor: "#1565c0",
                backgroundColor: "rgba(25, 118, 210, 0.04)",
              },
            }}>
            Reset
          </Button>
        </div>
      </div>
      <Grid container spacing={3} alignItems="center"></Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<ExportIcon />}
          onClick={handleExport}
          disabled={!activeMethod}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            backgroundColor: activeMethod?.color || "#00acc1",
            "&:hover": {
              backgroundColor: activeMethod
                ? `${activeMethod.color}dd`
                : "#0097a7",
            },
          }}>
          Export {activeMethod?.name || "Data"}
        </Button>
      </Box>
    </Paper>
  );
};
