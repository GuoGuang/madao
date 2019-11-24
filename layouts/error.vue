<template>
  <div class="error">
    <div class="error-content">
      <div class="error-wrapper-message">
        <h1 class="wow fadeInDown" style="visibility: visible; animation-name: fadeInDown;">Oops! Why Youre Here ?</h1>
        <h2 class="error-message">{{ statusInfo }}</h2>
        <p style="margin: 4em;">
          <a class="btn btn-default btn-header" @click="toSearch()">Back to the home page</a>
        </p>
      </div>
      <!-- <h1 class="error-code">{{ error.statusCode }}</h1> -->
      <img :src="statusImage" :class="{ 'error-custom': statusCode!=404 }" class="error-img">

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
      statusInfo: '',
      statusCode: ''
    }
  },
  watch: {
    error: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log(newVal.statusCode)
        this.statusCode = newVal.statusCode
        if (newVal.statusCode === 404) {
          this.statusImage = '/images/svg/404.svg'
          this.statusInfo = '您似乎正在尝试访问已被删除或者根本不存在的页面。'
        } else {
          this.statusImage = '/images/svg/500.svg'
          this.statusInfo = 'Sorry unexpected error'
        }
      }
    }
  },
  mounted() {
    this.$store.commit('global/updateThreeColumnsState', true)
  },
  beforeDestroy() {
    this.$store.commit('global/updateThreeColumnsState', false)
  },
  methods: {

    toSearch() {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang="scss" scoped>

.error-custom{
  width: 40%
}
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

  .btn.btn-header {
    cursor: pointer;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1.8px;
    color: #fff;
    padding: 18px 30px 14px;
    text-transform: uppercase;
    border-radius: 29px;
    background-color: #ff7979;
    box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.15);
    border: solid 2px #ffffff;
    border-color: transparent;
  }

  .btn.btn-header:hover {
    background: #fff;
    color: #5f61f2;
  }

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
      animation: error-item ease-out both 0.5s 0.3s;
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
      // width: 50%;
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
