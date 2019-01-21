function debounce(fn, waitTime, context) {
    var timeId = null;
    return function() {
        clearTimeout(timeId);
        timeId = setTimeout(fn.bind(context), waitTime);
    };
}
export default debounce;
