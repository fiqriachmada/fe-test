"use client";
import useNextHooks from "@/hooks/useNextHooks";
import { useGatesActionSelectStore } from "@/stores/gates/gates-action-store";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

type Props = {};

function GatesPageDetail({}: Props) {
  const { id, router } = useNextHooks();
  const { row } = useGatesActionSelectStore();

  const rowId = row?.id?.toString?.()! + row?.IdCabang?.toString?.()!;

  useEffect(() => {
    if (row) {
      if (rowId !== id) {
        router.push("/gates");
      }
    }
  }, [row]);

  return (
    <div>
      <Card>
        <CardHeader
          title={row?.NamaGerbang! || "-"}
          subheader={row?.NamaCabang! || "-"}
          slotProps={{
            title: { variant: "h6" },
            subheader: { color: "textSecondary" },
          }}
        />
        <Divider />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <strong>ID:</strong> {row?.id! || "-"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>ID Cabang:</strong> {row?.IdCabang! || "-"}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default GatesPageDetail;
