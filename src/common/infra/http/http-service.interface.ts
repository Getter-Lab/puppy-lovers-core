import { HttpMethod } from '../../enum/http-method.enum';

export interface IHttpRequest<T = any> {
  method: HttpMethod;
  url: string;
  params?: { [key: string]: any };
  data?: T;
  headers?: { [key: string]: any };
  attempts?: number;
}

export interface IClientHttpRequest extends Omit<IHttpRequest, 'url'> {
  path: string;
}

export interface IHttpService {
  makeRequest<T>(request: IHttpRequest | IClientHttpRequest): Promise<T>;
}
