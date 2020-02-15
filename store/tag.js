/**
 * @file 标签数据状态 / ES module
 * @module store/tag
 * @author GuoGuang <https://github.com/GuoGuang>
 */

export const state = () => {
  return {
    fetching: false,
    data: [],
    backgroundColor: [
      '#ff5e5c',
      '#ffbb50',
      '#1ac756',
      '#19B5FE',
      '#4A4A4A',
      '#ff9800',
      '#9c27b0'
    ]
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
    return this.$axios.$get(`/ar/tags`, { params: { cache: 1 }})
      .then(response => {
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch((error) => {
        console.error('获取tag失败：' + error.message)
        commit('updateFetching', false)
      })
  }
}

