import './main.scss';
import $ from 'jquery';
import $h from './UIComponent';
import Vue from 'vue';
import App from './app';


window.$h = $h;
window.$ = $;
window.jQuery = $;

let user = { firstName: 'Jane', lastName: 'User' };
//  动态加载模块 限制必须未被调用过才能分离包
import(/*webpackChunkName:"hello"*/'./hello').then(res=>{
    console.log(res.default(user));
});
$(function () {
    document.title = 'hello world!';
});

// let ob1 = {a:2,b:3};         //es6、7语法测试
// console.log(Object.assign(ob1,{t:1}));
// console.log([...[1,2,3]]);
//
// async function f() {
//     return new Promise((resolve)=>{
//         setTimeout(()=>{
//             resolve(2)
//         },3000);
//     })
// }
//
// f().then(res=>{
//     console.log(res);
// });


//if you need vue ，use it
const isProd = false;
// cancel all warning
Vue.config.silent=isProd;
// stop all of the vue production tip when start
Vue.config.productionTip=!isProd;
const vue = new Vue({
    el: '#app',
    render: h => h(App)
});
export default vue;
