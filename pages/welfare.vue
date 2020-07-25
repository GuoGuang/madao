<template>
  <el-row>
    <el-col :xs="24" :sm="17" :md="17" :lg="17" :xl="17" >
      <div class="main">
        <article-list :article="article" @loadmore="loadmoreArticle" />
      </div>
    </el-col>
    <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="right-list">
      <div class="main-right">
        <aside-view key="aside"/>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import ArticleList from '~/components/archive/list'
import AsideView from '~/components/layout/pc/aside/welfare'

export default {
  name: 'Welfare',
  fetch({ store }) {
    return Promise.all([
      store.dispatch('article/fetchList', { 'categoryId': '3' })
      // dispatch（“参数也可以是store里的方法层级调用”）
      // store.dispatch('article/fetchList'),
      // store.dispatch('announcement/fetchList')
    ])
  },
  components: {
    AsideView,
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

.img-container{
  padding-top: 6em;
  height: 100%;
  text-align: center
}
.img4 .iblock {
	display:inline-block;
	height:100%;
	width:0;
	vertical-align:middle
}
.error-img {
  width: 50%;
}

.icon {
  width: 2em;
  height: 2em;
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
