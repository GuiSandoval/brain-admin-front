import { httpClient } from "@/services/http";
import { SerieResponse } from "./response";

const BASE_ROUTE = "serie";

export class SerieApi {
  getListaSeries(): Promise<SerieResponse[]> {
    return httpClient.get(`${BASE_ROUTE}`);
  }
}
