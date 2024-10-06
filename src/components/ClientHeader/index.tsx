import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { ClientResponseDTO } from "@/dtos/chat";
import { PaymentPlanEnum } from "@/enums/PaymentPlanEnum";
import Link from "next/link";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface ClientHeaderProps {
  clientInfo: ClientResponseDTO;
}

export default function ClientHeader({ clientInfo }: ClientHeaderProps) {
  return (
    <AppBar>
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
        <Link href={"/client-selection"}>
          <IconButton color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
