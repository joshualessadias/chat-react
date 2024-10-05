"use client";

import React, { useEffect, useState } from "react";
import { createClient, getClientList } from "@/services/Api/entities/client";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import { ClientRequestDTO, ClientResponseDTO } from "@/dtos/chat";
import { Box, Container, Typography } from "@mui/material";
import ClientListHeader from "@/components/ClientListHeader";
import ClientList from "@/components/ClientList";
import NewClientButton from "@/components/NewClientButton";

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

  const handleCreateClient = (newClient: ClientRequestDTO) => {
    createClient(newClient).then((res) => {
      if (res.status !== 201) {
        showMessage("Erro ao criar cliente", "error");
        return;
      }
      setClientList((prevClientList) => {
        if (!prevClientList) return prevClientList;
        return [...prevClientList, res.data];
      });
    });
  };

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
            <NewClientButton onCreateClient={handleCreateClient} />
          </Container>
        </>
      )}
    </div>
  );
}
