<template>
  <!--问答详情页 -->
  <el-row class="question-detail">
    <el-col :span="18">
      <div class="top-title">
        <h1>
          <a href="/q/1010000017235204">{{ question.title }}</a>
        </h1>
        <span>429</span> 次浏览
      </div>

      <!-- 问题内容 -->
      <el-row class="top-info">
        <el-col :span="2">
          <i
            class="el-icon-caret-top"
            style="line-height: 1.5;"
          />
          <span>赞成</span>
          <i
            class="el-icon-caret-bottom"
            style="line-height: 1.5;"
          />
        </el-col>
        <el-col :span="22">{{ question.content }}</el-col>
      </el-row>

      <!-- 扩展操作 -->
      <el-row class="ext-action">
        <el-col :span="18">
          <ul>
            <li>
              <button type="button">关注&nbsp;
                <span>|</span>&nbsp;3
              </button>
            </li>
            <li>
              <button type="button">收藏&nbsp;
                <span>|</span>&nbsp;
              </button>
            </li>
            <li>
              <button type="button">评论&nbsp;
                <span>|</span>&nbsp;
              </button>
            </li>
            <li>
              <button type="button">邀请回答&nbsp;
                <span>|</span>&nbsp;3
              </button>
            </li>
            <li>
              <button href="javascript:;">编辑</button>
            </li>
            <li>
              <button href="javascript:void(0);">
                <i />
              </button>
            </li>
            <li>
              <button href="#911">举报</button>
            </li>
            <li>
              <button href="/q/1010000017235204/revision">历史版本</button>
            </li>
          </ul>
        </el-col>
        <el-col :span="6">
          <a href="/u/huixu">
            <img
              class="profile-img"
              src="https://cdn.segmentfault.com/v-5c78d357/global/img/user-64.png"
            >
          </a>
          <div class="profile-info">
            <div>
              <a
                href="/u/huixu"
                class="mr5"
              >
                <strong>huixu</strong>
              </a>
              <img src="https://cdn.segmentfault.com/v-5c78d357/global/img/rp.svg">
              <span style="color:#BF7158">24</span>
            </div>
            <span class="profile-date">2018-12-03 提问</span>
          </div>
        </el-col>
      </el-row>

      <!-- 答案区 -->
      <el-row class="answers-header">
        <el-col :span="24">
          <h2>3 个回答</h2>
          <div class="tabs">
            <a
              class="default-check"
              href="/questions/54640544/java-servlet-translation-api-request-encoding-problem-german-characters?answertab=active#tab-top"
            >活跃</a>
            <a href="/questions/54640544/java-servlet-translation-api-request-encoding-problem-german-characters?answertab=oldest#tab-top">最新</a>
            <a href="/questions/54640544/java-servlet-translation-api-request-encoding-problem-german-characters?answertab=votes#tab-top">票数</a>
          </div>
        </el-col>
      </el-row>

      <el-row
        v-for="(answers, index) in question.answers"
        :key="index"
        class="answers-list"
      >
        <el-col :span="2">
          <i
            class="el-icon-caret-top"
            style="line-height: 1.5;"
          />
          <span>赞成</span>
          <i
            class="el-icon-caret-bottom"
            style="line-height: 1.5;"
          />
        </el-col>
        <el-col :span="22">
          <el-row v-html="answers.content" />

          <!-- 回答者信息区 -->
          <el-row class="answerer-profile">
            <el-col :span="18">
              <ul>
                <li>
                  <button href="javascript:void(0);">
                    <i />评论
                  </button>
                </li>
                <li>
                  <button href="javascript:;">邀请回答</button>
                </li>
                <li>
                  <button href="javascript:;">编辑</button>
                </li>
                <li>
                  <button href="javascript:void(0);">
                    <i />
                  </button>
                </li>
                <li>
                  <button href="#911">举报</button>
                </li>
                <li>
                  <button href="/q/1010000017235204/revision">历史版本</button>
                </li>
              </ul>
            </el-col>
            <el-col :span="6">
              <a href="/u/huixu">
                <img
                  class="profile-img"
                  src="https://cdn.segmentfault.com/v-5c78d357/global/img/user-64.png"
                >
              </a>
              <div
                class
                style="display:flex; flex-direction:column"
              >
                <div class="mb3">
                  <a
                    href="/u/huixu"
                    class="mr5"
                  >
                    <strong>huixu</strong>
                  </a>
                  <img src="https://cdn.segmentfault.com/v-5c78d357/global/img/rp.svg">
                  <span style="color:#BF7158">24</span>
                </div>
                <span style="font-size:13px; color:#999">2018-12-03 提问</span>
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
// import { mapState } from 'vuex'
// import { isBrowser } from '~/environment/esm'
// import lozad from '~/plugins/lozad'
// import marked from '~/plugins/marked'
// import adConfig from '~/config/ad.config'
import ShareBox from '~/components/widget/share'
export default {
  name: 'Qa',
  components: {
    ShareBox
  },
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('question/fetchDetail', params) // .catch(err => {
      // error({ statusCode: 404, message: '众里寻他 我已不再' })
      // })
      // store.dispatch('comment/fetchList', { post_id: params.article_id })
    ])
  },
  computed: {
    question() {
      return this.$store.state.question.detail.data
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
.question-detail {
  .top-title {
    margin-bottom: 1em;
    h1 {
      font-size: 30px;
      margin: 0 0 10px 0;
      line-height: 1.2;
    }
  }
  .top-info {
    .el-col-2 {
      display: grid;
      text-align: center;
    }
    .el-col-22 {
      line-height: 1.6;
      font-size: 15px;
    }
  }
  .ext-action {
    .el-col-18 {
      display: flex;
      line-height: 1;
      padding-top: 9px;
      padding-bottom: 9px;
      ul {
        display: flex;
        list-style: none;
        li {
          padding-right: 1em;
        }
      }
    }
    .el-col-6 {
      display: flex;
      .profile-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px !important;
      }
      .profile-info {
        display: flex;
        flex-direction: column;
        .profile-date {
          font-size: 13px;
          color: #999;
        }
      }
    }
  }

  // 答案区
  .answers-header {
    .el-col-24 {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding-top: 1em;
      .tabs {
        a {
          padding: 0 1em;
          float: left;
          margin-right: 8px;
          padding: 12px 8px 14px;
          color: #848d95;
          line-height: 1;
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: all 0.1s ease-in-out;
        }
        a:hover {
          background-color: #ddd;

          border-bottom-color: transparent;
        }
      }
    }
  }
  .answers-list {
    padding-bottom: 1em;
    padding-top: 1em;
    border-bottom: 1px solid #ddd;
    .el-col-2 {
      display: grid;
      text-align: center;
    }
    .el-col-22 {
      .answerer-profile {
        .el-col-18 {
          display: flex;
          line-height: 1;
          padding-top: 9px;
          padding-bottom: 9px;
          ul {
            display: flex;
            list-style: none;
            li {
              padding-right: 1em;
            }
          }
        }
        .el-col-6 {
          display: flex;
          .profile-img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px !important;
          }
        }
      }
    }
  }
  font-size: 15px;
  .default-check {
    background-color: #ddd;

    border-bottom-color: transparent;
    border: 1px solid #ddd;
  }
}
</style>
