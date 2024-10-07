import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ClientResponseDTO,
  PostPaidPlanResponseDTO,
  PrePaidPlanResponseDTO,
} from "@/dtos/chat";
import { PaymentPlanEnum } from "@/enums/PaymentPlanEnum";
import Link from "next/link";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InfoIcon from "@mui/icons-material/Info";

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            Seu plano:{" "}
            {clientInfo.paymentPlan.type === PaymentPlanEnum.PRE_PAID
              ? "Pré-pago"
              : "Pós-pago"}
          </Typography>
          <Tooltip
            title={
              clientInfo.paymentPlan.type === PaymentPlanEnum.PRE_PAID
                ? `Créditos restantes: ${
                    (clientInfo.paymentPlan as PrePaidPlanResponseDTO).credits
                  }`
                : `Créditos utilizados: ${
                    (clientInfo.paymentPlan as PostPaidPlanResponseDTO)
                      .creditSpent
                  }/${
                    (clientInfo.paymentPlan as PostPaidPlanResponseDTO)
                      .creditLimit
                  }`
            }
          >
            <InfoIcon sx={{ ml: 1 }} />
          </Tooltip>
        </Box>
        <Link href={"/client-selection"}>
          <IconButton color="inherit" sx={{ ml: 2 }}>
            <ExitToAppIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
