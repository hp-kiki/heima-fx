<template>
  <div class="mycell" @click="cellzi">
      <span class="cellleft">{{cellleft}}</span>
      <div class="cellright">
          <span class="right">{{cellright}}</span>
           <span class="iconfont iconjiantou1"></span>
      </div>

  </div>
</template>

<script>
export default {
  props: ['cellleft', 'cellright'],
  methods: {
    // 告知子组件有人点击
    cellzi () {
      this.$emit('click')
    }
  }
}
</script>

<style lang='less' scoped>
    .mycell{
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ddd;
        padding: 0 15px;
      .cellleft{}
      .cellright{
          color: #a9a9a9;
          font-size: 14px;
          .right{

          }
      }
    }
</style>
