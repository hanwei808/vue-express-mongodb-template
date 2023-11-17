import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 容错：防止请求地址中有空格
    config.url = config.url?.trim()
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
    const { status } = response.data
    // 请求成功
    if (!status || status === 200) {
      return response
    }
    
    // 处理 Token 过期

    // 其它错误给出提示即可，比如 400 参数错误之类的
    // ElMessage({
    //   type: 'error',
    //   message: response.data?.message || 'Error',
    //   duration: 3 * 1000
    // })
    return Promise.reject(response)
  },
  err => {
    // 对响应错误做点什么
    if (err.response && err.response.status === 400 && err.response.data.code === 401) {
      // 处理 400 错误
      return Promise.reject(err.response);
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
