import axios from "axios";
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

export class AxiosRequest {
  private instance: AxiosInstance;

  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      // 2xx 范围内的状态码都会触发该函数。
      (res) => {
        return res.data;
      },
      // 超出 2xx 范围的状态码都会触发该函数。
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  // T:返回值类型
  request<T = any>(config: AxiosRequestConfig) {
    return this.instance.request<any, T>(config);
  }

  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: "POST" });
  }

  put<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: "PUT" });
  }

  delete<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: "DELETE" });
  }
}
