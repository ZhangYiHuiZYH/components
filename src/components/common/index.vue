<template>
    <div class="wrapper">
         <div class="header">
            <div v-show="!isCollapse" class="logo">大运营平台</div>
            <div v-show="isCollapse" class="logo logo_collapse"><img src="../../images/logo.png" alt="双师"></div>
           <div class="bread" style="max-width: 75%; overflow: hidden;">
                <span v-for="(item,i) in MunuGroup" :key="i">
                    <a :href="item.url" style="color:#fff;font-size:14px;" @click="handleSelect(item.id)" :class ="{'activeDefault': item.id == menuid,'unactiveDefault': item.id != menuid}">{{item.name}}</a>
                </span>
            </div>
            <div class="user_info">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <img class="user-logo" src="../../images/logo.png">{{this.$store.getters.name}}
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div style="height:50px;"></div>
        <div class="container" :class="{hideSidebar: isCollapse}">
            <sideBar :isCollapse = isCollapse @updateBread="updateBread" :dataList="menuList"></sideBar>
            <div class="content">
                <keep-alive>
                <router-view v-if="$route.meta.keepAlive"/>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive" />
            </div>
        </div>
    </div>
     
</template>

<script>
    import sideBar from './sidebar'
    import pirurl from '../../api/config'
    export default {
        components: {
            sideBar
        },
        data() {
            return {
                isCollapse: false, // 控制左侧菜单折叠
                currentPath: "",
                MunuGroup: [],
                menuList: [],
                menuid: window.localStorage.MENUGOUPID,
            };
        },
        computed: {
            userName() {
                return this.$store.getters.name;
            }
        },
        created(){
            this.menuid = localStorage.getItem('MENUGOUPID') ? localStorage.getItem('MENUGOUPID') : this.$route.query.siteid ;
            this.getMunuGroup()
        },
        methods:{
            updateBread(value) {
                this.currentPath = value;
            },
            handleSelect(id){
                //切换分组
                localStorage.setItem('MENUGOUPID', id);
            },
            // 获取头部导航数据
            getMunuGroup(){
                this.$store.dispatch('GetSiteMenus').then((data) => {
                    if(data.state == 1) {
                        localStorage.removeItem('MENUGOUPDATALIST')
                        this.MunuGroup = data.res
                        let obj = {};
                        for (let i = 0; i < this.MunuGroup.length; i++) {
                            obj[this.MunuGroup[i].id] = this.MunuGroup[i].url;
                        }
                        localStorage.setItem('MENUGOUPDATALIST', JSON.stringify(obj))
                        this.getMenu()
                    } else if (data.state == -1000) {
                        // 否则全部重定向到登录页
                        // window.location.href = '/userlogin?ref='.encodeURI(window.location.href);
                    } else {
                        this.$message.error(data.errmsg)
                    }
                }).catch((err) => {
                })
            },
            getMenu(){
                let params = {
                    id:window.localStorage.getItem('MENUGOUPID')
                }
                this.$store.dispatch('GetSiteLeftMenus',params).then((data) => {
                    if(data.state == 1) {
                        this.menuList = data.res
                    }else if (data.state == -1000) {
                        // 否则全部重定向到登录页
                        window.location.href = '/userlogin?ref='+encodeURIComponent(window.location.href);
                    } else {
                        this.$message.error("获取数据失败")
                    }
                }).catch((err) =>{
                    console.log(err)
                })
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    window.location.href = pirurl.loginUrl+'/userlogin?ref='+encodeURIComponent(window.location.href);
                })
            },
            handleCommand(){
                this.logout()
            }
        }
    };
</script>
<style media="screen" scoped lang="scss">
    .top_bar {
        position: fixed;
        bottom: 30px;
        right: 10px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #fff;
        cursor: pointer;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        border-radius: 50%;
        color: #409eff;
        z-index: 2000;
    }

    .wrapper {
        height: 100%;
        .container {
            height: calc(100% - 50px); /* 去除头部的 70px */
            .content {
                height: 100%;
                background:#fff;
            }
        }
    }

    section {
        position: relative;
        height: calc(100% - 60px);
        padding: 20px 20px 30px 20px;
    }

    .bread {
        float: left;
        font-size: 14px;
        color: #fff;
        height: 50px;
        line-height: 50px;
    }
    .unactiveDefault{
        display: inline-table;
        height:100%;
        font-size:16px;
        cursor: pointer;
        padding:0 20px;
        border-right:1px solid #2f739a !important;
    }
    .activeDefault{
        border-right:1px solid #2f739a !important;
        font-size:16px;
        display: inline-table;
        padding:0 20px;
        background-color: #2f739a;
    }
    .control_bar {
        float: left;
        cursor: pointer;
    }

    .container {
        &.hideSidebar {
            .side_bar {
                width: 55px;
                overflow: inherit;
            }
            .content {
                margin-left: 55px;
            }
        }
    }

    .content {
        min-height: 100%;
        transition: margin-left 0.28s ease-out;
        margin-left: 180px;
    }

    .header {
        position: absolute;
        z-index: 999;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 22px;
        color: #fff;
        background: #3985b1;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        .logo {
            border-right:1px solid #2f739a;
            float: left;
            line-height: 49px;
            width: 180px;
            text-align: center;
            transition: all 0.28s ease-out;
        }
        .logo_collapse {
            width: 55px;
            transition: all 0.28s ease-out;
            img {
                width: 30px;
                height: 30px;
                margin-top: 20px;
            }
        }
    }

    .user_info {
        position: absolute;
        float: right;
        height: 50px;
        line-height: 43px;
        right: 40px;
        font-size: 16px;
        color: #fff;
    }

    .user_info .el-dropdown-link {
        padding-left: 35px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }

    .user_info .user-logo {
        position: absolute;
        left: 0;
        top: 10px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #fff;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
