<template>
  <div class="error">
    <div class="error-content">
      <!-- <h1 class="error-code">{{ error.statusCode }}</h1> -->
      <img :src="statusImage" class="error-img">
      <div class="error-wrapper-message">
        <h2 class="error-message">{{ statusInfo }}</h2>
      </div>
      <p class="error-link">
        <nuxt-link class="link" to="/">Back to the home page</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    'error': {
      type: Object,
      default: 400
    }
  },
  data() {
    return {
      statusImage: '',
      statusInfo: ''
    }
  },
  watch: {
    error: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log(newVal.statusCode)
        if (newVal.statusCode === 404) {
          this.statusImage = '/images/svg/404.svg'
          this.statusInfo = 'Page Not Found'
        } else {
          this.statusImage = '/images/svg/500.svg'
          this.statusInfo = 'Server Internal Error'
        }
      }
    }
  },
  mounted() {
    this.$store.commit('global/updateThreeColumnsState', true)
  },
  beforeDestroy() {
    this.$store.commit('global/updateThreeColumnsState', false)
  }
}
</script>

<style lang="scss" scoped>
  .error {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    z-index: 999;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $module-bg;

    @keyframes error-item {
      0% {
        opacity: 0;
        transform: translate3d(0, -30%, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    > .error-content {

      > .error-code,
      > .error-link,
      > .error-wrapper-message {
        color: $black-light;
        animation: error-item ease-out both .5s .3s;
      }

      .link {

        &:hover {
          border-bottom: 1px solid;
        }
      }

      > .error-code {
        text-transform: uppercase;
        font-size: 12rem;
        margin: 0;
      }
      > .error-img {
        width: 50%;
      }

      > .error-wrapper-message {

        > .error-message {
          margin-bottom: 1em;
          font-family: webfont-bolder, DINRegular;
          margin-top: 1em;
        }
      }
    }
  }
</style>
