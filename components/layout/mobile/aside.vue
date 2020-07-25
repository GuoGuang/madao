<template>
  <aside class="aside">
    <div class="aside-user">
      <div class="avatar">
        <img :src="gravatar" alt="codeway">
      </div>
      <div class="profile">
        <h3 class="name">codeway</h3>
        <p class="email" v-text="$i18n.text.slogan"/>
      </div>
    </div>
    <div class="aside-nav">
      <nav class="nav-list">
        <nuxt-link :to="'/'" class="item" exact>
          <i class="iconfont icon-home"/>
          <span v-text="$i18n.nav.home"/>
        </nuxt-link>
        <nuxt-link to="/music" class="item">
          <i class="iconfont icon-shandian" style="color:inherit"/>
          <span style="color:inherit" v-text="$i18n.nav.music"/>
        </nuxt-link>
        <nuxt-link to="/welfare" class="item">
          <i class="iconfont icon-dribbble"/>
          <span v-text="$i18n.nav.welfare "/>
        </nuxt-link>

        <nuxt-link to="/service" class="item">
          <i class="iconfont icon-xuexi"/>
          <span v-text="$i18n.nav.service "/>
        </nuxt-link>
        <nuxt-link to="/project" class="item">
          <i class="iconfont icon-xuexi"/>
          <span v-text="$i18n.nav.project"/>
        </nuxt-link>
        <nuxt-link to="/about" class="item">
          <i class="iconfont icon-info"/>
          <span v-text="$i18n.nav.about"/>
        </nuxt-link>
      </nav>
    </div>
  </aside>
</template>

<script>
import adConfig from '~/config/ad.config'
export default {
  name: 'MobileAside',
  computed: {
    ads: () => adConfig.mobile.aside,
    gravatar() {
      const gravatar = this.$store.state.global.adminInfo.avatar
      return gravatar
    }
  },
  mounted() {
    return this.$store.dispatch('global/fetchAdminInfo')
  }
}
</script>

<style lang="scss" scoped>
  aside {
    display: block;
    overflow: auto;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    transform: scale(0.8, 0.8);
    transition: $mobile-aisde-transition;

    &.open {
      opacity: 1;
      transform: scale(1, 1);
      transition: $mobile-aisde-transition;
    }

    > .aside-user {
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      padding: 1em;
      border-bottom: 1px solid darken($mobile-aside-bg, 5%);

      > .avatar {
        width: 35%;

        > img {
          max-width: 100%;
          border: 2px solid $module-bg;
        }
      }

      > .profile {
        color: $body-bg;
        width: 100%;

        > .name {
          font-weight: bold;
          margin-bottom: 1rem;
        }

        > .email {
          color: $primary;
          margin: 0;
          @include text-overflow();
        }
      }
    }

    > .aside-nav {
      width: 100%;

      .nav-list {
        padding: 0;
        margin: 0;

        .item {
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
          color: $module-bg;
          margin-bottom: .5em;

          &.ad {
            height: 4rem;
            line-height: 4rem;
            margin: 0;
            border-bottom: 1px solid darken($mobile-aside-bg, 5%);
          }

          &.taobao {
            color: #ff5000;
            background: $module-bg;
            border-top: 1px solid darken($mobile-aside-bg, 5%);

            > .iconfont {
              color: #ff5000;
            }
          }

          &.aliyun {
            color: black;
            background: $module-bg;

            > .iconfont {
              color: black;
            }
          }

          &.app {
            margin-top: 1rem;
            color: $primary;

            &.link-active {
              background-color: transparent;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }

          &:hover {
            color: $primary;
            background-color: $body-bg;
          }

          &.link-active {
            color: $primary;
            font-weight: bold;
            background-color: $body-bg;
          }

          .iconfont {
            width: 1em;
            margin-right: 1em;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
