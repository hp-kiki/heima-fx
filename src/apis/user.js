// 引入已经设置了基准路线的axios
import axios from '../uilts/myaxios.js'

// 用户登入
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 用户注册
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}
