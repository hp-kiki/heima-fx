
// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'

// 引入路由所映射的组件
import Login from '@/views/login.vue'
import Index from '@/views/index.vue'
import Register from '@/views/register.vue'
import Mycenter from '@/views/mycenter.vue'
import Editprofile from '@/views/EditProfile.vue'
Vue.use(VueRouter)

// 创建路由对象
var router = new VueRouter({
  routes: [
    // 登入页
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    // 首页
    {
      name: 'Index',
      path: '/index',
      component: Index
    },
    // 注册
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    // 个人中心
    {
      name: 'Mycenter',
      path: '/mycenter/:id',
      component: Mycenter
    },
    // 编辑个人中心的资料
    {
      name: 'Editprofile',
      path: '/editprofile/:id',
      component: Editprofile
    }

  ]
})

// 暴露对象
export default router
