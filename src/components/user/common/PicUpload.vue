<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="pic"
          class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
          <input type="file"
            id="pic"
            name="file"
            accept="image/png,image/jpg,image/gif"
            @change="upload">
        </label>
        <img :src="pic">
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '../../../api/content.js'
import config from '../../../config/index'
import { updateUserInfo } from '../../../api/user.js'
export default {
  name: 'PicUpload',
  data () {
    return {
      pic: this.$store.state.userInfo && this.$store.state.userInfo.pic
        ? this.$store.state.userInfo.pic
        : '/img/header.jpg',
      formData: ''
    }
  },
  methods: {
    upload (e) {
      // console.log(e)
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // 上传图片逻辑，抽离出来，后面发帖也需要用到
      uploadImg(this.formData).then((res) => {
        if (res.code === 200) {
          const baseUrl = process.env.NODE_ENV === 'development'
            ? config.baseUrl.dev : config.baseUrl.pro
          this.pic = baseUrl + res.data
          // 更新用户资料
          updateUserInfo({ pic: this.pic }).then((res) => {
            if (res.code === 200) {
              const user = this.$store.state.userInfo
              user.pic = this.pic
              this.$store.commit('setUserInfo', user)
              this.$alert('图片上传成功')
            }
          })
          // 把上传头像的值为空，否则用户再次点击上传头像就监听不到
          document.getElementById('pic').value = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#pic {
  display: none;
}
</style>
