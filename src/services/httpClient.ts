export interface HttpClient {
  get<TResponse, TParams = Record<string, unknown>>(
    url: string,
    params?: TParams,
  ): Promise<TResponse>;
  post<TRequest, TResponse>(url: string, data?: TRequest): Promise<TResponse>;
  put<TRequest, TResponse>(url: string, data?: TRequest): Promise<TResponse>;
  delete<TResponse, TParams = Record<string, unknown>>(
    url: string,
    params?: TParams,
  ): Promise<TResponse>;
}
