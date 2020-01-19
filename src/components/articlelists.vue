<template>
  <div
    class="article"
    v-if="post.type===1 && post.cover.length<=2"
    @click="$router.push(`/articalDetail/${post.id}`)"
  >
    <div class="letf">
      <div class="title">{{post.title}}</div>
      <p class="p_desc">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
    <div class="right">
      <img
        :src="post.cover[0].url.indexOf('http')!==-1? post.cover[0].url:'http://127.0.0.1:3000'+post.cover[0].url"
        alt
      />
      <!-- <img :src="post.cover[0].url" alt /> -->
    </div>
  </div>

  <div
    class="article_video"
    v-else-if="post.type===2"
    @click="$router.push(`/articalDetail/${post.id}`)"
  >
    <div class="title">{{post.title}}</div>
    <div class="img">
      <img
        :src="post.cover[0].url.indexOf('http')!==-1? post.cover[0].url:'http://127.0.0.1:3000'+post.cover[0].url"
        alt
      />
      <i class="iconfont iconshipin"></i>
    </div>
    <p class="p_video">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>

  <div
    class="article_video"
    v-else-if="post.type===1&&post.cover.length>= 3"
    @click="$router.push(`/articalDetail/${post.id}`)"
  >
    <div class="title3">{{post.title}}</div>
    <div class="imgs">
      <!-- <img
        :src="post.cover[0].url.indexOf('http')!==-1? post.cover[0].url:'http://127.0.0.1:3000'+post.cover[0].url"
        alt
      /> -->
       <img :src="post.cover[index].url.indexOf('http')!==-1? post.cover[index].url:'http://127.0.0.1:3000'+post.cover[index].url" alt  v-for='(value,index) in post.cover' :key='index'/>
    </div>
    <p class="p_video">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="less" scoped>
.title_style {
  font-size: 10/360 * 100vw;
  color: #333;
  line-height: 22/360 * 100vw;
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.p_desc {
  font-size: 8/360 * 100vw;
  color: #999;
  margin-top: 35/360 * 100vw;
  > span:last-child {
    margin-left: 20/360 * 100vw;
  }
}
.article {
  padding: 10/360 * 100vw;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      .title_style();
    }
  }
  .right {
    width: 120/360 * 100vw;
    > img {
      width: 120/360 * 100vw;
      height: 65/360 * 100vw;
      display: block;
      object-fit: cover;
    }
  }
}
.article_video {
  padding: 10/360 * 100vw;
  border-bottom: 1px solid #ccc;
  //   .title {
  //     .title_style();
  //   }
  > .img {
    width: 100%;
    margin: 10px 0;
    position: relative;
    > img {
      width: 100%;
      display: block;
    }
    > .iconshipin {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 50/360 * 100vw;
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 50%;
      color: #fff;
      box-shadow: 0px 0px 10px #fff;
    }
  }
  > .imgs {
    width: 100%;
    display: flex;
    > img {
      width: 32.33%;
    }
    img:nth-child(2) {
      margin: 0 5px;
    }
  }
}
.p_video {
  font-size: 8/360 * 100vw;
  color: #999;
  margin-top: 10/360 * 100vw;
  > span:last-child {
    margin-left: 20/360 * 100vw;
  }
}

.title3 {
  margin-bottom: 10/360 * 100vw;
}
// .article_video{
//     .title{
//         font-size:
//     }
// }
</style>
