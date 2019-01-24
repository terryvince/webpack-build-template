import '@babel/polyfill';
import './main.scss';
import $ from 'jquery';
import $h from './UIComponent';
// import Swiper from 'swiper/dist/js/swiper';

window.$h = $h;
window.$ = $;
window.jQuery = $;
// window.Swiper = Swiper;
$(function () {
    document.title = 'webpack build template';
});
