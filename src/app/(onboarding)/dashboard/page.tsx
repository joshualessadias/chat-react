"use client";

import React, { useEffect, useState } from "react";
import { getClientInfo } from "@/services/Api/entities/client";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import { ClientResponseDTO, MessageRequestDTO } from "@/dtos/chat";
import Header from "@/components/Header";
import MessageList from "@/components/MessageList";
import { Container } from "@mui/material";
import NewMessageButton from "@/components/NewMessageButton";
import { sendMessage } from "@/services/Api/entities/message";

export default function Page() {
  const { showMessage } = useAlertSnackbar();
  const [clientInfo, setClientInfo] = useState<ClientResponseDTO>();

  const CLIENT_ID: number = 7;

  useEffect(() => {
    getClientInfo(CLIENT_ID).then((res) => {
      if (res.status !== 200) {
        showMessage("Erro ao carregar dados do cliente", "error");
        return;
      }
      setClientInfo(res.data);
    });
  }, [showMessage]);

  const handleCreateMessage = (newMessage: MessageRequestDTO) => {
    sendMessage(CLIENT_ID, newMessage).then((res) => {
      if (res.status !== 201) {
        showMessage("Erro ao enviar mensagem", "error");
        return;
      }
      setClientInfo((prevClientInfo) => {
        if (!prevClientInfo) return prevClientInfo;
        return {
          ...prevClientInfo,
          messages: [...prevClientInfo.messages, res.data],
        };
      });
    });
  };

  return (
    <div>
      {clientInfo && (
        <>
          <Header clientInfo={clientInfo} />
          <Container>
            <MessageList messages={clientInfo.messages} />
            <NewMessageButton onCreateMessage={handleCreateMessage} />
          </Container>
        </>
      )}
    </div>
  );
}
