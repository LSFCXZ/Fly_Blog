<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <!-- <lsf-top></lsf-top>
        <lsf-list></lsf-list> -->
        list
      </div>
      <div class="layui-col-md4">
        <lsf-tips></lsf-tips>
        <lsf-sign></lsf-sign>
        <lsf-hotlist></lsf-hotlist>
        <lsf-ads></lsf-ads>
        <lsf-links></lsf-links>
      </div>
    </div>
  </div>
</template>

<script>
import Tips from '../../components/sidebar/Tips'
import Sign from '../../components/sidebar/Sign'
import HotList from '../../components/sidebar/HotList'
import Ads from '../../components/sidebar/Ads'
import Links from '../../components/sidebar/Links'
// import List from '../../components/contents/List'
// import Top from '../../components/contents/Top'
export default {
  name: 'Index',
  components: {
    'lsf-tips': Tips,
    'lsf-sign': Sign,
    'lsf-hotlist': HotList,
    'lsf-ads': Ads,
    'lsf-links': Links
    // 'lsf-list': List,
    // 'lsf-top': Top
  }
}
</script>

<style lang="scss" scoped>
</style>
