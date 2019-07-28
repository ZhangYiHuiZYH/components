import router from '../router'
import store from '../store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {getToken, removeToken, setToken} from '../utils/cookie' // 验权
import {getUrlString} from '../utils/validate' // 验权
import pirurl from '../api/config'

// 获取URL携带的参数
var urlParam = getUrlString();
let token = urlParam.token;
let siteid = urlParam.siteid;

siteid && window.localStorage.setItem('MENUGOUPID', siteid);
token && setToken(token)

// 不重定向白名单 如果不设置白名单，会形成死循环，堆栈溢出
const whiteList = ['/login'];

router.beforeEach((to, from, next) =>{
    NProgress.start()
    if(getToken()){
        //检查session 是否有效
        store.dispatch('GetCheckSession').then(res =>{ // 拉取用户信息
            next()
        })
    }else{
        if(whiteList.indexOf(to.path) !== -1||true){ // 在免登录白名单，直接进入
            next();
        }else{
            removeToken();
            window.location.href = pirurl.loginUrl + '/userlogin?ref='+encodeURIComponent(window.location.href)
            NProgress.done()
        }
    }
})

router.afterEach(() =>{
    NProgress.done() // 结束Progress
})