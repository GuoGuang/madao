
<template>
  <!-- 文章详情页 -->
  <el-row >
    <el-col :span="isPageOneColumns" :xs="24" >
      <article id="article" :class="{ mobile: isMobile }" class="article">

        <div class="article-suspended-panel article-suspended-panel" style="position: fixed;margin-left: -85px;top: 200px">

          <!-- 文章左侧点赞区 -->
          <div :style="{'background-color': `${likeBackgroundColor}`,'background-image':`url(${likeImage})`}" :badge="likeBadge" class="panel-btn with-badge" @click="isLike"/>
          <div :badge="comments.length" class="comment-btn panel-btn with-badge" @click="scrollIntoView"/>
          <div badge="186" class="collect-btn panel-btn share-btn"/>
          <div class="share-title">分享</div>
          <div class="weibo-btn share-btn panel-btn"/>
          <div class="qq-btn share-btn panel-btn"/>
          <div class="wechat-btn share-btn panel-btn"/>

        </div>

        <!-- 文章 -->
        <div ref="detail" class="detail">

          <!-- 导航，头部 -->
          <div class="post-title">
            <div class="breadcrumbs">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">
                  {{ item }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>正文</el-breadcrumb-item>
              </el-breadcrumb>

            </div>

            <!-- 标签 -->
            <div class="tags">
              <a v-for="(tag, index) of articleTags" :key="index" :style="{'background-color': tag.color}" href="#" rel="tag">{{ tag.name }}</a>
            </div>

            <h1 class="title">{{ article.title }}</h1>

            <div class="post_icon">
              <span class="postauthor">
                <img class="avatar" alt="" src="https://images.nowcoder.com/images/20180218/6617757_1518920311404_48DBFD0E780C1F7DCB9ABC4D5083B2BD@0e_100w_100h_0c_1i_1o_90Q_1x" height="96" width="96" style="">
                <a href="#">GuoGuang</a>
              </span>
              <span class="postcat">
                <i class="iconfont icon-menu"/>
                <a href="#">{{ article.categoryId }}</a>
              </span>
              <span class="postclock">
                <i class="iconfont icon-time"/>
                {{ article.createAt | timestampToTime }}
              </span>
              <span class="posteye">
                <i class="iconfont icon-view"/> {{ Math.round(Math.random()*100) }}
              </span>

            </div>

          </div>

          <transition name="module">
            <div
              v-if="!isFetching"
              :class="{
                self: article.origin === constants.OriginState.Original,
                other: article.origin === constants.OriginState.Reprint,
                hybrid: article.origin === constants.OriginState.Hybrid
              }"
              class="oirigin">
              <span v-if="article.origin === constants.OriginState.Original" v-text="$i18n.text.origin.original"/>
              <span v-else-if="article.origin === constants.OriginState.Reprint" v-text="$i18n.text.origin.reprint"/>
              <span v-else-if="article.origin === constants.OriginState.Hybrid" v-text="$i18n.text.origin.hybrid"/>
            </div>
          </transition>
          <transition name="module" mode="out-in" @after-enter="contentAnimatieDone">
            <div v-if="isFetching" key="skeleton" class="skeleton">
              <client-only>
                <skeleton-line class="title" />
                <skeleton-paragraph :lines="9" class="content" line-height="1.2em" />
              </client-only>
            </div>
            <div v-else key="knowledge" class="knowledge">

              <div id="article-content" class="content" v-html="articleContent"/>
              <transition name="module" mode="out-in" @after-leave="readmoreAnimatieDone">
                <div v-if="isCanReadMore" class="readmore">
                  <button :disabled="isReadMoreLoading" class="readmore-btn" @click="readMore()">
                    <span>{{ isReadMoreLoading ? $i18n.text.article.rendering : $i18n.text.article.readAll }}</span>
                    <i class="iconfont icon-next-bottom"/>
                  </button>
                </div>
              </transition>
            </div>
          </transition>
        </div>
        <!--   <client-only>
          <div class="ad">
            <transition name="module" mode="out-in">
              <skeleton-paragraph v-if="isFetching" key="skeleton" :lines="4" class="ad-skeleton" line-height="1em" />
              <adsense-article v-else-if="renderAd" key="adsense" />
            </transition>
          </div>
        </client-only>
        <div class="share">
          <transition name="module" mode="out-in">
            <div v-if="isFetching" key="skeleton" class="skeleton">
              <skeleton-base
                v-for="item in (isMobile ? 3 : 10)"
                :style="{ width: `calc((100% - (1em * ${isMobile ? 2 : 9})) / ${isMobile ? 3 : 10})` }"
                :radius="0"
                :key="item" />
            </div>
            <share-box v-else key="share" class="article" />
          </transition>
        </div> -->
        <transition name="module" mode="out-in">
          <div key="skeleton" class="disclaimer">
            <p><strong>免责声明</strong></p>
            <p>本站提供的一切软件、教程和内容信息仅限用于学习和研究目的；不得将以上内容用于商业或者非法用途，否则，一切后果由用户自己承担。
            本站软件、资源来自网络收集整理，版权争议与本站无关。您必须在下载后的24个小时之内， 从您的电脑或手机中彻底删除上述内容。
            如果您喜欢该软件和资源，请支持正版，得到更好的正版服务。
            我们非常重视版权问题，如有侵权请邮件与我们
            <a href="mailto:guoguang0536@gmail.com" target="_blank"><strong>联系处理</strong></a>。敬请谅解！</p>
          </div>
        </transition>

        <transition name="module" mode="out-in">
          <div v-if="isFetching" key="skeleton" class="metas">
            <skeleton-paragraph :align="true" :lines="4" line-height="1.2em" />
          </div>
          <div v-else key="metas" class="metas">
            <p v-if="isEnLang" class="item">
              <span>Article created at</span>
              <span>&nbsp;</span>
              <nuxt-link :title="buildDateTitle(article.createAt)" :to="buildDateLink(article.createAt)">
                <span>{{ buildDateTitle(article.createAt) }}</span>
              </nuxt-link>
              <span>&nbsp;in category&nbsp;</span>
              <!-- <nuxt-link :key="index" :to="`/category/${category.slug}`" :title="category.description || category.name"
            v-for="(category, index) in article.category">
            <span>{{ category.name }}</span>
            <span v-if="article.category.length && article.category[index + 1]">、</span>
          </nuxt-link>
          <span v-if="!article.category.length">no catgory</span>
          <span>,&nbsp;&nbsp;</span>
          <span>{{ article.meta.views || 0 }}</span>
          <span>&nbsp;Views</span> -->
            </p>
            <p v-else class="item">
              <span>本文于</span>
              <span>&nbsp;</span>
              <nuxt-link :title="buildDateTitle(article.createAt)" :to="buildDateLink(article.createAt)">
                <span>{{ buildDateTitle(article.createAt) }}</span>
              </nuxt-link>
              <span>&nbsp;发布&nbsp;</span>
              <!-- <span :key="index" v-for="(category, index) in article.category">
            <nuxt-link :to="`/category/${category.slug}`" :title="category.description || category.name">
              <span>{{ isEnLang ? category.slug : category.name }}</span>
            </nuxt-link>
            <span v-if="article.category.length && article.category[index + 1]">、</span>
          </span>
          <span v-if="!article.category.length">未知</span>
          <span>&nbsp;分类下，当前已被围观&nbsp;</span>
          <span>{{ article.meta.views || 0 }}</span>
          <span>&nbsp;次</span> -->
            </p>
            <!-- <p class="item">
          <span class="title" :class="language">{{ isEnLang ? 'Related tags:' : '相关标签：' }}</span>
          <span v-if="!article.tag.length" v-text="$i18n.text.tag.empty"></span>
          <span :key="index" v-for="(tag, index) in article.tag">
            <nuxt-link :to="`/tag/${tag.slug}`" :title="tag.description || tag.name">
              <span>{{ isEnLang ? tag.slug : tag.name }}</span>
            </nuxt-link>
            <span v-if="article.tag.length && article.tag[index + 1]">、</span>
          </span>
        </p> -->
            <p class="item">
              <span :class="language" class="title">{{ isEnLang ? 'Article Address:' : '永久地址：' }}</span>
              <span class="site-url" @click="copyArticleUrl">
                <span>https://codeway.fun/article/{{ article.id }}</span>
              </span>
            </p>
            <div class="item">
              <span :class="language" class="title">{{ isEnLang ? 'Copyright Clarify:' : '版权声明：' }}</span>
              <span v-if="!isEnLang">
                <span>自由转载-署名-非商业性使用</span>
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              </span>
              <a
                target="_blank"
                rel="external nofollow noopenter"
                href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh">Creative Commons BY-NC 3.0 CN</a>
            </div>
          </div>
        </transition>

        <!-- 推荐阅读 -->
        <transition name="module" mode="out-in">
          <div v-if="isFetching" key="skeleton" class="related">
            <skeleton-paragraph v-if="isMobile" :lines="4" class="skeleton" line-height="1em" />
            <ul v-else class="skeleton-list">
              <skeleton-base v-for="item in 4" :key="item" class="article" />
            </ul>
          </div>
          <div v-else-if="article.related && article.related.length" key="related" class="related">
            <div v-swiper:swiper="swiperOption" v-if="!isMobile" class="article-list swiper">
              <div class="swiper-wrapper">
                <div v-for="(article, index) in relatedArticles" :key="index" class="swiper-slide item">
                  <a
                    v-if="article.ad"
                    :href="article.link"
                    class="item-box"
                    rel="external nofollow noopener"
                    target="_blank">
                    <img :src="article.img" :alt="article.title" class="thumb">
                    <span class="title">{{ article.title }}</span>
                  </a>
                  <nuxt-link v-else :to="`/article/${article.id}`" :title="article.title" class="item-box">
                    <img :src="buildThumb(article.thumb)" :alt="article.title" class="thumb">
                    <span class="title">{{ article.title }}</span>
                  </nuxt-link>
                </div>
              </div>
            </div>
            <ul v-else class="article-list">
              <li v-for="(article, index) in relatedArticles" :key="index" class="item">
                <a
                  v-if="article.ad"
                  :href="article.link"
                  class="item-link"
                  rel="external nofollow noopener"
                  target="_blank">
                  <span class="sign">《</span>
                  <span class="title">{{ article.title }}</span>
                  <span class="sign">》</span>
                  <small class="tip">- 狠狠地阅读</small>
                </a>
                <nuxt-link v-else :to="`/article/${article.id}`" :title="`「 ${article.title} 」- 继续阅读`" class="item-link">
                  <span class="sign">《</span>
                  <span class="title">{{ article.title }}</span>
                  <span class="sign">》</span>
                  <small class="tip">- 继续阅读</small>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </transition>

        <div class="comment">
          <comment :comments="comments" :article-id="article.id"/>
          <!--          <gitalk/>-->
        </div>
      </article>
    </el-col>

    <div v-if="!isMobile && !isOneColumns" class="main-right" >
      <el-col :span="6" class="right-list">
        <transition name="aside">
          <aside-view key="aside" ref="aside"/>
        </transition>

      </el-col>
    </div>
  </el-row>

