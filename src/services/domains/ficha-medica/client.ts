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
    const formData = new FormData();
    formData.append("dadosPessoaisId", data.dadosPessoaisId.toString());
    if (data.tipoSanguineo) formData.append("tipoSanguineo", data.tipoSanguineo);
    if (data.necessidadesEspeciais)
      formData.append("necessidadesEspeciais", data.necessidadesEspeciais);
    if (data.doencasRespiratorias)
      formData.append("doencasRespiratorias", data.doencasRespiratorias);
    if (data.alergiasAlimentares)
      formData.append("alergiasAlimentares", data.alergiasAlimentares);
    if (data.alergiasMedicamentosas)
      formData.append("alergiasMedicamentosas", data.alergiasMedicamentosas);

    if (data.laudos && data.laudos.length > 0) {
      data.laudos.forEach((file) => {
        formData.append("laudos", file);
      });
    }

    return httpClient.post(`${BASE_ROUTE}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
