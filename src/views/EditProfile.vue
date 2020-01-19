<template>
  <div>
    <!-- /头部 -->
    <myheader title="编辑资料"></myheader>
    <!-- 头像 -->
    <div class="inf">
      <div class="userimg">
        <img :src="userobj.head_img" alt />
        <van-uploader :after-read="afterRead" :before-read="beforeRead" />
      </div>

      <!-- cell -->
      <!-- 昵称 -->
      <mycell cellleft="昵称" :cellright="userobj.nickname" @click="nameshow=true"></mycell>
      <van-dialog
        v-model="nameshow"
        title="修改昵称"
        :closeOnClickOverlay="true"
        show-cancel-button
        @confirm="confirm"
      >
        <van-cell-group>
          <van-field placeholder="请输入昵称" label="昵称" required clearable v-model="value" />
        </van-cell-group>
      </van-dialog>

      <mycell cellleft="密码" cellright="******" @click="mimashow=true"></mycell>
      <van-dialog
        v-model="mimashow"
        title="修改密码"
        :closeOnClickOverlay="true"
        show-cancel-button
        @confirm="mimaconfirm"
        :beforeClose="beforeClose"
        @cancel="cancel"
      >
        <van-cell-group>
          <van-field v-model="ypassword" type="password" label="原密码" placeholder="请输入原密码" required />
          <van-field v-model="xpassword" type="password" label="新密码" placeholder="请输入新密码" required />
        </van-cell-group>
      </van-dialog>

      <mycell cellleft="性别" :cellright="userobj.gender=='0'?'女':'男'" @click="xingbieshow=true"></mycell>

      <van-dialog
        v-model="xingbieshow"
        title="修改性别"
        :closeOnClickOverlay="true"
        show-cancel-button
        @confirm="genderconfirm"
      >
        <van-cell-group>
          <van-picker :columns="['女','男']" :default-index="userobj.gender" @change="onChange" />
        </van-cell-group>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import myheader from '../components/myheader'
import { editprofilesuer, mycenter } from '../apis/user'
import { upload } from '../apis/upload'
import mycell from '../components/mycell'
export default {
  data () {
    return {
      userobj: {},
      id: '',
      // 是否显示弹窗
      nameshow: false,
      mimashow: false,
      xingbieshow: false,
      // 修改用户资料输入的值
      value: '',
      // 原密码
      ypassword: '',
      // 新密码
      xpassword: '',
      // 性别索引值
      genderindex: ''
    }
  },
  components: {
    myheader,
    mycell
  },

  methods: {
    // 性别修改
    onChange (picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
      this.genderindex = index
    },
    // 点击确认性别修改
    async genderconfirm () {
      var res = await editprofilesuer(this.id, {
        gender: this.genderindex
      })
      console.log(res)
      if (res.data.message === '修改成功') {
        this.userobj.gender = res.data.data.gender
        this.$toast.success(res.data.message)
      } else {
        this.$toast.fail(res.data.message)
      }
    },
    // 点击确认密码时触发
    // 密码框关闭前的处理
    beforeClose (action, done) {
      if (action === 'confirm' && this.userobj.password !== this.ypassword) {
        done(false)
        this.$toast.fail('原密码错误')
      } else {
        done()
      }
    },
    async mimaconfirm () {
      // 验证输入的原密码是否正确
      if (this.userobj.password === this.ypassword) {
        var res = await editprofilesuer(this.id, {
          password: this.xpassword
        })
        // console.log(res)
        if (res.data.message === '修改成功') {
          this.$toast.success(res.data.message)
          this.ypassword = ''
          this.xpassword = ''
        } else {
          this.$toast.fail(res.data.message)
        }
      }
    },
    // 取消密码触发
    cancel () {
      this.ypassword = ''
      this.xpassword = ''
    },
    // 点击确认按钮昵称修改资料
    async confirm () {
      var res = await editprofilesuer(this.id, {
        nickname: this.value
      })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.userobj.nickname = res.data.data.nickname
        this.$toast.success(res.data.message)
      } else {
        this.$toast.fail(res.data.message)
      }
    },

    // 上传头像
    // 上传前校验返回布尔值
    beforeRead (file) {
      if (file.type !== 'image/jpeg') {
        this.$toast.fail('请上传 jpg 格式图片')
        return false
      }

      return true
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      var fromdata = new FormData()
      fromdata.append('file', file.file)
      var res = await upload(fromdata)
      // console.log(res)
      if (res.data.message === '文件上传成功') {
        var baseURL = localStorage.getItem('heima_baseURL')
        this.userobj.head_img = baseURL + res.data.data.url
        // 将已经更换的图片存到服务器
        var res2 = await editprofilesuer(this.id, {
          head_img: res.data.data.url
        })
        // console.log(res2)
        if (res2.data.message === '修改成功') {
          this.$toast.success(res2.data.message)
        } else {
          this.$toast.success(res2.data.message)
        }
      }
    }
  },

  async mounted () {
    this.id = this.$route.params.id
    var res = await mycenter(this.id)
    console.log(res)
    this.userobj = res.data.data
    // 处理图片
    if (this.userobj.head_img) {
      var baseURL = localStorage.getItem('heima_baseURL')
      this.userobj.head_img = baseURL + this.userobj.head_img
    } else {
      this.userxinxi.head_img = './avatar.jpg'
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 60 / 360 * 100vw;
  height: 60 / 360 * 100vw;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.userimg {
  text-align: center;
  padding: 70px 0;
  position: relative;
}
.van-uploader {
  width: 70px;
  height: 70px;
  position: relative;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
