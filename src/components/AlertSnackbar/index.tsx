"use client";

import { Alert, Snackbar } from "@mui/material";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";

interface AlertSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export default function AlertSnackbar({
  open,
  message,
  severity,
}: AlertSnackbarProps) {
  const { closeMessage } = useAlertSnackbar();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={(_event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        closeMessage(); // Use closeMessage instead of the onClose prop
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      key={"bottom-center"}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}
