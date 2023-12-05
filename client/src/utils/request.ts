import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { AxiosRetry } from './retry';
import { getAccessToken, setAccessToken, getRefreshToken } from './storage'
import {
  BASE_URL,
  FETCH_TOKEN_URL,
} from './constants';

const request = axios.create({})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 容错：防止请求地址中有空格
    config.url = config.url?.trim()
    config.headers.Authorization = `Bearer ${getAccessToken()}`
    return config
  },
  error => {
    // do something
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 请求成功
    return response
  },
  err => {
    // 对响应错误做点什么
    if (err.response && err.response.status === 400 && err.response.data.code !== 400) {
      // 处理 400 错误
      return Promise.reject(err.response.data);
    }
    if (err.response && err.response.status === 401) {
      // axiosRetry.requestWrapper 处理 401 错误
      return Promise.reject(err);
    }
    ElMessage({
      type: 'error',
      message: err.response?.data?.message || err.message,
      duration: 3 * 1000
    })
    return Promise.reject(err)
  }
)

const axiosRetry = new AxiosRetry({
  baseUrl: BASE_URL,
  url: FETCH_TOKEN_URL,
  getRefreshToken,
  onSuccess: res => {
    // 刷新 access token
    const accessToken = JSON.parse(res.data).data.accessToken;
    setAccessToken(accessToken)
  },
  onError: () => {
    // refresh token 过期，清空 access token 并跳转到登录页
    setAccessToken('')
    router.push('/login')
  },
});

export default <T = unknown>(config: AxiosRequestConfig) => {
    return axiosRetry.requestWrapper(() => request(config)).then(res => {
        return res.data as T
    })
}
