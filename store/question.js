/**
 * @file 问答 数据状态 / ES module
 * @module store/question
 * @author GuoGuang <https://github.com/GuoGuang0536>
 */

export const state = () => {
  return {
    question: {
      fetching: false,
      data: []
    }
  }
}

export const mutations = {
  updateQuestionFetching(state, action) {
    state.question.fetching = action
  },
  updateQuestionData(state, action) {
    state.question.data = action
  },
}

export const actions = {

  fetchQuestion({ commit, state }) {
    
    // 如果数据已存在，则直接返回
    if (state.question.data.length) {
      return Promise.resolve(state.question.data)
    }

    // 不存在则请求新数据
    commit('updateQuestionFetching', true)
    return this.$axios.$get('/question')
      .then(response => {
        commit('updateQuestionData', response.result)
        commit('updateQuestionFetching', false)
      })
      .catch(error => commit('updateQuestionFetching', false))
  },
}
