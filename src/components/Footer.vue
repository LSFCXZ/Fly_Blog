<template>
  <div class="fly-footer">
    <p><a href="javascript:void()"
        target="_blank">Lay社区</a> 2021 &copy; <a href="javascript:void(0)"
        target="_blank">blog.frontblog.top 出品</a></p>
    <p>
      <a href="javascript:void(0)"
        target="_blank">付费计划</a>
      <a href="javascript:void(0)"
        target="_blank">获取Lay社区模版</a>
      <a href="javascript:void(0)"
        @mouseover="show()"
        @mouseout="hide()"
        style="position:relative;">
        微信公众号
        <img class="qr"
          v-if="isShow"
          src="../assets/images/qr.jpg"
          alt />
      </a>
    </p>

  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    hide () {
      setTimeout(() => {
        this.isShow = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.qr {
  width: 120px;
  height: 120px;
  position: absolute;
  left: 0;
  top: -130px;
}
</style>
