"use client";

import { useEffect, useState } from "react";
import { getClientList } from "@/services/Api/entities/client";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import { ClientResponseDTO } from "@/dtos/chat";
import { Container } from "@mui/material";
import ClientTable from "@/components/ClientTable";
import BackofficeHeader from "@/components/BackofficeHeader";

export default function Page() {
  const { showMessage } = useAlertSnackbar();
  const [clientList, setClientList] = useState<ClientResponseDTO[]>([]);

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
      <BackofficeHeader />
      <Container>
        <ClientTable clientList={clientList} />
      </Container>
    </div>
  );
}
