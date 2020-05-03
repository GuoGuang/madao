<template>
  <div class="index">
    <article-list :article="article" @loadmore="loadmoreArticle" />
  </div>
</template>

<script>
import ArticleList from '~/components/archive/list'
import Carrousel from '~/components/archive/carrousel'

export default {
  name: 'TagArticleList',
  // validate({ params, store }) {
  //   return params.tag_id && store.state.tag.data.some((tag, index, arr) => {
  //     return Object.is(tag.slug, params.tag_id)
  //   })
  // },
  fetch({ store, params }) {
    return store.dispatch('article/fetchArticles', params)
  },
  head() {
    const slug = this.defaultParams.tag_id || ''
    const title = slug.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    return { title: `${title} | Tag` }
  },
  components: {
    Carrousel,
    ArticleList
  },
  computed: {
    article() {
      return this.$store.state.article.list
    },
    currentTag() {
      return this.$store.state.tag.data.find((tag, index, arr) => {
        return Object.is(tag.slug, this.$route.params.tag_id)
      })
    },
    defaultParams() {
      console.log('defaultParams', this.$route.params)
      return {
        tag_id: this.$route.params.tag_id
      }
    },
    nextPageParams() {
      return Object.assign({
        page: this.article.data.pagination.current_page + 1
      }, this.defaultParams)
    }
  },
  created() {
    if (!this.currentTag) {
      this.$router.back()
    }
  },
  methods: {
    loadmoreArticle() {
      this.$store.dispatch('article/fetchList', this.nextPageParams)
    }
  }
}
</script>
