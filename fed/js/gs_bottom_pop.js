(function ($) {
    /**
    * 底层弹出注册弹出层组件 , 需要 cookie 与 jquery 支持
    * @param json参数
    * @returns this;
    */
    $.fn.gsBottomRegister = function (opts) {

        if (GS.ismoblie) {
            return false;
        }

        opts = $.extend({
            'reg_url': 'https://accounts.ctrip.com/member/emailregist.aspx'
            , 'login_url': 'https://accounts.ctrip.com/member/login.aspx?BackURL=' + escape(window.location.href)
            , 'time': 10000 //延迟几移弹出
            , 'cookieName': 'is_open_bottom_reg'
            , 'cookieDay': 1  //1天
        }, opts);

        var isIE6 = $.browser.version == 6.0 && $.browser.msie;
        if (isIE6) { return false; }

        var that = $(this);
        //初始化
        function init() {
            var api = GS.ent() + '/AjaxNew/ajaxGetWebSiteBottomFloating.ashx?callback=?'; //处理下top站点
            $.getJSON(api, function(json){
                if(json.code == 0){
                    // var _html = [], i = 0;
                    // _html.push('<div class="gs_bottom_pop_blk" id="regGuide">');
                    // _html.push('    <div class="gs_bottom_pop_inforout">');
                    // _html.push('        <a class="gs_bottom_pop_close" href="javascript:void(0);"></a>');
                    // _html.push('        <div class="gs_bottom_pop_inforin cf" style="background-image:url('+img+');">');
                    // _html.push('        </div>');
                    // _html.push('    </div>');
                    // _html.push('</div>');
                    that.append(json.content);
                    show();
                }

            },'json');

        }
        //操作动作
        function show() {
            var regGuide = $('#regGuide');
            regGuide.find('.gs_bottom_pop_close').on('click', function () {
                regGuide.hide();
                //写入cookie
                $.cookie(opts.cookieName, 1, { expires: opts.cookieDay, path: '/' });
            });
            var xtime = window.setTimeout(function () {
                regGuide.show();
                xtime = null;
            }, opts.time);
        }
        $.cookie.raw = true;
        /* CtripUserId 有些浏览器会不存在改为 CtripUserInfo 验证 by cwp 2014.02.12 */
        if (!$.cookie(opts.cookieName) && !$.cookie('CtripUserInfo')) {
            init(opts);
        }
        return this;
    }
})(jQuery);

