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
