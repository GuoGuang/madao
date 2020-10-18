/**
 * @file 文章数据状态 / ES module
 * @module store/article
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import Vue from 'vue'
import { isBrowser } from '~/environment/esm'
import { fetchDelay } from '~/utils/fetch-delay'
import { isArticleDetailRoute } from '~/utils/route'
// import onResponse from '~/plugins/axios'
import { Easing, scrollTo } from '~/utils/scroll-to-anywhere'

let api = '/ar/article'
const getDefaultListData = () => {
  return {
    records: [],
    pagination: {}
  }
}

export const state = () => {
  return {
    list: {
      fetching: false,
      data: getDefaultListData()
    },
    hotList: {
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

  // 文章列表
  updateListFetchig(state, action) {
    state.list.fetching = action
  },
  updateListData(state, action) {
    state.list.data.records = action.content
    state.list.data.pagination = {
      pageNumber: action.number,
      totalPages: action.totalPages
    }
  },
  updateExistingListData(state, action) {
    state.list.data.records.push(...action.content)
    state.list.data.pagination = {
      pageNumber: action.number,
      totalPages: action.totalPages
    }
  },

  // 热门文章
  updateHotListFetchig(state, action) {
    state.hotList.fetching = action
  },
  updateHotListData(state, action) {
    state.hotList.data = action
  },

  // 文章详情
  updateDetailFetching(state, action) {
    state.detail.fetching = action
  },
  updateDetailData(state, action) {
    state.detail.data = action
  },

  // 更新文章阅读全文状态
  updateDetailRenderedState(state, action) {
    Vue.set(
      state.detail.data,
      'isRenderedFullContent',
      action == null ? true : action
    )
  },

  // 喜欢某篇文章
  updateLikesIncrement(state) {
    const article = state.detail.data
    article && article.meta.likes++
  }
}

export const actions = {

  // 获取文章列表
  fetchList({ commit }, params = { }) {
    const isLoadMore = params.page && params.page > 0

    if (params.tag_id) {
      api = `${api}?tagsId=${params.tag_id}`
    }
    // &categoryId=${params.categoryId}?tagsId=${params.tag_id}
    return this.$axios.$get(`${api}`, { params })
      .then(response => {
        commit('updateListFetchig', false)
        isLoadMore ? commit('updateExistingListData', response.data) : commit('updateListData', response.data)
        if (isLoadMore && isBrowser) {
          Vue.nextTick(() => {
            scrollTo(
              window.scrollY + (window.innerHeight * 0.8),
              300,
              { easing: Easing['ease-in'] }
            )
          })
        }
      })
      .catch(error => {
        console.error('获取文章列表失败：' + error.message)
        commit('updateListFetchig', false)
      }
      )
  },

  /**
   * 查询标签下的文章
   * @param commit
   * @returns {Promise<any>}
   */
  fetchArticles({ commit }, params = { }) {
    const isLoadMore = params.page && params.page > 1
    commit('updateFetching', true)
    return this.$axios.$get(`${api}/tag/${params.tag_id}`)
      .then(response => {
        commit('updateListFetchig', false)
        isLoadMore ? commit('updateExistingListData', response.data) : commit('updateListData', response.data)
        if (isLoadMore && isBrowser) {
          Vue.nextTick(() => {
            scrollTo(
              window.scrollY + (window.innerHeight * 0.8),
              300,
              { easing: Easing['ease-in'] }
            )
          })
        }
      })
      .catch(error => {
        console.error('获取文章列表失败：' + error.message)
        commit('updateListFetchig', false)
      })
  },

  // 获取最热文章列表
  fetchHotList({ commit, rootState }) {
    // const { SortType } = rootState.global.constants
    commit('updateHotListFetchig', true)
    return this.$axios.$get(`${api}/hot`, { params: { cache: 1 }})
      .then(response => {
        commit('updateHotListData', response.data)
        commit('updateHotListFetchig', false)
      })
      .catch(error => {
        console.error('获取最热文章列表失败：' + error.message)
        commit('updateHotListFetchig', false)
      })
  },

  // 获取文章详情
  fetchDetail({ commit }, params = {}) {
    const delay = fetchDelay(
      (isBrowser && isArticleDetailRoute(window.$nuxt.$route.name)) ? null : 0
    )
    if (isBrowser) {
      Vue.nextTick(() => {
        scrollTo(0, 300, { easing: Easing['ease-in'] })
      })
    }
    commit('updateDetailFetching', true)
    commit('updateDetailData', {})
    return this.$axios.$get(`${api}/${params.article_id}`).then(response => {
      return new Promise(resolve => {
        delay(() => {
          commit('updateDetailData', response.data)
          commit('updateDetailFetching', false)
          resolve(response)
        })
      })
    })
      .catch(error => {
        commit('updateDetailFetching', false)
        return Promise.reject(error)
      })
  },

  // 喜欢文章
  likeArticle({ commit }, article_id) {
    return this.$axios.$put(`${api}/like/${article_id}`).then(response => {
      if (response.code !== 20000) {
        this.$toast.error('服务器开小差啦~~')
      }
      // commit('updateLikesIncrement')
      localStorage.setItem('article_' + article_id, '1')
      return Promise.resolve(response)
    }).catch(error => {
      console.log(error)
      this.$toast.error('服务器开小差啦~~')
    })
  },
  unLikeArticle({ commit }, article_id) {
    return this.$axios.$delete(`${api}/like/${article_id}`)
      .then(response => {
        localStorage.removeItem('article_' + article_id)
        // commit('updateLikesIncrement')
        return Promise.resolve(response)
      })
  }
}
