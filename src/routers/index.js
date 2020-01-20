
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
import Srarch from '@/views/srarch.vue'
import ArticalDetail from '@/views/articalDetail.vue'
import Goodcomment from '../views/goodcomments.vue'
Vue.use(VueRouter)

// 创建路由对象
var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
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
    },
    // 搜索页面
    {
      name: 'Srarch',
      path: '/srarch',
      component: Srarch
    },
    // 文章详情
    {
      name: 'ArticalDetail',
      path: '/articalDetail/:id',
      component: ArticalDetail
    },
    // 精彩评论
    {
      name: 'Goodcomment',
      path: '/goodcomment/:id',
      component: Goodcomment
    }

  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(next())
  if (to.path.indexOf('/mycenter/') === 0) {
    // 获取token
    var token = localStorage.getItem('fx-heimatoken')
    if (token) { // 如果有token就让他继续下面的操作，没有token，就去登入
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

// 暴露对象
export default router
