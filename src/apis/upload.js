// 引入已经设置了基准路线的axios
import axios from '../uilts/myaxios.js'

// 用户登入
export const upload = (file) => {
  return axios({
    method: 'post',
    url: '/upload',
    data: file
  })
}
