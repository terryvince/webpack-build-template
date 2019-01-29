import $ from 'jquery';
import debounce from '../utils/debounce';
import $e from '../utils/EventListener';
// 依赖jquery
class UICompnent {
    constructor () {
        this.loading = loadingProduct();
    }

    modalShow($modal) {
        /*
        @params
          $modal 模态框 jquery对象
        */
        $modal.addClass('visible');
    }
    modalHide($modal) {
        $modal.removeClass('visible');
    }

    toast(config) {
        /*
        @params
          config {text:'msg', stayTime:2000}
        */
        config.stayTime = config.stayTime||2000;
        let id = +new Date();
        let selector = 'tooltip' + id;
        $('body').append(
            `<div id="${selector}" class="tooltip">${config.text}</div>`
        );
        let $tooltip = $('#' + selector);
        $tooltip.addClass('move-in');
        setTimeout(function () {
            $tooltip.addClass('move-out');
            setTimeout(function () {
                $tooltip.remove();
            }, 500);
        }, config.stayTime + 500);
    }

    alert(config) {
        /*
        @params
          config {text:'内容',title:'标题'}
        */
        let id = +new Date();
        let selector = 'alert' + id;
        $('body').append(`
      <div class="dialog-modal" id="${selector}">
      <div class="dialog zoomOut">
        <div class="dialog-inner">
          <div class="dialog-title">
            ${config.title}
          </div>
          <div class="modal-text">
            ${config.text}
          </div>
        </div>
        <div class="dialog-buttons">
          <span class="dialog-button">确定</span>
        </div>
      </div>
    </div>
    `);
        let $dialog = $('#' + selector);
        let $dialogBody = $dialog.find('.dialog');
        let $dialogBtn = $dialog.find('.dialog-button');
        this.modalShow($dialog);
        $dialogBody.addClass('animate-zoomOut');
        let me = this;
        $dialogBtn.click(function () {
            $dialogBody.removeClass('animate-zoomOut');
            $dialogBody.addClass('animate-zoomIn');
            me.modalHide($dialog);
            setTimeout(() => {
                $dialog.remove();
            }, 400);
        });
    }
    /* eslint-disable no-unused-vars */
    pullUpLoadding(el,callback) {
        /*
        @params
          el  htmlElement元素
          callback 上拉到底触发回调
        */
        let _onscroll = function (el, callback) {
            let scrollDistance = el.clientHeight + el.scrollTop;
            let divHeight = el.scrollHeight;
            if (scrollDistance >= divHeight) {
                callback();
            }
        };
        let bindFn = debounce(_onscroll.bind(el, el, callback),300);
        $e.addEvent(el,'scroll',bindFn);
        return {
            disable(){
                $e.removeEvent(el,'scroll',bindFn);
            },
            enable(){
                $e.addEvent(el,'scroll',bindFn);
            }
        };
    }

}


function loadingProduct() {
    let selector = '_loading_hzz_';
    return {
        show(msg){
            /*
            @params
              msg 显示的提示文本
            */
            let tip = msg||'拼命加载中';
            if (!$('#'+selector)[0]) {
                $('body').append(`
                      <div class="dialog-modal visible" id="${selector}">
                        <div class="flex-cross-center loading-container flex-wrap">
                            <div class="loading-wrap">
                                <span class="circle zoom-out-in"></span>
                                <span class="circle zoom-out-in"></span>
                                <span class="circle zoom-out-in"></span>
                                <span class="circle zoom-out-in"></span>
                                <span class="circle zoom-out-in"></span>
                                <span class="circle zoom-out-in"></span>
                                <span class="circle zoom-out-in"></span>
                                <span class="circle zoom-out-in"></span>
                            </div>
                            <p class="color-white fs-24 loading-tip txt-center width-full">${tip}</p>
                        </div>
                      </div>
                    `);
                let $loading = $('#'+ selector);
                let $circle = $loading.find('.circle');
                $circle.each(function (i) {
                    let angle = 360/$circle.length * (i+1);
                    let point = calc(0.4,0.4,0.4,angle);
                    this.style.left = (point[0]-0.09).toFixed(3) + 'rem';
                    this.style.top = (point[1]-0.09).toFixed(3) + 'rem';
                });
            } else {
                let $loading = $('#'+ selector);
                let $loadingTip = $loading.find('.loading-tip');
                let $circle = $loading.find('.circle');
                if(!$circle.hasClass('zoom-out-in')){
                    $circle.addClass('zoom-out-in');
                }
                if (!$loading.hasClass('visible')) {
                    $loadingTip.html(tip);
                    $loading.addClass('visible');
                }
            }
        },
        hide(){
            let $loading = $('#'+selector);
            let $circle = $loading.find('.circle');
            $loading.removeClass('visible');
            $circle.removeClass('zoom-out-in');
        }
    };
}

function calc(x0,y0,r,angle) {
    var left = x0 + r * Math.cos(angle * Math.PI / 180);
    var top = y0 + r * Math.sin(angle * Math.PI /180);
    return [left,top];
}

let $h = new UICompnent();

export default $h;
