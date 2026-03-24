import { httpClient } from "@/services/http";
import { AnosResponse, RelatorioAnoPorAnoResponse } from "./response";

const BASE_ROUTE = "relatorio";

export class RelatorioApi {
  getAnos(): Promise<AnosResponse> {
    return httpClient.get(`${BASE_ROUTE}/anos`);
  }

  filtrosPorAno(ano: number): Promise<RelatorioAnoPorAnoResponse> {
    return httpClient.get(`${BASE_ROUTE}/anos/${ano}`);
  }
}
