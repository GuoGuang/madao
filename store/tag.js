/**
 * @file 标签数据状态 / ES module
 * @module store/tag
 * @author GuoGuang <https://github.com/GuoGuang>
 */
const { path } = require('~/config/api.json')
const api = path.article + '/tag'

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
    state.data = action.data
  }
}

export const actions = {
  fetchList({ commit }) {
    commit('updateFetching', true)
    return this.$axios
      .$get(`${api}`, { params: { cache: 1 }})
      .then(response => {
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch(error => {
        console.error('获取tag失败：' + error.message)
        commit('updateFetching', false)
      })
  }
}
