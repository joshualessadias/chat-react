import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { ClientResponseDTO } from "@/dtos/chat";
import { useState } from "react";
import ViewModal from "@/components/ClientTable/ViewModal";
import ChangePlanModal from "@/components/ClientTable/ChangePlanModal";

interface ClientTableProps {
  clientList: ClientResponseDTO[];
  handleChangePlan: (selectedClient: ClientResponseDTO) => void;
}

export default function ClientTable({
  clientList,
  handleChangePlan,
}: ClientTableProps) {
  const [selectedClient, setSelectedClient] =
    useState<ClientResponseDTO | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [changePlanOpen, setChangePlanOpen] = useState(false);

  const handleViewOpen = (client: ClientResponseDTO) => {
    setSelectedClient(client);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setSelectedClient(null);
  };

  const handleChangePlanOpen = (client: ClientResponseDTO) => {
    setSelectedClient(client);
    setChangePlanOpen(true);
  };

  const handleChangePlanClose = () => {
    setChangePlanOpen(false);
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
                <IconButton onClick={() => handleChangePlanOpen(client)}>
                  <SwapHorizIcon />
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
      <ChangePlanModal
        open={changePlanOpen}
        onClose={handleChangePlanClose}
        selectedClient={selectedClient}
        onChangePlan={(value) => {
          handleChangePlan(value);
          handleChangePlanClose();
        }}
      />
    </div>
  );
}
