import { Axios } from 'axios';

export class AxiosRetry {
  // 维护一个promise
  private fetchNewTokenPromise: Promise<unknown> | null = null;

  // 一些必须的配置
  private baseUrl: string;
  private url: string;
  private getRefreshToken: () => string | null;
  private unauthorizedStatus: string | number;
  private onSuccess: (res: unknown) => unknown;
  private onError: () => unknown;

  constructor({
    baseUrl,
    url,
    getRefreshToken,
    unauthorizedStatus = 401,
    onSuccess,
    onError,
  }: {
    baseUrl: string;
    url: string;
    getRefreshToken: () => string | null;
    unauthorizedStatus?: number | string;
    onSuccess: (res: unknown) => unknown;
    onError: () => unknown;
  }) {
    this.baseUrl = baseUrl;
    this.url = url;
    this.getRefreshToken = getRefreshToken;
    this.unauthorizedStatus = unauthorizedStatus;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  requestWrapper<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 先把请求函数保存下来
      const requestFn = request;
      return request()
        .then(resolve)
        .catch(err => {
          if (err?.response?.status === this.unauthorizedStatus && err?.config?.url !== this.url) {
            if (!this.fetchNewTokenPromise) {
              this.fetchNewTokenPromise = this.fetchNewToken();
            }
            this.fetchNewTokenPromise
              .then(() => {
                // 获取token成功后，重新执行请求
                requestFn().then(resolve).catch(reject);
              })
              .finally(() => {
                // 置空
                this.fetchNewTokenPromise = null;
              });
          } else {
            this.onError();
            reject(err);
          }
        });
    });
  }

  // 获取token的函数
  fetchNewToken() {
    return new Axios({
      baseURL: this.baseUrl,
    })
    .get(this.url, {
      headers: {
        Authorization: `Bearer ${this.getRefreshToken()}`,
      },
    })
    .then(this.onSuccess)
    .catch(() => {
      this.onError();
      return Promise.reject();
    });
  }
}