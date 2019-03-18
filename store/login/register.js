import config from '../../config'
import axios from 'axios'
import Cookie from 'js-cookie'
const baseUrl = `http://${config.axios.host}:${config.axios.port}`
const querystring = require('querystring')
import { Message } from 'element-ui'// import { setToken } from '~/plugins/Tool.js'
import {
    // SET_USER_ACCOUNT
} from '../mutation-types.js'

export const state = () => {
    return {
        user_name: ''
    }
}
/**
 * mutations
 * @type {{[ADD_GROUP]: ((state))}}
 */
export const mutations = {

}
/**
 * actions
 * @type {{}}
 */
export const actions = {
    
    async register({ commit }, { $router, ruleForm }) {
        try {
            const res = await
                axios.post(`${baseUrl}/api/register`,
                    querystring.stringify(ruleForm))
            console.log(res.data)
            if (res.data.success === 'true') {
                Message.success({
                    dangerouslyUseHTMLString: true,
                    duration: 3000,
                    message: `注册成功请登录`
                })
                $router.push('/login')
            } else if (res.data.success === 'false') {
                if (res.data.data.error === '5006') {
                    Message.error({
                        dangerouslyUseHTMLString: true,
                        duration: 3000,
                        message: `账号已存在`
                    })
                } else {
                    Message.error({
                        dangerouslyUseHTMLString: true,
                        duration: 3000,
                        message: `${res.data.data.msg}`
                    })
                }
            }
        } catch (error) {
            Message.error({
                dangerouslyUseHTMLString: true,
                duration: 3000,
                message: `系统繁忙，请联系管理员`
            })
        }
    }
}
/**
 * getters
 * @type {{}}
 */
export const getters = {
    getUserAccount(state) {
        return Cookie.get('userAccount')
    }
}
