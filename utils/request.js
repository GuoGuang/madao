import axios from 'axios'
import cookie from 'cookie'

const apiJson = require('~/config/api.json')

const apis = apiJson['production']

const Axios = axios.create({

  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

Axios.defaults.baseURL = apis.baseUrl
// http request请求拦截器(所有请求发送都要执行的操作)
Axios.interceptors.request.use(
  config => {
    console.log(apis.baseUrl)
    console.log('apis.baseUrl,')
    const { token } = cookie.parse(document.cookie)
    config.url = apis.baseUrl
    if (token) {
      config.headers = {
        'X-TOKEN': token
      }
    }
    // 参数序列化
    if (config.method === 'post') {
      console.error('')
    }

    return config
  }, error => {
    return Promise.reject(error)
  }
)

// http response响应拦截器
Axios.interceptors.response.use(
  response => {
    // 判断返回code是否为10004，token失效状态，若是则清除Node服务器session中的token及其本地localStrage中的token
    if (response.code === '10004') {
      console.error('')
    }
    return response
  }, error => {
    return Promise.reject(error)
  }
)

export default Axios
