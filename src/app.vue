<template>
    <div>
        <input v-model="msg"/>
        <p>prop: {{propMessage}}</p>
        <p>msg: {{msg}}</p>
        <p>helloMsg: {{helloMsg}}</p>
        <p>computed msg: {{computedMsg}}</p>
        <button @click="greet">Greet</button>
    </div>
</template>
<!--仅使用组件装饰器版本，未使用ts,如需支持更多装饰器请使用vue-property-decorator-->
<!--如果需要使用ts，添加lang=‘ts’即可使用-->
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
// import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
@Component({
    props: {
        propMessage: String
    }
})

export default class App extends Vue {
    // initial data
    msg = 123456;

    // use prop values for initial data
    helloMsg = 'Hello, ' + this.propMessage;

    // lifecycle hook
    mounted () {
        this.greet();
    }

    // computed
    get computedMsg () {
        return 'computed ' + this.msg;
    }

    // method
    greet () {
        alert('greeting: ' + this.msg);
    }
}
</script>
