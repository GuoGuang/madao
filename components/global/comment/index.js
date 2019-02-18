/**
 * @file Comment box component / ES module
 * @module components/common/comment
 * @author GuoGuang <https://github.com/GuoGuang0536>
 */

import VueComment from './comment'

const comment = {
  install(Vue) {
    Vue.component('comment-box', VueComment)
  }
}

export default comment
