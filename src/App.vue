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
</style>
