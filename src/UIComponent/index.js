import $ from 'jquery';
// 依赖jquery
class UICompnent {
    constructor () {
        this.loading = this.loadingProduct();
    }
    toast(config) {
        /*
        @params
          config {text:'msg', stayTime:2000}
        */
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
      <div class="dialog">
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
        let $dialogBtn = $dialog.find('.dialog-button');
        setTimeout(() => {
            $dialog.addClass('visible');
        }, 0);
        $dialogBtn.click(function () {
            $dialog.removeClass('visible');
            setTimeout(() => {
                $dialog.remove();
            }, 400);
        });
    }
    loadingProduct() {
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
                        <div class="flex-cross-center loading-container">
                            <div class="loading-wrap">
                                <span class="circle"></span>
                                <span class="circle"></span>
                                <span class="circle"></span>
                                <span class="circle"></span>
                                <span class="circle"></span>
                                <span class="circle"></span>
                                <span class="circle"></span>
                                <span class="circle"></span>
                            </div>
                            <p class="color-white fs-24 loading-tip">${tip}</p>
                        </div>
                      </div>
                    `);
                    let $loading = $('#'+ selector);
                    let $circle = $loading.find('.circle');
                    $circle.each(function (i) {
                        let angle = 360/$circle.length * (i+1);
                        let point = calc(0.3,0.3,0.3,angle);
                        this.style.left = (point[0]-0.05) + 'rem';
                        this.style.top = (point[1]-0.05) + 'rem';
                    });
                } else {
                    let $loading = $('#'+ selector);
                    let $loadingTip = $loading.find('.loading-tip');
                    if (!$loading.hasClass('visible')) {
                        $loadingTip.html(tip);
                        $loading.addClass('visible');
                    }
                }
            },
            hide(){
                let $loading = $('#'+selector);
                $loading.removeClass('visible');
            }
        };
    }
}

function calc(x0,y0,r,angle) {
    var left = x0 + r * Math.cos(angle * Math.PI / 180);
    var top = y0 + r * Math.sin(angle * Math.PI /180);
    return [left,top];
}

let $h = new UICompnent();

export default $h;
