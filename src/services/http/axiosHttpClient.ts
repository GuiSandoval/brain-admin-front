import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpClient, RequestOptions } from "./";

export class AxiosHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.client = axios.create({
      baseURL,
      ...config,
    });
  }

  async get<TResponse, TParams = Record<string, unknown>>(
    url: string,
    options?: RequestOptions<TParams>,
  ): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(url, {
        params: options?.params,
        headers: options?.headers,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    options?: RequestOptions,
  ): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(url, data, {
        headers: options?.headers,
        params: options?.params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    options?: RequestOptions,
  ): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(url, data, {
        headers: options?.headers,
        params: options?.params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    options?: RequestOptions,
  ): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(url, data, {
        headers: options?.headers,
        params: options?.params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<TResponse, TParams = Record<string, unknown>>(
    url: string,
    options?: RequestOptions<TParams>,
  ): Promise<TResponse> {
    try {
      const response = await this.client.delete<TResponse>(url, {
        headers: options?.headers,
        params: options?.params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.response?.statusText || error.message;
      return new Error(`HTTP Error: ${message}`);
    }

    return new Error("Unexpected error");
  }
}
