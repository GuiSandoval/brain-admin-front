import { httpClient } from "@/services/http";
import { AulaResponse } from "./response";
import { IBrainResult } from "@/services/commoResponse";

const BASE_ROUTE = "aula";

export class AulaApi {
  getAula(): Promise<IBrainResult<AulaResponse>> {
    return httpClient.get(`${BASE_ROUTE}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }
  putAula(): Promise<void> {
    return httpClient.put(`${BASE_ROUTE}`);
  }
  postAula(): Promise<void> {
    return httpClient.post(`${BASE_ROUTE}`);
  }
}
