<template>
  <div id="tools">
    <div class="container">
      <div class="tools-list">
        <button
          :title="$i18n.text.barrage.name"
          class="barrage"
          @click="toggleBarrage"

        >
          <i class="iconfont icon-cust-barrage"/>
        </button>
        <a :title="$i18n.text.feedback" class="feedback" href="mailto:guoguang0536@gmail.com">
          <i class="iconfont icon-mail"/>
        </a>
        <button
          :title="$i18n.text.totop"
          class="to-top"
          @click="totop"
          @mouseover="setButtonState('top', true, true)"
          @mouseleave="setButtonState('top', false)"
        >
          <i class="iconfont icon-totop"/>
        </button>
        <button
          :title="$i18n.text.tobottom"
          class="to-bottom"
          @click="toBottom"
          @mouseover="setButtonState('bottom', true, true)"
          @mouseleave="setButtonState('bottom', false)"
        >
          <i class="iconfont icon-tobottom"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import underscore from '~/utils/underscore-simple'
import { scrollTo, Easing } from '~/utils/scroll-to-anywhere'

export default {
  name: 'ToolBox',
  data() {
    return {
      topBtnMouseOver: false,
      bottomBtnMouseOver: false,
      animationFrameId: null
    }
  },
  computed: {
    ...mapState('global', {

      language: 'language',
      onPowerSavingMode: 'onPowerSavingMode'
    }),
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    }
  },
  methods: {
    totop() {
      scrollTo('body', 300, { easing: Easing['ease-in'] })
    },
    toBottom() {
      scrollTo(window.scrollY + window.innerHeight, 300, { easing: Easing['ease-in'] })
    },
    setButtonState(position, state, start) {
      this[position === 'bottom' ? 'bottomBtnMouseOver' : 'topBtnMouseOver'] = state
      window.cancelAnimationFrame(this.animationFrameId)
      start && this.slowMoveToAnyWhere()
    },
    slowMoveToAnyWhere() {
      const step = () => {
        let targetScrollY = window.scrollY
        const currentScrollY = document.body.scrollHeight - window.innerHeight
        if (this.bottomBtnMouseOver) targetScrollY += 1
        if (this.topBtnMouseOver) targetScrollY -= 1
        if (targetScrollY < 0) {
          targetScrollY = 0
        } else if (targetScrollY >= currentScrollY) {
          targetScrollY = currentScrollY
        }
        const canScrollTo = targetScrollY > 0 && targetScrollY < currentScrollY
        if (!canScrollTo) {
          return false
        }
        window.scrollTo(0, targetScrollY)
        if (this.bottomBtnMouseOver || this.topBtnMouseOver) {
          this.animationFrameId = window.requestAnimationFrame(step)
        } else {
          window.cancelAnimationFrame(this.animationFrameId)
          return false
        }
      }
      this.animationFrameId = window.requestAnimationFrame(step)
    },
    toggleBarrage() {
      this.$ga.event('弹幕功能', '切换', 'tool')
      this.$store.commit('global/updateBarrageOnState')
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont{
      font-size: 18px;
}
  #tools {
    position: fixed;
    z-index: 9;
    width: 100%;
    bottom: 30rem;

    > .container {
      position: relative;

      > .tools-list {
        position: absolute;
        right: -10em;
        width: 3em;
        height: 7em;

        > .barrage,
        > .to-top,
        > .to-bottom,
        > .feedback {
          display: block;
          width: 3em;
          height: 3em;
          line-height: 3em;
          text-align: center;
          background-color: $module-bg;

          &:hover {
            background-color: $module-hover-bg;
          }
        }

        @keyframes default-btn-bg {
          0%   {
            color: white;
            background: chartreuse;
          }
          12%  {
            color: white;
            background: green;
          }
          24%  {
            color: white;
            background: red;
          }
          36%  {
            color: white;
            background: darkviolet;
          }
          60% {
            color: white;
            background: pink;
          }
          72% {
            color: $text;
            background: yellow;
          }
          86% {
            color: $text;
            background: white;
          }
          100% {
            color: white;
            background: black;
          }
        }

        > .barrage {
          color: $white;
          animation: default-btn-bg 10s infinite;

          &.active {
            background-color: $module-hover-bg;
            animation: default-btn-bg steps(1) 1.666s infinite;
          }

          &.close {
            color: $link-color;
            animation: none;
          }
        }

        > .to-bottom {
          height: 2em;
          line-height: 2em;
        }
      }
    }
  }
</style>
