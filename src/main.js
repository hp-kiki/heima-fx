import Vue from 'vue'
import App from './App.vue'
import store from './store'
// 引入路由
import router from './routers/index.js'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
