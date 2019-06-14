window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

class SoundContext{
    context = new window.AudioContext();
    source = null;
    audioBuffer = null;
    constructor(url){
        if(!window.AudioContext){
            console.error('Your browser does not support AudioContext!');
            return null;
        }
        this.loadAudioFile(url);
    }
    stop() {
        if (this.source) {
            this.source.stop(0); //立即停止
        }
    }
    play() {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.audioBuffer;
        this.source.loop = true;
        this.source.connect(this.context.destination);
        this.source.start(0); //立即播放
    }
    initSound(arrayBuffer) {
        let me = this;
        this.context.decodeAudioData(arrayBuffer, function (buffer) { //解码成功时的回调函数
            me.audioBuffer = buffer;
            // me.play();
        }, function (e) { //解码出错时的回调函数
            console.log('Error decoding file', e);
        });
    }
    loadAudioFile(url) {
        let me = this;
        var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (progress) { //下载完成
            progress;
            me.initSound(this.response);
        };
        xhr.send();
    }
}

export default SoundContext;