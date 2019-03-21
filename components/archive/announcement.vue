<template>
  <div class="announcement">
    <color-block-box :left="-59" :gray="true" />
    <div class="title">
      <i class="iconfont icon-radio"/>
    </div>
    <transition name="module" mode="out-in">
      <empty-box v-if="!announcement.data.length" key="empty" class="announcement-empty-box">
        <slot>{{ $i18n.text.announcement.empty }}</slot>
      </empty-box>
      <div v-swiper:swiper="swiperOption" v-else-if="renderSwiper" key="swiper" class="swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(announcement, index) in announcement.data"
            :key="index"
            class="swiper-slide slide-item"
          >
            <div class="content" v-html="markedContent(announcement.content)"/>
          </div>
        </div>
        <div class="swiper-button-prev">
          <i class="iconfont icon-announcement-prev"/>
        </div>
        <div class="swiper-button-next">
          <i class="iconfont icon-announcement-next"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import marked from '~/plugins/marked'
export default {
  name: 'IndexAnnouncement',
  props: {
    announcement: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      renderSwiper: true,
      swiperOption: {
        height: 34,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          clickable: true
        },
        allowTouchMove: false,
        slidesPerView: 1,
        setWrapperSize: true,
        direction: 'vertical'
      }
    }
  },
  activated() {
    this.renderSwiper = true
  },
  deactivated() {
    this.renderSwiper = false
  },
  methods: {
    markedContent(content) {
      return marked(content, null, true)
    }
  }
}
</script>

<style lang="scss">
  $announcement-height: 2.8em;

  .announcement {
    height: $announcement-height;
    line-height: 2.75em;
    font-size: .9em;
    margin-bottom: 1em;
    overflow: hidden;
    position: relative;
    background-color: $module-bg;
    color: $white;

    .announcement-empty-box {
      min-height: auto;
    }

    > .title {
      float: left;
      width: 10%;
      text-align: center;

      > .iconfont {
        font-size: 1.3rem;
      }
    }

    > .swiper {
      float: right;
      width: 90%;

      .slide-item {
        height: $announcement-height;

        > .content {
          width: 100%;
          position: relative;
          @include text-overflow();

          p {
            width: 90%;
            margin: 0;
            @include text-overflow();
          }

          a {
            text-decoration: underline;
          }
        }
      }

      .swiper-button-prev,
      .swiper-button-next {
        position: absolute;
        left: auto;
        right: .5em;
        height: 10px;
        margin: 0;
        width: 2em;
        height: 1em;
        text-align: center;
        line-height: 1em;
        background-image: none;
        color: $module-hover-bg;
        cursor: pointer;

        &:hover {
          color: $text;
        }
      }

      .swiper-button-prev {
        top: .5em;
      }

      .swiper-button-next {
        top: 1.5em;
      }
    }
  }
</style>
