/**
 * @file Google adsense / ES module GooGle 广告
 * @module plugins/adsense
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import Vue from 'vue'
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

