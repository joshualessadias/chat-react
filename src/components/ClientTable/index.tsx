import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PaymentIcon from "@mui/icons-material/Payment";
import { ClientResponseDTO } from "@/dtos/chat";
import { useState } from "react";
import ViewModal from "@/components/ClientTable/ViewModal";
import PaymentPlanModal from "@/components/ClientTable/PaymentPlanModal";

interface ClientTableProps {
  clientList: ClientResponseDTO[];
}

export default function ClientTable({ clientList }: ClientTableProps) {
  const [selectedClient, setSelectedClient] =
    useState<ClientResponseDTO | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [paymentPlanOpen, setPaymentPlanOpen] = useState(false);

  const handleViewOpen = (client: ClientResponseDTO) => {
    setSelectedClient(client);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setSelectedClient(null);
  };

  const handlePaymentPlanOpen = (client: ClientResponseDTO) => {
    setSelectedClient(client);
    setPaymentPlanOpen(true);
  };

  const handlePaymentPlanClose = () => {
    setPaymentPlanOpen(false);
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
                <IconButton onClick={() => handleViewOpen(client)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => handlePaymentPlanOpen(client)}>
                  <PaymentIcon />
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
      <PaymentPlanModal
        open={paymentPlanOpen}
        onClose={handlePaymentPlanClose}
        selectedClient={selectedClient}
      />
    </div>
  );
}
