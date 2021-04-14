<template>
  <div class="fly-panel fly-column ">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link tag="li"
          to="/"
          class="layui-hide-xs"><a href="/">首页</a></router-link>
        <router-link v-for="(item,index) in lists"
          :key='"panel"+index'
          tag="li"
          :to="item.path"><a href="">{{item.name}}</a></router-link>
        <!-- 用户登入后显示 -->
        <template v-if="isLogin">
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <router-link :to="{name:'mypost'}">我发表的贴</router-link>
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <router-link :to="{name:'mycollections'}">我收藏的贴</router-link>
          </li>
        </template>
      </ul>

      <div class="fly-column-right layui-hide-xs">
        <!-- <span class="fly-search"><i class="layui-icon"></i></span> -->
        <!-- <a
          href="jie/add.html"
          class="layui-btn"
        >发表新帖</a> -->
        <router-link :to="{name:'add'}"
          class="layui-btn">发表新帖</router-link>
      </div>
      <div class="layui-hide-sm layui-show-xs-block"
        style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
        <router-link :to="{name:'add'}"
          class="layui-btn">发表新帖</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  data () {
    return {
      lists: [
        {
          name: '提问',
          path: '/index/ask'
        },
        {
          name: '分享',
          path: '/index/share'
        },
        {
          name: '讨论',
          path: '/index/discuss'
        },
        {
          name: '建议',
          path: '/index/advise'
        },
        {
          name: '公告',
          path: '/index/notice'
        },
        {
          name: '动态',
          path: '/index/logs'
        }
      ],
      keyword: '',
      isLogin: this.$store.state.isLogin
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped >
</style>
