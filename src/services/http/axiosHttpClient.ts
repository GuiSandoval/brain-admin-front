import axios, { AxiosInstance } from "axios";
import { HttpClient } from "./httpClient";

export class AxiosHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      withCredentials: true,
    });
  }

  async get<TResponse, TParams = Record<string, unknown>>(
    url: string,
    params?: TParams,
  ): Promise<TResponse> {
    const response = await this.client.get<TResponse>(url, { params });
    return response.data;
  }

  async post<TRequest, TResponse>(url: string, data?: TRequest): Promise<TResponse> {
    const response = await this.client.post<TResponse>(url, data);
    return response.data;
  }

  async put<TRequest, TResponse>(url: string, data?: TRequest): Promise<TResponse> {
    const response = await this.client.put<TResponse>(url, data);
    return response.data;
  }

  async delete<TResponse, TParams = Record<string, unknown>>(
    url: string,
    params?: TParams,
  ): Promise<TResponse> {
    const response = await this.client.delete<TResponse>(url, { params });
    return response.data;
  }
}
