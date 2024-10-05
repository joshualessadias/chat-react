import React from "react";
import {
  Card,
  CardContent,
  Grid2,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { MessageResponseDTO } from "@/dtos/chat";

interface MessageListProps {
  messages: MessageResponseDTO[];
}

export default function MessageList({ messages }: MessageListProps) {
  const sortedMessages = messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <List>
      {sortedMessages.map((message) => (
        <ListItem key={message.id}>
          <Card variant="outlined" sx={{ width: "100%" }}>
            <CardContent>
              <Grid2 container spacing={2} justifyContent="space-between">
                <Grid2>
                  <Typography variant="h6">
                    {message.receiverPhoneNumber}
                  </Typography>
                </Grid2>
                <Grid2>
                  <Typography variant="h6">{message.content}</Typography>
                </Grid2>
                <Grid2>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(message.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    WhatsApp: {message.isWhatsApp ? "Yes" : "No"}
                  </Typography>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
}
