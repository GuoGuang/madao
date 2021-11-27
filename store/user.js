/**
 * @file 用户数据状态 / ES module
 * @module store/tag
 * @author GuoGuang <https://github.com/GuoGuang>
 */
const UUID = require('es6-uuid')
import { removeToken, setToken } from '@/utils/auth'
const { path } = require('~/config/api.json')
const api = path.user + '/user'

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

  /**
   * 用户名登录
   */
  LoginByAccount({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      return this.$axios.$post(`/auth/token`, userInfo, { 'headers': {
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

  // Oauth登录
  LoginByOauth({ commit }, query) {
    return new Promise((resolve, reject) => {
      return this.$axios.$get(`/auth/login/github?code=` + query.code).then(response => {
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

  getUserInfo({ commit }, cookie) {
    console.log('getUserInfo-----------', cookie)
    return this.$axios.$get(`${api}`, { 'headers': {
      'AUTH': 'Bearer ' + cookie
    }}).then(response => {
      if (response.code === 20000) {
        commit('SET_DATA', response.data)
        commit('UPDATE_FETCHING', false)
      }
    })
  },

  changeUserInfo({ commit }, userInfo) {
    return this.$axios.$put(`${api}/userInfo`, userInfo).then(response => {
      if (response.code !== 20000) {
        this.$toast.info(response.message)
      } else {
        this.$toast.info('更新成功！')
      }
      commit('UPDATE_FETCHING', false)
    })
  },

  changeUserPhone({ commit }, userInfo) {
    return this.$axios.$put(`${api}/changeUserPhone`, userInfo).then(response => {
      if (response.code !== 20000) {
        this.$toast.info(response.message)
      } else {
        this.$toast.info('更新成功！')
      }
      commit('UPDATE_FETCHING', false)
    })
  },

  changePassword({ commit }, userInfo) {
    return this.$axios.$put(`${api}/changePassword`, userInfo).then(response => {
      if (response.code !== 20000) {
        this.$toast.info(response.message)
      } else {
        this.$toast.info('更新成功！')
      }
      commit('UPDATE_FETCHING', false)
    })
  },

  /**
   * 退出
   */
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(`/auth/logout`)
        .then(response => {
          removeToken()
          commit('SET_DATA', {})
          resolve(response)
        }).catch(error => {
          this.$toast.error('退出失败！' + error)
          reject(error)
        })
    })
  },

  /**
   * 发送验证码
   * @param {d} param0
   * @param phone 手机号
   */
  sendMessage({ commit }, phone) {
    return new Promise((resolve, reject) => {
      return this.$axios.$get(`/auth/code/sms?phone=${phone}`)
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
   */
  register({ commit }, data) {
    return new Promise((resolve, reject) => {
      return this.$axios.$post(`${api}/register`, data)
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
   */
  fetchCaptcha({ commit }) {
    return new Promise((resolve, reject) => {
      return this.$axios.$get(`/auth/code/captcha`,
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
  }
}
