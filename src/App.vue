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
</style>
