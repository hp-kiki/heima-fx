<template>
  <div class="myinput">
    <input class="input"
    :value="value"
    :placeholder="placeholder"
    :type="type"
    @blur="Onblur"
    @input="Monitor"
    />
  </div>
</template>

<script>
export default {
  props: ['value', 'placeholder', 'type', 'ruels', 'cuowutisi'],
  methods: {
    // 失去焦点时验证输入框是否输入正确
    Onblur (e) {
      // 验证是否有传验证规则过来
      if (this.ruels) {
        // 如果验证失败
        if (!this.ruels.test(e.target.value)) {
          this.$toast.fail(this.cuowutisi)
        }
      }
    },
    // 监听用户在输入框输入内容
    Monitor (e) {
      var v = e.target.value
      this.$emit('input', v)
    }
  }
}
</script>

<style lang='less' scoped>
.myinput {
  border-bottom: 1px solid #757575;

  .input {
    background: none;
    border: none;
    font-size: 16px;
    height: 60px;
    color: #999b99;
    text-indent: 15px;
    outline: none;
    width: 100%;
  }
}
</style>
