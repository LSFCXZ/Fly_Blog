<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree layui-inline"
      lay-filter="user">
      <li class="layui-nav-item"
        v-for="(item,index) in lists"
        :key="'center'+index">
        <router-link :to="{name: item.link}"
          :active-class="item.activeClass">
          <i class="layui-icon"
            :class="item.icon"></i>{{item.name}}
        </router-link>
      </li>

    </ul>

    <!-- <div class="site-tree-mobile layui-hide">
        <i class="layui-icon"></i>
      </div>
      <div class="site-mobile-shade"></div>

      <div class="site-tree-mobile layui-hide">
        <i class="layui-icon"></i>
      </div>
      <div class="site-mobile-shade"></div> -->

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'layui-icon-home',
          link: 'user'
        },
        {
          name: '用户中心',
          icon: 'layui-icon-friends',
          link: 'center'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set',
          link: 'info',
          activeClass: 'layui-this'
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-form',
          link: 'mypost',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'layui-icon-reply-fill',
          link: 'msg'
        },
        {
          name: '其他设置',
          icon: 'layui-icon-component',
          link: 'others'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
// .layui-nav {
//   background-color: #180e05 !important;
// }
</style>
