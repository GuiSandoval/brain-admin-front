export interface HttpClient {
  get<T>(url: string, params?: Record<string, any>): Promise<T>;
  post<T>(url: string, data?: Record<string, any>): Promise<T>;
  put<T>(url: string, data?: Record<string, any>): Promise<T>;
  delete<T>(url: string, params?: Record<string, any>): Promise<T>;
}
