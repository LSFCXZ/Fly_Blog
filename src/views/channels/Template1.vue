<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <!-- <lsf-list></lsf-list> -->
        lists
      </div>
      <div class="layui-col-md4">
        <lsf-hotlist></lsf-hotlist>
        <lsf-ads></lsf-ads>
        <lsf-links></lsf-links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '../../components/sidebar/HotList'
import Ads from '../../components/sidebar/Ads'
import Links from '../../components/sidebar/Links'
// import List from '../../components/contents/List'
export default {
  name: 'Template1',
  components: {
    'lsf-hotlist': HotList,
    'lsf-ads': Ads,
    'lsf-links': Links
    // 'lsf-list': List
  }
}
</script>

<style lang="scss" scoped>
</style>
