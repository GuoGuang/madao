/**
 * @file 用户数据状态 / ES module
 * @module store/article
 * @author GuoGuang <https://github.com/GuoGuang0536>
 */

import config from '../../config'
import axios from 'axios'
import Cookie from 'js-cookie'
const baseUrl = `http://${config.axios.host}:${config.axios.port}`
const querystring = require('querystring')
import { Message } from 'element-ui'// import { setToken } from '~/plugins/Tool.js'
import { SET_USER_NAME } from '../mutation-types.js'
import { getToken } from '@/utils/auth' // 从cookie中获取token getToken


const login = {

  state: {
    loginStatus: getToken()
  },

  mutations: {
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    }
    
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    /**
     * 登录
     * @param {Object} param0 a
     * @param {Object} param1 b
     * @returns {number} The sum of the two numbers.
     */ 
    loginIn({ commit }, { $router, ruleForm }) {
    try {
      const res = await
      axios.post(`${baseUrl}/api/login_in`,
        querystring.stringify(ruleForm))
      if (res.data.success === 'true') {
        Cookie.set('userName', res.data.data.user_name)
        Message.success({
          dangerouslyUseHTMLString: true,
          duration: 3000,
          message: `登录成功`
        })
        $router.push('/')
      } else if (res.data.success === 'false') {
        Message.error({
          dangerouslyUseHTMLString: true,
          duration: 3000,
          message: `${res.data.data.msg}`
        })
      }
    } catch (error) {
      Message.error({
        dangerouslyUseHTMLString: true,
        duration: 3000,
        message: `系统繁忙，请联系管理员`
      })
    }
  },

  async loginOut({ commit }, { $router }) {
    Cookie.set('userName', '')
    Message.success({
      dangerouslyUseHTMLString: true,
      duration: 3000,
      message: `注销成功`
    })
    window.location.href = 'http://47.104.0.55:3000'
  }
  }
}