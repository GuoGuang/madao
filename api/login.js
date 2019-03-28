import request from '@/utils/request'
import qs from 'qs'

/**
 * 登录
 * @param {String} username : 用户名
 * @param {String} password : 密码
 */

export function loginByUsername(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: qs.stringify({ 'account': username, 'password': password })
  })
}

/**
 * 登出
 */
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

