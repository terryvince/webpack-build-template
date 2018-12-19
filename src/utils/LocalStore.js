import _type from './typeof';

class LocalStore {
    // initData [object]
    // whitchStore [string] session|local
    constructor (initData, whitchStore = 'local') {
        if (!window.localStorage || !window.sessionStorage) {
            throw new Error('该浏览器不支持html5本地存储，这可能是由于浏览器设置"隐私"模式引起的！');
        }
        if (initData && _type(initData) !== 'object') {
            throw new Error('new LocalStore() 参数不是一个object!');
        }
        if (whitchStore !== 'session' && whitchStore !== 'local') {
            throw new Error('new LocalStore() 第二个参数必须为 "session" or "local"');
        }
        this.key = '_localStore_';
        this.storeMethod = whitchStore === 'session' ? 'sessionStorage' : 'localStorage';
        if (window[this.storeMethod][this.key]) {
            this.store = JSON.parse(window[this.storeMethod][this.key]);
        } else {
            this.store = initData || {};
            window[this.storeMethod][this.key] = JSON.stringify(this.store);
        }
    }
    get (name) {
        if (_type(name) !== 'string') {
            console.error('LocalStore.get 参数不是一个string!');
            return false;
        }
        this.store = JSON.parse(window[this.storeMethod][this.key]);
        if (name) {
            return this.store[name] || false;
        }
        return this.store;
    }
    set (ob) {
        if (!ob && _type(ob) !== 'object') {
            console.error('LocalStore.set 参数不是一个object!');
            return false;
        }
        this.store = JSON.parse(window[this.storeMethod][this.key]);
        Object.assign(this.store, ob);
        window[this.storeMethod][this.key] = JSON.stringify(this.store);
        return true;
    }
}

// console.log(new LocalStore({test: 'hello'}, 'local'))
// console.log(new LocalStore({test: 'hello'}, 'session'))

export default LocalStore;
