"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import AlertSnackbar from "@/components/AlertSnackbar";

interface AlertSnackbarContextType {
  showMessage: (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => void;
  closeMessage: () => void;
}

const AlertSnackbarContext = createContext<
  AlertSnackbarContextType | undefined
>(undefined);

export const useAlertSnackbar = () => {
  const context = useContext(AlertSnackbarContext);
  if (!context) {
    throw new Error(
      "useAlertSnackbar must be used within a AlertSnackbarProvider"
    );
  }
  return context;
};

// eslint-disable-next-line
export const AlertSnackbarProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const showMessage = useCallback(
    (message: string, severity: "success" | "error" | "info" | "warning") => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    },
    []
  );

  const closeMessage = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <AlertSnackbarContext.Provider value={{ showMessage, closeMessage }}>
      {children}
      <AlertSnackbar open={open} message={message} severity={severity} />
    </AlertSnackbarContext.Provider>
  );
};
