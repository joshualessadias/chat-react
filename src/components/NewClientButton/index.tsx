import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  MenuItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InputMask from "react-input-mask";
import { ClientRequestDTO } from "@/dtos/chat";
import { PaymentPlanEnum } from "@/enums/PaymentPlanEnum";

interface NewClientButtonProps {
  onCreateClient: (message: ClientRequestDTO) => void;
}

export default function NewClientButton({
  onCreateClient,
}: NewClientButtonProps) {
  const [open, setOpen] = useState(false);
  const [newClient, setNewClient] = useState<ClientRequestDTO>({
    name: "",
    cpf: "",
    cnpj: "",
    email: "",
    firmName: "",
    paymentPlan: PaymentPlanEnum.PRE_PAID,
    phoneNumber: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanedValue =
      name === "cpf" || name === "cnpj" || name === "phoneNumber"
        ? value.replace(/\D/g, "")
        : value;
    setNewClient((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));
  };

  const handleSubmit = () => {
    onCreateClient(newClient);
    handleClose();
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar Cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nome"
            type="text"
            fullWidth
            variant="outlined"
            value={newClient.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newClient.email}
            onChange={handleChange}
          />
          <InputMask
            mask="(**) *****-****"
            value={newClient.phoneNumber}
            onChange={handleChange}
          >
            <TextField
              margin="dense"
              name="phoneNumber"
              label="Número de telefone"
              type="text"
              fullWidth
              variant="outlined"
            />
          </InputMask>
          <InputMask
            mask="***.***.***-**"
            value={newClient.cpf}
            onChange={handleChange}
          >
            <TextField
              margin="dense"
              name="cpf"
              label="CPF"
              type="text"
              fullWidth
              variant="outlined"
            />
          </InputMask>
          <TextField
            margin="dense"
            name="firmName"
            label="Nome da Empresa"
            type="text"
            fullWidth
            variant="outlined"
            value={newClient.firmName}
            onChange={handleChange}
          />
          <InputMask
            mask="**.***.***/****-**"
            value={newClient.cnpj}
            onChange={handleChange}
          >
            <TextField
              margin="dense"
              name="cnpj"
              label="CNPJ"
              type="text"
              fullWidth
              variant="outlined"
            />
          </InputMask>
          <TextField
            margin="dense"
            name="paymentPlan"
            select
            label="Plano de Pagamento"
            fullWidth
            variant="outlined"
            value={newClient.paymentPlan}
            onChange={handleChange}
          >
            <MenuItem
              key={PaymentPlanEnum.PRE_PAID}
              value={PaymentPlanEnum.PRE_PAID}
            >
              {PaymentPlanEnum.PRE_PAID}
            </MenuItem>
            <MenuItem
              key={PaymentPlanEnum.POST_PAID}
              value={PaymentPlanEnum.POST_PAID}
            >
              {PaymentPlanEnum.POST_PAID}
            </MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
