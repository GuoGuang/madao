<template>
  <!-- 文章详情页右侧区域 -->
  <aside id="aside" class="aside">

    <div class="aside-article">
      <p class="title">
        <span v-text="$i18n.text.article.aside"/>
      </p>
      <!-- <empty-box v-if="!articles.length">
        <slot>{{ $i18n.text.article.empty }}</slot>
      </empty-box> -->

      <!-- 作者信息 -->
      <div class="author-info">
        <a href="#" class="user-item">
          <el-avatar
            style="margin-right: 5px;"
            class="avatar"
            size="large"
            src="https://images.nowcoder.com/images/20180218/6617757_1518920311404_48DBFD0E780C1F7DCB9ABC4D5083B2BD@0e_100w_100h_0c_1i_1o_90Q_1x"/>
          <div class="info-box">
            <div class="username">GuoGuang</div>
            <div title="后端Boy@emmmm" class="position">后端Boy@emmmm</div>
          </div>
        </a>
        <div class="stat-item item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caozuo-dianzan"/>
          </svg>
          <span class="content">获得赞数<span class="count">709</span></span>
        </div>
        <div class="stat-item item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-view"/>
          </svg>
          <span class="content">获得阅读数<span class="count">3,226</span></span>
        </div>

      </div>
      <aside-ad ref="asideAd" @slideChange="handleSlideChange" />
    </div>
    <!-- 相关推荐 替换为文章底部动态列表
    <div class="aside-related">

      <related />
    </div>-->

    <div v-scroll-top :class="{ fixed: fixedMode.fixed }" class="aside-fixed-box">
      <client-only>
        <transition name="fade">
          <aside-ad v-if="fixedMode.fixed" :init-index="adIndex" @slideChange="handleChangeAdSwiper" />
        </transition>
      </client-only>
      <tag/>
      <div v-if="isArticlePage" class="aside-tools">
        <div class="full-column" @click="handleSetFullColumn">
          <span v-text="$i18n.text.article.fullcolread"/>
          <span>&nbsp;&nbsp;</span>
          <i class="iconfont icon-read"/>
        </div>
        <div class="full-page" @click="handleFullScreen">
          <span v-text="$i18n.text.article.fullscreenread"/>
          <span>&nbsp;&nbsp;</span>
          <i class="iconfont icon-fullscreen"/>
        </div>
      </div>
      <!-- 文章目录 -->
      <div v-if="isArticlePage" class="aside-dic">
        <directory/>
      </div>
    </div>
  </aside>
</template>

<script>
import AsideAd from './ad'
import Related from './related'

import { mapState } from 'vuex'
import { Route } from '~/constants/system'
import { isArticleDetailRoute, isSearchArchiveRoute } from '~/utils/route'
import Directory from '~/components/widget/directory'
import Tag from './tag'

export default {
  name: 'ArticleMain',
  components: {
    AsideAd,
    Directory,
    Tag,
    Related // 相关推荐
  },

  directives: {
    scrollTop: {
      inserted(element, _, VNode) {
        // context
        const context = VNode.context
        // element
        context.fixedMode.element = element
        // 检测此元素相对于文档Document原点的绝对位置，并且这个值是不变化的
        context.fixedMode.sidebarFixedOffsetTop = element.offsetTop
        // 初始化应用
        context.parseScroll()
        // 监听滚动事件
        window.addEventListener('scroll', context.parseScroll, {
          passive: true
        })
      },
      unbind(element, _, VNode) {
        window.removeEventListener('scroll', VNode.context.parseScroll)
      }
    }
  },
  data() {
    return {
      adIndex: 0,
      renderAd: true,
      keyword: '',
      fixedMode: {
        fixed: false,
        element: null,
        sidebarFixedOffsetTop: 0
      }
    }
  },

  computed: {
    ...mapState({
      articles: state => state.article.hotList.data,
      language: state => state.global.language
    }),
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    isArticlePage() {
      return isArticleDetailRoute(this.$route.name)
    }
  },
  mounted() {
    this.updateAd()
    if (isSearchArchiveRoute(this.$route.name)) {
      this.keyword = this.$route.params.keyword
    }
  },
  methods: {
    updateAd() {
      this.renderAd = false
      this.$nextTick(() => {
        this.renderAd = true
      })
    },
    handleSearch() {
      const keyword = this.keyword
      const paramsKeyword = this.$route.params.keyword
      const isSearchPage = isSearchArchiveRoute(this.$route.name)
      if (keyword && (isSearchPage ? paramsKeyword !== keyword : true)) {
        this.$router.push({ name: Route.SearchArchive, params: { keyword }})
      }
    },
    handleSlideChange(index) {
      this.adIndex = index
    },
    handleChangeAdSwiper(index) {
      this.$refs.asideAd.swiper.slideToLoop(index)
    },
    handleSetFullColumn() {
      this.$store.commit('global/updateThreeColumnsState', true)
    },
    handleFullScreen() {
      this.handleSetFullColumn()
      const docElm = document.documentElement
      const requestEvent =
          docElm.requestFullscreen ||
          docElm.mozRequestFullScreen ||
          docElm.webkitRequestFullScreen ||
          docElm.msRequestFullscreen
      if (requestEvent) requestEvent.bind(docElm)()
    },
    parseScroll() {
      const element = this.fixedMode.element
      const sidebarFixedOffsetTop = this.fixedMode.sidebarFixedOffsetTop
      const windowScrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          window.scrollY ||
          document.body.scrollTop
      const newSidebarFixedOffsetTop = element.offsetTop
      this.fixedMode.sidebarFixedOffsetTop =
          newSidebarFixedOffsetTop !== sidebarFixedOffsetTop &&
            newSidebarFixedOffsetTop !== 77
            ? newSidebarFixedOffsetTop
            : sidebarFixedOffsetTop
      const isFixed = windowScrollTop > sidebarFixedOffsetTop
      this.fixedMode.fixed = isFixed && element
    }
  }
}
</script>

