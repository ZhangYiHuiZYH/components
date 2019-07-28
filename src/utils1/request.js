import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/cookie'
import pirurl from "../api/config";

// 创建axios实例
const service = axios.create({
    baseURL: pirurl.currentOrigin,
    timeout: 50000, // 请求超时时间,
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'authtoken':getToken("authtoken")//业务接口统一在header中添加token
    },
    params: {
    },
    withCredentials : true
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // const res = response.data
    if(response.status == 200){
        return response.data
    } else {
        return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
