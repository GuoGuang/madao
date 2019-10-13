<template>
  <div class="article-list-item">
    <div :class="{ mobile: isMobile }" class="item-content">
      <div v-if="!isMobile" class="item-thumb">
        <nuxt-link :to="`/article/${article.id}`">
          <span
            :class="{
              self: !article.origin,
              other: article.origin === constants.OriginState.Reprint,
              hybrid: article.origin === constants.OriginState.Hybrid
            }"
            class="item-oirigin"
          >
            <span v-if="!article.origin" v-text="$i18n.text.origin.original"/>
            <span v-else-if="article.origin === constants.OriginState.Reprint" v-text="$i18n.text.origin.reprint"/>
            <span v-else-if="article.origin === constants.OriginState.Hybrid" v-text="$i18n.text.origin.hybrid"/>
          </span>
          <img
            :src="article.image"
            :alt="article.title"
            :title="article.title"
            class="item-thumb-img"
          >
        </nuxt-link>
      </div>
      <div class="item-body">
        <h4 class="item-title">
          <nuxt-link :to="`/article/${article.id}`" :title="article.title" v-text="article.title" />
        </h4>
        <p
          class="item-description"
          style="-webkit-box-orient: vertical;"
          v-html="article.description"
        />
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"/>
            <span>{{ article.createAt | toYMD(language) }}</span>
          </span>
          <span class="visits">
            <i class="iconfont icon-eye"/>
            <span>{{ article.visits || 0 }}</span>
          </span>
          <span class="comment">
            <i class="iconfont icon-comment"/>
            <span>{{ article.comment || 0 }}</span>
          </span>
          <span class="upvote">
            <i :class="{ liked: isLiked }" class="iconfont icon-upvote"/>
            <span>{{ article.upvote || 0 }}</span>
          </span>
          <span class="categories">
            <i class="iconfont icon-menu"/>
            <template v-if="article.category.name">
              <!-- :key="index" v-for="(category, index) in article.category" -->
              <nuxt-link
                :to="`/category/${article.category.id}`"
                v-text="isEnLang ? article.category.name : article.category.name"
              />
            </template>
            <span v-else v-text="$i18n.text.category.empty"/>
          </span>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { /* localUser */ localHistoryLikes } from '~/transforms/local-storage'

export default {
  name: 'ArticleListItem',
  props: {
    article: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isLiked: false
    }
  },
  computed: {
    ...mapState('global', ['imageExt', 'language', 'isMobile', 'constants']),
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    }
  },
  mounted() {
    const historyLikes = localHistoryLikes.get()
    this.isLiked = historyLikes && historyLikes.pages.includes(this.article.id)
  },
  methods: {
    buildThumb(thumb) {
      return thumb
        ? `${thumb}?imageView2/1/w/350/h/238/format/${this.imageExt}/interlace/1/q/75|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/460/fill/I0ZGRkZGRg==/dissolve/23/gravity/SouthWest/dx/15/dy/7|imageslim`
        : `${this.cdnUrl}/images/thumb-article.jpg`
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-list-item {
    margin-bottom: 1em;
    background-color: $module-bg;

    &:last-child {
      margin: 0;
    }

    &:hover {
      background-color: $module-hover-bg;
    }

    > .item-content {
      display: block;
      overflow: hidden;
      height: 9.5em;
      padding: .5em;

      &:hover {

        > .item-thumb {

          .item-oirigin {
            opacity: 1;
          }

          .item-thumb-img {
            @include css3-prefix(opacity, .95);
            @include css3-prefix(transform, translateX(-.5em));
          }
        }
      }

      > .item-thumb {
        float: left;
        width: 12em;
        height: 8.5em;
        overflow: hidden;
        position: relative;

        .item-oirigin {
          height: 2.1rem;
          line-height: 2.1rem;
          left: 0;
          top: 0;
          position: absolute;
          z-index: 9;
          font-size: $font-size-small;
          text-align: center;
          color: $white;
          border-bottom-right-radius: 1px;
          opacity: .4;
          padding: 0 .8rem;
          text-transform: uppercase;

          &.self {
            background-color: rgba($accent, .5);
          }

          &.other {
            background-color: rgba($red, .5);
          }

          &.hybrid {
            background-color: rgba($primary, .5);
          }
        }

        .item-thumb-img {
          min-width: 100%;
          width: calc(100% + .5em);
          max-width: calc(100% + .5em);
          height: auto;
          min-height: 8.5em;
          border-color: transparent;
          background-color: $module-hover-bg;
          @include css3-prefix(opacity, 1);
          @include css3-prefix(transform, translateX(0));
        }
      }

      > .item-body {
          float: right;
          width: 39em;

        > .item-title {
          font-size: 1em;
          font-weight: bold;
          color: $link-hover-color;
          margin-top: .2em;
          margin-bottom: .5em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          > a {
            margin-left: 0;

            &:hover {
              display: inline-block;
              text-decoration: underline;
              margin-left: .5em;
            }
          }
        }

        > .item-description {
          height: 5em;
          margin: 0;
          margin-bottom: 0.3em;
          overflow: hidden;
          font-size: .9em;
          line-height: 1.8em;
          text-overflow: ellipsis;
          @include clamp(3);
        }

        > .item-meta {
          height: 2em;
          display: flex;
          justify-content: space-around;

          align-items: baseline;
          overflow: hidden;
          font-size: .9em;
          line-height: 2em;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: normal;
          .iconfont{
            font-size: 14px;
          }
          > .date {
            text-transform: uppercase;
          }
          > .views {
            min-width: 4rem;
          }

          > .upvote {

            > .liked {
              color: $red;
            }
          }

          > .upvote,
          > .comments {
            min-width: 3em;
          }

          > .date,
          > .views,
          > .comments,
          > .upvote,
          > .tags,
          > .categories {
            margin-right: 1em;

            > .iconfont {
              font-size: 1em;
              margin-right: .4em;
            }
          }

          > .tags,
          > .categories {

            a {
              text-transform: capitalize;
              margin-right: .5em;
            }
          }

          > .tags {
            margin-right: 0;
          }
        }
      }

       &.mobile {
        height: auto;
        padding: 1rem 1em;

        > .item-body {
          width: 100%;
          height: auto;

          > .item-description {
            height: auto;
            margin-bottom: .5em;
          }

          > .item-meta {

            > .date,
            > .views,
            > .comments,
            > .upvote,
            > .tags,
            > .categories {
              margin: 0;
            }
          }
        }
      }
    }
  }
</style>
