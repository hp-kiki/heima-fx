<template>
    <div class="sour">
        <mycomment v-if="data.parent" :data="data.parent" @commentelemlist="sendComment(data.parent)"></mycomment>
       <p>
        <span>{{data.user.nickname}} &nbsp;&nbsp;2小时前</span>
        <span @click="sendComment(data)">回复</span>
      </p>
      <div>{{data.content}} </div>
  </div>
</template>

<script>
export default {
  name: 'mycomment',
  props: ['data'],
  methods: {
    sendComment (data) {
      // 发射事件给父组件，父组件在告知comment这子组件
      this.$emit('commentelemlist', data)
    }
  }
}
</script>

<style lang='less' scoped>
.sour {
  border: 1px solid #ddd;
  padding: 5px;
  color: #999;
  line-height: 25px;
  > p {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  > div {
    font-size: 13px;
  }
}
</style>
