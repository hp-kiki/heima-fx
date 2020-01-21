<template>
  <div>
    <mytheader title="精彩评论"></mytheader>

         <div class="item" v-for="(value,index) in commentlist" :key="index">
          <div class="head">
            <img :src="value.user?value.user.head_img:''" alt />
            <div>
              <p>{{value.user?value.user.nickname:''}}</p>
              <span>2小时前</span>
            </div>
            <span @click="revert(value)">回复</span>
          </div>
          <commentelem  v-if="value.parent" :data="value.parent" @commentelemlist="revert"></commentelem>
          <div class="text">{{value.content}}</div>
        </div>
        <!-- 评论 -->
        <comment :postxinxi="post" :commentlist="obj" @Postacomment="init();++post.comment_length" @commpinglunnull="obj=null"></comment>
  </div>
</template>

<script>
import mytheader from '../components/myheader'
import { postcomment, post } from '../apis/news'
import commentelem from '../components/commentelem'
import comment from '../components/comment'
export default {
  data () {
    return {
      id: '',
      // 储存评论列表数据
      commentlist: [],
      // 文章详情
      post: {},
      obj: {} // 发给父组件的数据
    }
  },
  components: {
    mytheader, commentelem, comment
  },
  methods: {
    // 点击回复
    revert (value) {
      this.obj = value
    },
    // 封装获取评论数据
    async init () {
      this.id = this.$route.params.id
      var res = await postcomment(this.id)
      console.log(res)
      this.commentlist = res.data.data
      this.commentlist = this.commentlist.map(v => {
        if (v.user.head_img) {
          v.user.head_img = localStorage.getItem('heima_baseURL') + v.user.head_img
        } else {
          v.user.head_img = './avatar.jpg'
        }
        return v
      })
      // 自动刷新到页面顶部
      window.scrollTo(0, 0)
    }
  },
  async mounted () {
    // 获取评论列表
    this.init()
    // 获取文章详情
    var res2 = await post(this.id)
    console.log(res2)
    this.post = res2.data.data
  }
}
</script>

<style lang='less' scoped>
  .item {
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
</style>
