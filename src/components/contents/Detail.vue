<template>
  <div class="layui-container"
    :class="{'d-hide':isHide}">
    <lsf-panel></lsf-panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{page.title}}</h1>

          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'logs'">动态</span>
            <span class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'share'">分享</span>
            <span class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'ask'">提问</span>
            <span class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'advise'">建议</span>
            <span class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'discuss'">讨论</span>
            <span class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'notice'">公告</span>
            <span class="layui-badge"
              style="background-color: #999;"
              v-if="page.isEnd === '0'">未结</span>
            <span class="layui-badge"
              style="background-color: #5FB878;"
              v-else>已结</span>
            <span class="layui-badge layui-bg-black"
              v-show="page.isTop === '1'">置顶</span>
            <span class="layui-badge"
              :class="tag.class"
              v-for="(tag,index) in page.tags"
              :key="'tags' + index">{{tag.name}}</span>
            <!-- 删除，置顶，加精是网站管理员的权限  -->
            <!-- <div class="fly-admin-box"
              data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin"
                type="del">删除</span>
              <span class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="stick"
                rank="1">置顶</span>
              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span>
              <span class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="status"
                rank="1">加精</span>
              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span>
            </div> -->
            <span class="fly-list-nums">
              <a href="#comment"><i class="iconfont"
                  title="回答">&#xe60c;</i> {{page.answer}}</a>
              <i class="iconfont"
                title="人气">&#xe60b;</i> {{page.reads}}
            </span>
          </div>
          <div class="detail-about">
            <a class="fly-avatar"
              link>
              <img :src="page.user?page.user.pic: '/img/header.jpg'"
                alt="LSF">
            </a>
            <div class="fly-detail-user">
              <a class="fly-link">
                <cite>{{page.user? page.user.name: 'Brian'}}</cite>
                <!-- <i class="iconfont icon-renzheng"
                  title="认证信息："></i> -->
                <i class="layui-badge fly-badge-vip mr1"
                  v-if="page.user && page.user.isVip !== '0'? page.user.isVip : false">VIP{{page.user.isVip}}</i>
              </a>
              <span>{{page.created | moment}}</span>
            </div>
            <div class="detail-hits"
              id="LAY_jieAdmin"
              data-id="123">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{page.fav}}</span>

            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt1">
            <router-link class="layui-btn layui-btn-sm jie-admin"
              :to="{name: 'edit', params: {tid: tid , page: page}}"
              v-show="page.isEnd === '0' && page.user._id === user._id">编辑</router-link>
            <a class="layui-btn layui-btn-sm jie-admin-collect"
              :class="{'layui-btn-primary': page.isFav}"
              @click.prevent="setCollect()">{{page.isFav ? '取消收藏': '收藏'}}</a>
          </div>
          <div class="detail-body photos"
            v-html="content">
            这是内容部分
          </div>
        </div>
        <!-- 这是回帖部分 -->
        <div class="fly-panel detail-box"
          id="flyReply"
          v-loading="loading"
          element-loading-text="拼命加载中">
          <fieldset class="layui-elem-field layui-field-title"
            style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda"
            id="jieda">
            <li class="jieda-daan"
              v-for="(item,index) in comments"
              :key="'commments' + index">
              <a></a>
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar"
                  href="">
                  <img :src="item.cuid ? item.cuid.pic : '/img/header.jpg'"
                    alt=" ">
                </a>
                <div class="fly-detail-user">
                  <a href=""
                    class="fly-link">
                    <cite>{{item.cuid? item.cuid.name :'LSF'}}</cite>
                    <!-- <i class="iconfont icon-renzheng"
                      title="认证信息：XXX"></i> -->
                    <i v-if="item.cuid && item.cuid.isVip !=='0'?item.cuid.isVip : false "
                      class="layui-badge fly-badge-vip">VIP{{item.cuid.isVip}}</i>
                  </a>

                  <span v-if="index === 0">(楼主)</span>
                  <!--
                  <span style="color:#5FB878">(管理员)</span>
                  <span style="color:#FF9E3F">（社区之光）</span>
                  <span style="color:#999">（该号已被封）</span> -->

                </div>

                <div class="detail-hits">
                  <span>{{item.created | moment}}</span>
                </div>

                <i class="iconfont icon-caina"
                  v-show="item.isBest === '1'"
                  title="最佳答案"></i>
              </div>
              <div class="detail-body jieda-body photos"
                v-richtext="item.content">

              </div>
              <div class="jieda-reply">
                <span class="jieda-zan "
                  :class="{'zanok' :item.handed === '1'}"
                  type="zan"
                  @click="hands(item)">
                  <i class="iconfont icon-zan"></i>
                  <em>{{item.hands}}</em>
                </span>
                <span type="reply"
                  @click="reply(item)">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <!-- 判断当前登录用户的id是否和评论的id相同  item.cuid-》评论者的 ID -->
                <div class="jieda-admin">
                  <span type="edit"
                    @click="editComent(item)"
                    v-show="page.isEnd === '0' && item.cuid._id === user._id">编辑</span>
                  <!-- 管理员权限 -->
                  <!-- <span type="del">删除</span> -->
                  <!-- 判断当前登录用户的id是否和文章作者的id相同并且
                  登录的用过户不能和评论的id相同，这是为了防止文章用户自己采纳自己的答案，回收自己的积分 -->
                  <span class="jieda-accept"
                    v-show="page.isEnd === '0' && page.user._id === user._id && item.cuid._id !== user._id "
                    @click="setBest(item)">采纳</span>
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <li class="fly-none"
              v-if="comments.length === 0">消灭零回复</li>
          </ul>
          <!-- 一个知识点（坑），变量都要加双引号，在视情况加单引号 -->
          <!-- <lsf-page v-show="comments.length > 0 && total > 0"
            :showType="'text'"
            :hasSelect="true"
            :total="total"
            :size="size"
            :current="current"
            :showEnd="true"
            @changeCurrent="handleChange"
            @changeLimit="handleLimit"></lsf-page> -->
          <el-pagination v-show="comments.length > 0 && total > 0"
            @next-click="nextPage"
            @prev-click="prevPage"
            @current-change="ChangeCurrent"
            :page-size="size"
            :current-page="current+1"
            background
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          <div class="layui-form layui-form-pane">
            <form>
              <validation-observer ref="observer"
                v-slot="{ validate }">
                <lsf-editor @changeContent="addContent"
                  :initContent="editInfo.content"></lsf-editor>
                <div class="layui-form-item">
                  <validation-provider name="code"
                    ref="codefield"
                    rules="required|length:4"
                    v-slot="{ errors }">
                    <label for="L_vercode"
                      class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <input type="text"
                        name="code"
                        v-model="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input" />
                    </div>
                    <div class>
                      <span class="svg"
                        style="color: #c00"
                        @click="_getcode()"
                        v-html="svg"></span>
                    </div>
                    <div>
                      <span style="color: #c00">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn"
                    type="button"
                    @click="validate().then(submit)">提交回复</button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <lsf-hotlist></lsf-hotlist>
        <lsf-ads></lsf-ads>
        <lsf-links></lsf-links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/components/Panel'
