/**
 * @file Color block component / ES module
 * @module components/common/color-block
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import ColorBlockComponent from './block'

const colorBlock = {
  install(Vue) {
    Vue.component(ColorBlockComponent.name, ColorBlockComponent)
  }
}

export default colorBlock
