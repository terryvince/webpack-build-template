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
});