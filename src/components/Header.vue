<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo"
        href="/">
        <img src="../assets/images/logo.png"
          alt="lay">
      </a>
      <ul class="layui-nav fly-nav-user">

        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <!-- <li class="layui-nav-item">
            <a class="iconfont icon-touxiang layui-hide-xs"
              href="../user/login.html"></a>
          </li> -->
          <li class="layui-nav-item">
            <router-link :to="{name:'login'}">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name:'reg'}">注册</router-link>
          </li>
        </template>
        <!-- 登入后的状态 -->
        <template v-else>
          <li class="layui-nav-item">
            <a class="fly-nav-avatar"
              href="javascript:;">
              <cite class="layui-hide-xs">贤心</cite>
              <i class="iconfont icon-renzheng layui-hide-xs"
                title="认证信息：layui 作者"></i>
              <i class="layui-badge fly-badge-vip layui-hide-xs">VIP3</i>
              <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg">
            </a>
            <dl class="layui-nav-child">
              <dd><a href="user/set.html"><i class="layui-icon">&#xe620;</i>基本设置</a></dd>
              <dd><a href="user/message.html"><i class="iconfont icon-tongzhi"
                    style="top: 4px;"></i>我的消息</a></dd>
              <dd><a href="user/home.html"><i class="layui-icon"
                    style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</a></dd>
              <hr style="margin: 5px 0;">
              <dd><a href="/user/logout/"
                  style="text-align: center;">退出</a></dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  //   mounted () {
  // console.log(is);
  //   },
  computed: {
    isShow () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo || {
        name: '',
        pic: '',
        isVip: 0
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.layui-bg-black {
  background-color: #180e05 !important;
}
</style>
