let windowOrigin = window.location.origin
let currenUrl;
let currentOrigin, loginUrl;

if(process.env.NODE_ENV === "development"){
    currenUrl = 'http://test-shuangshiopenapi.speiyou.com';
    currentOrigin = 'http://47.95.49.66:13556'
    loginUrl = 'http://test-shuangshiops.speiyou.com';
}else if(process.env.NODE_ENV === "production"){
    currenUrl = "http://shuangshiopenapi.speiyou.com"
    currentOrigin = 'http://47.95.49.66:13556'
    loginUrl = 'http://shuangshiops.speiyou.com';
}else{
    currenUrl = "";
    currentOrigin = "";
    loginUrl = "";
}
export default {
    currenUrl,
    currentOrigin,
    loginUrl
}