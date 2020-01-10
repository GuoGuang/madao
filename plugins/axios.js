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
    $axios.defaults.timeout = 5000
    $axios.defaults.baseURL = apis.baseUrl
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    const token = app.$cookies.get('Authorization')
    if (token) {
      $axios.setToken(token)
    }
    return config
  })
  $axios.onError(error => {
    console.log('error')
    console.log(error)
    if (error.response.status === 500) {
      return Promise.reject(error)
    }
  })
  $axios.onResponse(response => {
    console.log('onResponse')
    console.log(response)
  })
}
