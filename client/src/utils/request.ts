import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'

const request = axios.create({})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 容错：防止请求地址中有空格
    config.url = config.url?.trim()
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
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
    if (err.response && err.response.status === 400 && err.response.data.code === 401) {
      // 处理 400 错误
      return Promise.reject(err.response.data);
    }
    if (err.response && err.response.status === 401) {
      // 处理 401 错误
      localStorage.setItem('token', '')
      router.push('/login')
      return Promise.reject(err.response.data);
    }
    ElMessage({
      type: 'error',
      message: err.response?.data?.message || err.message,
      duration: 3 * 1000
    })
    return Promise.reject(err)
  }
)

export default <T = unknown>(config: AxiosRequestConfig) => {
    return request(config).then(res => {
        return res.data as T
    })
}
