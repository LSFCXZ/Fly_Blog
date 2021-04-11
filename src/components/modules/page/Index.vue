<template>
  <div class="d-flex"
    :class="{'flex-center': align==='center', 'flex-start': align === 'left', 'flex-end': align === 'right'}">
    <div class="layui-box layui-laypage layui-laypage-default">
      <!-- 首页 -->
      <a @click.prevent="home()"
        v-show="showEnd"
        :class="{'layui-disabled' :current === 0}">
        <i class="layui-icon layui-icon-prev"
          v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>
      <!-- 上一页 -->
      <a :class="{'layui-disabled' :current === 0}"
        @click.prevent="prev()">
        <!-- 判断使用icon还是文字 -->
        <i class="layui-icon layui-icon-left"
          v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>
      <a v-if="page.length>5&&current+1-2>1"
        href="javascript:;"
        class="layui-disabled">...</a>
      <!-- 页数 -->
      <template v-for="(item,index) in page">
        <a v-if="item>=(current+1-2) && item <=(current+1+2)"
          @click="changeIndex(index)"
          :key="'page'+index"
          :class="[current === index ?  theme :'',current === index ?  'active' :'']">{{item}}</a>
      </template>
      <a v-if="page.length>5&&current+1+2<page.length"
        href="javascript:;"
        class="layui-disabled">...</a>
      <!-- 下一页 -->
      <a @click.prevent="next()"
        href="javascript:;"
        :class="{'layui-disabled' :current === page.length-1}">
        <i class="layui-icon layui-icon-right"
          v-if="showType === 'icon'"></i>
        <template v-else>下一页</template>
      </a>
      <!-- 尾页 -->
      <a @click.prevent="end()"
        v-show="showEnd"
        :class="{'layui-disabled' :current === page.length-1}"
        class="layui-laypage-next">
        <!-- 判断使用icon还是文字 -->
        <i class="layui-icon layui-icon-next"
          v-if="showType === 'icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="total"
      v-if="hasTotal">到第<input type="text"
        class="lsf-input">页 共 total 页</div>
    <div v-if="hasSelect">
      <div class="layui-unselect layui-form-select"
        :class="{'layui-form-selected': isSelect_fav}"
        @click="changeFav()">
        <div class="layui-select-title">
          <input type="text"
            placeholder="请选择"
            readonly
            v-model="options[optIndex]"
            class="layui-input layui-unselect" />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd v-for="(item,index) in options"
            :key="'catalog' + index"
            @click="chooseFav(item, index)"
            :class="{'layui-this': index === optIndex}">{{item}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Index',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      default: 'text'
    },
    showEnd: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    // 有多少条评论
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    },
    // 每一页显示十条数据
    size: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      isSelect_fav: false,
      options: [10, 20, 30, 50, 100],
      optIndex: 0,
      page: [],
      limit: 10
    }
  },
  // 解决后台返回过来的评论数据，后台返回过来的时候，前端 已经渲染完成
  watch: {
    total (newval, oldva) {
      this.initPages()
    }
  },
  mounted () {
    // 初始化分页长度
    this.initPages()
    // 设置select的内容
    this.limit = this.size
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  },

  methods: {
    // 初始化分页长度
    initPages () {
      const len = Math.ceil(this.total / this.limit)
      // len = 5 =》[1,2,3,4,5]
      this.page = _.range(1, len + 1)// 使用lodash的range方法形成数组
    },
    chooseFav (item, index) {
      if (this.optIndex !== index) {
        // 当页面上的limit发生变化之后，调整current数值
        this.$emit('changeCurrent', Math.floor(this.limit * this.current / this.options[index]))
        this.$emit('changeLimit', this.options[index])
        this.$emit('changeLimit', this.options[index])
      }
      this.optIndex = index
      this.limit = this.options[this.optIndex]
      this.initPages()
    },
    changeFav () {
      this.isSelect_fav = !this.isSelect_fav
    },
    // 点击首页事件
    home () {
      if (this.current > 0) {
        console.log(this.current)
        this.$emit('changeCurrent', 0)
      }
    },
    // 点击尾页事件
    end () {
      if (this.page.length - 1 > this.current) { this.$emit('changeCurrent', this.page.length - 1) }
    },
    // 点击上一页事件
    prev () {
      let cur = 0
      if (this.current - 1 < 0) {
        cur = 0
      } else {
        cur = this.current - 1
        this.$emit('changeCurrent', cur)
      }
    },
    // 点击下一页事件
    next () {
      let cur = 0
      if (this.current + 1 >= this.page.length) {
        cur = this.page.length - 1
        // this.$emit('changeCurrent', cur)
      } else {
        cur = this.current + 1
        this.$emit('changeCurrent', cur)
      }
    },
    // 点击页数
    changeIndex (val) {
      if (val !== this.current) {
        this.$emit('changeCurrent', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-laypage {
  a {
    margin-left: -1px !important;
    // &:first-child {
    //   border-right: 0;
    // }
    // &:last-child {
    //   border-left: 0;
    // }
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
  .layui-bg-green {
    border-color: #009688;
  }
}
.lsf-input {
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
  width: 30px;
}
.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -2px;
}
.layui-input {
  height: 30px;
  line-height: 30px;
}
.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
