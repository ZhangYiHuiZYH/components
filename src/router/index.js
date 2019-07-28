import Vue from 'vue'
import VueRouter from 'vue-router'
import {getUrlString} from '../utils/validate'

var urlParam = getUrlString();
let token = urlParam.token;
let siteid = urlParam.siteid;

const index = resolve => require(['@/components/common/index'], resolve) // 用户组信息

// 404 页面
const notFoundComponentconst = resolve => require(['@/components/other/404'], resolve) // 404页面
const home = resolve => require.ensure([], () => resolve(require('@/components/common/home')), 'home')

// 自主数据查询
const dataQuery = resolve => require(['@/components/dataReport/dataQuery'], resolve);


Vue.use(VueRouter)
export const routes = [
    {path: '/', redirect: '/index'},
    {path: '/404', component: notFoundComponentconst},
    {
        path: '/index', component: index,
        children: [
            {
                path: '/',
                component: home,
                meta: {name: '首页'}
            },
            {
                path: '/dataQuery',
                component: dataQuery,
                meta: {
                    keepAlive: true
                },
            }
        ]
    }
]

//  创建 router 实例，然后传 `routes` 配置
export default new VueRouter({
    scrollBehavior(to, from, savedPosition){
        return {x: 0, y: 0}
    },
    routes // （缩写）相当于 routes: routes
})
