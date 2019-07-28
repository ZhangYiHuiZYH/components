<template>
    <aside class="side_bar">
        <el-menu v-if="this.menuList&&this.menuList.length != 0" :collapse="isCollapse" :default-active="onRoutes" background-color="#3c8dbc" style="padding-top: 10px;"
                 text-color="#fff" @select="getCurrentRoute" unique-opened router>
            <template v-for="item in menuList">
                <template>
                    <el-submenu :index="item.id">
                        <template slot="title">
                            <span v-if="item.icon" :class="['fa', item.icon]"></span>
                            <span v-else class="fa fa-circle-o"></span>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item v-if="item.sub.length > 0" v-for="(subItem,i) in item.sub" :key="i" :index="subItem.tvar">
                            <!-- <i class="fa fa-circle-o"></i> -->
                            {{ subItem.name }}
                        </el-menu-item>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
    </aside>
</template>
<script>
    export default {
        props: ['isCollapse','dataList'],
        data() {
            return {
                menuList:[]
            }
        },
        watch:{
            dataList(n,o){
                if(n != ''){
                    this.menuList = n
                }else{
                    this.menuList = []
                }
            }
        },
        computed: {
            // 当前所在路由
            onRoutes() {
                let currentRoute = this.$route.path.replace('/', '').split('__')[0] // 当前所在路由
                return currentRoute
            },
        },
        methods: {
            getCurrentRoute(path) {
                this.$store.dispatch('get_current_url', path) // 更改全局环境设置
                //保证切换分组，不影响二级菜单消失
                if(!localStorage.getItem('MENUGOUPID'))return;
                let data = JSON.parse(localStorage.getItem('MENUGOUPDATALIST'))
                data[localStorage.getItem('MENUGOUPID')] = path
                localStorage.setItem('MENUGOUPDATALIST',JSON.stringify(data))
            }
        }
    }
</script>
<style lang="scss">
    .el-menu {
        border-right: none;
    }

    .side_bar {
        transition: width 0.28s ease-out;
        width: 180px;
        /*height: 100%;*/
        position: fixed;
        top: 50px;
        bottom: 0;
        left: 0;
        z-index: 1001;
        font-size:14px;
        overflow-y: auto;
        background: #3c8dbc;
        &::-webkit-scrollbar {
            display: none
        }
        i {
            color: #fff;
        }
    }
    .el-submenu__title i {
        color: #fff;
    }
</style>