</template>

<script>
import { mapState } from 'vuex'
import { isBrowser } from '~/environment/esm'
// import lozad from '~/plugins/lozad'
import marked from '~/plugins/marked'
import adConfig from '~/config/ad.config'
import ShareBox from '~/components/widget/share'
import AsideView from '~/components/layout/pc/aside/article_main'

import { timestampToTime } from '@/utils/date'

import comment from './comment'
import gitalk from './gitalk' // gitalk 评论插件

export default {
  name: 'ArticleDetail',
  components: {
    ShareBox,
    AsideView,
    comment,
    gitalk
  },
  filters: {
    timestampToTime(val) {
      return timestampToTime(val)
    }
  },
  data() {
    return {
      likeImage: 'https://b-gold-cdn.xitu.io/v3/static/img/zan.b4bb964.svg',
      isLikeStatus: false,
      likeBackgroundColor: '',
      likeBadge: 0,
      asideImage: {
        disLikeImage: 'https://b-gold-cdn.xitu.io/v3/static/img/zan.b4bb964.svg',
        disLikeBackgroundColor: '',
        likeImage: 'https://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/icode/image/zan.b4bb964.svg',
        likeBackgroundColor: '#f9eac8'
      },
      swiperOption: {
        setWrapperSize: true,
        simulateTouch: false,
        mousewheel: {
          sensitivity: 1
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        observeParents: true,
        grabCursor: true,
        slidesPerView: 'auto'
      },
      lozadObserver: null,
      isReadMoreLoading: false,
      renderAd: true
    }
  },
  validate({ params, store }) {
    return params.article_id && !isNaN(Number(params.article_id))
  },

  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('article/fetchDetail', params), // .catch(err => {
      // error({ statusCode: 404, message: '众里寻他 我已不再' })
      // }),
      store.dispatch('comment/fetchList', params)
    ])
  },

  head() {
    const { article } = this
    return {
      title: article.title || '...',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          // content: (article.keywords ? article.keywords.join(',') : article.title) || ''
          content: (article.keywords ? article.keywords : article.title) || ''
        },
        { hid: 'description', name: 'description', content: article.description }
      ]
    }
  },
  computed: {
    ...mapState('global', [
      'onWebrtc', 'onWallpaper', 'onPowerSavingMode', 'isMountedBarrage', 'isOneColumns'
    ]),
    ...mapState({
      constants: state => state.global.constants,
      language: state => state.global.language,
      tags: state => state.tag.data,
      imageExt: state => state.global.imageExt,
      article: state => state.article.detail.data,
      comments: state => state.comment.data,
      isFetching: state => state.article.detail.fetching,
      isMobile: state => state.global.isMobile
    }),

    isPageOneColumns() {
      return !this.isOneColumns ? 17 : 24
    },
    isMobile() {
      return this.$store.state.global.isMobile
    },
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    routeArticleId() {
      return Number(this.$route.params.article_id)
    },
    isContentTooMore() {
      const { content } = this.article
      return content && content.length > 13688
    },
    isCanReadMore() {
      return this.isContentTooMore && !this.article.isRenderedFullContent
    },
    articleTags() {
      const { tags } = this.article
      return tags
    },
    articleContent() {
      const { content, isRenderedFullContent } = this.article
      if (!content) {
        return ''
      }
      const hasTags = this.tags && this.tags.length
      // 正常长度，正常渲染
      if (!this.isContentTooMore || isRenderedFullContent) {
        // return marked(content, hasTags ? this.tags : false, true)
        return marked(content, hasTags ? this.tags : false, true)
      }

      // 内容过多，进行分段处理，避免渲染时间太长
      let shortContent = content.substring(0, 11688)
      const lastH4Index = shortContent.lastIndexOf('\n####')
      const lastH3Index = shortContent.lastIndexOf('\n###')
      const lastH2Index = shortContent.lastIndexOf('\n##')
      const lastCodeIndex = shortContent.lastIndexOf('\n\n```')
      const lastLineIndex = shortContent.lastIndexOf('\n\n**')
      const lastBarIndex = shortContent.lastIndexOf('\|')
      const lastQuoteIndex = shortContent.lastIndexOf('>')
      const lastReadindex = Math.max(lastH4Index, lastH3Index, lastH2Index,
        lastCodeIndex, lastLineIndex, lastBarIndex, lastQuoteIndex)
      // console.log(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex, 'min', lastReadindex)
      shortContent = shortContent.substring(0, lastReadindex)
      return marked(shortContent, hasTags ? this.tags : false, true)
    },
    relatedArticles() {
      const relateds = [...this.article.related].slice(0, 10)
      const adArticle = adConfig.common.articleRelated(this.tags, this.isMobile)
      adArticle && relateds.splice(2, 0, adArticle)
      return relateds
    }
  },
  mounted() {
    if (isBrowser) {
      this.observeLozad()
    }
  },
  activated() {
    this.updateAd()

    this.likeBadge = this.article.upvote
    // 页面初始化时是否勾选喜欢
    if (localStorage.getItem('article_' + this.article.id)) {
      this.likeImage = this.asideImage.likeImage
      this.likeBackgroundColor = this.asideImage.likeBackgroundColor
      this.isLikeStatus = !this.isLikeStatus
    }
  },
  deactivated() {
    this.lozadObserver = null
    this.likeImage = 'https://b-gold-cdn.xitu.io/v3/static/img/zan.b4bb964.svg'
    this.isLikeStatus = false
    this.likeBackgroundColor = ''
    this.likeBadge = 0
  },
  methods: {
    /**
     * 喜欢/取消喜欢
     */
    isLike() {
      if (this.isLikeStatus) {
        // 取消喜欢
        this.likeImage = this.asideImage.disLikeImage
        this.likeBackgroundColor = this.asideImage.disLikeBackgroundColor
        this.likeBadge = this.likeBadge - 1
        this.$store.dispatch('article/unLikeArticle', this.article.id)
        localStorage.getItem('article_' + this.article.id)
      } else {
        this.likeImage = this.asideImage.likeImage
        this.likeBackgroundColor = this.asideImage.likeBackgroundColor
        this.likeBadge = this.likeBadge + 1
        this.$store.dispatch('article/likeArticle', this.article.id)
      }
      this.isLikeStatus = !this.isLikeStatus
    },

    /**
     * 跳转至评论锚点。
     * 平滑滚动，时长500ms，每10ms一跳，共50跳
     *
     */
    scrollIntoView() {
      const anchor = this.$el.querySelector('.comment')
      const total = anchor.offsetTop
      // 获取当前滚动条与窗体顶部的距离
      let distance = document.documentElement.scrollTop || document.body.scrollTop
      // 计算每一小段的距离
      const step = total / 50;
      (function smoothDown() {
        if (distance < total) {
          distance += step
          // 移动一小段
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          // 设定每一次跳动的时间间隔为10ms
          setTimeout(smoothDown, 10)
        } else {
          // 限制滚动停止时的距离
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      })()
    },

    readMore() {
      this.isReadMoreLoading = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.$store.commit('article/updateDetailRenderedState', true)
          this.isReadMoreLoading = false
          this.$refs.aside.refresh()
        }, 0)
      })
    },
    updateAd() {
      this.renderAd = false
      this.$nextTick(() => {
        this.renderAd = true
      })
    },
    contentAnimatieDone() {
      this.observeLozad()
    },
    readmoreAnimatieDone() {
      this.observeLozad()
    },
    observeLozad() {
      /* const contentElement = this.$refs.detail.querySelector('#article-content')
      const lozadElements = contentElement && contentElement.querySelectorAll('.lozad')
      if (!lozadElements || !lozadElements.length) {
        return false
      }
      // console.log('计算出的文档:', this.$refs.detail, contentElement, lozadElements)
      this.lozadObserver = lozad(lozadElements, {
        loaded: element => element.classList.add('loaded')
      })
      this.lozadObserver.observe()
      // console.log('重新监听 observer', this.lozadObserver)*/
    },
    copyArticleUrl() {
      if (this.article.title) {
        this.$root.$copyToClipboard(`https://codeway.fun/article/${this.article.id}`)
      }
    },
    buildThumb(thumb) {
      return thumb
        ? `${thumb}?imageView2/1/w/300/h/230/format/${this.imageExt}/interlace/1/q/80|imageslim`
        : `${this.cdnUrl}/images/thumb-releted.jpg`
    },
    buildDateTitle(date) {
      if (!date) {
        return date
      }
      date = new Date(date)
      const am = this.isEnLang ? 'AM' : '上午'
      const pm = this.isEnLang ? 'PM' : '下午'
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const meridiem = date.getHours() > 11 ? pm : am
      return `${year}/${month}/${day} ${meridiem}`
    },
    buildDateLink(date) {
      if (date) {
        date = new Date(date)
        const year = date.getFullYear()
        let month = (date.getMonth() + 1).toString()
        let day = date.getDate().toString()
        month = month.length === 1 ? `0${month}` : month
        day = day.length === 1 ? `0${day}` : day
        return `/date/${year}-${month}-${day}`
      } else {
        return `/date/2020-02-02`
      }
    }
  }
}
</script>

