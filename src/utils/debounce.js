function debounce (method, delay, context) {
    clearTimeout(method.timer);
    method.timer = setTimeout(function () {
        method.call(context);
    }, delay);
}

export default debounce;
