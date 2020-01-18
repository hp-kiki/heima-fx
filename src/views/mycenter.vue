<template>
  <div class="personal">
    <div class="header">
        <van-icon name="arrow-left back" @click="$router.back()"/>
    </div>
    <router-link to="/">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="userxinxi.head_img?userxinxi.head_img:'./avatar.jpg'"/>
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan" v-if="userxinxi.gender=='1'"></span>
            <span class="iconfont iconxingbienv" v-else></span>
            {{userxinxi.nickname}}
          </div>
          <div class="time">{{userxinxi.time |filtertime() }}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <mycell cellleft="我的关注" cellright="关注的用户"></mycell>
    <mycell cellleft="我的跟帖" cellright="跟帖/回复"></mycell>
    <mycell cellleft="我的收藏" cellright="文章/视频"></mycell>
    <mycell cellleft="设置" ></mycell>
    <div class="out" @click="outcheck">退出登录</div>
  </div>
</template>

<script>
import mycell from '../components/mycell'
import { mycenter } from '../apis/user'
import { filtertime } from '../uilts/filtters'
export default {
  data () {
    return {
      userxinxi: {}
    }
  },
  components: {
    mycell
  },
  filters: {
    filtertime
  },
  async  mounted () {
    var id = this.$route.params.id
    // 获取用户的信息
    var res = await mycenter(id)
    // console.log(res)
    this.userxinxi = res.data.data
    // 添加事件
    this.userxinxi.time = new Date()
  },
  methods: {
    // 点击退出登录触发
    outcheck () {
      localStorage.removeItem('fx-heimaid')
      localStorage.removeItem('fx-heimatoken')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang='less' scoped>
.out{
  width: 80%;
  height: 50px;
  background: red;
  font-size: 20px;
  color: #fff;
  line-height: 50px;
  border: none;
  border-radius: 20px;
  text-align: center;
  margin: 0 auto;
  margin-top: 30px;
}
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
