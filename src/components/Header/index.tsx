import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ClientResponseDTO } from "@/dtos/chat";
import { PaymentPlanEnum } from "@/enums/PaymentPlanEnum";

interface HeaderProps {
  clientInfo: ClientResponseDTO;
}

export default function Header({ clientInfo }: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Olá, {clientInfo.name}!
        </Typography>
        <Box>
          <Typography variant="h6" component="div">
            Seu plano:{" "}
            {clientInfo.paymentPlan.type === PaymentPlanEnum.PRE_PAID
              ? "Pré-pago"
              : "Pós-pago"}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
