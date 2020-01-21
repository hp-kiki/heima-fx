import axios from '../uilts/myaxios'

// 文章列表
export const Articlelist = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 文章详情
export const post = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 评论列表
export const postcomment = (id) => {
  return axios({
    url: `/post_comment/${id}`
  })
}

// 发布评论
export const fabucomment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}

// 点赞文章
export const postlike = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 搜索推荐
export const postsearchrecommend = (params) => {
  return axios({
    url: `/post_search_recommend`,
    params
  })
}

// 搜索文章
export const postsearch = (params) => {
  return axios({
    url: `/post_search`,
    params
  })
}
