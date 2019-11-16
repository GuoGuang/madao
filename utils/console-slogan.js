/**
 * @file console.solgan / ES module
 * @module utils/console-slogan
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import { isBrowser, isProdMode } from '~/environment/esm'

export default () => {
  if (isBrowser && isProdMode) {
    // 开发完成后可放开
    // console.clear()
    // console.log('%cTalk is cheap. Show me the code %cguoguang0536@gmail.com', 'color:#666;font-size:3em;', 'color:#666;font-size:13px;')
  }
}
