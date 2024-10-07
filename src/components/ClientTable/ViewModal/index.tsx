import {
  ClientResponseDTO,
  PostPaidPlanResponseDTO,
  PrePaidPlanResponseDTO,
} from "@/dtos/chat";
import { Box, Modal, Typography } from "@mui/material";
import { PaymentPlanEnum } from "@/enums/PaymentPlanEnum";

interface ViewModalProps {
  open: boolean;
  onClose: () => void;
  selectedClient: ClientResponseDTO | null;
}

export default function ViewModal({
  open,
  onClose,
  selectedClient,
}: ViewModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {selectedClient && (
          <>
            <Typography variant="h4" component="h2">
              {selectedClient.name}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Telefone: {selectedClient.phoneNumber}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Email: {selectedClient.email}
            </Typography>
            <Typography sx={{ mt: 2 }}>Cpf: {selectedClient.cpf}</Typography>
            <Typography sx={{ mt: 2 }}>
              Empresa: {selectedClient.firmName}
            </Typography>
            <Typography sx={{ mt: 2 }}>Cnpj: {selectedClient.cnpj}</Typography>
            <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
              Plano de Pagamento:{" "}
              {selectedClient.paymentPlan.type === PaymentPlanEnum.PRE_PAID
                ? "Pré-pago"
                : "Pós-pago"}
            </Typography>
            {selectedClient.paymentPlan.type === PaymentPlanEnum.PRE_PAID ? (
              <Typography sx={{ mt: 2 }}>
                {`Créditos restantes: ${
                  (selectedClient.paymentPlan as PrePaidPlanResponseDTO).credits
                }
                `}
              </Typography>
            ) : (
              <>
                <Typography sx={{ mt: 2 }}>
                  {`Limite de crédito: ${
                    (selectedClient.paymentPlan as PostPaidPlanResponseDTO)
                      .creditLimit
                  }
                `}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  {`Créditos utilizados: ${
                    (selectedClient.paymentPlan as PostPaidPlanResponseDTO)
                      .creditSpent
                  }
                `}
                </Typography>
              </>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
}
