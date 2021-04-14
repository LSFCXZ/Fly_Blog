<template>
  <div>
    <table class="layui-table"
      cellspacing="0"
      cellpadding="0"
      border="0">
      <thead>
        <tr>
          <th class="title">
            <div class="layui-table-cell pl0">帖子标题</div>
          </th>
          <th>
            <div class="layui-table-cell text-rigth pr0">收藏时间</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>收藏的帖子123</td>
          <td class="text-rigth">2020-02-02</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyCollections'
}
</script>

<style lang="scss" scoped>
.title {
  width: 70%;
}
</style>
