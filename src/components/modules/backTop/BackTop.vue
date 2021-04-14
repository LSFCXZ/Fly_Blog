<template>
  <div class="page-component__scroll">
    <el-backtop target=".page-component__scroll "><i class="el-icon-caret-top"></i></el-backtop>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style lang="scss" scoped>
.page-component__scroll {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
}
</style>
