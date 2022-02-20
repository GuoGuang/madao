/**
 * @file Vue extends / ES module
 * @module plugins/vue-extends
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import Vue from 'vue'
import filters from '~/filters'
import i18nConfig from '~/config/i18n.config'
import i18nTransfer from '~/transforms/i18n-transfer'
import apiConfig, { cdnUrl, proxyUrl } from '~/config/api.config.esm'

import EmptyBox from '~/components/global/empty'
import LoadingBox from '~/components/global/loading'
import ColorBlockBox from '~/components/global/color-block'
import SkeletonBox from '~/components/global/skeleton'

const i18nData = i18nTransfer(i18nConfig)

// cdn
Vue.prototype.cdnUrl = cdnUrl
Vue.prototype.proxyUrl = proxyUrl
Vue.prototype.$apiConfig = apiConfig

// filters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// components
Vue.use(EmptyBox)
Vue.use(LoadingBox)
Vue.use(ColorBlockBox)
Vue.use(SkeletonBox)

// mixins
Vue.mixin({
  computed: {
    $i18n() {
      return i18nData[this.$store.state.global.language]
    }
  }
})
