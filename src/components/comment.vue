<template>
  <div class="mycomment">
    <div class="comment" v-show="!isFocus">
      <div class="comment-left" @click="showinputcomment">
        <span>写跟帖</span>
      </div>
      <div class="comment-right">
        <span class="pinglunicon">
          <i class="iconfont iconpinglun-"></i>
          <!-- <em>10</em> -->
          <div class="sl" @click="$router.push(`/goodcomment/${postxinxi.id}`)"><span>{{postxinxi.comment_length}}</span></div>
        </span>
        <span class="iconfont iconshoucang shoucang"></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>

    <div class="inputcomment" v-show="isFocus">
      <textarea autofocus rows="3" ref="comment_nr"></textarea>
      <div>
        <span @click="fabucomment">发送</span>
        <span @click="cancelcomment">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { fabucomment } from '../apis/news'
export default {
  props: ['postxinxi'],
  data () {
    return {
      isFocus: false
    }
  },
  methods: {
    // 点击发送发布评论
    async fabucomment () {
      let res = await fabucomment(this.postxinxi.id, { content: this.$refs.comment_nr.value })
      // console.log(res)
      if (res.data.message === '评论发布成功') {
        this.$emit('Postacomment')
        this.$toast.success(res.data.message)
        this.$refs.comment_nr.value = ''
        this.isFocus = false
      } else {
        this.$toast.success(res.data.message)
      }
    },
    // 点击写跟帖弹出输入框
    showinputcomment () {
      this.isFocus = true
    },
    // 取消评论，回到初始状态
    cancelcomment () {
      this.isFocus = false
    }
  }
}
</script>

<style lang='less' scoped>
.mycomment {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.comment {
  display: flex;
  background: #f3f3f3;
  height: 45px;
  line-height: 45px;
  align-items: center;
  .comment-left {
    width: 60%;
    background: #e2e2e2;
    height: 30px;
    line-height: 30px;
    color: #757598;
    border-radius: 15px;
    margin: 0 10px;
    span {
      font-size: 14px;
      margin-left: 20px;
    }
  }

  .comment-right {
    display: flex;
    justify-content: space-between;
    margin: 0 20px 0 10px;
    flex: 1;
    .pinglunicon {
         position: relative;

     > i {
        font-size: 20px;
      }
      >.sl {
    position: absolute;
    right: -8px;
    top: 0px;
    background-color: #f00;
    border-radius: 5px;
    padding: 3px 5px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        font-size: 11px;
        color: #fff;
    }
      }
    }
    span {
      font-size: 20px;
    }
    span.iconfont.iconpinglun- {
    }

    span.iconfont.iconshoucang.shoucang {
    }

    span.iconfont.iconfenxiang {
    }
  }
}

.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #e2e2e2;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: rgb(241, 241, 241);
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
</style>
