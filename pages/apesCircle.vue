<template>
  <!-- 猿圈，微博，交流 -->
    <el-row class="qa">
      <el-col :span="4" class="left-sidebar">
       
          <div class="main-left">
        <div id="nav" class="aside-nav">
          <nav is="nav" class="nav-list">
            <nuxt-link to="/music" class="item">
              <!-- https://blog.csdn.net/jiaqingge/article/details/81513422 -->
              <span v-text="$i18n.text.it" style="padding-left: 8px;"></span>
            </nuxt-link>
            <nuxt-link to="/vlog" class="item">
              <span v-text="$i18n.text.interesting" style="padding-left: 8px;"></span>
            </nuxt-link>
            <nuxt-link to="/about" class="item">
              <span v-text="$i18n.text.creativity" style="padding-left: 8px;"></span>
            </nuxt-link>
            <nuxt-link to="/service" class="item">
              <span v-text="$i18n.text.workStack" style="padding-left: 8px;"></span>
              <span class="superscript">
              </span>
            </nuxt-link>
          
          </nav>
  </div>
      </div>

      </el-col>

  <!-- :key="index" v-for="(question, index) in question" -->
      <el-col :span="14" class="main">
          <div :key="index" v-for="(question, index) in question"  style="margin-bottom:1em;background-color: #fff;">
            <el-row>
              <el-row>
              <el-col :span="24" >
                <div class="" >
                    头像，昵称
                </div>
                </el-col>
            </el-row>
              <el-col :span="24" >
                <div class="grid-content bg-purple">
                      🎉🎉🎉
                    终于可以告别臃肿的 Expo 了，
                    官方将 SDK 拆分成了多个包，
                    可以只添加用到的依赖了。
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" >
                <div class="">

                  <img style="width: 40%;" src="https://user-gold-cdn.xitu.io/2019/3/1/169387db4349d2eb?imageView2/1/w/460/h/316/q/85/format/jpg/interlace/1">

                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" >
                <div class="">
                      点赞，评论，分享
              </div>
              </el-col>
            </el-row>
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
    name: 'apesCircle',
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
 .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .qa{
    .left-sidebar{
      width: 15%;
      border-right: 1px solid #d6d9dc;
    }
    .main{
      padding-left: 1em;
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



   .aside-nav {
     width:19em;
    display: inline-block;
    width: 11.5em;
    top: 5.5em;
    left: calc((100% - 75em) / 2);
    .nav-list {
      padding: 0;
      margin: 0;
      > .item {
        border: none;
        display: block;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 1em;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
        border-radius: 1px;
        color: $secondary;
        font-family: webfont-normal, DINRegular;
        letter-spacing: 0.5px;
        margin-bottom: .5em;
        position: relative;
        &:hover {
          background-color: rgba(0,154,97,0.08);;
        }
     
      }
    }
  }

    .el-col{
    padding-right: 5px !important;
  }
</style>
