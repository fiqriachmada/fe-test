import { useGatesFilterStore } from "@/stores/gates/gates-filter-store";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { RootGates } from "@/types/gates/gates-types";
import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React from "react";

type Props = {
  data: RootGates | undefined;

  handleClickOpen: ({}: {}) => void;
  handleClose?: ({}: {}) => void;
};

function TableGates({ data, handleClickOpen, handleClose }: Props) {
  const { page, total } = useGatesFilterStore();
  return (
    <div>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}>
                No
              </TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}>
                ID Gerbang
              </TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}>
                Nama Gerbang
              </TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}>
                ID Cabang
              </TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}>
                Nama Cabang
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  backgroundColor: "#f5f5f5",
                  textAlign: "center",
                }}>
                Aksi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.rows.rows.map((row, index) => (
              <TableRow
                key={`${row.IdCabang}-${row.id}`}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "#f8f9fa",
                  },
                  "&:nth-of-type(even)": {
                    backgroundColor: "#fafafa",
                  },
                }}>
                <TableCell sx={{ fontWeight: 500 }}>
                  {(page - 1) * total + index + 1}
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.id}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: "#1976d2" }}>
                  {row.NamaGerbang}
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.IdCabang}
                    size="small"
                    color="info"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.NamaCabang}
                    // color={getCabangColor(row.NamaCabang) as any}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <Tooltip title="Lihat Detail">
                      <IconButton
                        size="small"
                        // onClick={() => handleView(row)}
                        sx={{
                          color: "#1976d2",
                          "&:hover": { backgroundColor: "#e3f2fd" },
                        }}>
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        // onClick={() => handleEdit(row)}
                        sx={{
                          color: "#ed6c02",
                          "&:hover": { backgroundColor: "#fff3e0" },
                        }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton
                        size="small"
                        onClick={() => handleClickOpen({ row })}
                        sx={{
                          color: "#d32f2f",
                          "&:hover": { backgroundColor: "#ffebee" },
                        }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableGates;
