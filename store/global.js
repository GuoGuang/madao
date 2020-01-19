/**
 * @file 全局设置数据状态 / ES module
 * @module store/option
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import i18nConfig from '~/config/i18n.config'
import stateConstants from '~/constants/state'
import systemConstants from '~/constants/system'

export const state = () => ({

  // 主题
  theme: systemConstants.Theme.Default,

  // 同构常量
  constants: stateConstants,

  // 图片格式
  imageExt: systemConstants.ImageExt.Webp,

  // ua
  userAgent: '',

  // 默认语言
  language: i18nConfig.default,

  // 页面的栏目展示类型（3栏/2栏）
  isOneColumns: false,

  // 是否为移动端
  isMobile: false,

  // 移动端侧边栏
  onMobileSidebar: false,

  // 是否开启弹幕
  onBarrage: false,

  // 弹幕是否已首次渲染
  isMountedBarrage: false,

  // 节能模式
  onPowerSavingMode: false,

  // 是否开启rtc
  onWebrtc: false,

  // 山河入梦
  onWallpaper: false,

  // 服务端博主信息
  adminInfo: {},

  // 服务端设置的全局配置
  appOption: {
    fetching: false,
    data: null
  }
})

export const getters = {
  isMobile: state => state.isMobile,
  isEnLang: state => state.language === systemConstants.Language.En
}

export const mutations = {

  // 设置主题
  updateTheme(state, action) {
    state.theme = action
  },

  // 设置常量
  updateConstants(state, action) {
    state.constants = action.result
  },

  // 设置UA
  updateUserAgent(state, action) {
    state.userAgent = action
  },

  // 设置图片格式
  updateImageExt(state, action) {
    state.imageExt = action
  },

  // 设置是否移动端状态
  updateMobileLayoutState(state, action) {
    state.isMobile = action
  },

  // 切换移动端侧边栏
  updateMobileSidebarOnState(state, action) {
    state.onMobileSidebar = action
  },

  // 设置三栏页面结构
  updateThreeColumnsState(state, action) {
    state.isOneColumns = action
  },

  // 喜欢本站
  updateSiteLikes(state) {
    state.appOption.data.meta.likes++
  },

  // 切换弹幕状态
  updateBarrageOnState(state, action) {
    state.onBarrage = action != null ? !!action : !state.onBarrage
    if (state.onBarrage && !state.barrageMounte) {
      state.isMountedBarrage = true
    }
  },

  // 切换墙纸开关
  updateWallpaperOnState(state, action) {
    state.onWallpaper = action != null ? !!action : !state.onWallpaper
  },

  // 切换语言
  updateLanguage(state, action) {
    state.language = action
  },

  // 获取服务端配置的管理员信息
  updateAdminInfo(state, action) {
    state.adminInfo = action.result
  },

  // 获取服务端配置
  updateAppOptionFetching(state, action) {
    state.appOption.fetching = action
  },
  updateAppOptionData(state, action) {
    state.appOption.data = action.result
  },
  updateLikesIncrement(state) {
    state.appOption.data.meta.likes++
  }
}

const URL_PREFIX = '/su'
export const actions = {

  // 获取同构常量
  fetchConstants({ commit }) {
    return this.$axios.$get('/expansion/constant')
      .then(response => commit('updateConstants', response))
      .catch(error => console.warn('获取同构常量错误', error))
  },

  // 获取博主资料
  fetchAdminInfo({ commit }) {
    return this.$axios
      .$get(URL_PREFIX + '/admin')
      .then(response => commit('updateAdminInfo', response.data))
  },

  // 获取全局配置
  fetchAppOption({ commit }) {
    commit('updateAppOptionFetching', true)
    return this.$axios.$get(`/option`)
      .then(response => {
        commit('updateAppOptionData', response)
        commit('updateAppOptionFetching', false)
      })
      .catch(error => {
        console.error(error)
        commit('updateAppOptionFetching', false)
      })
  },

  // 喜欢主站
  fetchLikeSite({ commit }) {
    return this.$axios.$patch(`/like/site`)
      .then(response => {
        commit('updateLikesIncrement')
        return Promise.resolve(response)
      })
  }
}
