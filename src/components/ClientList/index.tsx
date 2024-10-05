import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid2,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { ClientResponseDTO } from "@/dtos/chat";
import { ChevronRight } from "@mui/icons-material";
import Link from "next/link";

interface ClientListProps {
  clientList: ClientResponseDTO[];
}

export default function ClientList({ clientList }: ClientListProps) {
  return (
    <List>
      {clientList.map((client) => (
        <Link href={`/dashboard/${client.id}`}>
          <ListItem key={client.id}>
            <Card variant="outlined" sx={{ width: "100%", cursor: "pointer" }}>
              <CardContent>
                <Grid2 container spacing={2} justifyContent="space-between">
                  <Grid2>
                    <Typography variant="h6">{client.name}</Typography>
                  </Grid2>
                  <Grid2>
                    <Box>
                      <ChevronRight />
                    </Box>
                  </Grid2>
                </Grid2>
              </CardContent>
            </Card>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
