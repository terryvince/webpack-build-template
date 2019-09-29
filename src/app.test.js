import { shallowMount } from '@vue/test-utils'
import App from './app.vue';

describe('app.vue',()=>{
    const wrapper = shallowMount(App);  //仅渲染app，不渲染子组件，得到一个包装器
    test('has a input',()=>{
        expect(wrapper.contains('input')).toBe(true);
    })
});