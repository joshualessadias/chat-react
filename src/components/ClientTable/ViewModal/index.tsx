import { ClientResponseDTO } from "@/dtos/chat";
import { Box, Modal, Typography } from "@mui/material";

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
          width: 400,
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
          </>
        )}
      </Box>
    </Modal>
  );
}
