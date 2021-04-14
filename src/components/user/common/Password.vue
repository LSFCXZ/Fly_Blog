<template>

  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <form>
      <validation-observer ref="observer"
        v-slot="{ validate }">
        <div class="layui-form-item">
          <label for="L_nowpass"
            class="layui-form-label">当前密码</label>
          <validation-provider name="oldpassword"
            rules="required|min:6|max:16"
            v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="password"
                id="L_nowpass"
                name="nowpass"
                v-model="oldassword"
                autocomplete="off"
                class="layui-input">
            </div>
            <div class="layui-form-mid">
              <span style="color: #c00">{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label for="L_pass"
            class="layui-form-label">新密码</label>
          <validation-provider name="password"
            rules="required|min:6|max:16|confirmed:confirmation"
            v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="password"
                id="L_pass"
                name="pass"
                v-model="password"
                autocomplete="off"
                class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">6到16个字符</div>
            <div class="layui-form-mid">
              <span style="color: #c00">{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label for="L_repass"
            class="layui-form-label">确认密码</label>
          <validation-provider v-slot="{ errors }"
            vid="confirmation">
            <div class="layui-input-inline">
              <input type="password"
                id="L_repass"
                name="repass"
                v-model="repassword"
                autocomplete="off"
                class="layui-input">
            </div>
            <div class="layui-form-mid">
              <span style="color: #c00">{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <button class="layui-btn"
            type="button"
            @click="validate().then(submit)">确认修改</button>
        </div>
      </validation-observer>
    </form>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { changePassword } from '../../../api/user'
export default {
  name: 'Password',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      oldassword: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.oldassword === this.password) {
        this.$alert('新旧密码不能相同')
        return
      }
      changePassword({
        oldpwd: this.oldassword,
        newpwd: this.password
      }).then((res) => {
        if (res.code === 200) {
          this.$alert('密码修改成功，请重新登录')
          this.oldassword = ''
          this.password = ''
          this.repassword = ''
          // 清除缓存，跳转到登录页面
          localStorage.clear()
          this.$store.commit('setToken', '')
          this.$store.commit('setUserInfo', '')
          this.$store.commit('setIsLogin', false)
          // 因为值为空后会再次检验，这里是清除错误提示
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else if (res.code === 500) {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
