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
<script lang="ts">
//可用装饰器Component, Emit, Inject, Model, Prop, Provide, Vue, Watch
import { Component, Vue,Prop,Model,Watch} from 'vue-property-decorator';
@Component({                //可以在对象中声明 components ，filters，directives等未提供装饰器的选项，也可以声明computed，watch等
    filters: {
        toFixed: (num: number, fix: number = 2) => {
            return num.toFixed(fix)
        }
    }
})

export default class App extends Vue {      //class只是语法糖，所以属性赋值是用的=号，跟函数一样
    @Model ('change', {type: Boolean,default:true})  checked!: boolean; //!表示非空，定义v-model
    @Prop({default: 'qq', type: String}) propMessage?:string;   //？表示可以是空值
    @Prop(String) public propA: string | undefined;
    @Prop([String, Number]) public propB!: string | number;
    @Watch('msg')
    public onMsgChanged(newValue: string, oldValue: string) {}

    @Watch('arr', { immediate: true, deep: true })
    public onArrChanged1(newValue: number[], oldValue: number[]) {}

    @Watch('arr')
    public onArrChanged2(newValue: number[], oldValue: number[]) {}
    // initial data
    private msg: string = '41515';
    public list: number[] = [0, 1, 2, 3, 4];

    // use prop values for initial data
    private helloMsg :string = 'Hello, ' + this.propMessage;

    // lifecycle hook
    mounted () {
        // this.greet();
        console.log(11);
    }

    // computed
    get computedMsg () {
        return 'computed ' + this.msg;
    }

    // method
    greet () {
        console.log(this);
        console.log(this.checked);
        alert('greeting: ' + this.msg);
    }
}
</script>
