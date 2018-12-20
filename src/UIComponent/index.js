import $ from 'jquery';
// 依赖jquery
class UICompnent {
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
}

let $h = new UICompnent();

export default $h;
