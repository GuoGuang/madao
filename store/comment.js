/**
 * @file 评论数据状态 / ES module
 * @module store/comment
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import { fetchDelay } from '~/utils/fetch-delay'
const { path } = require('~/config/api.json')

const api = path.article

const getDefaultListData = () => {
  return {
    data: [],
    pagination: {},
    myComment: {}
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
  SET_MY_COMMENT(state, action) {
    state.myComment = action.data
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
    return this.$axios.$get(`${api}/comment/${params.article_id}`)
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
    return this.$axios.$post(`${api}/comment`, comment)
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
    return this.$axios.$get(`${api}/comment/user/${param}`)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  like({ commit }, comment) {
    return this.$axios.$put(`${api}/comment/like/${comment.id}`).then(response => {
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
    return this.$axios.$delete(`${api}/comment/like/${comment.id}`).then(response => {
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
  },

  /**
   * 查询我的评论
   * @param commit
   * @returns {Promise<unknown>}
   */
  fetchMyComment({ commit }) {
    return new Promise((resolve, reject) => {
      return this.$axios.$get(`/ar/comment/my/`).then(response => {
        if (response.code !== 20000) {
          this.$toast.error(response.message)
        } else {
          commit('SET_MY_COMMENT', response)
          resolve(response)
        }
      }).catch(() => {
        commit('UPDATE_FETCHING', false)
      })
    })
  }
}
