function notify(title,msg,icon) {
    // Let's check if the browser supports notifications
    title = title || '标题';
    msg = msg || '消息';
    icon = icon || 'http://bpic.588ku.com/element_origin_min_pic/02/14/03/28576b2358a672b.jpg';
    if (!('Notification' in window)) {
        alert('This browser does not support desktop notification');
    }

    // Let's check whether notification permissions have alredy been granted
    else if (Notification.permission === 'granted') {
        // If it's okay let's create a notification
        new Notification(title,{body:msg,icon:icon});
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
                new Notification(title,{body:msg,icon:icon});
            } else {
                alert('消息通知被拒绝');
            }
        });
    }
}
export default notify;
