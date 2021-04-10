import { getCode } from '@/api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import uuid from 'uuid/dist/v4'
export default {
  name: 'Add',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      code: '',
      svg: ''
    }
  },
  mounted () {
    // 这里的sid对应redis的key，存放在stort
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getcode()
  },
  methods: {
    // 获取验证码方法
    _getcode () {
      const sid = this.$store.state.sid
      // 这里使用了getCode方法
      getCode(sid).then((res) => {
        if (res.code === 200) { this.svg = res.data }
      })
    }
  }
}
