import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";

export default function ClientListHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BCB - Big Chat Brasil
        </Typography>
        <Link href={`/backoffice`}>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
