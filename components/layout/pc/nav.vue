<template>
  <!-- 导航 图标参考D:\vueWorkspace\youyd_vue_ssr_platform\assets\sass\iconfont.scss -->
  <div id="nav" class="header-nav">
    <nav is="nav" class="nav-list">

      <el-menu :router="true" :default-active="$route.path" active-text-color="rgb(64, 158, 255)" class="nav-item" mode="horizontal" >
        <el-menu-item index="/" >
          <i class="iconfont icon-home"/>
          <span >首页</span>
        </el-menu-item>
        <el-submenu index="/technology">
          <template slot="title" >
            <i class="iconfont icon-shandian" style="color:inherit"/>
            <span style="color:inherit" @click="defaultTechnologyHandle" v-text="$i18n.nav.technology"/>
          </template>
          <el-menu-item index="/music">
            <span v-text="$i18n.nav.music"/>
          </el-menu-item>
          <el-menu-item ref="defaultTechnology" index="/technology" style="display:none">
            <span v-text="$i18n.nav.technology"/>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/software">
          <i class="iconfont icon-thlarge"/>
          <span v-text="$i18n.nav.software "/>
        </el-menu-item>
        <el-menu-item index="/welfare">
          <i class="iconfont icon-dribbble"/>
          <span v-text="$i18n.nav.welfare"/>
        </el-menu-item>
        <el-menu-item index="/course">
          <i class="iconfont icon-xuexi"/>
          <span v-text="$i18n.nav.course"/>
        </el-menu-item>
        <el-menu-item index="/other">
          <i class="iconfont icon-pen"/>
          <span v-text="$i18n.nav.other"/>
        </el-menu-item>
        <el-menu-item index="/about" class="item">
          <i class="iconfont icon-info"/>
          <span v-text="$i18n.nav.about"/>
        </el-menu-item>
      </el-menu>

    </nav>
  </div>
</template>

<script>
import adConfig from '~/config/ad.config'

export default {
  name: 'LayoutNav',
  computed: {
    adsForPcNav: () => adConfig.pc.nav
  },
  methods: {
    defaultTechnologyHandle(key, keyPath) {
      this.$refs.defaultTechnology.$el.click()
    }
  }

}
</script>

<style lang="scss" scoped>
.iconfont {
  font-family: 'iconfont';
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  padding-left: 20px;
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
          0% {
            color: chartreuse;
          }
          15% {
            color: green;
          }
          30% {
            color: red;
          }
          45% {
            color: darkviolet;
          }
          60% {
            color: pink;
          }
          86% {
            color: blue;
          }
          100% {
            color: black;
          }
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
    .nav-item {
      background-color: inherit;
      border-bottom: inherit;
      li {
        padding: 0;
        margin-right: 20px;
        .iconfont {
          padding-left: 0px;
        }
        a {
          display: inline-block;
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" >
.header-nav {
  .nav-list {
    .el-submenu__title {
      padding: 0px;
    }
    .nav-item {
      .el-submenu__title:hover {
        background-color: #f7f7f7 !important;
      }
      .el-menu-item:hover {
        background-color: #f7f7f7 !important;
      }
      .el-menu-item:focus {
        background-color: #f7f7f7 !important;
      }
    }
    .el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
      margin-left: 3px;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom: inherit;
    }
    .el-menu--collapse .el-menu .el-submenu,
    .el-menu--popup {
      min-width: 150px;
    }
    .el-menu-item {
      border-bottom-color: #f7f7f7 !important;
    }
    .el-submenu__title {
      border-bottom-color: #f7f7f7 !important;
    }
    .el-submenu {
      color: rgb(64, 158, 255) !important;
    }
  }
}
</style>
