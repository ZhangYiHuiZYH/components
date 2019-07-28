<template>
  <div id="app">
    <!-- <router-view/> -->
    <div class="drag" style="border: 1px solid black; width: 200px; line-height: 80px; height: 80px;text-align:center;">
        
    </div>
    <drag>你好</drag>
  </div>
</template>

<script>
// import tiku from 'tiku'
import drag from 'vue-drag'

export default {
  name: 'app',
  components: {
    drag
  },
//   beforeCreate() {
//     Vue.directive('drag',{
//     bind: function(el, bind, vNode){
//         el.onpointerdown =  function (e) {
//             //获取鼠标点击处分别与div左边和上边的距离： 鼠标位置-div位置
//             let divx = e.clientX - el.offsetLeft
//             let divy = e.clientY - el.offsetTop
//             //获取屏幕的宽度 和  高度 
//             let clientWidth = document.body.clientWidth // 不带单位
//             let clientHeight = document.body.clientHeight
//             // 获取元素 的宽度和高度
//             let elWidth = el.offsetWidth  // 不带单位
//             let elHeight = el.offsetHeight
//             let moveHandle = function(e){
//                 if (e.type === 'touchmove') {
//                     var e = e.touches[0]
//                 }
//                 el.style.position = 'fixed'
//                 var l = e.clientX - divx;
//                 var t = e.clientY - divy;
//                 if (l <= 0) {
//                     el.style.left = '0px'
//                 } else if(l >= (clientWidth-elWidth)){
//                     el.style.left = clientWidth-elWidth + 'px';
//                 } else {
//                     el.style.left = l+'px';
//                 }
//                 if (t <= 0) {
//                     el.style.top = '0px'
//                 } else if(t >= (clientHeight-elHeight)){
//                     el.style.top = clientHeight - elHeight + 'px';
//                 } else {
//                     el.style.top = t+'px';
//                 }
//             }
//             if (e.pointerType === 'mouse') {
//                 document.addEventListener('pointermove', moveHandle ,{ passive: true })
//                 document.addEventListener('pointerup', function(){
//                     document.removeEventListener('pointermove', moveHandle)
//                     document.removeEventListener('pointerup', null)
//                 })
//             } else if (e.pointerType === 'touch') {// pointermove 在触摸下触发了  pointerleave
//                 document.addEventListener('touchmove', moveHandle ,false)
//                 document.addEventListener('touchend', function(){
//                     document.removeEventListener('touchmove', moveHandle, false)
//                     document.removeEventListener('touchend', null)
//                 })
//             }
//         }
//         }
//     });
//   }
}
</script>

<style lang="scss">
    html, body{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    body {
        overflow-y: auto;
    }
    .fa{font-size:13px; margin-right: 5px;}
    .gray {
        color:#999;
    }
    html { 
        overflow-y:hidden;
    }
    .el-table__row td {
        height: 38px!important;
    }
    ::-webkit-scrollbar {
        width: 10px; 
        height: 10px; 
    }
    ::-webkit-scrollbar-button:vertical {
        display: none;
    }
    ::-webkit-scrollbar-track, 
    ::-webkit-scrollbar-corner { 
        background-color: #e2e2e2;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 1px; 
        background-color: rgba(0,0,0,.2);
    }
    ::-webkit-scrollbar-thumb:vertical:hover { 
        background-color: rgba(0,0,0,.35);
    }
    ::-webkit-scrollbar-thumb:vertical:active { 
        background-color: rgba(0,0,0,.38);
    }
    .el-button--smini, 
    .el-button--smini.is-round {
        padding: 4px 10px;
    }
    .el-radio-button--bbig .el-radio-button__inner {
        height: 50px;
        line-height: 25px; 
        border-radius: 0px !important;
        border-left: 0 !important;
        border-top: 0 !important;
        border-bottom:0 !important;
        background: #3985b1;
        color:#fff;
        border-right:1px solid #2f739a !important;
        box-shadow: -1px 0 0 0 #2f739a!important;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: #2f739a;
    }
    .el-table__row td { 
        height: 40px;
    }
    .el-tabs--border-card { 
        box-shadow: 0 4px 4px #fff; 
    }
    .el-button--smini {
        font-size: 12px;
        border-radius: 3px;
    }
    .el-tooltip__popper { 
        max-width: 50%;
    }
    .el-dialog__body {
        padding-bottom: 2px!important;
    }
    .el-table td {
        padding: 5px 0px!important;
    }
    .el-table th {
        padding: 5px 0px!important; 
        height: 30px; 
        line-height: 30px;
    }
    .el-tag {
        height: 22px; line-height: 22px;
    }
    .el-menu-item {
        font-size: 12px; 
        height: 35px!important; 
        line-height: 35px!important;
    }
    .el-submenu__title {
        height: 40px; 
        line-height: 40px; 
        font-size:14px!important; 
    }
    .el-submenu .el-menu-item {
        font-size: 12px; //cli3 打包css方式不同
        height: 30px!important; 
        line-height: 30px!important; 
        min-width: 190px;
    }
    .tab_right {
        float: right;
        margin-right:0px!important;
    }
    a {
        color: #20A0FF;
        text-decoration: none;
    }
    .success{
        color: #13CE66;
    }
    .error{
        color: #FF4949;
    }
    .warning{
        color: #F7BA2A;
    }
    .pagination,.pagination-box {
        float: right;
        padding: 20px;
        margin: 0px!important;
    }
    .el-table__expanded-cell {
        padding: 0px 0px!important;
        .el-table__body {
            width: auto!important;
            margin-left: 70px;
        }
    }

    *{
        padding: 0;
        margin: 0;
    }
    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        visibility: hidden;
        clear: both;
    }

    .clearfix {
        zoom: 1;
    }
    .title_wrap h3 {
        float: left;
    }
    .title_wrap .select_type {
        float: right;
        text-align: right;
    }
    .container {
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
    .target_content {
        width: 290px;
        height: 180px;
        margin-right: 20px;
        float: left;
        margin-bottom: 40px;
        position: relative;
        color: #ffffff;
        font-family: "Microsoft YaHei";
    }
    .no_data {
        font-size: 12px;
        position: absolute;
        top: 82px;
        left: 31px;
        width: 230px;
    }
    .title {
        font-size: 20px;
        font-weight: bold;
        margin: 25px 0 0 30px;
    }
    .sub_title {
        font-size: 12px;
        margin: 3px 0 0 30px;
    }
    .target_num {
        position: absolute;
        left: 31px;
        top: 81px;
        font-size: 14px;
        vertical-align:middle;
    }
    .current_num {
        position: absolute;
        left: 180px;
        top: 81px;
        font-size: 14px;
        vertical-align:middle;
    }
    .three_status .target_num {
        position: absolute;
        left: 31px;
        top: 81px;
        font-size: 14px;
        vertical-align:middle;
    }
    .three_status .current_num {
        position: absolute;
        left: 121px;
        top: 81px;
        font-size: 14px;
        vertical-align:middle;
    }
    .three_status .underway_num {
        position: absolute;
        left: 210px;
        top: 81px;
        font-size: 14px;
        vertical-align:middle;
    }
    .target_num .num ,.current_num span,.underway_num span {
        font-size: 36px;
        margin-right: 2px;
        font-family: "DINCE";
    }
    .current,.target {
        margin-left: 3px;
    }
    .target_symbol {
        font-size: 22px;
    }
    .right_bottom_update_date {
        font-size: 14px;
        color: #AAAAAA;
        text-align: right;
        margin-top: 30px;
    }
    .bread .el-menu-item {
        padding: 0 4px;
    }
</style>
