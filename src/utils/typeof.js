function _type (v) {
    if (typeof v === 'undefined') {
        return 'undefined';
    }
    if (!v && typeof (v) !== 'undefined' && v !== 0) {
        return 'null';
    }
    if (v) {
        return v.constructor.toString().split(' ')[1].slice(0, -2).toLowerCase();
    }
}

export default _type;
