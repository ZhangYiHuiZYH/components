<template lang="html">
    <div>
        <div class="top-info-wrap">
            <div>
                <i class="el-icon-tickets"></i>
                <!-- <i @click="">未命名分析</i> -->
                <div class="name-wrap">
                    <el-input></el-input>
                </div>
                <i class="el-icon-edit"></i>
            </div>
            <div class="top-right-wrap">
                <el-button type="primary" size="mini">查询</el-button>
                <el-button type="success" size="mini">保存</el-button>
                <el-button type="info" size="mini">另存为</el-button>
            </div>
        </div> 
        <div>
            <div class="title">指标</div>
            <el-select v-model="value8" filterable placeholder="请选择">
                <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
                value8: ''
            }
        },
        methods: {
            filterStr (str) {
                const reg = /(\w+|[\u4e00-\u9fa5]+)/g
                const box = document.getElementById('box')
                let newStr = str.replace(reg, '<span style="color: red; cursor: pointer;">$1</span>')
                box.innerHTML = newStr
            }
        },
        mounted () {
            
        }
    }
</script>

<style lang="scss" scoped>
    .top-info-wrap{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        .name-wrap{
            display: inline-block;
            width: 200px;
        }
        .top-right-wrap{
            
            margin-right: 30px;
        }
    }
</style>
