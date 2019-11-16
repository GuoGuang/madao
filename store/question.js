/**
 * @file 问答 数据状态 / ES module
 * @module store/question
 * @author GuoGuang <https://github.com/GuoGuang>
 */

export const state = () => {
  return {
    question: {
      fetching: false,
      data: []
    },
    detail: {
      fetching: false,
      data: {}
    }
  }
}

export const mutations = {
  updateQuestionFetching(state, action) {
    state.question.fetching = action
  },
  updateQuestionData(state, action) {
    state.question.data = action.records
  },
  updateQuestionDetail(state, action) {
    state.detail.data = action
  }
}

export const actions = {

  fetchQuestion({ commit, state }) {
    // 如果数据已存在，则直接返回
    if (state.question.data.length) {
      return Promise.resolve(state.question.data)
    }

    // 不存在则请求新数据
    commit('updateQuestionFetching', true)
    return this.$axios.$get('/question').then(response => {
      commit('updateQuestionData', response.data)
      commit('updateQuestionFetching', false)
    })
      .catch(error => {
        console.error(error)
        commit('updateQuestionFetching', false)
      })
  },

  // 获取问题详情
  fetchDetail({ commit }, params = {}) {
    commit('updateQuestionFetching', true)
    commit('updateQuestionDetail', {})
    return this.$axios.$get(`/question/${params.question_id}`).then(response => {
      commit('updateQuestionDetail', response.data)
      commit('updateQuestionFetching', false)
    })
      .catch(error => {
        commit('updateQuestionFetching', false)
        return Promise.reject(error)
      })
  }

}
