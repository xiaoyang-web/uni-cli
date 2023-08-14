import type { AlovaMethodCreateConfig, RequestBody } from 'alova';
import type { UniappConfig } from '@alova/adapter-uniapp';
import type { ApiResponse } from './types';
import { request } from './instance';

export class Api {
  static get<T>(url: string, config?: AlovaMethodCreateConfig<ApiResponse<T>, unknown, UniappConfig, any>) {
    return request.Get<ApiResponse<T>>(url, config);
  }

  static post<T>(
    url: string,
    data?: RequestBody,
    config?: AlovaMethodCreateConfig<ApiResponse<T>, unknown, UniappConfig, any>
  ) {
    return request.Post<ApiResponse<T>>(url, data, config);
  }

  static put<T>(
    url: string,
    data?: RequestBody,
    config?: AlovaMethodCreateConfig<ApiResponse<T>, unknown, UniappConfig, any>
  ) {
    return request.Put<ApiResponse<T>>(url, data, config);
  }

  static delete<T>(
    url: string,
    data?: RequestBody,
    config?: AlovaMethodCreateConfig<ApiResponse<T>, unknown, UniappConfig, any>
  ) {
    return request.Delete<ApiResponse<T>>(url, data, config);
  }

  static upload<T>(
    url: string,
    data: Omit<UniNamespace.UploadFileOption, 'url'>,
    config?: AlovaMethodCreateConfig<ApiResponse<T>, unknown, UniappConfig, any>
  ) {
    return request.Post<ApiResponse<T>>(url, data, {
      ...config,
      requestType: 'upload',
      enableUpload: true
    });
  }
}
