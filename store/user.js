/**
 * @file 用户数据状态 / ES module
 * @module store/tag
 * @author GuoGuang <https://github.com/GuoGuang>
 */
const UUID = require('es6-uuid')
// import { logout } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/auth'
// import Cookies from 'js-cookie'

export const state = () => {
  return {
    token: '',
    fetching: false,
    data: {},
    state: ''

  }
}

export const mutations = {

  updateFetching(state, action) {
    state.fetching = action
  },
  SET_DATA(state, action) {
    console.log('设置值--------', action.data.nickName)
    state.data = action.data
  },
  SET_TOKEN(state, token) {
    state.token = token
  }

}

export const actions = {

  /*   fetchList({ commit }) {
    commit('updateFetching', true)
    return this.$axios.$get(`/tag`, { params: { cache: 1 }})
      .then(response => {
        console.error(response)
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch(error => {
        console.error(error)
        commit('updateFetching', false)
      })
  }, */

  /**
   * 更新用户状态
   * @param {d} param0
   */
  toggleLoginStatus({ commit }) {
    commit('SET_TOKEN', getToken())
  },

  // 用户名登录
  LoginByUsername({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      return this.$axios.$post(`/oauth/token`, userInfo, { 'headers': {
        'DEVICE-ID': userInfo.deviceId,
        'Authorization': 'Basic WGNXZWJBcHA6WGNXZWJBcHA='
      }}).then(response => {
        if (response.code === 20000) {
          const data = response.data
          commit('SET_TOKEN', data)
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
        commit('SET_DATA', response)
        commit('updateFetching', false)
      })
    }
  },

  /**
   * 退出
   * @param {d} param0
   */
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
      /* logout(state.token).then(() => {
        commit('SET_TOKEN', '')
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
          commit('updateFetching', false)
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
          console.log(response)
          if (response.code !== 20000) {
            this.$toast.error(response.message)
          } else {
            resolve(response)
          }
        }).catch(error => {
          console.error('获取文章列表失败：' + error.message)
          commit('updateFetching', false)
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
          console.log(response)
          if (response.code !== 20000) {
            this.$toast.error(response.message)
          } else {
            resolve(response)
          }
        }).catch(error => {
          console.error('获取文章列表失败：' + error.message)
          commit('updateFetching', false)
        })
    })
  }
}
