<template>
  <header class="header">
    <form :class="{ actived: search }" class="search" @submit.stop.prevent="toSearch()">
      <input
        ref="input"
        v-model.trim="keyword"
        :placeholder="$i18n.text.search"
        type="text"
        class="input"
        list="keywords"
        required
        @keyup.enter.stop.prevent="toSearch"
      >
      <span class="close" @click.stop.prevent="search = false">
        <i class="iconfont icon-cancel"/>
      </span>
      <client-only>
        <datalist v-if="tags.length" id="keywords" class="search-keywords">
          <option v-for="tag in tags" :value="tag.name" :label="tag.description" :key="tag.slug" class="iiem" />
        </datalist>
      </client-only>
    </form>
    <transition name="module">
      <div v-if="search" class="search-mask"/>
    </transition>
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-header">
          <a href class="navbar-menu" @click.stop.prevent="toggleSidebar(!onMobileSidebar)">
            <i class="iconfont icon-menu"/>
          </a>
          <nuxt-link to="/" class="navbar-logo">
            <img src="/images/logo.svg">
          </nuxt-link>
          <a href class="navbar-search" @click.stop.prevent="openSearch">
            <i class="iconfont icon-search"/>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MobileHeader',
  data() {
    return {
      search: false,
      keyword: ''
    }
  },
  computed: {
    tags() {
      return this.$store.state.tag.data
    },
    onMobileSidebar() {
      return this.$store.state.global.onMobileSidebar
    }
  },
  watch: {
    '$route'(newVel, oldVel) {
      this.search = false
      this.toggleSidebar(false)
    }
  },
  methods: {
    openSearch() {
      this.search = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    toSearch() {
      this.$router.push({ name: 'search-keyword', params: { keyword: this.keyword }})
    },
    toggleSidebar(open) {
      this.$store.commit('global/updateMobileSidebarOnState', open)
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $navbar-height;
    background-color: $module-bg-opacity-9;
    z-index: 999;

    .search-mask {
      position: fixed;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
      background-color: $module-hover-bg-darken-10;
    }

    .search {
      position: absolute;
      display: flex;
      z-index: 9999;
      width: 100%;
      height: $navbar-height;
      top: 0;
      left: 0;
      opacity: 0;
      background-color: $white;
      transform: translateY(-100%);

      > .input {
        width: 80%;
        padding: 1em;
        height: $navbar-height;
      }

      > .close {
        width: 20%;
        text-align: center;
        height: $navbar-height;
        line-height: $navbar-height;
      }

      &.actived {
        opacity: 1;
        transform: translateY(0%);
      }
    }

    .navbar {

      .navbar-container {
        height: $navbar-height;

        .navbar-header {
          height: $navbar-height;
          display: flex;
          position: relative;
          align-items: center;
          width: 100%;
          justify-content: space-between;

          .navbar-menu,
          .navbar-search {
            border: none;
            display: inline-block;
            height: $navbar-height;
            width: 20%;
            line-height: $navbar-height;
            text-align: center;
          }

          .navbar-logo {
            width: 30%;
          }
        }
      }
    }
  }
</style>
