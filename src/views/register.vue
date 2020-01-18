<template>
  <div class="app">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
   <myinput
        placeholder="请输入手机号..."
        v-model="loginxx.username"
        :ruels="/^1\d{10}$/"
        cuowutisi="手机号码输入不正确">
        </myinput>
         <myinput
        placeholder="请输入昵称..."
        v-model="loginxx.nickname"
         :ruels='/^\w+$/'
        cuowutisi="昵称不能为空">
        </myinput>
         <myinput
        placeholder="请输入密码..."
        type='password'
        v-model="loginxx.password"
          :ruels='/^\w{3,16}$/'
        cuowutisi="请输入3-16位的密码" >
        </myinput>
    <!-- 注册 -->
     <p class="tips">
        有账号？
        <a href="#/login" class>去登录</a>
      </p>
    <!-- 登入按钮 -->
    <mybotton class="mybutton" text="注册" @click="register"></mybotton>

  </div>
</template>

<script>
import myinput from '../components/myinput.vue'
import mybotton from '../components/mybotton.vue'
import { register } from '../apis/user.js'
export default {
  data () {
    return {
      loginxx: {
        username: '',
        nickname: '',
        password: ''
      }
    }
  },
  components: {
    myinput, mybotton
  },
  methods: {
    async register () {
    //   console.log(this.loginxx)
      if (this.loginxx.username && this.loginxx.nickname && this.loginxx.password) {
        let res = await register(this.loginxx)
        // console.log(res)
        if (res.data.message === '注册成功') {
          this.$toast.success(res.data.message)
          this.$router.push({ name: 'Login' })
        } else {
          this.$toast.success(res.data.message)
        }
      } else {
        this.$toast.fail('请填写完所有项，不能为空哦')
      }
    }
  }
}
</script>

<style lang='less' >

</style>
