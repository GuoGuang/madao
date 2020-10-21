/**
 * @file 用户数据状态 / ES module
 * @module store/tag
 * @author GuoGuang <https://github.com/GuoGuang>
 */
const UUID = require('es6-uuid')
// import { logout } from '@/api/login'
import { removeToken, setToken } from '@/utils/auth'
// import Cookies from 'js-cookie'

export const state = () => {
  return {
    fetching: false,
    data: {},
    state: '',
    authorDetail: ''

  }
}

export const mutations = {

  UPDATE_FETCHING(state, action) {
    state.fetching = action
  },
  SET_DATA(state, action) {
    state.data = action
  },
  SET_AUTHOR_DETAIL(state, action) {
    state.authorDetail = action.data
  }
}

export const actions = {

  /*   fetchList({ commit }) {
    commit('UPDATE_FETCHING', true)
    return this.$axios.$get(`/tag`, { params: { cache: 1 }})
      .then(response => {
        console.error(response)
        commit('updateListData', response)
        commit('UPDATE_FETCHING', false)
      })
      .catch(error => {
        console.error(error)
        commit('UPDATE_FETCHING', false)
      })
  }, */

  // 用户名登录
  LoginByAccount({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      return this.$axios.$post(`/oauth/token`, userInfo, { 'headers': {
        'DEVICE-ID': userInfo.deviceId,
        'Authorization': 'Basic WGNXZWJBcHA6WGNXZWJBcHA='
      }}).then(response => {
        if (response.code === 20000) {
          const data = response.data
          setToken(data)
          resolve(response)
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUserInfo({ commit }) {
    if (this.$cookies.get('Authorization')) {
      return this.$axios.$get(`/su`).then(response => {
        if (response.code !== 20000) {
          this.$cookies.set('Authorization', '')
        } else {
          commit('SET_DATA', response.data)
        }
        commit('UPDATE_FETCHING', false)
      })
    }
  },

  changeUserInfo({ commit }, userInfo) {
    return this.$axios.$get(`/su/changeUserInfo`).then(response => {
      if (response.code !== 20000) {
        this.$toast.success('更新失败，请稍后再试')
      } else {
        commit('SET_DATA', response.data)
      }
      commit('UPDATE_FETCHING', false)
    })
  },

  changeUserPhone({ commit }, userInfo) {
    return this.$axios.$get(`/su/changeUserPhone`).then(response => {
      if (response.code !== 20000) {
        this.$toast.success('更新失败，请稍后再试')
      } else {
        commit('SET_DATA', response.data)
      }
      commit('UPDATE_FETCHING', false)
    })
  },

  changePassword({ commit }, userInfo) {
    return this.$axios.$get(`/su/changePassword`).then(response => {
      if (response.code !== 20000) {
        this.$toast.success('更新失败，请稍后再试')
      } else {
        commit('SET_DATA', response.data)
      }
      commit('UPDATE_FETCHING', false)
    })
  },

  /**
   * 退出
   * @param {d} param0
   */
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken()
      commit('SET_DATA', {})
      resolve()
      /* logout(state.token).then(() => {
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      }) */
    })
  },
  /**
   * 发送验证码
   * @param {d} param0
   * @param phone 手机号
   */
  sendMessage({ commit }, phone) {
    return new Promise((resolve, reject) => {
      return this.$axios.$get(`/oauth/code/sms?phone=${phone}`)
        .then(response => {
          this.$toast.success('短信发送成功')
          resolve()
        }).catch(error => {
          console.log(error)
          commit('UPDATE_FETCHING', false)
        })
    })
  },
  /**
   * 注册
   * @param {d} param0
   * @param phone 手机号
   */
  register({ commit }, data) {
    return new Promise((resolve, reject) => {
      return this.$axios.$post(`/su/register`, data)
        .then(response => {
          if (response.code !== 20000) {
            this.$toast.error(response.message)
          } else {
            resolve(response)
          }
        }).catch(error => {
          console.error('获取文章列表失败：' + error.message)
          commit('UPDATE_FETCHING', false)
        })
    })
  },
  /**
   * 获取验证码
   * @param {d} param0
   * @param phone 手机号
   */
  fetchCaptcha({ commit }) {
    return new Promise((resolve, reject) => {
      return this.$axios.$get(`/oauth/code/captcha`,
        { 'headers': {
          'DEVICE-ID': UUID(32)
        }})
        .then(response => {
          if (response.code !== 20000) {
            this.$toast.error(response.message)
          } else {
            resolve(response)
          }
        }).catch(error => {
          console.error('获取文章列表失败：' + error.message)
          commit('UPDATE_FETCHING', false)
        })
    })
  },

  fetchAuthorDetail({ commit }) {
    return new Promise((resolve, reject) => {
      return this.$axios.$get(`/ar/article/admin`).then(response => {
        if (response.code !== 20000) {
          this.$toast.error(response.message)
        } else {
          commit('SET_AUTHOR_DETAIL', response)
          resolve(response)
        }
      }).catch(() => {
        commit('UPDATE_FETCHING', false)
      })
    })
  }
}
