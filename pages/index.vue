<template>
  <!-- 页面Main -->
  <div class="index">
    <!-- 轮播图 -->
    <carrousel :article="article" />
    <!-- 评论，导语 -->
    <announcement :announcement="announcement" />
    <!-- 热门文章列表 -->
    <article-list :article="article" @loadmore="loadmoreArticle" />
  </div>
</template>

<script>
  import ArticleList from '~/components/archive/list'
  import Carrousel from '~/components/archive/carrousel'
  import Announcement from '~/components/archive/announcement'
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
