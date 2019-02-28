import '@babel/polyfill';
import './main.scss';
import $ from 'jquery';
import $h from './UIComponent';
// import Swiper from 'swiper/dist/js/swiper';
import Vue from 'vue';
import App from './app';

window.$h = $h;
window.$ = $;
window.jQuery = $;
// window.Swiper = Swiper;
$(function () {
    document.title = 'hello world!';
});

const vue = new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
});
export default vue;