<style lang="scss" scoped>
  $aside-width: 20em;

  aside {
    float: right;
    display: block;
    width: $aside-width;
    margin: 0;

    .icon{
      width: 1.5em;
      height: 1.5em;
    }
    .recommend{
      padding: 15px;
      margin-bottom: 20px;
      border: 1px solid transparent;
      border-radius: 4px;
      background-color: #fcf8e3;
      border-color: #faebcc;
      color: #8a6d3b;
      padding: 15px;
      }

    .aside-article,
    .aside-related,
    .aside-ad,
    .aside-tag {
      background-color: $module-bg;
    }

    >.aside-article {
      overflow: hidden;
      margin-bottom: 1em;
      .author-info{
        .user-item{
          padding: 1.3rem;
          display: flex
        }
        .stat-item{
          margin-bottom: .8rem;
          padding: 0 1.3rem;
        }
      }
      >.title {
        height: 3em;
        line-height: 3em;
        margin: 0;
        padding: 0 0.8em;
        border-bottom: 1px dashed $body-bg;
        text-transform: uppercase;

        .iconfont {
          margin-right: 0.5em;
        }
      }

      >.aside-article-list {
        list-style: none;
        padding: 0.5em 0;
        margin-bottom: 0;
        counter-reset: hot-article-list;

        .item {
          display: block;
          height: 1.9em;
          line-height: 1.9em;
          padding: 0 0.8em;
          margin-bottom: 0.5em;
          color: $text-dark;
          @include text-overflow();

          &:nth-child(1) {
            .index {
              color: $white;
              background-color: $primary-opacity-5;
            }
          }

          &:nth-child(2) {
            .index {
              color: $white;
              background-color: rgba($accent, 0.6);
            }
          }

          &:nth-child(3) {
            .index {
              color: $white;
              background-color: rgba($red, 0.6);
            }
          }

          &:last-child {
            margin: 0;
          }

          .index {
            color: $secondary;
            counter-increment: hot-article-list;
            background-color: $module-hover-bg;
            width: 1.5em;
            height: 1.5em;
            line-height: 1.5em;
            display: inline-block;
            text-align: center;
            margin-right: 0.5em;
            font-size: 0.8em;

            &::before {
              content: counter(hot-article-list);
            }
          }

          .title {
            font-size: 0.9em;

            &:hover {
              margin-left: 0.5em;
              text-decoration: underline;
            }
          }
        }
      }
    }

    .aside-related {
      padding: 0.8em;
      margin-bottom: 1em;
    }

    .aside-ad {
      width: 100%;
      margin-bottom: 1em;

      >.ad-box {
        opacity: 0.88;

        &:hover {
          opacity: 1;
        }

        img {
          max-width: 100%;
        }
      }
    }

    .aside-fixed-box {
      width: $aside-width;

      &.fixed {
        position: fixed;
        top: 5.5em;

      }

      >.aside-tools {
        display: flex;
        justify-content: space-between;

        >.full-column,
        >.full-page {
          display: inline-block;
          width: calc((100% - 1em) / 2);
          height: 3rem;
          line-height: 3rem;
          text-align: center;
          background-color: $module-bg;
          cursor: pointer;

          &:hover {
            background-color: $module-hover-bg;
          }
        }
      }
      >.aside-dic {
          margin-top: 1em
      }

    }
  }
</style>
