import instance from './request'
import { getToken, setToken, removeToken } from '../utils/cookie'
import qs from 'qs'

const user = {
    state: {
        token: getToken(),
        name: localStorage.getItem('username'),
        roles: [],
        siteid:localStorage.getItem('MENUGOUPID')?localStorage.getItem('MENUGOUPID'):''
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        GET_CURRENT_URL(state, value) {
            state.currentPath = value
        }
    },

    actions: {
        // 登录
        GetSiteMenus({ commit }) {
            return new Promise((resolve, reject) => {
                instance.get('/ucenter/getSiteMenu').then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        GetSiteLeftMenus({ commit }, params) {
            return new Promise((resolve, reject) => {
                instance.get('/ucenter/getSiteLeftMenu?'+qs.stringify(params)).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetCheckSession({commit}, params){
            return new Promise((resolve, reject) => {
                instance.get('/ucenter/getUserinfo').then(response => {
                    if(response.state > 0 && response.res){
                        if(response.res.sdata && response.res.sdata.length > 0){ // 验证返回的roles是否是一个非空数组
                            commit('SET_ROLES', response.res.sdata)
                        }
                        setToken(response.res.token,"authtoken")
                        commit("SET_TOKEN", response.res.token)
                        commit('SET_NAME', response.res.name)
                        localStorage.setItem('username',response.res.name)
                        localStorage.setItem('isAdmin',response.res.isadmin); // 0: 普通用户(下拉), 1: 超管(模糊搜索)
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit}) {
            return new Promise((resolve, reject) => {
                instance.get('/ucenter/logout').then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    removeToken("authtoken")
                    localStorage.clear();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        get_current_url({commit}, value) {
            commit('GET_CURRENT_URL', value)
        },
    }
}

export default user
