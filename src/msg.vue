
<style scoped >
</style>
<template>
    <div class="msg-wrapper">
        <span>hello!</span>
        <span class="account">{{data.name}}</span>
    </div>
</template>
<script>
    export default {
        name:'Msg',
        data () {
            return {}
        },
        props:{
            data:{
                type:Object
            }
        },
        methods: {
 
        },
        created(){
            let that = this;
        }
    }
</script>