import Editor from '../modules/editor/Index'
import Code from '@/mixin/code'
import { addCollect } from '@/api/user'
import { getDetail } from '@/api/content'
import { getComments, addComment, updateComment, setCommentBest, setHands } from '@/api/comments'
import { escapeHtml } from '@/utils/escapeHtml'
// import { scrollToElem } from '@/utils/common'
export default {
  name: 'Detail',
  props: ['tid'], // 文章的ID
  components: {
    'lsf-hotlist': HotList,
    'lsf-ads': Ads,
    'lsf-links': Links,
    'lsf-panel': Panel,
    'lsf-editor': Editor
    // 'lsf-page': Page
  },
  computed: {
    isHide () {
      return this.$store.state.isHide
    },
    // 对文章详情的转义
    content () {
      if (typeof this.page.content === 'undefined') {
        return ''
      }
      if (this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    },
    // 用户信息
    user () {
      return this.$store.state.userInfo
    }
    // oid () {
    //   return this.page.user._id
    // }
  },
  mixins: [Code],
  data () {
    return {
      size: 10,
      total: 0,
      current: 0, // 第几页，0表示1页
      page: {}, // 页面信息
      comments: [], // 评论信息
      editInfo: {
        content: '', // 回复的内容
        code: '',
        sid: ''
      },
      loading: false,
      isRepeat: false // 请求锁
    }
  },
  watch: {
    tid (newval, oldval) {
      this.getPostDetail()
      this.getCommentList()
    }
  },
  mounted () {
    // window.vue = scrollToElem
    this.getPostDetail()
    this.getCommentList()
    // console.log(this.page)
  },
  methods: {
    nextPage () {
      console.log('nextPage')
      this.current++
      // this.getCommentList()
    },
    prevPage () {
      console.log('prevPage')
      this.current--
      // this.getCommentList()
    },
    ChangeCurrent (val) {
      // console.log('ChangeCurrent')
      console.log(val)
      this.current = val - 1
      this.getCommentList()
    },
    // 获取文章详情
    getPostDetail () {
      getDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.page = res.data
          // console.log(this.page.user._id)
        }
      })
    },
    // 获取评论信息
    getCommentList () {
      // 这是第二次点击打开loading
      if (this.isRepeat) {
        this.loading = true
        return
      }
      // 第一次请求打开锁
      // 必须要等到页面渲染完成后才能去操作，否则就是loading状态
      this.isRepeat = true
      this.loading = true
      getComments({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then((res) => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
          this.isRepeat = false
          this.loading = false
        }
        // console.log(res)
      })
    },
    // 接受子组件输入的评论内容
    addContent (val) {
      this.editInfo.content = val
    },
    async submit () {
      const user = this.$store.state.userInfo
      // 用户未登录
      const isLogin = this.$store.state.isLogin
      // 获取评论用户的信息：图片、昵称、vip
      const cuid = {
        _id: user._id,
        pic: user.pic,
        name: user.name,
        isVip: user.isVip
      }
      // 判断前端验证表单是否全部通过
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      // 用户是否登录
      if (!isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      // 用户是否禁言
      if (user.status !== '0') {
        this.$pop('shake', '用户已经被禁言，请联系管理员')
        return
      }
      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid
      if (typeof this.editInfo.cid !== 'undefined' && this.editInfo.cid !== '') {
        const obj = { ...this.editInfo }
        delete obj.item
        // 判断用户是否修改了内容
        if (this.editInfo.content === this.editInfo.item.content) {
          this.$pop('shake', '确定编辑了内容~~~')
          return
        }
        // 更新评论
        updateComment(obj).then((res) => {
          if (res.code === 200) {
            const temp = this.editInfo.item
            temp.content = this.editInfo.content
            this.$pop('', '更新评论成功')
            this.code = ''
            this.editInfo.content = ''
            // 方法一，只用更新特定的一条的content created， $set
            // 方法二，更新整个数组中的这一条
            this.comments.splice(
              this.comments.indexOf(this.editInfo.item),
              1,
              temp
            )
          }
        })
        return
      }

      // 添加评论
      addComment(this.editInfo).then((res) => {
        if (res.code === 200) {
          // 添加新的评论到评论列表
          res.data.cuid = cuid
          this.$pop('shake', '评论成功')
          this.comments.push(res.data)
          // 清空回复内容
          this.code = ''
          this.editInfo.content = ''
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
          // 刷新图形验证码
          this._getcode()
        } else if (res.code === 500) {
          this.$alert(res.msg)
        }
      })
    },
    // 编辑 这里要看是否结帖，这条数据是否和登录的用户相同，才能去操作编辑
    editComent (item) {
      // console.log(item)
      // console.log('文章的作者ID' + page.user._id)
      // scrollToElem('.layui-input-block', 500, 65)
      this.editInfo.content = item.content
      document.getElementById('edit').focus()
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    setBest (item) {
      // console.log(item)
      // console.log('setBest' + index)
      this.$confirm('确定采纳为最佳答案吗?', () => {
        // console.log('评论表里面的iD' + item._id)
        setCommentBest({
          cid: item._id,
          tid: this.tid
        }).then((res) => {
          if (res.code === 200) {
            this.$pop('', '设置最佳答案成功！')
            item.isBest = '1'
            this.page.isEnd = '1'
          }
        })
      }, () => {})
    },
    // 点赞
    hands (item) {
      setHands({ cid: item._id }).then((res) => {
        if (res.code === 200) {
          this.$pop('', '点赞成功')
          item.handed = '1'
          item.hands += 1
        } else if (res.code === 401) {
          this.$pop('shake', res.msg)
        }
      }).catch((err) => {
        const data = err.response.data
        // console.log(data.code)
        if (data.code === 401) {
          this.$pop('shake', '请登录后点赞')
        } else {
          this.$alert('服务器错误，请联系网站管理员')
        }
      })
    },
    //
    reply (item) {
      // debugger
      const reg = /^@[\S]+/g
      if (this.editInfo.content) {
        if (reg.test(this.editInfo.content)) {
          this.editInfo.content = this.editInfo.content.replace(
            reg,
            '@' + item.cuid.name + ' '
          )
        } else {
          if (this.editInfo.content !== '') {
            // 非空的情况
            this.editInfo.content = `@${item.cuid.name} ${this.editInfo.content}`
          }
        }
      } else {
        // 评论框为空
        this.editInfo.content = '@' + item.cuid.name + ' '
      }
      document.getElementById('edit').focus()
      // this.editInfo.cid = item._id
      // this.editInfo.item = item
    },
    setCollect () {
      // 设置收藏 & 取消收藏
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        const collect = {
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav ? 1 : 0
        }
        addCollect(collect).then((res) => {
          if (res.code === 200) {
            this.page.isFav = !this.page.isFav
            this.$pop('', this.page.isFav ? '设置收藏成功' : '取消收藏成功')
          }
        })
      } else {
        this.$pop('shake', '请先登录后再进行收藏！')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
.jieda-body {
  margin: 25px 0 20px !important;
  min-height: 0;
  line-height: 24px;
  font-size: 14px;
}
</style>
