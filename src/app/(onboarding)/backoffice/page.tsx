"use client";

import { useEffect, useState } from "react";
import {
  changePaymentPlan,
  getClientList,
} from "@/services/Api/entities/client";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import { ClientPaymentPlanRequestDTO, ClientResponseDTO } from "@/dtos/chat";
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
      });
    }
  };

  return (
    <div>
      <BackofficeHeader />
      <Container>
        <ClientTable
          clientList={clientList}
          handleChangePlan={handleChangePlan}
        />
      </Container>
    </div>
  );
}
