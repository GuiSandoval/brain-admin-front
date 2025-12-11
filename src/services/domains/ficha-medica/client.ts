import { IBrainResult } from "@/services/commoResponse";
import { httpClient } from "@/services/http";
import { FichaMedicaResponse } from "./response";
import { FichaMedicaPostRequest, FichaMedicaPutRequest } from "./request";

const BASE_ROUTE = "ficha-medica";

export class FichaMedicaApi {
  listaTodasFichasMedicas(): Promise<IBrainResult<FichaMedicaResponse>> {
    return httpClient.get(`${BASE_ROUTE}`);
  }

  criarFichaMedica(data: FichaMedicaPostRequest): Promise<FichaMedicaResponse> {
    return httpClient.post(`${BASE_ROUTE}`, data);
  }

  atualizarFichaMedica(data: FichaMedicaPutRequest): Promise<FichaMedicaResponse> {
    return httpClient.put(`${BASE_ROUTE}/${data.id}`, data);
  }

  deleteFichaMedica(id: string): Promise<void> {
    return httpClient.delete(`${BASE_ROUTE}/${id}`);
  }

  buscarFichaMedica(id: string): Promise<FichaMedicaResponse> {
    return httpClient.get(`${BASE_ROUTE}/${id}`);
  }
}
