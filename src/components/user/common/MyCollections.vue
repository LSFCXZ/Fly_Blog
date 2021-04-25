<template>
  <div>
    <table class="layui-table">
      <thead>
        <tr>
          <th class="title">
            <div class="layui-table-cell pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-right pr0">
              <span>收藏时间</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" :key="'mycollect' + index">
          <td class="title">
            <router-link class="link" :to="{name: 'detail', params: {tid: item.tid._id}}">{{item.tid.title}}</router-link>
          </td>
          <td class="text-right">{{item.created | moment}}</td>
        </tr>
      </tbody>
    </table>
    <!-- <imooc-page
      v-show="total > 0"
      :total="total"
      :current="current"
      :align="'left'"
      :hasTotal="true"
      :hasSelect="true"
      @changeCurrent="handleChange"
    ></imooc-page> -->
     <el-pagination
     v-show="list.length > 0 && total > 0"
      @next-click="next"
      @prev-click="prev"
      @current-change="ChangeCurrent"
      :page-size="limit"
      :current-page="page+1"
      background
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getCollect } from '../../../api/user'
export default {
  name: 'MyCollections',
  data () {
    return {
      list: [],
      total: 0,
      current: 0,
      page: 0,
      limit: 10
    }
  },
  mounted () {
    console.log('此处应该加载收藏')
    this.getCollectList()
  },
  methods: {
    getCollectList () {
      getCollect({
        page: this.current,
        limit: this.limit
      }).then((res) => {
        if (res.code === 200) {
          this.list = res.data
          console.log(res.data)
          this.total = res.total
        }
      })
    },
    handleChange (val) {
      this.current = val
      this.getCollectList()
    },
    next () {
      this.page++
    },
    prev () {
      this.page--
    },
    ChangeCurrent (val) {
      this.page = val - 1
      this._getPostList()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 70%;
}
</style>
