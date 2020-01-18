<template>
  <div>首页
    <div @click="gocenter">去个人中心</div>
  </div>
</template>

<script>
export default {
  methods: {
    // 去个人中心页面
    gocenter () {
      var id = localStorage.getItem('fx-heimaid')
      this.$router.push(`/mycenter/${id}`)
    }
  }
}
</script>

<style>

</style>
