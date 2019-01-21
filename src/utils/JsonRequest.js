function Jsonclient (config) {
    let debug = config.debug || true;
    let reconnectCount = config.reconnectCount || 3;
    let webUrl = config.url;
    let delayTime = config.delayTime || 5000;
    let eventMap = {}; // 接收消息 map
    let type = 1; // 1 客户端 2服务端
    let index = type;
    let msgMap = {}; // 发送消息 map
    let ws = new WebSocket(webUrl);
    let me = this;
    let timer = null;
    this.isReconnect = false;
    ws.onopen = function (e) {
        if (debug) {
            console.log('websocket连接通道已建立！');
        }
        reconnectCount = 3;
        me.onConnect();
        timer = setInterval(function () {
            let arrFlag = [];
            let now = new Date().getTime();
            Object.keys(msgMap).forEach(function (key) {
                if (now - msgMap[key].time > 30 * 1000) {
                    arrFlag.push(key);
                    let rps = new JsonResponse(408, null);
                    msgMap[key].callback(rps);
                }
            });
            arrFlag.forEach(function (v) {
                delete msgMap[v];
            });
        }, 1000);
    };
    ws.onmessage = function (e) {
        if (debug) {
            console.log('接收服务端的消息：', e.data);
        }
        me.onmessage(e.data);
    };
    ws.onclose = function (e) {
        if (debug) {
            console.log('websocket连接已关闭！');
        }
        me.onClose();
        clearInterval(timer);
        timer = null;
        if (reconnectCount > 0) {
            debounce(me.restart, delayTime);
        }
    };
    ws.onerror = function (e) {
        if (debug) {
            console.log('websocket发生错误!');
        }
    };
    // 添加响应事件，处理服务器发给自身的请求
    this.on = function (key, callback) {
        eventMap[key] = callback;
    };
    this.onConnect = function () {};
    this.onClose = function () {};
    this.restart = function () {
        me.isReconnect = true;
        let {onopen, onmessage, onclose, onerror} = ws;
        try {
            ws = new WebSocket(webUrl);
            ws.onopen = onopen;
            ws.onmessage = onmessage;
            ws.onclose = onclose;
            ws.onerror = onerror;
        } catch (e) {}
        reconnectCount--;
        debug && console.log('websocket正在尝试重连...');
    };
    this.close = function () {
        reconnectCount = 0;
        ws.close();
    };
    this.request = function (url, data, callback) {
        let id = 0;
        if (callback) {
            id = index;
            index += 2;
        }
        if (id > 0) {
            // 超时情况
            msgMap[id] = {callback: callback, time: new Date().getTime()};
        }

        // 执行真正的发送，拼接参数 {"idx":123,"url":"hello","data":{"type":1,"port":35000}}
        ws.send(JSON.stringify({idx: id, url: url, data: data}));
        if (debug) {
            console.log('客户端发出消息, 内容：', data, '请求接口：', url);
        }
    };

    // 服务端请求客户端，请求你自己的时候
    function onRequest (data) {
        let rq = new JsonRequest(ws, data.idx, data.data);
        if (data.url.substr(0, 1) === '/') {
            data.url = data.url.substr(1);
        }
        let cb = eventMap[data.url];
        if (cb) {
            cb(rq);
        } else {
            rq.responseCode(404);
        }
    }

    function onCallback (data) {
        let cb = msgMap[data.idx];
        if (cb) {
            let rps = new JsonResponse(data.code, data.data);
            cb.callback(rps);
            delete msgMap[data.idx];
        }
    }

    const TYPE_CLIENT = 1;
    const TYPE_SERVER = 2;
    this.onmessage = function (dt) {
        let data = JSON.parse(dt);
        let idx = parseInt(data.idx); // 取出data中idx
        let isREQ = true;
        if ((idx & TYPE_CLIENT) === TYPE_CLIENT) { // 客户端请求
            if (type === TYPE_CLIENT) {
                isREQ = false;
            }
        } else if (type === TYPE_SERVER && idx !== 0) {
            isREQ = false;
        }
        if (!isREQ) {
            onCallback(data);
        } else {
            onRequest(data);
        }
    };
}
// res
function JsonResponse (code, data) {
    this.getData = function () {
    // "data":{"type":1,"port":35000}
        return data;
    };
    this.getCode = function () {
        return code;
    };
    this.isSuccessed = function () {
        return code === 200;
    };
}
// req
function JsonRequest (ws, idx, data) {
    this.getData = function () {
        return data;
    };
    this.response = function (data) {
        if (idx > 0) {
            ws.send(JSON.stringify({idx: idx, code: 200, data: data}));
        }
    };
    this.responseCode = function (code) {
        if (idx > 0) {
            ws.send(JSON.stringify({idx: idx, code: code}));
        }
    };
}

function debounce (method, delay, context) {
    clearTimeout(method.timer);
    method.timer = setTimeout(function () {
        method.call(context);
    }, delay);
}

// 范例调用
// {"idx":123,"url":"hello","data":{"type":1,"port":35000}}
let jc = new Jsonclient({url: 'ws://192.168.1.142:8091', debug: true, reconnectCount: 3, delayTime: 3000});

// jc.on('test', function (req) {
//   req.response({msg: '自定义消息'})
//   console.log(req.getData())
// })
//
// jc.onConnect = function () {
//   console.log('连接上服务器')
// }
// jc.onClose = function () {
//   console.log('断开连接')
// }
//
// jc.close() // 主动关闭连接
//
//   jc.request('/hello', {msg: '自定义消息'}, function (res) {
//     if (!res.isSuccessed()) {
//       console.log('error')
//     } else {
//       // do something
//       console.log('dsfadsf', res.getData())
//     }
//   })

export default jc;
