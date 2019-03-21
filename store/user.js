/**
 * @file 用户数据状态 / ES module
 * @module store/tag
 * @author GuoGuang <https://github.com/GuoGuang0536>
 */

import { getToken } from '@/utils/auth' // 从cookie中获取token getToken

export const state = () => {
  return {
    loginStatus: '',
    fetching: false,
    data: [],
    state: ''

  }
}

export const mutations = {
  updateFetching(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.data = action.data
  },
  TOGGLE_LOGIN_STATUS(state, getTok) {
    console.error(getTok)
    console.error('data')
    state.loginStatus = getTok
  }

}

export const actions = {

  /*   fetchList({ commit }) {
    commit('updateFetching', true)
    return this.$axios.$get(`/tag`, { params: { cache: 1 }})
      .then(response => {
        console.error(response)
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch(error => {
        console.error(error)
        commit('updateFetching', false)
      })
  }, */

  /**
   * 更新用户状态
   * @param {d} param0
   */
  toggleLoginStatus({ commit }) {
    commit('TOGGLE_LOGIN_STATUS', getToken())
  }
}
