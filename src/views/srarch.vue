<template>
  <div class="s">
      <div class="sousuo">
          <van-icon name="arrow-left" class="ico" @click="$router.back()"/>
          <div>
              <van-icon name="search" class="fanda"/>
              <input type="text" placeholder="请输入搜索内容" class="search" autofocus v-model="conent">
          </div>
          <span @click="searchnews">搜索</span>
      </div>
      <div class="historyList">
        <h2>历史记录</h2>
        <p v-for="(value,index) in bendishuju" :key="index">{{value}}</p>
      </div>
      <div class="hotList">
        <h2>热门搜索</h2>
        <p v-for="(value,index) in tjnews" :key="index">{{value.title}}</p>
      </div>
      <div class="resultList">
        <h2>搜索结果</h2>
        <p v-for="(value,index) in searchjieguo" :key="index">{{value.title}}</p>
      </div>
  </div>
</template>

<script>
import { postsearchrecommend, postsearch } from '../apis/news'
export default {
  data () {
    return {
      // 搜索内容
      conent: '',
      // 搜索推荐的内容
      tjnews: [],
      // 点击搜索后的搜索结果
      searchjieguo: [],
      bendishuju: []
    }
  },
  watch: {
    async conent () {
      // 获取搜索推荐
      let res = await postsearchrecommend({ keyword: this.conent })
      // console.log(res)
      this.tjnews = res.data.data
    }
  },
  mounted () {
    var arr = this.huobendi()
    this.bendishuju = arr
  },

  methods: {
    // 封装获取本地数据
    huobendi () {
      var bendi = localStorage.getItem('serach') || '[]' // 获取
      return JSON.parse(bendi) // 转换成一个真正的数组，之前是字符串数组
    },
    // 点击搜索文章
    async searchnews () {
      var arr = this.huobendi()

      if (arr.length === 10) {
        arr.splice(-1, 1)
      }

      // 如果有一样的搜索内容，就去重
      if (arr.indexOf(this.conent) !== -1) {
        arr.splice(arr.indexOf(this.conent), 1)
      }
      // 将数组内容添加到数组的最前面
      arr.unshift(this.conent)

      this.bendishuju = arr

      localStorage.setItem('serach', JSON.stringify(arr))

      let res = await postsearch({ keyword: this.conent })
      console.log(res)
      this.searchjieguo = res.data.data
    }
  }

}
</script>

<style lang="less" scoped>

.s{
    padding: 0 10px;
     .sousuo{
       display: flex;
       justify-content: space-between;
       height: 60px;
       margin: auto;
      align-items: center;
      border-bottom: 1px solid #ccc;
      div{
          flex: 1;
          position: relative;
           align-items: center;

            .search{
            width: 100%;
           border:1px solid #ccc;
           border-radius: 15px;
           height: 30px;
           text-indent: 40px;
          }
          .fanda{
               font-size: 18px;
                position: absolute;
                left: 15px;
                top: 8px;
          }
      }

       .ico{
           width: 40px;
           margin-left: 20px;
       }
       span{
           width: 50px;
           margin-left: 10px;
       }
   }
   .historyList{
        padding: 20px 10px;
        border-bottom: 1px solid #ccc;
        > h2 {
            line-height: 36px;
            font-weight: bold;
        }
        > p {
            line-height: 26px;
        }
    }
    .hotList,.resultList{
        padding: 20px 10px;
        border-bottom: 1px solid #ccc;
        > h2 {
            line-height: 36px;
            font-weight: bold;
        }
        > p {
            line-height: 26px;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
    }
}

</style>
