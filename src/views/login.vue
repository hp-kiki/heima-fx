<template>
  <div class="app">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 用户名 -->
    <myinput placeholder="用户名/手机号码" v-model="userxinxi.username" :ruels="/^1\d{10}$/" cuowutisi="用户名/手机号格式错误"></myinput>
    <!-- 密码 -->
    <myinput placeholder="请输入密码" v-model="userxinxi.password" type="password"></myinput>
    <!-- 注册 -->
     <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
    <!-- 登入按钮 -->
    <mybotton class="mybutton" text="登录" @click="login"></mybotton>

  </div>
</template>

<script>
import myinput from '../components/myinput.vue'
import mybotton from '../components/mybotton.vue'
import { login } from '../apis/user.js'
export default {
  components: {
    myinput, mybotton
  },
  data () {
    return {
      userxinxi: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 点击登录按钮触发
    async login () {
      // console.log(this.userxinxi)
      // 点击登录后需要先验证输入框是否为空，为空就提示，在发请求验证账号密码是否正确
      var res = await login(this.userxinxi)
      // console.log(res)
      if (res.data.message === '登录成功') {
        // 将token存在本地
        localStorage.setItem('fx-heimatoken', res.data.data.token)
        localStorage.setItem('fx-heimaid', res.data.data.user.id)
        this.$router.push({ name: 'Index' })
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  }
}
</script>

<style lang='less'>
.app {
  padding: 0 10px;
  .close {
    padding: 20px 0;
    span.iconfont.iconicon-test {
      font-size: 26px;
    }
  }

  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
    span.iconfont.iconnew {
      font-size: 140px;
      color: #d81e06;
    }
  }
  .tips {
  text-align: right;
  margin-bottom: 20px;
  margin-top: 30px;

  a {
    color: #3385ff;
  }
}
  .mybutton{
      margin-top:50px;
  }
}
</style>
