<template>
  <div class="page-component__scroll">
    <el-backtop target=".page-component__scroll"
      @click="test"><i class="el-icon-caret-top"></i></el-backtop>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  methods: {
    test (e) {
      console.log('event' + e)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-component__scroll {
  position: absolute;
  top: 60px;
  bottom: 0px;
  left: 0;
  right: 0;
  overflow-x: hidden;
}
</style>
