/**
 * @file 活动 数据状态 / ES module
 * @module store/events
 * @author GuoGuang <https://github.com/GuoGuang>
 */

export const state = () => {
  return {
    events: {
      fetching: false,
      data: []
    }
  }
}

export const mutations = {
  updateEventsFetching(state, action) {
    state.events.fetching = action
  },
  updateEventsData(state, action) {
    state.events.data = action
      .filter(repo => !repo.fork && (!repo.description || !repo.description.startsWith('#')))
      .sort((prev, next) => next.stargazers_count - prev.stargazers_count)
  }
}

export const actions = {

  // 获取开源项目列表
  fetchEvents({ commit, state }) {
    // 如果数据已存在，则直接返回
    if (state.events.data.length) {
      return Promise.resolve(state.events.data)
    }

    // 不存在则请求新数据
    commit('updateEventsFetching', true)
    return this.$axios.$get('/events')
      .then(response => {
        commit('updateEventsData', response.result)
        commit('updateEventsFetching', false)
      })
      .catch(error => {
        console.error(error)
        commit('updateEventsFetching', false)
      })
  }
}
