import {
  Box,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ClientResponseDTO } from "@/dtos/chat";
import { useState } from "react";

interface ClientTableProps {
  clientList: ClientResponseDTO[];
}

export default function ClientTable({ clientList }: ClientTableProps) {
  const [selectedClient, setSelectedClient] =
    useState<ClientResponseDTO | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (client: ClientResponseDTO) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientList.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(client)}>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleClose}>
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
              <Typography sx={{ mt: 2 }}>
                Cnpj: {selectedClient.cnpj}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
