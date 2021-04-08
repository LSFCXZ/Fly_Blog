<template>
  <div id="app">
    <lsf-header></lsf-header>
    <router-view />
    <lsf-footer></lsf-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    'lsf-header': Header,
    'lsf-footer': Footer
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
