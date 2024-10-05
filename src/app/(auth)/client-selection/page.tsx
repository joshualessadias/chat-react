"use client";

import React, { useEffect, useState } from "react";
import { getClientList } from "@/services/Api/entities/client";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import { ClientResponseDTO } from "@/dtos/chat";
import { Box, Container, Typography } from "@mui/material";
import ClientListHeader from "@/components/ClientListHeader";
import ClientList from "@/components/ClientList";

export default function Page() {
  const { showMessage } = useAlertSnackbar();
  const [clientList, setClientList] = useState<ClientResponseDTO[]>();

  useEffect(() => {
    getClientList().then((res) => {
      if (res.status !== 200) {
        showMessage("Erro ao carregar lista de clientes", "error");
        return;
      }
      setClientList(res.data);
    });
  }, [showMessage]);

  return (
    <div>
      {clientList && (
        <>
          <ClientListHeader />
          <Container>
            <Box mt={2}>
              <Typography variant="h4">
                Escolha o cliente para logar:
              </Typography>
            </Box>
            <ClientList clientList={clientList} />
          </Container>
        </>
      )}
    </div>
  );
}
