import { api } from "@/services/Api/api";
import { AxiosResponse } from "axios";
import { MessageRequestDTO, MessageResponseDTO } from "@/dtos/chat";

export async function sendMessage(
  senderId: number,
  request: MessageRequestDTO
): Promise<AxiosResponse<MessageResponseDTO>> {
  const params = {
    senderId,
  };

  return await api.post("/message", request, { params });
}
