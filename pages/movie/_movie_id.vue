<template>
  <div class="index">
    <div
      v-video-player:myVideoPlayer="playerOptions"
      ref="videoPlayer"
      class="video-player-box player vjs-big-play-centered"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ready="playerReadied"
      @statechanged="playerStateChanged($event)"/>

    <div class="movie-desc">
      <span class="info title">正在播放：<a href="#" style="font-weight: bold;">{{ movieDetail.name }}</a></span>
      <div>
        <el-tag
          type="info"
          effect="dark"
          style="margin-left: 10px;">
          如加载失败，可刷新几次，部分电影宽带需等待加载。
        </el-tag>
        <span class="info">  <el-button type="info" size="small" plain>数据报错</el-button></span>
      </div>
    </div>

    <div class="movie-desc" style="color: #757575;">
      {{ movieDetail.desc }}
    </div>

  </div>

</template>

<script>
/**
   * https://cloud.tencent.com/developer/article/1615717
   */
require('videojs-hotkeys')

export default {
  name: 'VideoList',

  data() {
    return {
      movieDetail: JSON.parse(this.$route.query.item),
      playerOptions: {
        duration: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<movie>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        width: '100%',
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: { // 设置控制条组件
          'currentTimeDisplay': true,
          'timeDivider': true,
          'durationDisplay': true,
          'remainingTimeDisplay': true,
          volumePanel: {
            inline: true
          },
          /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
          children: [
            { name: 'playToggle' }, // 播放按钮
            { name: 'currentTimeDisplay' }, // 当前已播放时间
            { name: 'progressControl' }, // 播放进度条
            { name: 'durationDisplay' }, // 总时间
            { // 倍数播放
              name: 'playbackRateMenuButton',
              'playbackRates': [0.5, 1, 1.5, 2, 2.5, 3]
            },
            {
              name: 'volumePanel', // 音量控制
              inline: false // 不使用水平方式
            },
            { name: 'FullscreenToggle' } // 全屏
          ]
        },
        sources: [{
          type: 'video/mp4',
          src: 'https://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/%5BBD%E5%BD%B1%E8%A7%86%E5%88%86%E4%BA%ABbd-film.cc%5D%E5%B7%B4%E6%96%AF%E7%89%B9%C2%B7%E6%96%AF%E5%85%8B%E9%B2%81%E6%A0%BC%E6%96%AF%E7%9A%84%E6%AD%8C%E8%B0%A3..The.Ballad.of.Buster.Scruggs.2018.HD1080P.%E4%B8%AD%E5%AD%97.mp41'
        }]
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  fetch({ store, params }) {
    // return store.dispatch('article/fetchList', params)
  },
  head() {
    return {
      title: `影视 | 在线免费高清电影`
    }
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.item) {
        this.movieDetail = JSON.parse(this.$route.query.item)
      }
    }
  },
  mounted() {
    console.log('this is current videojs instance object', this.myVideoPlayer)
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('example player 1 readied', player)
      // 快进
      player.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        enableModifiersForNumbers: false,
        fullscreenKey: function(event, player) {
          // override fullscreen to trigger when pressing the F key or Ctrl+Enter
          return ((event.which === 70) || (event.ctrlKey && event.which === 13))
        }
      })
    },
    loadMoreArticle() {
      this.$store.dispatch('article/fetchList', this.nextPageParams)
    }
  }
}
</script>

