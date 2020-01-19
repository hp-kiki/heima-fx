// 引入已经设置了基准路线的axios
import axios from '../uilts/myaxios.js'

export const category = () => {
  return axios({
    url: '/category'
  })
}
