<template>
  <div id="app">
    <lsf-header></lsf-header>
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    'lsf-header': Header
  }
}
</script>
<style lang="scss">
@import "assets/css/global.css";
</style>
