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

// // 个人信息
export const mycenter = (id) => {
  return axios({
    url: `/user/${id}`
  })
}

// 编辑个人信息
export const editprofilesuer = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 关注用户
export const userfollows = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 取消关注用户
export const userunfollow = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
