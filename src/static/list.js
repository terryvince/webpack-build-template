/* eslint-disable */
_setTab('index');   // 设置选卡激活

var $menuModal = $('.menu-modal'),
    $headerMenu = $('.header-menu'),
    $moreBtn = $headerMenu.find('.more-wrap'),
    $classification = $headerMenu.find('.classification'),
    $closeBtn = $classification.find('.icon-close'),
    $classes  = $classification.find('.class');
$menuItem = $('.menu-item');

function showMenu(){
    $menuModal.addClass('visible');
    $classification.addClass('show');
}
function hideMenu() {
    $classification.removeClass('show');
    $menuModal.removeClass('visible');
}
function classificationActive() {
    $classes.removeClass('active');
    $(this).addClass('active');
    hideMenu();
}
function menuItemActive(){
    $menuItem.removeClass('active');
    $(this).addClass('active');
}

$menuItem.click(menuItemActive);    //切换选项卡
$moreBtn.click(showMenu);           //点击小三角
$closeBtn.click(hideMenu);          //点击关闭
$menuModal.click(hideMenu);         //点击模态框
$classes.click(classificationActive);   //选择分类
$classification.click(function (e) {    //阻止冒泡
    e = e|| event;
    e.stopPropagation();
    e.cancelBubble = true;
});
