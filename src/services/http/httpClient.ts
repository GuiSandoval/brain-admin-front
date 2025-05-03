import { AxiosHttpClient } from "./axiosHttpClient";
import { HttpClient } from "./httpClient.d";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const httpClient: HttpClient = new AxiosHttpClient(BASE_URL);
