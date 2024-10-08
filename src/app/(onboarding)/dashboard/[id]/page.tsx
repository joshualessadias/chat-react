"use client";

import React, { useEffect, useState } from "react";
import { getClientInfo } from "@/services/Api/entities/client";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import { ClientResponseDTO, MessageRequestDTO } from "@/dtos/chat";
import ClientHeader from "../../../../components/ClientHeader";
import MessageList from "@/components/MessageList";
import { Container } from "@mui/material";
import NewMessageButton from "@/components/NewMessageButton";
import { sendMessage } from "@/services/Api/entities/message";
import { useParams } from "next/navigation";

export default function Page() {
  const { showMessage } = useAlertSnackbar();
  const [clientInfo, setClientInfo] = useState<ClientResponseDTO>();
  const { id } = useParams();
  const clientId = Number(id);
  const [updateInfo, setUpdateInfo] = useState(false);

  useEffect(() => {
    getClientInfo(clientId).then((res) => {
      if (res.status !== 200) {
        showMessage("Erro ao carregar dados do cliente", "error");
        return;
      }
      setClientInfo(res.data);
    });
  }, [clientId, showMessage, updateInfo]);

  const handleCreateMessage = (newMessage: MessageRequestDTO) => {
    sendMessage(clientId, newMessage).then((res) => {
      if (res.status === 402) {
        showMessage("Créditos insuficientes", "error");
      }
      else if (res.status !== 201) {
        showMessage("Erro ao enviar mensagem", "error");
        return;
      } else {
        setUpdateInfo(!updateInfo);
        showMessage("Mensagem enviada", "success");
      }
    });
  };

  return (
    <div>
      {clientInfo && (
        <>
          <ClientHeader clientInfo={clientInfo} />
          <Container>
            <MessageList messages={clientInfo.messages} />
            <NewMessageButton onCreateMessage={handleCreateMessage} />
          </Container>
        </>
      )}
    </div>
  );
}
