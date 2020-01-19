import axios from '../uilts/myaxios'

export const Articlelist = (params) => {
  return axios({
    url: '/post',
    params
  })
}
