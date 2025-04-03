import { HttpClient } from "./httpClient";
import { AxiosHttpClient } from "./axiosHttpClient";

const BASE_URL = "http://localhost:9090/api/";

export const httpClient: HttpClient = new AxiosHttpClient(BASE_URL);
