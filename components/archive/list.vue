<template>
  <!-- 页面中间 -->
  <div class="articles">

    <!-- 广告啦 -->
    <transition name="module">
      <component v-if="renderAd" :is="isMobile ? 'adsense-archive-mobile' : 'adsense-archive'" />
    </transition>

    <!-- 列表 -->
    <div class="article-list">
      <transition name="module" mode="out-in">
        <transition-group v-if="article.data.records && article.data.records.length" key="list" name="fade" tag="div">
          <list-item
            v-for="articleItem in article.data.records"
            :key="articleItem.id"
            :article="articleItem"
            @click.native="toDetail(articleItem)"
          />
        </transition-group>
        <empty-box v-else key="empty" class="article-empty-box">
          <slot>{{ $i18n.text.article.empty }}</slot>
        </empty-box>
      </transition>
    </div>

    <!-- 加载更多 -->
    <div class="article-load">
      <color-block-box :left="btnColorBlockLeft" border="left" color="red" />
      <button :disabled="article.fetching || !isCanLoadMore" class="btn-loadmore" @click="$emit('loadmore')">
        <span class="icon">
          <i class="iconfont icon-peachblossom"/>
        </span>
        <span class="text">
          <span v-if="!article.fetching && isCanLoadMore" v-text="$i18n.text.article.loadmore"/>
          <span v-else-if="article.fetching && isCanLoadMore" v-text="$i18n.text.article.loading"/>
          <span v-else-if="!isCanLoadMore" v-text="$i18n.text.article.nomore"/>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import ListItem from './item.vue'
import ListHeader from './header.vue'
// import underscore from '~/utils/underscore-simple'
import { isIndexRoute } from '~/utils/route'
export default {
  name: 'ArticleList',
  components: {
    ListItem,
    ListHeader
  },
  props: {
    article: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      renderAd: true
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.global.isMobile
    },
    isCanLoadMore() {
      const { pageNumber, totalPages } = this.article.data.pagination
      const hasArticles = this.article.data.pagination
      return hasArticles ? (pageNumber + 1 < totalPages) : false
    },
    isIndexRoute() {
      return isIndexRoute(this.$route.name)
    },
    btnColorBlockLeft() {
      return this.isMobile ? 60 : 75
    }
  },
  activated() {
    this.updateAd()
  },
  methods: {
    toDetail(article) {
      if (this.isMobile) {
        this.$router.push(`/article/${article.id}`)
      }
    },
    updateAd() {
      this.renderAd = false
      this.$nextTick(() => {
        this.renderAd = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .articles {

    > .article-list {
      margin-bottom: 1em;
      min-height: 1em;
      overflow: hidden;

      > .article-empty-box {
        background-color: $module-bg;
      }

      > .article-loading {
        display: flex;
        height: 10em;
        background-color: $module-bg;
      }

      > .article-errmsg {
        height: 10em;
        line-height: 10em;
        text-align: center;
        background-color: $module-bg;
        color: rgba(0, 0, 0, 0.38);
      }
    }

    > .article-load {
      position: relative;
      overflow: hidden;

      > .btn-loadmore {
        width: 100%;
        height: 3em;
        padding: 0 2rem;
        line-height: 3em;
        color: $white;
        background-color: $module-bg;
        display: flex;
        justify-content: space-between;

        &:hover {
          background-color: $module-hover-bg;
        }

        &[disabled] {
          opacity: .9;
          background-color: $module-bg-opacity-5;
        }

        @keyframes loadmore-btn-icon-color {
          0% { color: $red }
          100% { color: $accent }
        }

        > .icon {
          > .iconfont {
            animation: loadmore-btn-icon-color 2s infinite;
          }
        }

        > .text {
          text-transform: uppercase;
          font-family: 'webfont-bolder', 'DINRegular';
        }
      }
    }
  }
</style>
