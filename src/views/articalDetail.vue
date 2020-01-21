<template>
  <div>
    <div class="articaldetail">
      <div class="header">
        <div class="left">
          <van-icon name="arrow-left back" @click="$router.back()" />
          <span class="iconfont iconnew new"></span>
        </div>
        <span :class="{guangzhu:details.has_follow}" @click="gzuser">{{gz}}</span>
      </div>
      <div class="detail">
        <div class="title">{{details.title}}</div>
        <div class="desc">
          <span>{{details.user?details.user.nickname:''}}</span> &nbsp;&nbsp;
          <span>2019-11-23</span>
        </div>
        <div class="content" v-html="details.content" v-if="details.type===1"></div>
         <div class="video" v-if="details.type===2">
           <video :src="details.content" controls></video>
         </div>
        <div class="opt">
          <span class="like" :class="{dianzan:details.has_like}" @click="like">
            <van-icon name="good-job-o" />{{details.like_length}}
          </span>
          <span class="chat">
            <van-icon name="chat" class="w" />微信
          </span>
        </div>
      </div>

      <!-- 精彩跟帖 -->
     <div class="keeps">
        <h2>精彩跟帖</h2>
     <div class="item" v-for="(value,index) in commentlist" :key="index">
          <div class="head">
            <img :src="value.user?value.user.head_img:''" alt />
            <div>
              <p>{{value.user?value.user.nickname:''}}</p>
              <span>2小时前</span>
            </div>
            <span>回复</span>
          </div>
          <div class="text">{{value.content}}</div>
        </div>
        <div class="more">更多跟帖</div>
      </div>
      <!-- 评论 -->
      <comment :postxinxi="details" @Postacomment="init();++details.comment_length"></comment>

    </div>
  </div>
</template>

<script>
import { post, postcomment, postlike } from '../apis/news'
import { userfollows, userunfollow } from '../apis/user'
import comment from '../components/comment'
export default {
  components: {
    comment
  },
  data () {
    return {
      // 文章id
      id: '',
      // 文章详情
      details: {},
      // 评论列表
      commentlist: [],
      // 关注
      gz: ''
    }
  },
  methods: {
    // 点赞
    async like () {
      if (!this.details.has_like) {
        var res = await postlike(this.id)
        // console.log(res)
        if (res.data.message === '点赞成功') {
          this.details.has_like = true
          ++this.details.like_length
        }
      } else {
        this.details.has_like = false
        --this.details.like_length
      }
    },
    // 点击关注用户
    async gzuser () {
      if (this.details.has_follow) {
        // 取消关注
        var res2 = await userunfollow(this.details.user.id)
        // console.log(res2)
        if (res2.data.message === '取消关注成功') {
          this.details.has_follow = !this.details.has_follow
          this.gz = '关注'
          this.$toast.success(res2.data.message)
        }
      } else {
        var res = await userfollows(this.details.user.id)
        // console.log(res)
        if (res.data.message === '关注成功') {
          this.details.has_follow = !this.details.has_follow
          this.gz = '已关注'
          this.$toast.success(res.data.message)
        }
      }
    },
    // 封装获取评论数据
    async init () {
      // 获取评论列表
      let res2 = await postcomment(this.id)
      // console.log(res2)
      this.commentlist = res2.data.data
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
    // console.log(this.commentlist)
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    // 获取文章详情数据
    let res = await post(this.id)
    // console.log(res)
    this.details = res.data.data
    if (this.details.has_follow) {
      this.gz = '已关注'
    } else {
      this.gz = '关注'
    }
    // 获取评论列表
    this.init()
  }

}
</script>

<style lang='less' scoped>
//视频
.video{
      width: 100%;
      > video{
        width: 100%;
      }
    }
//点赞按钮样式
.dianzan{
    color: red;
}

//关注按钮样式
.guangzhu {
  background: red;
  color: #fff;
}
// 图片样式
/deep/.photo {
  img {
    display: block !important ;
    width: 100% !important ;
    text-align: center !important ;
  }
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
//   border-bottom: 1px solid #ccc;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: rgb(235, 235, 235);

  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 7px 15px;
    border: 1px solid #ccc;
    color: #000;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    flex: 0.13;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0px 15px;
  padding-bottom: 40px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
