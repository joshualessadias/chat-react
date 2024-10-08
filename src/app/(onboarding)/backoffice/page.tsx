"use client";

import { useEffect, useState } from "react";
import {
  addCredits,
  alterLimit,
  changePaymentPlan,
  getClientList,
} from "@/services/Api/entities/client";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import {
  ClientCreditsRequestDTO,
  ClientPaymentPlanRequestDTO,
  ClientResponseDTO,
} from "@/dtos/chat";
import { Container } from "@mui/material";
import ClientTable from "@/components/ClientTable";
import BackofficeHeader from "@/components/BackofficeHeader";
import { PaymentPlanEnum } from "@/enums/PaymentPlanEnum";

export default function Page() {
  const { showMessage } = useAlertSnackbar();
  const [clientList, setClientList] = useState<ClientResponseDTO[]>([]);
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    getClientList().then((res) => {
      if (res.status !== 200) {
        showMessage("Erro ao carregar lista de clientes", "error");
        return;
      }
      setClientList(res.data);
    });
  }, [showMessage, updateList]);

  const handleChangePlan = (selectedClient: ClientResponseDTO) => {
    if (selectedClient) {
      const request: ClientPaymentPlanRequestDTO =
        selectedClient.paymentPlan.type === PaymentPlanEnum.PRE_PAID
          ? {
              paymentPlan: PaymentPlanEnum.POST_PAID,
            }
          : {
              paymentPlan: PaymentPlanEnum.PRE_PAID,
            };
      changePaymentPlan(selectedClient.id, request).then((res) => {
        if (res.status !== 202) {
          showMessage("Erro ao criar cliente", "error");
          return;
        }
        setUpdateList(!updateList);
        showMessage("Plano de pagamento alterado", "success");
      });
    }
  };

  const handleAddCreditsOrChangeLimit = (
    selectedClient: ClientResponseDTO,
    value: number
  ) => {
    if (selectedClient) {
      const request: ClientCreditsRequestDTO = { credits: value };
      if (selectedClient.paymentPlan.type === PaymentPlanEnum.PRE_PAID) {
        addCredits(selectedClient.id, request).then((res) => {
          if (res.status !== 202) {
            showMessage("Erro ao adicionar créditos", "error");
            return;
          }
          setUpdateList(!updateList);
          showMessage("Créditos adicionados", "success");
        });
      } else {
        alterLimit(selectedClient.id, request).then((res) => {
          if (res.status !== 202) {
            showMessage("Erro ao alterar limite", "error");
            return;
          }
          setUpdateList(!updateList);
          showMessage("Limite alterado", "success");
        });
      }
    }
  };

  return (
    <div>
      <BackofficeHeader />
      <Container>
        <ClientTable
          clientList={clientList}
          handleChangePlan={handleChangePlan}
          handleAddCreditsOrChangeLimit={handleAddCreditsOrChangeLimit}
        />
      </Container>
    </div>
  );
}
