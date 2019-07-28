<template lang="html">
    <section>
        当前页面路径是：{{currentPath}}
        <div id="box" @click="test($event)"></div>
    </section>
</template>

<script>
    export default {
        data () {
            return {
                currentPath: this.$store.state.currentPath
            }
        },
        methods: {
            test (e) {
                console.log(e.target.innerHTML)
            },
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

<style lang="css" scoped>
    section{
        width: 100%;
        height: 100%;
        background: #324157;
        color: #fff;
    }
</style>
