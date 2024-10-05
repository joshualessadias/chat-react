"use client";

import React, { useEffect, useState } from "react";
import { getClientInfo } from "@/services/Api/entities/client";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import { ClientResponseDTO } from "@/dtos/chat";
import Header from "@/components/Header";
import MessageList from "@/components/MessageList";
import { Container } from "@mui/material";

export default function Page() {
  const { showMessage } = useAlertSnackbar();
  const [clientInfo, setClientInfo] = useState<ClientResponseDTO>();

  useEffect(() => {
    getClientInfo(7).then((res) => {
      if (res.status !== 200) {
        showMessage("Erro ao carregar dados do cliente", "error");
        return;
      }
      setClientInfo(res.data);
    });
  }, [showMessage]);

  return (
    <div>
      {clientInfo && (
        <>
          <Header clientInfo={clientInfo} />
          <Container>
            <MessageList messages={clientInfo.messages} />
          </Container>
        </>
      )}
    </div>
  );
}
