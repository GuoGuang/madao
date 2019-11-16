/**
 * @file Loading component / ES module
 * @module components/common/loading
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import LoadingComponent from './loading'

const loading = {
  install(Vue) {
    Vue.component(LoadingComponent.name, LoadingComponent)
  }
}

export default loading
