/**
 * @file 评论数据状态 / ES module
 * @module store/comment
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import { fetchDelay } from '~/utils/fetch-delay'

const getDefaultListData = () => {
  return {
    data: [],
    pagination: {}
  }
}

export const state = () => {
  return {
    fetching: false,
    posting: false,
    data: getDefaultListData()
  }
}

export const mutations = {

  // 请求列表
  updateListFetching(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.data = action
  },
  clearListData(state) {
    state.data = getDefaultListData()
  },
  updatePostFetching(state, action) {
    state.posting = action
  },
  LIKE(state, action) {
    const currentComment = state.data.find(item => item.id === action.id)
    currentComment.upvote++
  },
  UN_LIKE(state, action) {
    const currentComment = state.data.find(item => item.id === action.id)
    currentComment.upvote--
  },

  updateLikesIncrement(state, action) {
    state.data.data.find(comment => {
      const isMatched = comment.id === action.id
      isMatched && comment.likes++
      return isMatched
    })
  }
}

export const actions = {

  fetchList({ commit, rootState }, params = {}) {
    commit('updateListFetching', true)
    const delay = fetchDelay()
    return this.$axios.$get(`/ar/comment/${params.article_id}`)
      .then(response => {
        delay(() => {
          commit('updateListData', response.data)
          commit('updateListFetching', false)
        })
        return Promise.resolve(response)
      })
      .catch((error) => {
        commit('updateListFetching', false)
        return Promise.resolve(error)
      })
  },

  postComment({ commit }, comment) {
    commit('updatePostFetching', true)
    return this.$axios.$post(`/ar/comment`, comment)
      .then(response => {
        commit('updatePostFetching', false)
        return Promise.resolve(response)
      })
      .catch(error => {
        commit('updatePostFetching', false)
        return Promise.reject(error)
      })
  },

  findUserInfo({ commit }, param) {
    return this.$axios.$get(`/ar/comment/user/${param}`)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  like({ commit }, comment) {
    return this.$axios.$put(`/ar/comment/like/${comment.id}`).then(response => {
      if (response.code !== 20000) {
        this.$toast.error('服务器开小差啦~~')
      }
      commit('LIKE', comment)
      localStorage.setItem(`article_${comment.articleId}_common_${comment.id}`, true)
      return Promise.resolve(response)
    }).catch(error => {
      console.log(error)
      this.$toast.error('服务器开小差啦~~')
    })
  },
  unLike({ commit }, comment) {
    return this.$axios.$delete(`/ar/comment/like/${comment.id}`).then(response => {
      if (response.code !== 20000) {
        this.$toast.error('服务器开小差啦~~')
      }
      commit('UN_LIKE', comment)
      localStorage.removeItem(`article_${comment.articleId}_common_${comment.id}`)
      return Promise.resolve(response)
    }).catch(error => {
      console.log(error)
      this.$toast.error('服务器开小差啦~~')
    })
  }
}
