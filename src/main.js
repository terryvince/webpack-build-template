import '@babel/polyfill';
import './main.scss';
import $ from 'jquery';
import $h from './UIComponent';

window.$h = $h;
window.$ = $;
window.jQuery = $;

$(function () {
    // title
    $('title').html('webpack-build-tool');
    // let a = [1,2,3];
    // console.log(...a);
    // let b = undefined;
    // b.forEach(v=>{
    //     console.log(v);
    // });
    console.log('2114445sdfsdfsdf');

});
