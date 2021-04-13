<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item,index) in items"
        :key="'listitem' + index">
        <a href=""
          class="fly-avatar">
          <img :src="item.uid.pic"
            alt="header">
        </a>
        <h2>
          <a class="layui-badge">{{item.catalog}}</a>
          <router-link :to="{name: 'detail', params: {tid: item._id}}">{{item.title}}</router-link>
        </h2>
        <div class="fly-list-info">
          <a href=""
            link>
            <cite> {{item.uid.name}}</cite>

            <!-- <i
              class="iconfont icon-renzheng"
              title="认证信息：XXX"
            ></i> -->
            <i class="layui-badge fly-badge-vip"
              v-if="item.uid.isVip !== '0'">{{'VIP'+item.uid.isVip}}</i>

          </a>
          <span>{{item.created | moment}}</span>

          <span class="fly-list-kiss layui-hide-xs"
            title="悬赏飞吻"><i class="iconfont icon-kiss"></i> {{item.fav}}</span>
          <span class="layui-badge fly-badge-accept layui-hide-xs"
            v-show="item.isEnd !== '0'">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1"
              title="回答"></i> {{item.answer}}
          </span>
        </div>
        <div class="fly-list-badge"
          v-show="item.tags.length > 0">
          <span class="layui-badge "
            v-for="(tag,index) in item.tags"
            :key="'tag'+index"
            :class="tag.class">{{tag.name}}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center"
      v-show="isShow ">
      <div class="laypage-main"
        v-if="!isEnd">
        <a @click.prevent="more()"
          class="laypage-next">更多求解</a>
      </div>
      <div class="nomore gray"
        v-else>
        没有更多了
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'ListItem',
  // 接受父组件的变量
  props: {
    // 文章列表信息
    lists: {
      default: () => {},
      type: Array
    },
    // 是否显示
    isShow: {
      default: true,
      type: Boolean
    },
    // 是否结尾
    isEnd: {
      default: false,
      type: Boolean
    }
  },
  // 监听父组件传过来的lists
  computed: {
    items () {
      _.map(this.lists, (item) => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'disuss':
            item.catalog = '讨论'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'logs':
            item.catalog = '动态'
            break
        }
      })
      return this.lists
    }
  },
  methods: {
    // 点击下一页事件
    more () {
      this.$emit('nextPage')
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
