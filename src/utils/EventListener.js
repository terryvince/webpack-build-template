// function isNull(v) {
//     if(!v && typeof (v) !== 'undefined' && v !== 0){
//         return true;
//     }
//     return false;
// }
class EventListener {
    constructor () {
        this.eventMap = {};
    }
    addEvent (el, type, handler) {
        if (el.addEventListener) {
            el.addEventListener(type, handler, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, handler);
        } else {
            el['on' + type] = handler;
        }
    }
    removeEvent (el, type , handler) {
        if(el.removeEventListener){
            el.removeEventListener(type,handler);
        }else if(el.detachEvent){
            el.detachEvent('on'+type,handler);
        }else{
            el['on'+type] = null;
        }
    }
    trigger(el,type){
        //IE
        if(document.all) {
            el[type]();
        }
        // 其它浏览器
        else {
            let e = document.createEvent('MouseEvents');
            e.initEvent(type, true, true);
            el.dispatchEvent(e);
        }
    }
    $on (type, callback) {
        this.eventMap[type] = callback;
    }
    $emit (type, data) {
        this.eventMap[type] && this.eventMap[type](data);
    }
    $off (type) {
        this.eventMap[type] && delete this.eventMap[type];
    }
}

let $e = new EventListener();

export default $e;
