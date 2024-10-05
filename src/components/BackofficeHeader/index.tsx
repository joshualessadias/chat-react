import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function BackofficeHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Olá, admin!
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
