import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import md5 from 'js-md5';

let currentOrigin,str;
// if(API_ENV === "dev"){
    currentOrigin = 'http://47.95.49.66:8002';//47.93.47.117:8002
    str = 'cb5bbfb7522753e41901dff6aebb4b18';
// }else if(API_ENV === "prod"){
//     currentOrigin = 'http://suyangtiku.speiyou.com:8002';
//     str = '1001ad15f4ed7fefb196aff784d05c89';
// }else if(API_ENV === "test"){
//     currentOrigin = 'http://47.95.49.66:8002';
//     str = 'cb5bbfb7522753e41901dff6aebb4b18';
// }

// 创建axios实例
const service = axios.create({
    baseURL: currentOrigin,
    timeout: 60000, // 请求超时时间,
    headers:{
      //'token':getToken("cmsOpsSid"),//业务接口统一在header中添加token
      'Content-Type':'application/json;charset=UTF-8',
    },
    params: {
    },
})

// request拦截器
service.interceptors.request.use(
  config => {
  // console.error('$', $.ajax())
    var seed;
    // $.ajax({
    //   type: "get",
    //   url: currentOrigin+"/service/seed",
    //   dataType: "json",
    //   async: false,
    //   success: function(data) {
    //     if(data.code == 200){
    //       seed = data.result;
    //     }
    //   }
    // })
    config.headers['sign'] = md5(seed + str);
    config.headers['seed'] = seed
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
    if(response.data.code == 0){
      return response.data
    } else {
      Message.error(response.data.msg);
      return response.data
    }
  },
  error => {
    console.log(error.message)
    Message({
      message: '请求超时，建议查看网络',
      type: 'error',
      duration: 5 * 1000
    })    
    var abc = {'code':1};
    return abc
    return Promise.reject(error)
  }
)


export default service
