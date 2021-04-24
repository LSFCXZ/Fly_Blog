<template>
<div>
  <div class="overflow">
    <table class="layui-table" cellspacing="0" cellpadding="0" border="0">
      <thead>
        <tr class="text-center">
          <th>
            <div class="layui-table-cell text-left pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-center"><span>状态</span></div>
          </th>
          <th>
            <div class="layui-table-cell text-center"><span>结帖</span></div>
          </th>
          <th>
            <div class="layui-table-cell text-center">
              <span>发表时间</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-center"><span>数据</span></div>
          </th>
          <th class="min-cell">
            <div class="layui-table-cell text-center"><span>操作</span></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center"  v-for="(item , index) in lists" :key="'mypost'+index">
         <td class="text-left">
              <router-link
                class="link"
                :to="{name: 'detail', params: {tid: item._id}}"
              >{{item.title}}</router-link>
            </td>
          <td>{{item.status === '0' ?'打开':'关闭'}}</td>
          <td>{{item.isEnd === '0' ?'打开':'关闭'}}</td>
          <td>{{item.created | moment}}</td>
          <td>{{item.reads}}阅/{{item.answer}}答</td>
          <td>
           <div
                class="layui-btn layui-btn-xs"
                :class="{'layui-btn-disabled': item.isEnd === '1'}"
                @click="editPost(item)"
              >编辑</div>
            <div class="layui-btn layui-btn-xs layui-btn-danger" @click="deletePost(item)">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
      <el-pagination
     v-show="lists.length > 0 && total > 0"
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
import { getPostListByUid, deletePostByUid } from '@/api/user'
export default {
  name: 'MyPost',
  data () {
    return {
      lists: [],
      page: 0, // 第几页
      limit: 10,
      total: 0
    }
  },
  mounted () {
    this._getPostList()
  },
  methods: {
    _getPostList () {
      getPostListByUid({ page: this.page, limit: this.limit }).then(res => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
        console.log(res)
      })
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
    },
    // 删除
    deletePost (item) {
      this.$confirm('确定删除吗?', () => {
        if (item.isEnd !== '0') {
          this.$pop('shake', '帖子已结贴，无法删除！')
          return
        }
        deletePostByUid({
          tid: item._id
        }).then((res) => {
          if (res.code === 200) {
            this.$pop('', '删除成功！')
            this.lists.splice(this.lists.indexOf(item), 1)
          } else {
            this.$pop('shake', res.msg)
          }
        })
      }, () => {

      })
    },
    // 编辑帖子
    editPost (item) {
      if (item.isEnd === '1') {
        this.$pop('shake', '帖子已经结贴，无法编辑')
      } else {
        this.$router.push({
          name: 'edit',
          params: { tid: item._id, page: item }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overflow {
  overflow: auto;
}
.min-cell {
  min-width: 80px;
}
</style>
