<template>
  <!-- 导航 图标参考D:\vueWorkspace\youyd_vue_ssr_platform\assets\sass\iconfont.scss -->
  <div id="nav" class="header-nav">
    <nav is="nav" class="nav-list">
      <nuxt-link :to="'/'" class="item" exact>
        <span v-text="$i18n.nav.home"/>
      </nuxt-link>
      <nuxt-link to="/question" class="item">
        <span v-text="$i18n.nav.question"/>
      </nuxt-link>
      <nuxt-link to="/tweets" class="item">
        <span v-text="$i18n.nav.tweets"/>
      </nuxt-link>
      <nuxt-link to="/book" class="item">
        <span v-text="$i18n.nav.book "/>
      </nuxt-link>
      <nuxt-link to="/events" class="item">
        <span v-text="$i18n.nav.events"/>
      </nuxt-link>
      <!-- <nuxt-link to="/vlog" class="item">
        <span v-text="$i18n.nav.vlog"></span>
      </nuxt-link> -->
      <nuxt-link to="/about" class="item">
        <span v-text="$i18n.nav.about"/>
      </nuxt-link>

    </nav>
  </div>
</template>

<script>
import adConfig from '~/config/ad.config'
export default {
  name: 'LayoutNav',
  computed: {
    adsForPcNav: () => adConfig.pc.nav
  }
}
</script>

<style lang="scss" scoped>
  .header-nav {

    .nav-list {
      padding: 0;
      margin: 0;

      > .item {
        line-height: 3em;
        margin: 0 30px 0 0;
        font-size: 16px;

        &:hover {
          color: $primary;
        }

        > .superscript {
          margin-left: 1rem;

          @keyframes superscript-icon-color {
            0%   { color: chartreuse }
            15%  { color: green }
            30%  { color: red }
            45%  { color: darkviolet }
            60% { color: pink }
            86% { color: blue }
            100% { color: black }
          }

          > .iconfont {
            color: $red;
            transition: color 0s;
            animation: superscript-icon-color 1s infinite;
          }
        }

        &.ad {
          height: 5rem;
          line-height: 5rem;
          margin: 0;
          border-bottom: 1px dashed $module-hover-bg;
        }

        &.taobao {
          color: #ff5000;
          border-top: 1px dashed $module-hover-bg;

          > .iconfont {
            color: #ff5000;
          }
        }

        &.aliyun {
          color: black;
          border-top: 1px dashed $module-hover-bg;

          > .iconfont {
            color: black;
          }
        }

         &.app {
          color: $primary;

          > .iconfont {
            color: $primary;
          }
        }

        &:last-child {
          margin-top: 1rem;
          margin-bottom: 0;
        }

        &.link-active {
          font-weight: bold;
          color: $primary;
          background-color: $module-bg;

          &.guestbook {
            background: linear-gradient(to bottom, $module-bg, transparent);
          }
        }

        .iconfont {
          width: 1em;
          margin-right: 1em;
          display: inline-block;
        }
      }
    }
  }
</style>
