/* 出现ie6低版本提醒框 */
$(function(){
    var isIE6 = ($.browser.msie) && ($.browser.version == "6.0");
    if (isIE6) {
		$('.gs-header').after($('<div class="content cf"><div class="fixIe6Box"><a href="javascript:;" class="close">X</a>携程攻略社区提醒您：使用更高级浏览器获得更佳用户体验！ 下载 <a href="https://www.google.com/intl/zh-CN/chrome/browser/" target="_blank">chrome</a>、<a href="http://www.firefox.com.cn/" target="_blank">firefox</a></div></div>'));
		$('.fixIe6Box > .close').click(function(){
		    $(this).parent().parent().remove();
		});
	}
});