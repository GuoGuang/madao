<template>
  <!-- 问答 -->
  <el-row class="qa">
    <!--  -->
    <el-col :span="18" class="qa-main">
      <el-tabs class="nav-link" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="最新" name="first">

          <section class="stream-list__item" :key="index" v-for="(question, index) in question">
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


            <div class="summary">
              <ul class="author list-inline">
                <li>
                  <a href="/u/liudao6">琉刀</a>
                  <span class="split"></span>
                  <a href="/q/1010000018329749/a-1020000018330567">37 分钟前回答</a>
                </li>
              </ul>
              <h2 class="title">
                <nuxt-link to="/qa/1" text="">
                    关于后端 api 接口设计的疑关于后端 api 接口设计的疑问后端 api 接口设计的疑计的疑
                </nuxt-link>
              </h2>

              <ul class="taglist--inline">
                <li class="tagPopup">
                  <a class="tag" href="/t/javascript" data-toggle="popover" data-original-title="javascript"
                    data-id="1040000000089436">javascript</a>
                </li>
              </ul>
            </div>

          </section>
          <el-pagination style="text-align: center;padding: 2em;" background layout="prev, pager, next" :total="1000">
          </el-pagination>

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
  name: 'question',
  head() {
    return {
      title: `${this.isEnLang ? '' : this.$i18n.nav.question + ' | '}event`
    }
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  fetch({ store }) {
    return store.dispatch('question/fetchQuestion')
  },
  components: {
    AsideView
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
    .stream-list__item {
      border-bottom: 1px solid #cecbcb;
      padding: 17px 0;
      display: flex;

      .qa-rank {
        display: flex;
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
          display: inline-block;
        }

        ul {
          list-style: none;
        }

        .taglist--inline {
          display: inline-block;

          a {
            display: inline-block;
            padding: 0 6px;
            color: #017e66;
            background-color: rgba(1, 126, 102, 0.08);
            height: 22px;
            line-height: 22px;
            font-weight: normal;
            font-size: 13px;
            text-align: center;
            color: #009a61;
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>