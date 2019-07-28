<template>
    <section>
        {{userName}}，欢迎来到业务提效管理平台
    </section>
</template>
<script type="text/javascript">
    export default {
        computed: {
            userName () {
                return this.$store.getters.name
            }
        },
    }
</script>
<style scoped lang="scss">
    section{
        font-size: 20px;
        position: relative;
        height: calc(100% - 60px);
        padding: 60px 20px 30px 210px;
    }
</style>
