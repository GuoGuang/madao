<template>
  <!-- 问答 -->
  <el-row class="qa">
    <!--  -->
    <el-col :span="18" class="qa-main">
      <el-tabs v-model="activeName" class="nav-link" @tab-click="handleClick">
        <el-tab-pane label="最新" name="first" class="">

          <el-row v-for="item in aaa" :key="item" class="stream-list__item" >
            <el-col :span="2" >
              <div class="qa-rank">
                <div class="votes ">
                  0<small>得票</small>
                </div>
                <div class="answers ">
                  2<small>回答</small>
                </div>
                <div class="views viewsword0to99">
                  <span>51</span><small>浏览</small>
                </div>
              </div>
            </el-col>
            <el-col :span="22" class="summary">
              <el-row class="title">
                <h3 class="title">
                  <a href="/666">Timeout waiting to lock artifact cache</a>
                </h3>
              </el-row>
              <el-row>
                I am a new user of android Studio. How to solve this error? ERROR: Timeout waiting to lock artifact cache (C:\Users\Sumon.gradle\caches\modules-2). It is currently in use by another Gradle instance. ...
              </el-row>
              <el-row style="padding:7px">

                <a href="#">
                  <el-tag size="small">java</el-tag>
                </a>
                <a href="#">
                  <el-tag size="small">python</el-tag>
                </a>
                <el-row class="user">
                  <div class="started fr">
                    <div class="user-info ">
                      <div class="user-action-time">
                        asked <span title="2019-04-08 12:57:32Z" class="relativetime">1 min ago</span>
                      </div>
                      <div class="user-gravatar32">
                        <a href="/users/8554607/dee"><div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/697e7ef21dc7b0634813a60eb2049710?s=32&amp;d=identicon&amp;r=PG&amp;f=1" alt="" width="32" height="32"></div></a>
                      </div>
                      <div class="user-details">
                        <a href="/users/8554607/dee">Dee</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score " dir="ltr">1</span><span title="1 bronze badge"><span class="badge3"/><span class="badgecount">1</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-row>

              </el-row>

            </el-col>
          </el-row>
          <!-- <el-pagination :total="1000" style="text-align: center;padding: 2em;" background layout="prev, pager, next"/> -->

        </el-tab-pane>
        <el-tab-pane label="精选" name="second">精选</el-tab-pane>
        <el-tab-pane label="投票" name="third">投票</el-tab-pane>
        <el-tab-pane label="未答复" name="fourth">未答复</el-tab-pane>
      </el-tabs>
    </el-col>

    <el-col :span="6">
      <div>
        <aside-view key="aside" />
      </div>
    </el-col>
  </el-row>

</template>

<script>
import AsideView from '~/components/layout/pc/aside/main'
export default {
  name: 'Question',
  head() {
    return {
      title: `${this.isEnLang ? '' : this.$i18n.nav.question + ' | '}event`
    }
  },
  components: {
    AsideView
  },
  data() {
    return {
      aaa: [{}, {}],
      activeName: 'first'
    }
  },
  fetch({ store }) {
    return store.dispatch('question/fetchQuestion')
  },
  computed: {
    question() {
      return this.$store.state.question.question.data
    },
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    isMobile() {
      return this.$store.state.global.isMobile
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style lang="scss">
.qa-main {
  .nav-link {
    .el-tabs__header {
      margin: 0;
    }

    .stream-list__item {
      border-bottom: 1px solid #cecbcb;
      padding: 12px 10px;
      display: flex;

      .qa-rank {
        display: flex;
        flex-direction: column;
        margin-right: 10px;
        font-size: 16px;
        text-align: center;
        line-height: 1.2;
        color: #666;

        div {
          width: 45px;
          height: 42px;
          padding-top: 3px;
          border-radius: 3px;
        }

        .votes {
          display: inline-block;

          color: #757575;
        }

        .answers {
          background: rgba(1, 126, 102, 0.08);
          border: 1px solid rgba(1, 126, 102, 0.16);
        }

        small {
          display: block;
        }
      }

      .summary {
        display: inline-block;

        .title {
          margin:0;
          display: inline-block;
        a:focus,
          a:hover {
            color: #409eff;
          }
          a {
            font-size: 16px;
            display: inline-block;
            padding: 0 6px;
            height: 22px;
            line-height: 22px;
            text-align: center;
          }
        }

        .user {
          float: right;
          margin-right: 90px;
          .user-info:after {
            clear: both;
          }

          .user-gravatar32 {
            float: left;
            width: 32px;
            height: 32px;
            border-radius: 1px;
          }

          .user-gravatar32 img {
            border-radius: 1px;
          }

          .user-gravatar32 + .user-details {
            margin-left: 8px;
            width: calc(100% - 40px);
          }

          .user-gravatar48 + .user-details {
            margin-left: 8px;
            width: calc(100% - 48px);
          }

          .user-gravatar64 + .user-details {
            margin-left: 8px;
            width: calc(100% - 64px);
          }

          .user-action-time {
            margin-top: 1px;
            margin-bottom: 4px;
            font-size: 12px;
            white-space: nowrap;
          }

          .user-details {
            float: left;
            width: 100%;
          }

          .-flair {
            display: block;
          }
        }
      }
    }
  }
}
</style>
