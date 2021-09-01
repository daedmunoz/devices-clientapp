export interface HTTPService {
  get<T>(opts: { url: string; }): Promise<T>;
  post<T>(opts: { url: string; body: Record<string, unknown> }): Promise<T>;
  put<T>(opts: { url: string; body: Record<string, unknown> }): Promise<T>;
  delete<T>(opts: { url: string; }): Promise<T>;
}