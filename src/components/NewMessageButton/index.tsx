import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControlLabel,
  TextField,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import InputMask from "react-input-mask";
import { MessageRequestDTO } from "@/dtos/chat";

interface NewMessageButtonProps {
  onCreateMessage: (message: MessageRequestDTO) => void;
}

export default function NewMessageButton({
  onCreateMessage,
}: NewMessageButtonProps) {
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState<MessageRequestDTO>({
    content: "",
    receiverPhoneNumber: "",
    isWhatsApp: false,
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
      name === "receiverPhoneNumber" ? value.replace(/\D/g, "") : value;
    setNewMessage((prev) => ({
      ...prev,
      [name]: name === "isWhatsApp" ? e.target.checked : cleanedValue,
    }));
  };

  const handleSubmit = () => {
    onCreateMessage(newMessage);
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
        <SendIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enviar Mensagem</DialogTitle>
        <DialogContent>
          <InputMask
            mask="(**) *****-****"
            value={newMessage.receiverPhoneNumber}
            onChange={handleChange}
          >
            {function () {
              return (
                <TextField
                  autoFocus
                  margin="dense"
                  name="receiverPhoneNumber"
                  label="Número do destinatário"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              );
            }}
          </InputMask>
          <TextField
            margin="dense"
            name="content"
            label="Conteúdo"
            type="text"
            fullWidth
            variant="outlined"
            value={newMessage.content}
            onChange={handleChange}
          />
          <FormControlLabel
            name="isWhatsApp"
            label="WhatsApp"
            control={
              <Checkbox
                checked={newMessage.isWhatsApp}
                onChange={handleChange}
              />
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
