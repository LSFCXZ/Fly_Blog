<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user"
      pad20>
      <div class="layui-tab layui-tab-brief"
        lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link to="/login">登录</router-link>
          </li>
          <li class="layui-this">
            重置密码
          </li>
        </ul>
        <div class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0;">
          <validation-observer ref="observer"
            v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form>
                  <div class="layui-form-item">
                    <ValidationProvider name="password"
                      rules="required|min:6|max:16|confirmed:confirmation"
                      v-slot="{ errors }">
                      <div class="layui-row">
                        <label for="L_phone"
                          class="layui-form-label">新密码</label>
                        <div class="layui-input-inline">
                          <input type="password"
                            id="L_phone"
                            placeholder="请输入密码"
                            name="phone"
                            v-model="password"
                            class="layui-input" />
                        </div>
                        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <ValidationProvider v-slot="{ errors }"
                      vid="confirmation">
                      <div class="layui-row">
                        <label for="L_imagecode1"
                          class="layui-form-label">确认密码</label>
                        <div class="layui-input-inline">
                          <input type="password"
                            name="repassword"
                            v-model="repassword"
                            placeholder="请确认密码"
                            class="layui-input" />
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <validation-provider name="code"
                      ref="codefield"
                      rules="required|length:4"
                      v-slot="{errors}">
                      <div class="layui-row">
                        <label for="L_vercode"
                          class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input type="text"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input" />
                        </div>
                        <span style="color: #c00;"
                          v-html="svg"
                          class="svg"
                          @click="_getcode()"></span>
                      </div>

                      <div>
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn"
                      type="button"
                      @click="validate().then(submit)">提交</button>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reset } from '@/api/login'
import { getParam } from '@/utils/common'
import Code from '../mixin/code'
export default {
  name: 'reset',
  mixins: [Code],
  data () {
    return {
      key: '',
      password: '',
      repassword: ''
    }
  },
  mounted () {
    this.key = getParam('key')// 取Url的key值
    // console.log(this.key)
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT!!
        return
      }
      reset({
        key: this.key,
        password: this.password,
        sid: this.$store.state.sid,
        code: this.code
      }).then((res) => {
        if (res.code === 200) {
          this.$alert('密码修改成功！')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this._getcode()
          if (res.code === 401) {
            this.$refs.codefield.setErrors(res.msg.code)
          } else {
            this.$alert(res.msg)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
