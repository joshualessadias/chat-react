import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ClientResponseDTO } from "@/dtos/chat";
import { useState } from "react";
import ViewModal from "@/components/ClientTable/ViewModal";

interface ClientTableProps {
  clientList: ClientResponseDTO[];
}

export default function ClientTable({ clientList }: ClientTableProps) {
  const [selectedClient, setSelectedClient] =
    useState<ClientResponseDTO | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleViewOpen = (client: ClientResponseDTO) => {
    setSelectedClient(client);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setSelectedClient(null);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientList.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleViewOpen(client)}>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ViewModal
        open={viewOpen}
        onClose={handleViewClose}
        selectedClient={selectedClient}
      />
    </div>
  );
}
