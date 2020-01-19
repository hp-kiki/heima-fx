<template>
<div class="myheader">
  <div class="mtheader">

     <span class="iconfont iconjiantou2" @click="$router.back()"></span>
    <span class="title">{{title}}</span>
    </div>
    </div>

</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='less' scoped>
.myheader{
    border-bottom: 1px solid #ddd;
    width: 100%;
     .mtheader{
        padding: 0 20px;
    height:50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    width: 55%;
    border-bottom: 1px solid #ddd;
.title{

    }
 }
}

</style>
