// 引入axios
import axios from 'axios'

// 设置基准路线
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 将基准路线存在本地
localStorage.setItem('heima_baseURL', axios.defaults.baseURL)

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
//   console.log(config)
  var token = localStorage.getItem('fx-heimatoken')
  if (token) {
    config.headers.Authorization = token
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 暴漏
export default axios
