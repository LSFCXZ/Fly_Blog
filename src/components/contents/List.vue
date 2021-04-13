<template>
  <div class="fly-panel"
    style="margin-bottom: 0;">

    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this': status ===''&& tag ==='' }"
        @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this' :status ==='0'}"
        @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this' :status ==='1'}"
        @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this' :status ===''&& tag ==='精华'}"
        @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this' :sort ==='created' }"
          @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this' :sort ==='answer' }"
          @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <lsf-listitem :lists="lists"
      @nextPage="nextPage()"></lsf-listitem>
  </div>
</template>

<script>
import LisetItem from './ListItem.vue'
import { getList } from '@/api/content'
export default {
  name: 'List',
  components: { 'lsf-listitem': LisetItem },
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
  methods: {
    // 获取文章列表
    _getLists () {
      const options = {
        catlog: this.catlog,
        isTop: 0,
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
    },
    // 点击不同按钮改变状态量
    search (val) {
      // 判断，不去重复触发事件
      if (typeof val === 'undefined' && this.current === '') return
      // this.current = val
      switch (val) {
        // 未结贴
        case 0:
          this.status = '0'
          this.tag = ''
          break
          // 已结贴
        case 1:
          this.status = '1'
          this.tag = ''
          break
          // 精华贴
        case 2:
          this.status = ''
          this.tag = '精华'
          break
          // 最新
        case 3:
          this.sort = 'created'
          break
          // 热度
        case 4:
          this.sort = 'answer'
          break
          // 综合
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
          console.log('点击')
      }
    }
  },
  mounted () {
    this._getLists()
  }
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
</style>
