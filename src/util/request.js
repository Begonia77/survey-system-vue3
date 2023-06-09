import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 120000,
})
// 添加请求拦截器
service.interceptors.request.use((config) => {
  // 从localStorage中获取userId
  const userId = localStorage.getItem('userId')
  if (userId)
    config.headers.userId = userId
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default service
