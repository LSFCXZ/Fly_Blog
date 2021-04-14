<template>
  <div class="fly-panel"
    v-show="lists.length>0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #FF5722;">去签到</a>
    </div>
    <lsf-listitem :lists="lists"
      :isShow="false"></lsf-listitem>
  </div>
</template>

<script>
import Listitem from './ListItem'
import { getList } from '@/api/content'
export default {
  name: 'Top',
  data () {
    return {
      status: '',
      tag: '', // 精华标签
      sort: 'created', // 按最新，按热议
      page: 0, //
      limit: 10, // 一页显示10条
      lists: []// 文章详情
    }
  },
  components: {
    'lsf-listitem': Listitem
  },
  methods: {
    // 获取文章列表
    _getLists () {
      const options = {
        catlog: this.catlog,
        isTop: 1,
        page: this.page,
        limit: this.limit,
        tag: this.tag,
        status: this.status
      }
      getList(options).then(res => {
        this.lists = res.data
        console.log(res)
      })
    },
    nextPage () {
      this.page++
      this._getLists()
    }
  },
  mounted () {
    this._getLists()
  }
}
</script>

<style lang="scss" scoped>
</style>
