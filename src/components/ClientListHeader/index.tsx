import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function ClientListHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BCB - Big Chat Brasil
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
