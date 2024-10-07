import { api } from "@/services/Api/api";
import { AxiosResponse } from "axios";
import {
  ClientCreditsRequestDTO,
  ClientPaymentPlanRequestDTO,
  ClientRequestDTO,
  ClientResponseDTO,
} from "@/dtos/chat";

export async function getClientInfo(
  id: number
): Promise<AxiosResponse<ClientResponseDTO>> {
  return await api.get("/client/" + id);
}

export async function getClientList(): Promise<
  AxiosResponse<ClientResponseDTO[]>
> {
  return await api.get("/client/all");
}

export async function createClient(
  request: ClientRequestDTO
): Promise<AxiosResponse<ClientResponseDTO>> {
  return await api.post("/client", request);
}

export async function changePaymentPlan(
  id: number,
  request: ClientPaymentPlanRequestDTO
): Promise<AxiosResponse<ClientResponseDTO>> {
  return await api.put("/client/" + id + "/alter-payment-plan", request);
}

export async function addCredits(
  id: number,
  request: ClientCreditsRequestDTO
): Promise<AxiosResponse<ClientResponseDTO>> {
  return await api.put("/client/" + id + "/add-credits", request);
}

export async function alterLimit(
  id: number,
  request: ClientCreditsRequestDTO
): Promise<AxiosResponse<ClientResponseDTO>> {
  return await api.put("/client/" + id + "/alter-limit", request);
}
