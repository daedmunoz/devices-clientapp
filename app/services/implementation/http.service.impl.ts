import { HTTPService } from '../http.service';

export class HTTPServiceImpl implements HTTPService {
  private commonHeaders = {
    'Content-Type': 'application/json'
  };

  async get<T>(opts: { url: string; }): Promise<T> {
    const response = await fetch(opts.url, {
      headers: this.commonHeaders,
    });

    return response.json() as Promise<T>;
  }

  async post<T>(opts: { url: string; body: Record<string, unknown>; }): Promise<T> {
    const response = await fetch(opts.url, {
      method: 'POST',
      body: JSON.stringify(opts.body),
      headers: this.commonHeaders,
    });

    return response.json() as Promise<T>;
  }

  async put<T>(opts: { url: string; body: Record<string, unknown>; }): Promise<T> {
    const response = await fetch(opts.url, {
      method: 'PUT',
      body: JSON.stringify(opts.body),
      headers: this.commonHeaders,
    });

    return response.json() as Promise<T>;
  }

  async delete<T>(opts: { url: string; }): Promise<T> {
    console.log('DELETING!!!');
    const response = await fetch(opts.url, {
      method: 'DELETE',
      headers: this.commonHeaders,
    });

    if (!response.ok) {
      console.error(response.body);
      throw new Error('')
    }
    return response.json() as Promise<T>;
  }

}