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
                data:'hello world!'
            }
        },
        methods:{
            sayHello(){
                alert('sayHello!');
            }
        }
    };
</script>

<style lang="scss">
.vu-hello{
    color: red;
}
</style>
