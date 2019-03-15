<template>
    <div id="app">
        <h1 @click="sayHello" class="vu-hello">{{data}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data:function () {
            return {
                data:'hello world12132132321!'
            }
        },
        methods:{
            sayHello(){
                alert('sayHello!');
            }
        }
    };
</script>

<style scoped lang="scss">
.vu-hello{
    color: red;
}
</style>
