function timeFormat (v, option) {
    if (!v) return '';
    if (v.toString().length === 10) {
        v = v * 1000;
    }
    if (v.toString().length !== 13) {
        console.log('时间源格式不正确：' + v.toString() + '不是一个毫秒时间戳！');
        return;
    }
    let d = new Date(v);
    let second = d.getSeconds();
    let minute = d.getMinutes();
    let hours = d.getHours();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    // 月份增加前导0
    if (month.toString().length === 1) {
        month = '0' + month;
    }
    // 日期增加前导0
    if (date.toString().length === 1) {
        date = '0' + date.toString();
    }
    // 小时增加前导0
    if (hours.toString().length === 1) {
        hours = '0' + hours.toString();
    }
    // 分钟增加前导0
    if (minute.toString().length === 1) {
        minute = '0' + minute.toString();
    }
    // 秒数增加前导0
    if (second.toString().length === 1) {
        second = '0' + second.toString();
    }
    switch (option) {
    case 'date' :
        v = year + '-' + month + '-' + date;
        break;
    case 'time' :
        v = hours + ':' + minute + ':' + second;
        break;
    case 'dateTime' :
        v = year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second;
        break;
    default :
        v = year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second;
        break;
    }
    return v;
}

export default timeFormat;
