/**
 * @file 标签数据状态 / ES module
 * @module store/tag
 * @author GuoGuang <https://github.com/GuoGuang>
 */

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
    return this.$axios.$get(`/tags`, { params: { cache: 1 }})
      .then(response => {
        console.error(response)
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch(error => {
        console.error(error)
        commit('updateFetching', false)
      })
  }
}

