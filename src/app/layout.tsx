import type { Metadata } from "next";
import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AlertSnackbarProvider } from "@/contexts/alertSnackbarContext";
import React from "react";
import { darkTheme } from "@/components/Theme";

export const metadata: Metadata = {
  title: "BCB",
  description: "Big Chat Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline>
            <AlertSnackbarProvider>{children}</AlertSnackbarProvider>
          </CssBaseline>
        </ThemeProvider>
      </body>
    </html>
  );
}