<style lang="scss">
  .movie-desc {
    margin: 10px 0 30px;
    display: flex;
    justify-content: space-between;
    .title{
      color: #666;
      padding: 0 6px;
      font-size: 16px;
    }
    .info {
      align-self: center;
    }
  }

  .vjs-custom-skin > .video-js {
    width: 100%;
    font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "微软雅黑", sans-serif;
  }

  .vjs-custom-skin > .video-js .vjs-menu-button-inline.vjs-slider-active, .vjs-custom-skin > .video-js .vjs-menu-button-inline:focus, .vjs-custom-skin > .video-js .vjs-menu-button-inline:hover, .video-js.vjs-no-flex .vjs-menu-button-inline {
    width: 10em
  }

  .vjs-custom-skin > .video-js .vjs-controls-disabled .vjs-big-play-button {
    display: none !important
  }

  .vjs-custom-skin > .video-js .vjs-control {
    width: 3em
  }

  .vjs-custom-skin > .video-js .vjs-control.vjs-live-control {
    width: auto;
    padding-left: .5em;
    letter-spacing: .1em;
  }

  .vjs-custom-skin > .video-js .vjs-menu-button-inline:before {
    width: 1.5em
  }

  .vjs-menu-button-inline .vjs-menu {
    left: 3em
  }

  .vjs-paused.vjs-has-started.vjs-custom-skin > .video-js .vjs-big-play-button, .video-js.vjs-ended .vjs-big-play-button, .video-js.vjs-paused .vjs-big-play-button {
    display: block
  }

  .vjs-custom-skin > .video-js .vjs-load-progress div, .vjs-seeking .vjs-big-play-button, .vjs-waiting .vjs-big-play-button {
    display: none !important
  }

  .vjs-custom-skin > .video-js .vjs-mouse-display:after, .vjs-custom-skin > .video-js .vjs-play-progress:after {
    padding: 0 .4em .3em
  }

  .video-js.vjs-ended .vjs-loading-spinner {
    display: none;
  }

  .video-js.vjs-ended .vjs-big-play-button {
    display: block !important;
  }

  .video-js.vjs-ended .vjs-big-play-button, .video-js.vjs-paused .vjs-big-play-button, .vjs-paused.vjs-has-started.vjs-custom-skin > .video-js .vjs-big-play-button {
    display: block
  }

  .vjs-custom-skin > .video-js .vjs-big-play-button {
    top: 50%;
    left: 50%;
    margin-left: -1.5em;
    margin-top: -1em
  }

  .vjs-custom-skin > .video-js .vjs-big-play-button {
    background-color: rgba(0, 0, 0, 0.45);
    font-size: 3.5em;
    /*border-radius: 50%;*/
    height: 2em !important;
    line-height: 2em !important;
    margin-top: -1em !important
  }

  .video-js:hover .vjs-big-play-button, .vjs-custom-skin > .video-js .vjs-big-play-button:focus, .vjs-custom-skin > .video-js .vjs-big-play-button:active {
    background-color: rgba(36, 131, 213, 0.9)
  }

  .vjs-custom-skin > .video-js .vjs-loading-spinner {
    border-color: rgba(36, 131, 213, 0.8)
  }

  .vjs-custom-skin > .video-js .vjs-control-bar2 {
    background-color: #000000
  }

  .vjs-custom-skin > .video-js .vjs-control-bar {
    /*background-color: rgba(0,0,0,0.3) !important;*/
    color: #ffffff;
    font-size: 14px
  }

  .vjs-custom-skin > .video-js .vjs-play-progress, .vjs-custom-skin > .video-js .vjs-volume-level {
    background-color: #2483d5
  }

  .vjs-custom-skin > .video-js .vjs-play-progress:before {
    top: -0.3em;
  }

  .vjs-custom-skin > .video-js .vjs-progress-control:hover .vjs-progress-holder {
    font-size: 1.3em;
  }

  .vjs-menu-button-popup.vjs-volume-menu-button-vertical .vjs-menu {
    left: 0em;
  }

  .vjs-custom-skin > .video-js .vjs-menu li {
    padding: 0;
    line-height: 2em;
    font-size: 1.1em;
    font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "微软雅黑", sans-serif;
  }

  .vjs-custom-skin > .video-js .vjs-time-tooltip,
  .vjs-custom-skin > .video-js .vjs-mouse-display:after,
  .vjs-custom-skin > .video-js .vjs-play-progress:after {
    border-radius: 0;
    font-size: 1em;
    padding: 0;
    width: 3em;
    height: 1.5em;
    line-height: 1.5em;
    top: -3em;
  }

  .vjs-custom-skin > .video-js .vjs-menu-button-popup .vjs-menu {
    width: 5em;
    left: -1em;
  }

  .vjs-custom-skin > .video-js .vjs-menu-button-popup.vjs-volume-menu-button-vertical .vjs-menu {
    left: 0;
  }

  .vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button .vjs-menu {
    /*order: 4;*/
  }

  /*排序顺序*/
  .vjs-custom-skin > .video-js .vjs-control-bar .vjs-play-control {
    order: 0;
  }

  .vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-control {
    min-width: 1em;
    padding: 0;
    margin: 0 .1em;
    text-align: center;
    display: block;
    order: 1;
  }

  .vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate .vjs-playback-rate-value {
    font-size: 1.2em;
    line-height: 2.4;
  }

  .vjs-custom-skin > .video-js .vjs-progress-control.vjs-control {
    order: 2;
  }

  .vjs-custom-skin > .video-js .vjs-control-bar .vjs-volume-menu-button {
    order: 3;
  }

  .vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button {
    order: 4;
  }

  .vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button .vjs-resolution-button-label {
    display: block;
    line-height: 3em;
  }

  .vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate {
    order: 5;
  }

  .vjs-custom-skin > .video-js .vjs-control-bar .vjs-fullscreen-control {
    order: 6;
  }
</style>
