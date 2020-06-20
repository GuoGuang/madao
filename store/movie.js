/**
 * @file 电影数据状态 / ES module
 * @module store/movie
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import Vue from 'vue'
import { isBrowser } from '~/environment/esm'
import { scrollTo, Easing } from '~/utils/scroll-to-anywhere'

const api = '/movie'
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
    detail: {
      fetching: false,
      data: {}
    }
  }
}

export const mutations = {

  updateListFetchig(state, action) {
    state.list.fetching = action
  },
  updateListData(state, action) {
    state.list.data = action
  },
  updateExistingListData(state, action) {
    state.list.data.data.push(...action)
    state.list.data.pagination = action.pagination
  },

  // 电影详情
  updateDetailFetchig(state, action) {
    state.detail.fetching = action
  },
  updateDetailData(state, action) {
    state.detail.data = action
  }
}

export const actions = {

  // 获取电影列表
  fetchList({ commit }, params = {}) {
    const isLoadMore = params.page && params.page > 1
    return this.$axios.$get(api, { params }).then(response => {
      commit('updateListFetchig', false)
      isLoadMore ? commit('updateExistingListData', response) : commit('updateListData', response)
      if (isLoadMore && isBrowser) {
        Vue.nextTick(() => {
          scrollTo(
            window.scrollY + (window.innerHeight * 0.8),
            300,
            { easing: Easing['ease-in'] }
          )
        })
      }
    }).catch(error => {
      console.error('获取电影列表失败：' + error.message)
      commit('updateListFetchig', false)
    }
    )
  },

  // 获取电影详情
  fetchDetail({ commit }, params = {}) {
    if (isBrowser) {
      Vue.nextTick(() => {
        scrollTo(0, 300, { easing: Easing['ease-in'] })
      })
    }
    commit('updateDetailFetchig', true)
    commit('updateDetailData', {})
    return this.$axios.$get(`${api}/${params.movie_id}`).then(response => {
      return new Promise(resolve => {
        commit('updateDetailData', response.data)
        commit('updateDetailFetchig', false)
        resolve(response)
      })
    })
      .catch(error => {
        commit('updateDetailFetchig', false)
        return Promise.reject(error)
      })
  }
}
