<template>

  <!-- <div class="home">
    <div class="left-side">
      <aside-view key="aside"/>
    </div>
     页面Main 
    <div class="index">
       轮播图 
      <carrousel :article="article" />
       评论，导语 
      <announcement :announcement="announcement" />
       热门文章列表 
      <article-list :article="article" @loadmore="loadmoreArticle" />
    </div>
    <div>
      <aside-view key="aside"/>
    </div>
  </div> -->

  <el-row :gutter="20">
    <el-col :span="4">
      <div class="main-left">
        <div id="nav" class="aside-nav">
          <nav is="nav" class="nav-list">
            
            <nuxt-link to="/music" class="item">
              <!-- https://blog.csdn.net/jiaqingge/article/details/81513422 -->
              <svg class="icon" aria-hidden="true"><use xlink:href="#youyd-icon-javascript-map"></use></svg>
              <span v-text="$i18n.nav.music" style="padding-left: 8px;"></span>
            </nuxt-link>
            <nuxt-link to="/vlog" class="item">
              <svg class="icon" aria-hidden="true"><use xlink:href="#youyd-icon-ERPxitonghouduanshujuku"></use></svg>
              <span v-text="$i18n.nav.vlog" style="padding-left: 8px;"></span>
            </nuxt-link>
            <nuxt-link to="/about" class="item">
              <svg class="icon" aria-hidden="true"><use xlink:href="#youyd-icon-anquanguizeyong"></use></svg>
              <span v-text="$i18n.nav.about" style="padding-left: 8px;"></span>
            </nuxt-link>
            <nuxt-link to="/service" class="item">
              <svg class="icon" aria-hidden="true"><use xlink:href="#youyd-icon-houduan"></use></svg>
              <span v-text="$i18n.nav.service" style="padding-left: 8px;"></span>
              <span class="superscript">
              </span>
            </nuxt-link>
            <nuxt-link to="/guestbook" class="item guestbook">
              <svg class="icon" aria-hidden="true"><use xlink:href="#youyd-icon-rengongzhineng"></use></svg>
              <span v-text="$i18n.nav.guestbook" style="padding-left: 8px;"></span>
            </nuxt-link>
          
          </nav>
  </div>
      </div>
    </el-col>

    <el-col :span="14">
      <div class="main">
      <!-- 轮播图 -->
        <carrousel :article="article" />
        <!-- 评论，导语 -->
        <announcement :announcement="announcement" />
        <!-- 热门文章列表 -->
        <article-list :article="article" @loadmore="loadmoreArticle" />
      </div>
    </el-col>

    <el-col :span="6">
      <div class="main-right">
        <aside-view key="aside"/>
      </div>
    </el-col>
  </el-row> 
</template>

<script>
  import ArticleList from '~/components/archive/list'
  import Carrousel from '~/components/archive/carrousel'
  import Announcement from '~/components/archive/announcement'
  import AsideView from '~/components/layout/pc/aside/main'

  export default {
    name: 'index',
    fetch({ store }) {
      console.log("页面加载：/pages/index.vue")
      return Promise.all([
        // dispatch（“参数也可以是store里的方法层级调用”）
        store.dispatch('article/fetchList'),
        store.dispatch('announcement/fetchList')
      ]) 
    },
    components: {
      AsideView,
      Carrousel,
      Announcement,
      ArticleList
    },
    computed: {
      article() {
        return this.$store.state.article.list
      },
      announcement() {
        return this.$store.state.announcement
      },
      nextPageParams() {
        return {
          page: this.article.data.pagination.current_page + 1
        }
      }
    },
    methods: {
      loadmoreArticle() {
        this.$store.dispatch('article/fetchList', this.nextPageParams)
      }
    }
  }
</script>

<style lang="scss" scoped>
/*   .home {
    display: flex;
    justify-content: flex-end;

    > .left-side{
      width:10em;
    }

    > .index{
      width: 48em;
      margin: 0 1em 0 1em;
    }
  } */
  .el-col{
    padding-right: 5px !important;
  }

.icon {
  width: 2em;
  height: 2em;
  // vertical-align: -0.15em;
  // fill: currentColor;
  // overflow: hidden;
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
  
</style>