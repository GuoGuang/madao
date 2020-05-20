/**
 * @file Axios 扩展服务 / ES module
 * @module plugins/axios
 * @author GuoGuang <https://github.com/GuoGuang>
 */
// import cookie from 'cookie'

// const SUCCESS_STATUS_TEXT = 'success'
const apiJson = require('~/config/api.json')
const { NODE_ENV } = require('~/environment/esm')
const apis = apiJson[NODE_ENV]

export default function({ $axios, app }) {
  $axios.onRequest(config => {
    $axios.defaults.timeout = 20000
    $axios.defaults.baseURL = apis.baseUrl
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    const token = app.$cookies.get('Authorization')
    if (token) {
      $axios.setToken(token)
    }
    return config
  })
  $axios.onError(error => {
    console.log('$axios请求发生异常：', error)
    if (!error.response) {
      return Promise.reject(error)
    }
  })
  $axios.onResponse(response => {
    console.log('请求成功：', response.request.path)
    // console.log('请求成功响应体：', response.data)
  })
}
