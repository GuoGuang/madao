<template>
  <!-- 问答 -->
    <el-row class="qa">
      <el-col :span="4" class="left-sidebar">
        <ol class="nav-links">
          <li class="youarehere">
            <svg style="margin-bottom: 3px;" aria-hidden="true" class="svg-icon iconGlobe" width="18" height="18" viewBox="0 0 18 18"><path d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zM8 15.32a6.4 6.4 0 0 1-5.23-7.75L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.4 6.4 0 0 1 2.32 10.24z"></path></svg>
            <a href="/">StackEx</a>
          </li>
          <li>
            <a href="/" class="padding-a">标签</a>
          </li>
          <li>
            <a href="/" class="padding-a">用户</a>
          </li>
        </ol>
      </el-col>

  <!-- :key="index" v-for="(question, index) in question" -->
      <el-col :span="14" class="main">
        <div class="question-summary" >
           <div class="statscontainer">
              <div class="stats">
                  <div class="vote">
                      <div class="votes">
                          <span class="vote-count-post "><strong>0</strong></span>
                          <div class="viewcount">votes</div>
                      </div>
                  </div>
                  <div class="status unanswered">
                      <strong>0</strong>answers
                  </div>
              </div>
              <div class="views " title="3 views">
              3 views
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
          <div >
            <aside-view key="aside"/>
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
    fetch({ store }) {
      return store.dispatch('events/fetchEvents')
    },
    components: {
        AsideView
    },
    computed: {
      question() {
        return this.$store.state.events.events.data
      },
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isMobile() {
        return this.$store.state.global.isMobile
      }
    },
    methods: {
      
    }
  }
</script>


<style lang="scss" scoped>
  .qa{
    .left-sidebar{
      width: 15%;
      border-right: 1px solid #d6d9dc;
      .nav-links{
        padding-left: 0em;
        list-style: none;
        .youarehere{
            font-weight: bold;
            background: rgba(12,13,14,0.05);
            color: #0C0D0E;
            border-right: 3px solid #F48024;
        }
        li{
          padding: 4px 6px 4px 8px;
          line-height: 2em;
          .padding-a{
            padding-left: 24px;
          }
        }
    }
    }
    .main{
      padding-left: 2em;
      .question-summary{
        width: 100%;
        padding-left: 8px;
        box-sizing: border-box;
        .statscontainer{
            margin-right: 16px;
            width: 58px;
            float: none;
        }
      }
    }
  }
</style>
