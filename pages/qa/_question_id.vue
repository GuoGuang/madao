<template>
  <!--问答详情页 -->
  <el-row class="question-detail">
    <el-col :span="18">
      <div class="block-for-right-border" style="    margin-bottom: 1em;">
        <div class="post-topheader__info mb15">
          <h1
            class="h2 post-topheader__info--title"
            style="font-size: 30px;margin: 0 0 10px 0;line-height: 1.2;"
          >
            <a href="/q/1010000017235204">在vue项目中 ios端的微信分享无效</a>
          </h1>
          <span>429</span> 次浏览
        </div>
      </div>

      <!-- 问题内容 -->
      <el-row>
        <el-col :span="2" style="    display: grid;text-align: center;">
          <i class="el-icon-caret-top" style="line-height: 1.5;"></i>
          <span>赞成</span>
          <i class="el-icon-caret-bottom" style="line-height: 1.5;"></i>
        </el-col>
        <el-col
          :span="22"
          style="line-height: 1.6;    font-size: 15px;"
        >在vue项目中(spa) ios端的微信分享配置不起作用，但是重新刷新下页面就正常了，安卓端的没有任何问题。有大神碰到过这个问题吗</el-col>
      </el-row>
      <el-row>
        <el-col :span="18" style="display: flex;">
          <div
            class="post-opt col-md-8"
            style="line-height: 1; 
                                                  padding-top: 9px; 
                                                  padding-bottom: 9px; "
          >
            <ul class="list-inline mb0" style="display:flex;list-style:none">
              <li style="padding-right: 1em;">
                <button
                  type="button"
                  id="sideFollow"
                  class="btn btn-success btn-xs"
                  data-id="1010000017235204"
                  data-do="follow"
                  data-type="question"
                  data-original-title
                  title
                >关注&nbsp;
                  <span class="vertical-bar">|</span>&nbsp;3
                </button>
              </li>
              <li style="padding-right: 1em;">
                <button
                  type="button"
                  id="sideBookmark"
                  class="btn btn-default btn-xs"
                  data-id="1010000017235204"
                  data-type="question"
                >收藏</button>
              </li>
              <li style="padding-right: 1em;">
                <button
                  href="javascript:void(0);"
                  class="comments"
                  data-id="1010000017235204"
                  data-target="#comment-1010000017235204"
                >
                  <i class="fa fa-commenting mr4" aria-hidden="true"></i>
                  评论
                </button>
              </li>
              <li style="padding-right: 1em;">
                <button
                  class
                  href="javascript:;"
                  data-title="在vue项目中 ios端的微信分享无效"
                  data-url="http://sfau.lt/bNbktPk"
                  data-id="1010000017235204"
                >邀请回答</button>
              </li>
              <li style="padding-right: 1em;">
                <button href="javascript:;">编辑</button>
              </li>
              <li style="padding-right: 1em;">
                <button href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                </button>
              </li>
              <li style="padding-right: 1em;">
                <button href="#911" data-toggle="modal" data-target="#911" data-action="report">举报</button>
              </li>
              <li style="padding-right: 1em;">
                <button href="/q/1010000017235204/revision">历史版本</button>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="question__author col-md-4" style="display:flex">
            <a href="/u/huixu">
              <img
                src="https://cdn.segmentfault.com/v-5c78d357/global/img/user-64.png"
                style="width: 40px;
                                                                                                          height: 40px;
                                                                                                          border-radius: 50%;
                                                                                                          margin-right: 10px !important;"
                class="avatar-40 mr10"
                data-toggle="popover"
                data-slug="huixu"
                data-id="1030000011948650"
              >
            </a>
            <div style="display:flex; flex-direction:column">
              <div class="mb3">
                <a href="/u/huixu" class="mr5">
                  <strong>huixu</strong>
                </a>
                <img src="https://cdn.segmentfault.com/v-5c78d357/global/img/rp.svg">
                <span style="color:#BF7158">24</span>
              </div>
              <span style="font-size:13px; color:#999">2018-12-03 提问</span>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div
            class="subheader answers-subheader"
            style="display: flex;justify-content: space-between;    border-bottom: 1px solid #ddd;line-height: 5em;"
          >
            <h2 data-answercount="1">
              3 个回答
              <span style="display:none;" itemprop="answerCount">1</span>
            </h2>
            <div>
              <div id="tabs">
                <a
                  style="padding: 0 1em;"
                  href="/questions/54640544/java-servlet-translation-api-request-encoding-problem-german-characters?answertab=active#tab-top"
                  data-nav-xhref
                  title="Answers with the latest activity first"
                  data-value="active"
                  data-shortcut="A"
                >活跃</a>
                <a
                  style="padding: 0 1em;"
                  href="/questions/54640544/java-servlet-translation-api-request-encoding-problem-german-characters?answertab=oldest#tab-top"
                  data-nav-xhref
                  title="Answers in the order they were provided"
                  data-value="oldest"
                  data-shortcut="O"
                >最新</a>
                <a
                  style="padding: 0 1em;"
                  class="youarehere is-selected"
                  href="/questions/54640544/java-servlet-translation-api-request-encoding-problem-german-characters?answertab=votes#tab-top"
                  data-nav-xhref
                  title="Answers with the highest score first"
                  data-value="votes"
                  data-shortcut="V"
                >票数</a>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 答案区 -->
      <el-row
        :key="index"
        v-for="(question, index) in question"
        style="padding-bottom: 1em; padding-top: 1em;border-bottom: 1px solid #ddd;"
      >
        <el-col :span="2" style="    display: grid;text-align: center;">
          <i class="el-icon-caret-top" style="line-height: 1.5;"></i>
          <span>赞成</span>
          <i class="el-icon-caret-bottom" style="line-height: 1.5;"></i>
        </el-col>
        <el-col :span="22">
          <el-row>
            <p>调用微信
              <code>jsdk</code>，后端接口返回时间戳去做微信分享页面缩略图描述吗？
            </p>
          </el-row>

          <!-- 回答者信息区 -->
          <el-row>
            <el-col :span="18" style="display: flex;">
              <div
                class="post-opt col-md-8"
                style="line-height: 1; 
                                                  padding-top: 9px; 
                                                  padding-bottom: 9px; "
              >
                <ul class="list-inline mb0" style="display:flex;list-style:none">
                  <li style="padding-right: 1em;">
                    <button
                      href="javascript:void(0);"
                      class="comments"
                      data-id="1010000017235204"
                      data-target="#comment-1010000017235204"
                    >
                      <i class="fa fa-commenting mr4" aria-hidden="true"></i>
                      评论
                    </button>
                  </li>
                  <li style="padding-right: 1em;">
                    <button
                      class
                      href="javascript:;"
                      data-title="在vue项目中 ios端的微信分享无效"
                      data-url="http://sfau.lt/bNbktPk"
                      data-id="1010000017235204"
                    >邀请回答</button>
                  </li>
                  <li style="padding-right: 1em;">
                    <button href="javascript:;">编辑</button>
                  </li>
                  <li style="padding-right: 1em;">
                    <button
                      href="javascript:void(0);"
                      class="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </button>
                  </li>
                  <li style="padding-right: 1em;">
                    <button
                      href="#911"
                      data-toggle="modal"
                      data-target="#911"
                      data-action="report"
                    >举报</button>
                  </li>
                  <li style="padding-right: 1em;">
                    <button href="/q/1010000017235204/revision">历史版本</button>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="question__author col-md-4" style="display:flex">
                <a href="/u/huixu">
                  <img
                    src="https://cdn.segmentfault.com/v-5c78d357/global/img/user-64.png"
                    style="width: 40px;
                                                                                                          height: 40px;
                                                                                                          border-radius: 50%;
                                                                                                          margin-right: 10px !important;"
                    class="avatar-40 mr10"
                    data-toggle="popover"
                    data-slug="huixu"
                    data-id="1030000011948650"
                  >
                </a>
                <div style="display:flex; flex-direction:column">
                  <div class="mb3">
                    <a href="/u/huixu" class="mr5">
                      <strong>huixu</strong>
                    </a>
                    <img src="https://cdn.segmentfault.com/v-5c78d357/global/img/rp.svg">
                    <span style="color:#BF7158">24</span>
                  </div>
                  <span style="font-size:13px; color:#999">2018-12-03 提问</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">&nbsp;</el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { isBrowser } from '~/environment/esm'
import lozad from '~/plugins/lozad'
import marked from '~/plugins/marked'
import adConfig from '~/config/ad.config'
import ShareBox from '~/components/widget/share'
export default {
  name: 'question-detail',
  components: {
    ShareBox
  },
  fetch({ store }) {
    return store.dispatch('question/fetchQuestion')
  },
  computed: {
    question() {
      return this.$store.state.question.question.data
    },
    comments() {
      return this.$store.state.events.events.data
    },
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    isMobile() {
      return this.$store.state.global.isMobile
    }
  }
}
</script>

<style lang="scss" scoped>
</style>