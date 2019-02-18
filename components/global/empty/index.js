/**
 * @file Empty box component / ES module
 * @module components/common/empty
 * @author GuoGuang <https://github.com/GuoGuang0536>
 */

import EmptyComponent from './empty'

const empty = {
  install(Vue) {
    Vue.component(EmptyComponent.name, EmptyComponent)
  }
}

export default empty
