import  axios from 'axios'
import {Message, MessageBox} from 'element-ui';
import {getToken,setToken,removeToken} from '../utils/cookie' // 操作 cookie 库
import pirurl from '../api/config'
import store from '../store'

axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL: pirurl.currenUrl,
    timeout: 30000,
    headers:{ 'Content-Type': 'application/x-www-form-urlencoded'},
    params: {
        token:getToken(),
    }
});

// http request 拦截器
instance.interceptors.request.use(
    config => {
        return config;
    }
)
// http response 拦截器
instance.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        if(response.status == 200){
            if(response.data){
                if(typeof response.data.state !="undefined" &&  response.data.state == "-1000"){
                    Message({
                        message: response.data.errmsg,
                        type: 'error',
                        duration: 5 * 1000
                    })
                    store.dispatch('LogOut').then(() => {
                        window.location.href = pirurl.loginUrl+'/userlogin?ref='+encodeURIComponent(window.location.href)
                    })
                    return false;
                }else if(typeof response.data.state !="undefined" && response.data.state < 0){
                    Message.error(response.data.errmsg)
                    return false;
                }else{
                    return response.data
                }
            }
        }else{
            Message.error("服务器连接错误")
        }
    },
    error => {
        Message.error(error.message);
        return Promise.reject(error);
    }
)

export default instance