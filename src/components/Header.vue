<template >
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo"
        href="/">
        <img src="../assets/images/logo.png"
          alt="Blog">
      </a>
      <!-- <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item ">
          <a href="/"><i class="iconfont icon-wangpan"></i>网盘</a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html"><i class="iconfont icon-shop"></i>商店</a>
        </li>
        <li class="layui-nav-item">
          <a href="/"
            target="_blank"><i class="iconfont icon-ui"></i>框架</a>
        </li>
      </ul> -->

      <ul class="layui-nav fly-nav-user">

        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <router-link :to="{name:'login'}">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name : 'reg'}">注册</router-link>
          </li>
        </template>

        <!-- <li class="layui-nav-item layui-hide-xs">
          <a
            href=""
            onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
            title="QQ登入"
            class="iconfont icon-qq"
          ></a>
        </li>
        <li class="layui-nav-item layui-hide-xs">
          <a
            href=""
            onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
            title="微博登入"
            class="iconfont icon-weibo"
          ></a>
        </li> -->

        <!-- 登入后的状态 -->
        <template v-else>
          <li class="layui-nav-item"
            @mouseenter="show()"
            @mouseleave="hide()">
            <a class="fly-nav-avatar"
              href="javascript:;">
              <cite class="layui-hide-xs">{{userInfo.name}}</cite>
              <i class="iconfont icon-renzheng layui-hide-xs"
                title="认证信息：超级管理员"></i>
              <i class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip !== '0'">VIP{{userInfo.isVip}}</i>
              <img :src="userInfo.pic">
            </a>
            <dl class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{'layui-show':isHover}">
              <dd>
                <router-link :to="{name:'info'}"><i class="layui-icon">&#xe620;</i>基本设置</router-link>
              </dd>
              <dd>
                <router-link :to="{name:'msg'}"><i class="iconfont icon-tongzhi"
                    style="top: 4px;"></i>我的消息</router-link>
              </dd>
              <dd>
                <router-link :to="{name:'center'}"><i class="layui-icon"
                    style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>用户中心</router-link>
              </dd>
              <hr style="margin: 5px 0;">
              <dd><a href="javascript:void(0)"
                  style="text-align: center;"
                  @click="logout()">退出</a></dd>
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
  data () {
    return {
      isHover: false,
      hoverCtrl: {}
    }
  },
  methods: {
    show () {
      clearTimeout(this.hoverCtrl)
      // 鼠标移入显示
      this.isHover = true
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    hide () {
      clearTimeout(this.hoverCtrl)
      // 鼠标移出隐藏
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 500)
    },
    logout () {
      this.$confirm('确定退出吗', () => {
        localStorage.clear()
        this.$store.commit('setToken', '')
        this.$store.commit('setUserInfo', '')
        this.$store.commit('setIsLogin', false)
        this.$router.push({ name: 'index' }, () => {})
      }, () => {})
    }
  },
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

  },
  mounted () {
    console.log(this.isShow)
  }
}
</script>

<style lang="scss" scoped>
.layui-bg-black {
  background-color: #180e05 !important;
}
</style>
