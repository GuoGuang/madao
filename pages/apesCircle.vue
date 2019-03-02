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

      <div style="margin-bottom:1em;background-color: #fff;">

        <el-input style="padding: 1em 1em 1em 1em;"
          type="textarea"
          :rows="4"
          placeholder="猿圈一下"
          resize="none"
          v-model="textarea">
        </el-input>
        <el-row style="padding: 0 1em 1em 1em;">
          <el-col :span="12">
            <div class="">
                <ul style="display: flex;
                              padding-top: 9px;
                          justify-content: space-evenly;
                          list-style: none;">
                  <li><a>表情</a></li>
                  <li><a>图片</a></li>
                  <li><a>链接</a></li>
                  <li><a>话题</a></li>
                </ul>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="">
                <el-button type="primary" style="float:right">发布</el-button>
            </div>
          </el-col>
        </el-row>
</div>
       


          <div :key="index" v-for="(question, index) in question"  style="margin-bottom:1em;background-color: #fff;" class="main-content">
            <el-row type="flex" class="main-head">
              <el-col :span="3" style="width: 10.5%;!important">
                <img class="user-profile"  src="https://user-gold-cdn.xitu.io/2019/2/26/169268d0793ad9be?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1">
              </el-col>
              <el-col :span="7" >
                <div class="" >
                    <div>昵称</div>
                  <div style="color: #8a9aa9;"> 摸鱼打杂·1小时前 </div>
                </div>
              </el-col>
              <el-col :span="14" >
                <div class="" style="float: right;">
                  <el-button size="mini" round>关注</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="24" >
                <div class="content" >
                      🎉🎉🎉
                    终于可以告别臃肿的 Expo 了，
                    官方将 SDK 拆分成了多个包，
                    可以只添加用到的依赖了。
                </div>
              </el-col>
              </el-row>

            <el-row>
              <el-col :span="24" >
                <div class="content" >
                  <img style="width: 40%;" src="https://user-gold-cdn.xitu.io/2019/3/1/169387db4349d2eb?imageView2/1/w/460/h/316/q/85/format/jpg/interlace/1">
                </div>
              </el-col>
            </el-row>
            <el-row style="    text-align: center;">
              <el-col :span="8" >
                <svg class="icon" aria-hidden="true" style="padding-bottom: 8px;">
                  <use xlink:href="#youyd-icon-caozuo-dianzan"></use>
                </svg>
                  <a>0</a>
              </el-col>
              <el-col :span="8" >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#youyd-icon-pinglun"></use>
                </svg>
                  0
              </el-col>
              <el-col :span="8" >
                <svg class="icon" aria-hidden="true" style="padding-bottom: 8px;">
                  <use xlink:href="#youyd-icon-fenxiang"></use>
                </svg>
                  分享
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
      .main-content{
        
  .main-head{
        padding: 1em 0 0;
      }
      .el-row{
        margin: 0 1em 0 1em;
        .el-col{
           
        }
      }
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
      .content{
        font-size: 15px;
        margin: 0 2em 0 4em
      }
      .pin-action-row{
        display: flex;
        justify-content: center;
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


  .user-profile{

    width: 51px;
    height: 51px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
  .icon {
    height: 30px;
    width: 20px;
    
}

</style>
