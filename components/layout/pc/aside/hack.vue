<template>
  <!-- 页面body区-右侧边栏 -->
  <aside id="aside" class="aside">
    <!-- 今日热议 -->
    <div class="aside-article">
      <p class="title">
        <i class="iconfont icon-hotfill"/>
        <span v-text="$i18n.text.article.hotHack"/>
      </p>
      <empty-box v-if="!articles || articles.length == 0">
        <slot>{{ $i18n.text.article.empty }}</slot>
      </empty-box>
    </div>
    <!-- GooGle广告 -->
    <aside-ad ref="asideAd" @slideChange="handleSlideChange" />

  </aside>
</template>

<script>
import AsideAd from './ad'
import Calendar from './calendar'
import { mapState } from 'vuex'
import { isArticleDetailRoute, isSearchArchiveRoute } from '~/utils/route'
import Tag from './tag'
import soul from '~/data/soul'

export default {
  name: 'PcAside',
  components: {
    AsideAd,
    Calendar,
    Tag
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
      soul: soul[Math.floor(Math.random() * soul.length)].content, // 毒鸡汤
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
    randomSoul() {
      this.soul = soul[Math.floor(Math.random() * soul.length)].content
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
    }
  }
</style>
