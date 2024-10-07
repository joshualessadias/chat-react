import { api } from "@/services/Api/api";
import { AxiosResponse } from "axios";
import { ClientRequestDTO, ClientResponseDTO } from "@/dtos/chat";

const handleResponse = (
  res: ClientResponseDTO,
  expectedStatus: number,
  actualStatus: number
): ClientResponseDTO => {
  if (actualStatus !== expectedStatus) return res;
  return res;
};

const handleResponseDataList = (
  resList: [],
  expectedStatus: number,
  actualStatus: number
): ClientResponseDTO[] => {
  if (resList.length === 0) return resList;
  return resList.map((res) =>
    handleResponse(res, expectedStatus, actualStatus)
  );
};

export async function getClientInfo(
  id: number
): Promise<AxiosResponse<ClientResponseDTO>> {
  const res = await api.get("/client/" + id);
  res.data = handleResponse(res.data, 200, res.status);
  return res;
}

export async function getClientList(): Promise<
  AxiosResponse<ClientResponseDTO[]>
> {
  const res = await api.get("/client/all");
  console.log(res);
  res.data = handleResponseDataList(res.data, 200, res.status);
  return res;
}

export async function createClient(
  request: ClientRequestDTO
): Promise<AxiosResponse<ClientResponseDTO>> {
  const res = await api.post("/client", request);
  res.data = handleResponse(res.data, 201, res.status);
  return res;
}
