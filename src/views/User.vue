<template>
  <div>
    <div class="fly-home fly-panel"
      style="background-image: url();">
      <img :src="userInfo.pic ? userInfo.pic : '/img/bear-200-200.jpg'" />
      <!-- <i class="iconfont icon-renzheng" title="Imooc社区认证"></i> -->
      <h1>
        {{userInfo.name}}
        <i class="iconfont icon-nan"></i>
        <!-- <i class="iconfont icon-nv"></i>  -->
        <i class="layui-badge fly-badge-vip">{{userInfo.isVip === '0' ? '非VIP': 'VIP' + userInfo.isVip}}</i>
        <!--
    <span style="color:#c00;">（管理员）</span>
    <span style="color:#5FB878;">（社区之光）</span>
    <span>（该号已被封）</span>
        -->
      </h1>

      <!-- <p style="padding: 10px 0; color: #5FB878;">认证信息：layui 作者</p> -->

      <p class="fly-home-info">
        <i class="iconfont icon-kiss"
          title="飞吻"></i>
        <span style="color: #FF7200;">{{userInfo.favs}} 积分</span>
        <i class="iconfont icon-shijian"></i>
        <span>{{userInfo.created | moment}} 加入</span>
        <i class="iconfont icon-chengshi"></i>
        <span>{{userInfo.location}}</span>
      </p>

      <p class="fly-home-sign">{{userInfo.regmark}}</p>

      <div class="fly-sns"
        data-user>
        <a href="javascript:;"
          class="layui-btn layui-btn-primary fly-imActive"
          data-type="addFriend">加为好友</a>
        <a href="javascript:;"
          class="layui-btn layui-btn-normal fly-imActive"
          data-type="chat">发起会话</a>
      </div>
    </div>

  </div>
</template>

<script>
import { getInfo } from '@/api/user'
export default {
  name: 'User',
  props: ['uid'],
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
    // 获取用户的基本信息
      getInfo({ uid: this.uid || 123 }).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
