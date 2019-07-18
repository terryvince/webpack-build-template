import '@babel/polyfill';
import './main.scss';
import $ from 'jquery';
import $h from './UIComponent';
// import Swiper from 'swiper/dist/js/swiper';
import Vue from 'vue';
import App from './app';
import hello from './hello';

window.$h = $h;
window.$ = $;
window.jQuery = $;

let user = { firstName: 'Jane', lastName: 'User' };
console.log(hello(user));

// window.Swiper = Swiper;
$(function () {
    document.title = 'hello world!';
});


//if you need vue ，use it
const isProd = false;
// cancel all warning
Vue.config.silent=isProd;
// stop all of the vue production tip when start
Vue.config.productionTip=!isProd;
const vue = new Vue({
    el: '#app',
    components: {App},
    template: '<App/>'
});
export default vue;
