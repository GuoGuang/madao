/**
 * @file 根数据状态，仅用以调度初始化任务 / ES module
 * @module store/entry
 * @author GuoGuang <https://github.com/GuoGuang0536>
 */

import { isServer } from '~/environment/esm'
import uaDevice from '~/utils/ua-device'
import systemConstants from '~/constants/system'
import cookie from 'cookie'
// import { getToken } from '@/utils/auth' // 从cookie中获取token getToken

export const actions = {

  // 全局服务初始化
  nuxtServerInit(store, { req, params, route }) {
    // 检查设备类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const { isMobile, isIE, isSafari, isEdge, isFF, isBB, isMaxthon, isIos } = uaDevice(userAgent || '')
    const mustJpg = isIos || isFF || isMaxthon || isSafari || isBB || isIE || isEdge

    store.commit('global/updateUserAgent', userAgent)
    store.commit('global/updateMobileLayoutState', isMobile)
    store.commit('global/updateImageExt', mustJpg ? systemConstants.ImageExt.Jpg : systemConstants.ImageExt.Webp)

    console.error('页面初始化：store/index.js')
    // 如果是移动端，则设置语言为中文
    if (isMobile) {
      store.commit('global/updateLanguage', systemConstants.Language.Zh)
    }

    // 初始化时的全局任 务
    const initFetchAppData = [
      // 同构常量
      // store.dispatch('global/fetchConstants'),
      // 配置数据
      // store.dispatch('global/fetchAdminInfo'),
      // store.dispatch('global/fetchAppOption'),
      // 内容数据
      store.dispatch('tag/fetchList') // 首页右侧标签 节点 群组

      // store.dispatch('category/fetchList')
    ]

    // 如果不是移动端的话，则请求热门文章
    if (!isMobile) {
      initFetchAppData.push(store.dispatch('article/fetchHotList'))
    }

    // cookie-universal-nuxt
    // const token = this.$cookies.get('_gid')
    // 判断用户是否登录
    if (req.headers.cookie) {
      const { token } = cookie.parse(req.headers.cookie)
      store.commit('user/SET_TOKEN', token)
    }

    return Promise.all(initFetchAppData)
  }
}
