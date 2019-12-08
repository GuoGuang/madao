<template>
  <div>
    <li
      :style="styles"
      :class="[
        `size-${barrage.style.size}`,
        `color-${barrage.style.color}`,
        playing ? 'playing' : '',
        played ? 'played' : '',
        'eKOLup'
      ]"
      class="barrage-item"
    >
      <div class="head">
        <img
          :src="heads[Math.floor(Math.random() * heads.length)].path"
          alt="msg head"
        >
      </div>
      <span class="gravatar" />
      <span
        class="content msg"
        v-text="barrage.text"
      />
    </li>
  </div>
</template>

<script>
export default {
  name: 'BarrageItem',
  props: {
    id: {
      type: Number,
      default: 0
    },
    delay: {
      type: Number,
      default: 10
    },
    barrage: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 定时器
      timers: {
        transform: null,
        playing: null
      },
      // 播放状态
      played: false,
      playing: false,
      styles: {
        'z-index': (this.id + 1) * 10,
        transition: `transform ${this.delay}s linear`
      },
      heads: [
        {
          title: '奥特曼',
          path: require('assets/images/aotuman.jpg')
        },
        {
          title: '熊孩子',
          path: require('assets/images/bear.jpg')
        },
        {
          title: '卡通女孩',
          path: require('assets/images/carton.girl.jpg')
        },
        {
          title: '卡通男孩',
          path: require('assets/images/carton.jpg')
        },
        {
          title: '猫咪',
          path: require('assets/images/cat.jpg')
        },
        {
          title: '小老弟',
          path: require('assets/images/dog.jpg')
        },
        {
          title: '可爱',
          path: require('assets/images/girl.jpg')
        },
        {
          title: '蜡笔小新',
          path: require('assets/images/xiaoxin.jpg')
        },
        {
          title: '气质美女',
          path: require('assets/images/nv2.jpg')
        },
        {
          title: '小猫',
          path: require('assets/images/xiongmao.gif')
        }
      ]
    }
  },
  ready() {
    this.startAnimation()
  },
  mounted() {
    this.startAnimation()
  },
  beforeDestroy() {
    if (this.timers.transform) {
      clearTimeout(this.timers.transform)
      this.timers.transform = null
    }
    if (this.timers.playing) {
      clearTimeout(this.timers.playing)
      this.timers.playing = null
    }
  },
  methods: {
    readomTop() {
      const innerHeight = document.documentElement.clientHeight - 63
      const innerCount = innerHeight / 30
      let randomCount = this.$parent.randomPer(innerCount) - 3
      randomCount = randomCount < 0 ? 1 : randomCount
      let topPre = (randomCount / innerCount) * 100
      topPre = topPre > 88 ? 86 : topPre
      return `${parseInt(topPre, 0)}%`
    },
    startAnimation() {
      this.$nextTick(() => {
        // 开始动画
        this.timers.transform = setTimeout(() => {
          this.playing = true
          // 计算出一个随机高度，相对左距
          this.$set(this.styles, 'top', this.readomTop())
        })

        // 结束动画
        this.timers.playing = setTimeout(() => {
          this.playing = false
          this.played = true
          this.$nextTick(() => {
            this.$emit('end', this.id)
          })
        }, this.delay * 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.eKOLup {
  background-color: rgba(243, 249, 241, 0.8);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
  word-break: keep-all;
  white-space: pre-wrap;
  padding: 8px 18px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  border-image: initial;
  border-radius: 26px;
}
.head::after {
  position: absolute;
  top: 50%;
  right: -14px;
  transform: translateY(-50%);
  content: '';
  display: block;
  width: 8px;
  height: 2px;
  background: rgb(255, 255, 255);
}
.head {
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  position: absolute;
  left: -58px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 10px;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(238, 238, 238);
  border-image: initial;
}
.barrage-item {
  width: auto;
  right: 0px;
  display: block;
  position: absolute;
  transform: translate3d(100%, 0, 0);

  &.playing {
    transform: translate3d(calc(-100vw - 200%), 0, 0);
  }

  &.played {
    visibility: hidden;
  }
}
</style>
