<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user"
      pad20>
      <div class="layui-tab layui-tab-brief"
        lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name:'login'}">登入</router-link>
          </li>

          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form>
                <div class="layui-form-item">
                  <label for="L_email"
                    class="layui-form-label">用户名</label>
                  <div class="layui-input-inline">
                    <input type="text"
                      id="L_email"
                      name="username"
                      placeholder="请输入用户名"
                      v-model="username"
                      autocomplete="off"
                      class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                </div>
                <div class="layui-form-item">
                  <label for="L_username"
                    class="layui-form-label">昵称</label>
                  <div class="layui-input-inline">
                    <input type="text"
                      id="L_username"
                      v-model="name"
                      placeholder="请输入昵称"
                      name="name"
                      autocomplete="off"
                      class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass"
                    class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <input type="password"
                      id="L_pass"
                      name="password"
                      v-model="password"
                      placeholder="请输入密码"
                      autocomplete="off"
                      class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                </div>
                <div class="layui-form-item">
                  <label for="L_repass"
                    class="layui-form-label">确认密码</label>
                  <div class="layui-input-inline">
                    <input type="password"
                      id="L_repass"
                      name="repassword"
                      placeholder="请确认密码"
                      v-model="repassword"
                      autocomplete="off"
                      class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="vercode"
                    class="layui-form-label">邮箱验证码</label>
                  <div class="layui-input-inline">
                    <input type="text"
                      id="vercode"
                      name="vercode"
                      v-model="vercode"
                      placeholder="请输入邮箱验证码"
                      autocomplete="off"
                      class="layui-input">
                  </div>
                  <button class="layui-btn"
                    @click="postCode(username)"
                    :class="{'lay-disabled' :OnClick}">{{OnClickMsg}}</button>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode"
                    class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <input type="text"
                      id="L_vercode"
                      name="vercode"
                      placeholder="请回答后面的问题"
                      autocomplete="off"
                      class="layui-input">
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;"
                      v-html="svg"
                      class="svg"
                      @click="_getcode()"></span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn">立即注册</button>
                </div>
                <!-- <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
                  <a href=""
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"></a>
                  <a href=""
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"></a>
                </div> -->
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Code from '@/mixin/code'
export default {
  name: 'Reg',
  mixins: [Code],
  data () {
    return {
      OnClickMsg: '获取验证码',
      OnClick: false, // 是否可以点击获取验证码
      time: 60,
      username: '',
      name: '',
      password: '',
      repassword: '',
      vercode: ''
    }
  },
  methods: {
    postCode () {
      this.OnClick = true
      this.countdown()
    },
    // 60s倒计时
    countdown () {
      const _this = this
      if (_this.time === 0) {
        _this.OnClickMsg = '获取验证码'
        _this.time = 60
        _this.OnClick = false
        return
      }
      setTimeout(function () {
        _this.countdown()
      }, 1000)
      _this.time--
      _this.OnClickMsg = _this.time + 's重新获取'
    }
  }
}
</script>

<style lang="scss" scoped>
.lay-disabled {
  background-color: #999 !important;
  pointer-events: none;
  cursor: default;
}
</style>
