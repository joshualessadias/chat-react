import { Box, Button, Modal, Typography } from "@mui/material";
import {
  ClientResponseDTO,
  PostPaidPlanResponseDTO,
  PrePaidPlanResponseDTO,
} from "@/dtos/chat";
import { PaymentPlanEnum } from "@/enums/PaymentPlanEnum";

interface PaymentPlanModalProps {
  open: boolean;
  onClose: () => void;
  selectedClient: ClientResponseDTO | null;
}

export default function PaymentPlanModal({
  open,
  onClose,
  selectedClient,
}: PaymentPlanModalProps) {
  const handleAlterPaymentPlan = () => {
    // Logic to alter payment plan
  };

  const handleAddCreditsOrAlterLimit = () => {
    // Logic to add credits or alter credit limit
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {selectedClient && (
          <>
            <Typography variant="h6" component="h2">
              {selectedClient.name}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Plano de pagamento atual:{" "}
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
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAlterPaymentPlan}
              >
                Alterar plano de pagamento
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddCreditsOrAlterLimit}
                sx={{ ml: 2 }}
              >
                {selectedClient.paymentPlan.type === PaymentPlanEnum.PRE_PAID
                  ? "Adicionar créditos"
                  : "Alterar limite"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
