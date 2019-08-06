<template>
  <div class="index">

    <div v-if="total > 0" class="article-list" @loadmore="loadmoreArticle">
      <!-- 非首页列表头 -->
      <div v-if="!isIndexRoute" class="article-list-header">
        <list-header />
      </div>
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

    <div v-else class="img-container">
      <img class="error-img" src="/images/svg/no_data.svg">
      <h2 style="color:908c8c;margin:1em">暂无相关内容...</h2>
    </div>

  </div>
</template>

<script>

import ListItem from '~/components/archive/item.vue'
import ListHeader from '~/components/archive/header.vue'
// import underscore from '~/utils/underscore-simple'
import { isIndexRoute } from '~/utils/route'

export default {
  name: 'CategoryArticleList',
  components: {
    ListItem,
    ListHeader
  },
  data() {
    return {
      total: this.$store.state.article.list.data.total
    }
  },
  validate({ params }) {
    return !!params.keyword
  },
  fetch({ store, params }) {
    return store.dispatch('article/fetchList', params)
  },
  head() {
    return {
      title: `${this.defaultParams.keyword} | Search`
    }
  },
  computed: {
    isIndexRoute() {
      return isIndexRoute(this.$route.name)
    },
    article() {
      return this.$store.state.article.list
    },
    defaultParams() {
      return {
        keyword: this.$route.params.keyword
      }
    },
    nextPageParams() {
      return Object.assign({
        page: this.article.data.pagination.current_page + 1
      }, this.defaultParams)
    }
  },
  methods: {
    loadmoreArticle() {
      this.$store.dispatch('article/fetchList', this.nextPageParams)
    },
    toDetail(article) {
      if (this.isMobile) {
        this.$router.push(`/article/${article.id}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list-header {
      margin-bottom: 1em;
      position: relative;
      overflow: hidden;
      background-color: $module-bg-opacity-5;
    }
    .article-list {
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

.img-container{
  padding-top: 6em;
  height: 100%;
  text-align: center;
  color: #8e8e8e;
  .error-img {
    width: 20%;
  }
}

</style>
