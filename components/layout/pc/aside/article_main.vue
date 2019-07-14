<template>
  <!-- 文章详情页右侧区域 -->
  <aside id="aside" class="aside">

    <div class="aside-article">
      <p class="title">
        <span v-text="$i18n.text.article.aside"/>
      </p>
      <empty-box v-if="!articles.length">
        <slot>{{ $i18n.text.article.empty }}</slot>
      </empty-box>

      <!-- 作者信息 -->
      <div class="block-body">
        <a href="/user/5aa23691518825556d0db27e" target="_blank" rel="" class="user-item item" style="padding: 1.3rem;display: flex">
          <img style="flex: 0 0 auto;margin-right: 1rem;width: 4.167rem;height: 4.167rem;border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/23237686?v=4">
          <div class="info-box">
            <div class="username">小美娜娜</div><div data-v-f95bea30="" title="前端小可爱 @ emmmm" class="position">前端小可爱 @ emmmm</div>
          </div>
        </a>
        <div style="margin-bottom: .8rem;padding: 0 1.3rem;" class="stat-item item">
        <svg data-v-f95bea30="" data-v-ffc386ce="" xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" class="zan"><g data-v-f95bea30="" data-v-ffc386ce="" fill="none" fill-rule="evenodd" transform="translate(0 .57)"><ellipse data-v-f95bea30="" data-v-ffc386ce="" cx="12.5" cy="12.57" fill="#E1EFFF" rx="12.5" ry="12.57"/> <path data-v-f95bea30="" data-v-ffc386ce="" fill="#7BB9FF" d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"/></g></svg> <span data-v-f95bea30="" data-v-ffc386ce="" class="content">获得赞数<span data-v-f95bea30="" data-v-ffc386ce="" class="count">1,709</span></span></div>
        <div style="margin-bottom: .8rem;padding: 0 1.3rem;" class="stat-item item">
        <svg data-v-f95bea30="" data-v-ffc386ce="" width="25" height="25" viewBox="0 0 25 25" class="icon stat-view-icon"><g data-v-f95bea30="" data-v-ffc386ce="" fill="none" fill-rule="evenodd"><circle data-v-f95bea30="" data-v-ffc386ce="" cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"/> <path data-v-f95bea30="" data-v-ffc386ce="" fill="#7BB9FF" d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"/></g></svg> <span data-v-f95bea30="" data-v-ffc386ce="" class="content">获得阅读数<span data-v-f95bea30="" data-v-ffc386ce="" class="count">32,269</span></span></div>
      </div>

    </div>
    <aside-ad ref="asideAd" @slideChange="handleSlideChange" />
    <!-- <div class="aside-calendar">
      <calendar />
    </div> -->
    <transition name="module">
      <div v-if="renderAd" key="ad" class="aside-ad">
        <adsense-aside />
      </div>
    </transition>

    <!--  <div v-scroll-top :class="{ fixed: fixedMode.fixed }" class="aside-fixed-box">
      <no-ssr>
        <transition name="fade">
          <aside-ad v-if="fixedMode.fixed" :init-index="adIndex" @slideChange="handleChangeAdSwiper" />
        </transition>
      </no-ssr>
      <div class="aside-tag">
        <empty-box v-if="!tags.length">
          <slot>{{ $i18n.text.tag.empty }}</slot>
        </empty-box>
        <ul v-else class="aside-tag-list">
          <nuxt-link v-for="(tag, index) in tags" :key="index" :to="`/tag/${tag.slug}`" tag="li" class="item">
            <a :title="tag.description" class="title">
              <-- <i class="iconfont" :class="tag.extends.find(t => Object.is(t.name, 'icon')).value"
                v-if="tag.extends.find(t => Object.is(t.name, 'icon'))"></i> --
              <i :class="tag.icon" class="iconfont"/>
              <span>{{ isEnLang ? tag.slug : tag.name }}</span>
              <span>({{ tag.tagsCount || 0 }})</span>
            </a>
          </nuxt-link>
        </ul>
      </div>
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
    </div> -->

  </aside>
</template>

<script>
import AsideAd from './ad'
import Calendar from './calendar'
import { mapState } from 'vuex'
import { Route } from '~/constants/system'
import { isArticleDetailRoute, isSearchArchiveRoute } from '~/utils/route'
export default {
  name: 'ArticleMain',
  components: {
    AsideAd,
    Calendar
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
      tags: state => state.tag.data,
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
    .aside-calendar,
    .aside-ad,
    .aside-tag {
      background-color: $module-bg;
    }

    >.aside-article {
      overflow: hidden;
      margin-bottom: 1em;

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

    .aside-calendar {
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

        >.aside-tag {
          max-height: calc(100vh - 8em - 4.5em - 3em - 8em);
          overflow-y: auto;
        }
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

      >.aside-tag {
        width: 19em;
        padding-left: 1rem;
        border-top: 1rem solid transparent;
        border-bottom: 1rem solid transparent;
        margin-bottom: 1em;

        .empty-box {
          padding-right: 0.8em;
          padding-bottom: 0.8em;
        }

        .aside-tag-list {
          list-style: none;
          padding: 0;
          margin: 0;
          overflow: hidden;

          .item {
            display: inline-block;
            margin-right: 1rem;
            margin-bottom: 1rem;
            height: 2em;
            line-height: 2em;
            text-transform: capitalize;
            background-color: $module-hover-bg;

            &:hover {
              background-color: $module-hover-bg-darken-40;
            }

            &:last-child {
              margin: 0;
            }

            .title {
              display: block;
              padding: 0 0.5em;
              font-family: $sans-serif;
            }
          }
        }
      }
    }
  }
</style>
