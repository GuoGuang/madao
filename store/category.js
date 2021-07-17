/**
 * @file 分类数据状态 / ES module
 * @module store/category
 * @author GuoGuang <https://github.com/GuoGuang>
 */
const { path } = require('~/config/api.json')

const api = path.article + '/article'
export const state = () => {
  return {
    fetching: false,
    data: []
  }
}

export const mutations = {
  updateFetching(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.data = action.result.data
  }
}

export const actions = {
  fetchList({ commit }, params) {
    console.error('/categor')
    commit('updateFetching', true)
    return this.$axios.$get(`${api}/article/category`, { params })
      .then(response => {
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch((error) => {
        console.error('获取分类失败：' + error.message)
        commit('updateFetching', false)
      })
  }
}
