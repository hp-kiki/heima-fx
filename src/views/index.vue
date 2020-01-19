<template>
  <div>
    <!-- 头部 -->
    <div class="headr">
      <div class="iconfont iconnew logo"></div>
      <div class="seaer" @click="$router.push('/srarch')">
        <van-icon name="search" class="seaer-icon" />
        <span>搜索新闻</span>
      </div>
      <van-icon name="contact" class="icon" @click="gocenter" />
    </div>

    <!-- 滚动导航 -->
    <van-tabs sticky swipeable v-model="active">
      <van-tab v-for="value in categorylist" :title="value.name" :key="value.id">
        <!-- 上拉 -->
        <van-list
          v-model="value.loading"
          :finished="value.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 下拉 -->
          <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
            <articlelists v-for="(v,i) in value.isnews" :post="v" :key="i"></articlelists>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { category } from '../apis/category'
import articlelists from '../components/articlelists'
import { Articlelist } from '../apis/news'
export default {
  components: {
    articlelists
  },
  data () {
    return {
      // 栏目列表
      categorylist: [],
      // 当前栏目的索引
      active: localStorage.getItem('fx-heimaid') ? 1 : 0
    }
  },
  async mounted () {
    // 获取栏目列表
    var res = await category()
    // console.log(res)
    this.categorylist = res.data.data
    // 给栏目列表添加一些属性
    this.categorylist = this.categorylist.map(v => {
      return {
        ...v,
        isnews: [], // 储存文章列表
        loading: false,
        finished: false,
        isLoading: false,
        pageIndex: 1,
        pageSize: 5
      }
    })
    // console.log(this.categorylist)
    this.info()
  },
  // 监听active的变化
  watch: {
    active () {
      // 当active变化时，就请求当前active下的文章列表，如果是已经有数据了就不要在重新请求，
      if (this.categorylist[this.active].isnews.length === 0) {
        this.info()
      }
    }
  },
  methods: {

    // 上拉加载触发onLoad
    onLoad () {
      // console.log(this.categorylist[this.active].pageIndex)
      this.categorylist[this.active].pageIndex++
      this.info()
    },
    // 下拉触发事件
    onRefresh () {
      // console.log('下拉')
      this.categorylist[this.active].pageIndex = 1
      this.categorylist[this.active].isnews = []
      this.info(() => {
        setInterval(() => {
          this.categorylist[this.active].isLoading = false
          this.categorylist[this.active].finished = false
        }, 2000)
      })
    },
    // 封装获取文章列表的方法
    async info (callback) {
      var news = await Articlelist({
        pageIndex: this.categorylist[this.active].pageIndex,
        pageSize: this.categorylist[this.active].pageSize,
        category: this.categorylist[this.active].id
      })

      if (callback) {
        callback()
      }
      this.categorylist[this.active].isnews.push(...news.data.data)
      // 设置本次上拉加载完毕
      this.categorylist[this.active].loading = false
      // 设置如果当前栏目的文章数据全部加载完毕
      if (news.data.data < this.categorylist[this.active].pageSize) {
        this.categorylist[this.active].finished = true
      }
      // console.log(this.categorylist)
    },

    // 跳转到个人中心页面
    gocenter () {
      var id = localStorage.getItem('fx-heimaid')
      this.$router.push(`/mycenter/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.headr {
  height: 50/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f00;
  .logo {
    width: 50/360 * 100vw;
    height: 50/360 * 100vw;
    color: #fff;
    font-size: 70/360 * 100vw;
    line-height: 50/360 * 100vw;
    padding: 0 20/360 * 100vw;
  }
  .icon {
    font-size: 25/360 * 100vw;
    color: #fff;
    padding: 0 20/360 * 100vw;
  }
  .seaer {
    flex: 1;
    height: 36/360 * 100vw;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 18/360 * 100vw;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16/360 * 100vw;
    .seaer-icon {
      margin-right: 10/360 * 100vw;
    }
  }
}
</style>