<style lang="scss">
  .article {

    &.mobile {

      >.metas {
        line-height: 2.3em;

        >.item {
          margin: 0;
          padding: 0;
          border: none;

          >.title.en {
            width: auto;
            margin-right: 1rem;
          }
        }
      }

      >.related {
        height: auto;

        >.article-list {
          padding: 0;
          margin: 0;
          list-style: none;
          overflow: hidden;
          opacity: .9;

          >.item {

            >.item-link {
              display: flex;
              width: 100%;
              height: 2.2em;
              line-height: 2.2em;

              >.title {
                max-width: 70%;
                display: inline-block;
                @include text-overflow();
              }

              >.tip {
                display: inline-block;
              }
            }
          }
        }
      }

      >.detail {

        >.oirigin {
          font-size: $font-size-base;
        }

        >.knowledge {

          >.content {

            pre {
              padding-left: 0;

              >.code-lines {
                display: none;
              }
            }
          }
        }
      }
    }

    .share-btn{
      cursor: no-drop;
    }

    >.detail,
    >.ad,
    >.metas,
    >.related {
      margin-bottom: 1em;
      background-color: $module-bg;
    }

    >.ad {

      .ad-skeleton {
        padding: 1em;
      }
    }

    >.detail {
      padding: 2em 2em;
      position: relative;
      overflow: hidden;
      height: auto;
      transition: height .25s;

      .post-title{
        .iconfont{
          font-size: 14px;
        }
        position: relative;
        margin: 0 0 35px;
        padding: 0 0 35px;
        border-bottom: 1px solid #e7e7e7;
        .breadcrumbs{
          padding-left: 1em;
          border-top: 0;
          margin-bottom: 25px;
          box-shadow: none;
        }
        .tags{
          margin-bottom: 10px;
          a{
            padding: 4px 8px;
            background-color: #19B5FE;
            color: #fff;
            font-size: 12px;
            line-height: 1;
            font-weight: 400;
            margin: 3px 5px 3px 0;
            border-radius: 2px;
            display: inline-block;
          }
        }
        .title{
          position: relative;
          font-size: 26px;
          display: block;
          letter-spacing: 2px;
          font-weight: 600;
          margin: 0 0 25px;
        }

        .post_icon{
          color: #748594;
          font-size: 13px;
          display: block;
          span{
            margin-right: 10px;
            display: inline-block;
            position: relative;
          }
          .postauthor{
            img{
              width: 30px;
              height: 30px;
              border-radius: 50%;
              -moz-border-radius: 50%;
              -webkit-border-radius: 50%;
              border: 1px solid rgba(216,216,216,0.81);
              display: inline-block;
              margin-right: 10px;
            }
          }
        }
      }

      >.skeleton {

        .title {
          width: 60%;
          height: 26px;
          margin: 2rem auto;
        }

        .content {
          margin-top: 3rem;
          margin-bottom: 1rem;
        }
      }

      >.oirigin {
        position: absolute;
        top: -0.9rem;
        left: -2.4rem;
        transform: rotate(-45deg);
        width: 7rem;
        height: 4rem;
        line-height: 5.8rem;
        text-align: center;
        transform-origin: center;
        color: $white;
        font-weight: bold;
        font-size: $font-size-small;
        text-transform: uppercase;

        &.self {
          background-color: rgba($accent, .8);
        }

        &.other {
          background-color: rgba($red, .8);
        }

        &.hybrid {
          background-color: rgba($primary, .8);
        }
      }

      >.knowledge {

        >.title {
          text-align: center;
          margin: 1em 0 1.5em 0;
          font-weight: 700;
        }

        >.content {
          iframe {
            width: 100%;
            margin-bottom: 1em;
            background-color: black;
          }

          a {
            font-weight: bold;
            margin: 0 .1em;

            &.image-link {
              margin: 0;
            }

            &:hover {
              text-decoration: underline;
            }
          }

          img {
            max-width: 100%;
            margin: 0 auto;
            display: block;
            text-align: center;
            border-radius: $radius;
            border: .5rem solid $module-hover-bg;
            transition: all .25s;
            opacity: .9;
            cursor: pointer;

            &:hover {
              opacity: 1;
              transition: all .25s;
            }
          }

          p {
            line-height: 2.2em;
            /*text-indent: 2em;*/
            margin-bottom: 1em;

            &.text-center {
              text-align: center;
            }

            &.text-right {
              text-align: right;
            }
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 1.5rem 0;
            padding-left: 0;
            line-height: 1.8em;
            font-weight: 700;
            text-indent: 0;
          }

          blockquote {

            p {
              // text-indent: 0em;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }

          ul {
            list-style-type: square;
          }

          ul,
          ol {

            >li {
              margin-left: 2em;
              line-height: 1.8em;
              padding: .5em .8em;

              &:hover {
                background-color: $module-hover-bg;
              }

              >p {
                text-indent: 0;
              }

              >ul {

                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }

          code {
            color: #bd4147;
            padding: .3em .5em;
            margin: 0 .5em;
            border-radius: $radius;
            background-color: $module-hover-bg;
          }

          pre {
            border-radius: 5px;
            box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            $code-line-height: 2.8em;
            $code-line-width: 2.5em;
            $code-line-line-height: 1.6em;
            display: block;
            position: relative;
            overflow: hidden;
            margin-bottom: 1em;
            padding-left: $code-line-width;
            background-color: rgba(0, 0, 0, 0.8);

            &:before {
              content: '';
              display: block;
              background: url(https://yd-note.oss-cn-beijing.aliyuncs.com/mac-tag.png);
              width: 100%;
              background-size: 40px;
              background-repeat: no-repeat;
              margin-bottom: -7px;
              border-radius: 5px;
              background-position: 10px 10px;
              height: $code-line-height;
              line-height: $code-line-height;
              font-size: 1em;
              position: absolute;
              top: 0;
              left: 0;
              background-color: transparent;
            }

            >.code-lines {
              position: absolute;
              left: 0;
              top: $code-line-height;
              margin: 0;
              width: $code-line-width;
              height: calc(100% - #{$code-line-height});
              text-align: center;
              background-color: transparent;

              >.code-line-number {
                padding: 0;
                position: relative;
                list-style-type: none;
                line-height: $code-line-line-height;
                transition: background-color .05s;

                &:hover {
                  &:before {
                    display: block;
                    opacity: 1;
                    visibility: visible;
                  }
                }

                &:before {
                  content: '';
                  height: $code-line-line-height;
                  position: absolute;
                  top: 0;
                  left: $code-line-width;
                  width: 66em;
                  background-color: rgba(154, 154, 154, 0.2);
                  display: none;
                  visibility: hidden;
                  opacity: 0;
                }
              }
            }

            >code {
              margin: 0;
              padding: 0 1em 1em 1em;
              // padding-top: $code-line-height + 1em;
              float: left;
              width: 100%;
              height: 100%;
              display: block;
              line-height: $code-line-line-height;
              color: rgba(255, 255, 255, 0.87);
              background-color: transparent;
            }
          }
        }

        @keyframes readmorebtn {
          0% {
            transform: translate3d(0, 0, 0);
            background-color: $module-hover-bg;
          }

          25% {
            transform: translate3d(0, .5rem, 0);
            background-color: $primary;
            color: white;
          }

          50% {
            transform: translate3d(0, 0, 0);
            background-color: $module-hover-bg;
          }

          75% {
            transform: translate3d(0, .5rem, 0);
            background-color: $primary;
            color: white;
          }

          100% {
            transform: translate3d(0, 0, 0);
            background-color: $module-hover-bg;
          }
        }

        >.readmore {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: .8rem;

          >.readmore-btn {
            width: 80%;
            text-align: center;
            height: 3rem;
            line-height: 3rem;
            background-color: $module-hover-bg;
            animation: readmorebtn 4s linear infinite;

            &[disabled] {
              cursor: no-drop;
            }

            &:hover {
              background-color: $primary !important;
              color: white !important;
            }

            >.iconfont {
              margin-left: .5rem;
            }
          }
        }
      }
    }

    .share {
      padding: 1em;
      margin-bottom: 1em;
      background-color: $module-bg;

      >.skeleton {
        display: flex;
        justify-content: space-between;
        height: 3rem;
      }
    }

    >.metas {
      padding: 1em;

      >.item {
        border-left: solid .5em $body-bg;
        padding-left: 1rem;
        word-break: break-all;

        a:hover {
          text-decoration: underline;
        }

        >.title.en {
          width: 11rem;
          display: inline-block;
        }

        .site-url {
          text-decoration: underline;
          cursor: pointer;
          color: $link-color;

          &:hover {
            color: $link-hover-color;
          }
        }
      }
    }

    >.related {
      padding: 1em 0;
      border-width: 0 1em;
      border-color: transparent;
      overflow: hidden;
      height: 10em;

      >.skeleton-list {
        padding: 0;
        margin: 0;
        height: 100%;
        overflow: hidden;
        display: flex;

        .article {
          width: calc((100% - 2rem) / 4);
          margin-right: 1rem;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      >.swiper.article-list {

        >.swiper-wrapper {
          height: 8em;
          overflow: hidden;

          >.swiper-slide.item {
            width: auto;
            margin-right: 1rem;

            &:last-child {
              margin-right: 0;
            }

            >.item-box {
              display: block;
              position: relative;
              overflow: hidden;
              width: auto;
              height: 100%;
              opacity: .8;

              &:hover {

                .thumb {
                  opacity: 1;
                  @include css3-prefix(transform, scale(1.2) rotate(2deg));
                  @include css3-prefix(transition, all 1s);
                }

                >.title {
                  opacity: 1;
                }
              }

              >.thumb {
                width: auto;
                height: 100%;
                @include css3-prefix(transform, scale(1) rotate(0deg));
                @include css3-prefix(transition, all 1s);
              }

              >.title {
                position: absolute;
                bottom: 0;
                left: 0;
                width: calc(100% - 1em);
                height: 2em;
                line-height: 2em;
                background-color: $module-hover-bg-darken-10;
                padding: 0 .5em;
                color: $white;
                opacity: .4;
                font-size: .9em;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }

  .like-btn{

  }
  .like-btn:hover {
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/zan-hover.91657d6.svg)
}
  .comment-btn{
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/comment.7fc22c2.svg);
  }
  .comment-btn:hover {
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/comment-hover.1074e67.svg)
}
  .collect-btn{
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/collect.1db122b.svg)
  }
  .collect-btn:hover {
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/collect-hover.5d446a7.svg)
}
  .weibo-btn{
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/weibo.2076a57.svg)
  }
  .weibo-btn:hover {
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/weibo-hover.9abf502.svg)
}
  .qq-btn{
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/qq.0834411.svg)
  }
  .qq-btn:hover {
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/qq-hover.d11dd84.svg)
}
  .wechat-btn{
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/wechat.63e1ce0.svg)
  }
  .wechat-btn:hover {
    background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/wechat-hover.c8ce019.svg)
}

  .with-badge:after {
    content: attr(badge);
    position: absolute;
    top: 0;
    left: 75%;
    padding: .1rem .4rem;
    font-size: 1rem;
    text-align: center;
    line-height: 1;
    white-space: nowrap;
    color: #fff;
    background-color: #b2bac2;
    border-radius: .7rem;
    transform-origin: left top;
    transform: scale(.75)
}
.panel-btn {
    background-position:53% 46%;
    position:relative;
    margin-bottom:.75rem;
    width: 3rem;
    height: 3rem;
    background-color: #fff;
    background-position: 50%;
    background-repeat: no-repeat;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.04);
    cursor: pointer
}
.panel-btn:hover {

}
.share-title{
    margin: 2.5rem 0 1rem;
    font-size: 1rem;
    text-align: center;
    color: #c6c6c6;
    user-select: none;
}

  .disclaimer:after, .disclaimer:before {
    position: absolute;
    display: block;
    width: 1pc;
    height: 14px;
    content: '';
  }
  .disclaimer:before {
    top: 20px;
    left: 20px;
    background: url(/images/blockquote.png) no-repeat 0 0;
  }
  .disclaimer:after {
    right: 20px;
    bottom: 20px;
    background: url(/images/blockquote.png) no-repeat -1pc 0;
  }
  .disclaimer:after, .disclaimer:before {
    position: absolute;
    display: block;
    width: 1pc;
    height: 14px;
    content: '';
  }
  .disclaimer {
    position: relative;
    margin: 25px 0 15px;
    padding: 45px 45px 30px;
    border-color: #c0c6cc;
    background-color: $module-bg;
    font-family: Lantinghei SC,Open Sans,Arial,Hiragino Sans GB,Microsoft YaHei,\\5fae\8F6F\96c5\9ED1,STHeiti,WenQuanYi Micro Hei,SimSun,sans-serif;
    p:first-child{
      font-size: 16px;
    }
    p{
      display: block;
      line-height: 30px;
      margin-bottom: 15px;
    }
  }
</style>
