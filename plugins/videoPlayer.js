/**
 * @file 图片弹窗服务 / ES module
 * @module plugins/image-popup
 * @author GuoGuang <https://github.com/GuoGuang>
 */
import Vue from 'vue'
import { isBrowser } from '~/environment/esm'
import 'video.js/dist/video-js.css'

if (isBrowser) {
  const VueVideoPlayer = require('vue-video-player/dist/ssr')
  Vue.use(VueVideoPlayer)
}
