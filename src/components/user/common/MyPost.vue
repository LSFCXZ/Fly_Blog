<template>
  <div>
    <table class="layui-table"
      cellspacing="0"
      cellpadding="0"
      border="0">
      <thead>
        <tr class="text-center">
          <th>
            <div class="layui-table-cell text-left pl0"><span>帖子标题</span></div>
          </th>
          <th>
            <div class="layui-table-cell text-center"><span>状态</span></div>
          </th>
          <th>
            <div class="layui-table-cell text-center"><span>结帖</span></div>
          </th>
          <th>
            <div class="layui-table-cell text-center"><span>发表时间</span></div>
          </th>
          <th>
            <div class="layui-table-cell text-center"><span>数据</span></div>
          </th>
          <th>
            <div class="layui-table-cell text-center"><span>操作</span></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="text-left">标题</td>
          <td>打开</td>
          <td>未结</td>
          <td>2021-02-14</td>
          <td>10阅读</td>
          <td>
            <div class="layui-btn layui-btn-xs">编辑</div>
            <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyPost'
}
</script>

<style lang="scss" scoped>
</style>
