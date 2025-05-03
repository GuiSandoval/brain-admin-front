import { HttpClient } from "./http/httpClient";
import { AxiosHttpClient } from "./http/axiosHttpClient";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const httpClient: HttpClient = new AxiosHttpClient(BASE_URL);
