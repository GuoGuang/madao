<template>
  <div id="app-main">
    <header-view/>
    <no-ssr>
      <!-- 背景 -->
      <background/>
      <!-- 墙花 点击桌面特效-->
      <wall-flower v-if="!onPowerSavingMode" />
      <!-- 语言切换 此处应该切换为 根据地区加载不同语言 
      <language-psm v-if="isNotServicePage" /> -->
      <!-- 分享页 -->
      <share-box v-if="isNotServicePage" class="sidebar" />
      <!-- 工具栏 -->
      <tool-box v-if="isNotFullColPage" />
    </no-ssr>
    <main id="main" :class="{ 'full-view': isFullViewWidth }">

      <!-- body 左侧 -->
      <transition name="module" >
        <nav-view v-if="$route.name === 'index'"/>
      </transition>

      <!-- body页面中间 -->
      <!-- 这块是有问题的 style="$route.name === 'index'?'width: 42.5em;margin: 0 0 0 12.5em;':'width: 55em;margin: 0 0 0 0;'" 导致其他页面样式错误 计划将左边竖列表横起来 -->
      <div id="main-content" class="main-content" :style="$route.name === 'index'?'width: 42.5em;margin: 0 0 0 12.5em;':'width: 55em;margin: 0 0 0 0;'"
        :class="{ 'full-column': isTwoColumns, 'error-column': isThreeColumns, 'full-view': isFullViewWidth }">
        <nuxt :nuxtChildKey="$route.name" keep-alive />
      </div>
      
      <!-- 页面右侧  v-if="false" 点击进入文章时隐藏右侧标签栏或者左侧标签栏-->
      <transition name="aside">
        <aside-view key="aside" v-if="!isTwoColumns && !isThreeColumns" />
      </transition>

    </main>
    <no-ssr>
      <!-- 弹幕 -->
      <barrage v-if="isMountedBarrage" v-cloak/>
      <!--  Canvas 动态背景 -->
      <emoji-rain v-if="!onPowerSavingMode"/>
    </no-ssr>
    <footer-view/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import NavView from './nav'
  import HeaderView from './header'
  import FooterView from './footer'
  import AsideView from './aside/main'
  import Barrage from '~/components/widget/barrage/main'
  import WallFlower from '~/components/widget/wall-flower/garden'
  import Webrtc from '~/components/widget/webrtc/main'
  import Background from '~/components/widget/background'
  import EmojiRain from '~/components/widget/emoji-rain'
  import LanguagePsm from '~/components/widget/language-psm'
  import ToolBox from '~/components/widget/tool-box'
  import ShareBox from '~/components/widget/share'
  import music from '~/expansions/music'
  import { startTitleEgg, resetTitle } from '~/utils/title-egg' // 彩蛋
  import { isServiceRoute } from '~/utils/route'
  import systemConstants from '~/constants/system'

  export default {
    name: 'pc-main',
    components: {
      ToolBox, ShareBox, LanguagePsm,
      Webrtc, EmojiRain, WallFlower, Background, Barrage, // 实体
      HeaderView, FooterView, AsideView, NavView, // 布局
    },
    mounted() {
      // const isHidden = document.hidden || document.webkitHidden || document.mozHidden
      // this.startAllEgg(isHidden)
      // this.watchFullScreen()
      // this.watchTabActive() 彩蛋
      /** 获取壁纸，小故事 */
      this.$store.dispatch('wallpaper/fetchPapers') 
      this.$store.dispatch('wallpaper/fetchStory')
      // this.$root.$music = music
      // this.$root.$music.state.ready || this.$root.$music.initPlayer()
    },
    computed: {
      ...mapState('global', [
        'onWebrtc','onWallpaper', 'onPowerSavingMode', 'isMountedBarrage', 'isTwoColumns', 'isThreeColumns'
      ]),
      isNotServicePage() {
        return !isServiceRoute(this.$route.name)
      },
      isFullViewWidth() {
        return isServiceRoute(this.$route.name)
      },
      isNotFullColPage() {
        return ![
          systemConstants.Route.App,
          systemConstants.Route.Music,
          systemConstants.Route.Service,
        ].includes(this.$route.name)
      }
    },
    methods: {
      /**
       * 开始彩蛋
       */
      startAllEgg(isHidden) {
        if (isHidden) {
          startTitleEgg()
        } else {
          resetTitle()
        }
      },
      aaa() {
        console.log($route.name)
        console.log("$route.name")
        return $route.name;
      },
      /**
       * 监听页签变化事件
       */
      watchTabActive() {
        document.addEventListener('visibilitychange', event => {
          const isHidden = event.target.hidden || event.target.webkitHidden
          this.startAllEgg(isHidden)
        }, false)
      },
      /**
       * 全屏监听事件
       */
      watchFullScreen() {
        const fullscreenchange = event => {
          console.log('fullscreenchange', event)
        }
        document.addEventListener("fullscreenchange", fullscreenchange, false)
        document.addEventListener("mozfullscreenchange", fullscreenchange, false)
        document.addEventListener("webkitfullscreenchange", fullscreenchange, false)
        document.addEventListener("msfullscreenchange", fullscreenchange, false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app-main {

    main {
      position: relative;

      &.full-view {
        width: 100%;
      }

      .main-content {
        float: left;
        width: 42.5em; 
        margin: 0 0 0 12.5em;
        position: relative;
        overflow: hidden;
        @include css3-prefix(transition, width .35s);

        &:-moz-full-screen { 
          overflow-y: auto;
        }
          
        &:-webkit-full-screen {
          overflow-y: auto;
        }
          
        &:fullscreen {
          overflow-y: auto;
        }

        &.full-column {
          width: 62.5em;
          @include css3-prefix(transition, width .35s);
        }

        &.error-column {
          width: 100%;
          margin: 0;
          @include css3-prefix(transition, width .35s);
        }

        &.full-view {
          width: 100%;
          margin: -1em 0;
        }
      }
    }
  }
</style>
