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
//可用装饰器Component, Emit, Inject, Model, Prop, Provide, Vue, Watch
import { Component, Vue} from 'vue-property-decorator';
@Component({
    props: {
        propMessage: String
    }
})

export default class App extends Vue {      //class只是语法糖，所以属性赋值是用的=号，跟函数一样
    // initial data
    msg = 41515;

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
