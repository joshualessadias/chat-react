import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ClientResponseDTO } from "@/dtos/chat";
import { PaymentPlanEnum } from "@/enums/PaymentPlanEnum";
import { useState } from "react";
import NumericFormatCustom from "@/components/NumericFormatCustom";

interface CreditModalProps {
  open: boolean;
  onClose: () => void;
  selectedClient: ClientResponseDTO | null;
  onConfirm: (value: number) => void;
}

export default function CreditModal({
  open,
  onClose,
  selectedClient,
  onConfirm,
}: CreditModalProps) {
  const [value, setValue] = useState<number>(0);

  if (!selectedClient) return null;

  const isPrePaid =
    selectedClient.paymentPlan.type === PaymentPlanEnum.PRE_PAID;
  const actionText = isPrePaid
    ? "Adicionar Créditos"
    : "Alterar Limite de Crédito";

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
          {actionText}
        </Typography>
        <TextField
          label={isPrePaid ? "Créditos" : "Limite de Crédito"}
          fullWidth
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          sx={{ mt: 2 }}
          slotProps={{ input: { inputComponent: NumericFormatCustom } }}
          // InputProps={{ inputComponent: NumericFormatCustom }}
        />
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onConfirm(value)}
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
