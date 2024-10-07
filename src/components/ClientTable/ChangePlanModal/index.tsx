import { Box, Button, Modal, Typography } from "@mui/material";
import { ClientResponseDTO } from "@/dtos/chat";
import { PaymentPlanEnum } from "@/enums/PaymentPlanEnum";

interface ChangePlanModalProps {
  open: boolean;
  onClose: () => void;
  selectedClient: ClientResponseDTO | null;
  onChangePlan: (selectedClient: ClientResponseDTO) => void;
}

export default function ChangePlanModal({
  open,
  onClose,
  selectedClient,
  onChangePlan,
}: ChangePlanModalProps) {
  if (!selectedClient) return null;

  const newPlanType =
    selectedClient.paymentPlan.type === PaymentPlanEnum.PRE_PAID
      ? "Pós-pago"
      : "Pré-pago";

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
        <Typography variant="h6" component="h2">
          Confirmar mudança de plano
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Deseja mudar o plano de {selectedClient.name} para {newPlanType}?
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onChangePlan(selectedClient)}
          >
            Confirmar
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
