<template>
  <!-- 导航 图标参考D:\vueWorkspace\youyd_vue_ssr_platform\assets\sass\iconfont.scss -->
  <div id="nav" class="header-nav">
    <nav is="nav" class="nav-list">
      <nuxt-link :to="'/'" class="item" exact>
        <i class="iconfont youyd-icon-home"/>
        <span >首页</span>
      </nuxt-link>
      <nuxt-link to="/technology" class="item">
        <i class="iconfont youyd-icon-shandian"/>
        <span v-text="$i18n.nav.technology"/>
      </nuxt-link>
      <nuxt-link to="/software" class="item">
        <i class="iconfont youyd-icon-thlarge"/>
        <span v-text="$i18n.nav.software "/>
      </nuxt-link>
      <nuxt-link to="/welfare" class="item">
        <i class="iconfont youyd-icon-dribbble"/>
        <span v-text="$i18n.nav.welfare"/>
      </nuxt-link>
      <nuxt-link to="/course" class="item">
        <i class="iconfont youyd-icon-xuexi"/>
        <span v-text="$i18n.nav.course"/>
      </nuxt-link>
      <nuxt-link to="/other" class="item">
        <i class="iconfont youyd-icon-pen"/>
        <span v-text="$i18n.nav.other"/>
      </nuxt-link>
      <nuxt-link to="/about" class="item">
        <i class="iconfont youyd-icon-info"/>
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
.iconfont{
	font-family:"iconfont";
	font-size:16px;
	font-style:normal;
	-webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        padding-left:20px
}

  .header-nav {

    .nav-list {
      padding: 0;
      margin: 0;

      > .item {
        line-height: 3em;

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
