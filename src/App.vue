<template>

  <div id="app">
    <back-top>
      <lsf-header></lsf-header>

      <router-view />

      <lsf-footer></lsf-footer>
    </back-top>
  </div>

</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import BackTop from './components/modules/backTop/BackTop.vue'
export default {
  name: 'App',
  components: {
    'lsf-header': Header,
    'lsf-footer': Footer,
    BackTop
  }

}
</script>
<style lang="scss">
@import "assets/css/global.css";
@import "assets/css/layui-layer/layer.css";
.svg {
  position: relative;
  // top: -4px;
  svg {
    position: relative;
    top: -12px;
    height: 50px;
  }
}
.gray {
  color: #999;
}
@for $i from 0 to 5 {
  .pd#{$i} {
    padding: $i * 10 + px !important;
  }
  .pl#{$i} {
    padding: $i * 10 + px !important;
  }
  .pr#{$i} {
    padding: $i * 10 + px !important;
  }
  .pb#{$i} {
    padding-bottom: $i * 10 + px !important;
  }
  .mr#{$i} {
    margin-right: $i * 10 + px !important;
  }
  .mt#{$i} {
    margin-top: $i * 10 + px !important;
  }
  .ml#{$i} {
    margin-left: $i * 10 + px !important;
  }
}
//关闭图标
.pull-right {
  float: right !important;
}
//签到的过渡逻辑
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}
.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}
.himg {
  height: 50%;
  width: 50%;
}
</style>
