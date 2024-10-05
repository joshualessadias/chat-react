import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ClientResponseDTO } from "@/dtos/chat";

interface HeaderProps {
  clientInfo: ClientResponseDTO;
}

export default function Header({ clientInfo }: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {clientInfo.name}
        </Typography>
        <Box>
          <Typography variant="h6" component="div">
            {clientInfo.paymentPlan.type}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
