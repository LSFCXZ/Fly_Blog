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
      <div class="page">
        <!-- <el-pagination background
          layout="prev, pager, next"
          :total="total"
          @next-click="more">
        </el-pagination> -->
        <el-pagination @next-click="next"
          @prev-click="prev"
          @current-change="ChangeCurrent"
          :page-size="limit"
          :current-page="page"
          background
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </div>

  </div>

</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
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
    total: {
      default: 0,
      type: Number
    },
    limit: {
      default: 0,
      type: Number
    },
    page: {
      default: 0,
      type: Number
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
    next () {
      this.$emit('nextPage')
    },
    prev () {
      this.$emit('prevPage')
    },
    ChangeCurrent (val) {
      this.$emit('ChangeCurrent', val)
    }
  },
  // 时间过滤器
  filters: {
    moment (date) {
      // 超过 7天的显示格式
      if (moment(date).isBefore(moment().subtract(7, 'days'))) {
        return moment(date).format('YYYY-MM-DD')
      } else {
        // 7天内显示，XX小时前
        return moment(date).from(moment())
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gray {
  color: #999;
}
.nomore {
  font-size: 16px;
  padding: 30px 0;
}
.page {
  padding: 20px;
}
</style>
