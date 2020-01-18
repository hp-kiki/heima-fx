<template>
  <div class="mybutton" @click="onclick">
     {{text}}
  </div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    // 发射事件告诉子组件有人点击我
    onclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
  .mybutton{
      height: 40px;
      line-height:40px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      background: #cc3300;
      border-radius: 20px;
  }

</style>
