(function ($) {
    /**
    * 360合作注册
    * @param json参数
    * @returns this;
    */
    $.fn.gs360 = function (opts) {
        opts = $.extend({
            'url': 'https://accounts.ctrip.com/member/emailregist.aspx'
				, 'img': 'http://youresource.c-ctrip.com/img/common/980.jpg'
				, 'time': 7000
                , 'zindex': 150
        }, opts);
        var that = $(this);
        function init(opts) {
            var html = $('<div class="ctrip360"><div class="inner" style="z-index:' + opts.zindex + '"><a class="close360" href="javascript:void 0;">X</a><a class="a360" href="' + opts.url + '" target="_blank"><img src="' + opts.img + '" alt=""></a></div></div>');
            that.append(html);
        }
        init(opts);
        var ctrip360 = $('.ctrip360');
        ctrip360.find('.close360').on('click', function () {
            ctrip360.hide();
        });
        var xtime = window.setTimeout(function () {
            ctrip360.hide();
            xtime = null;
        }, opts.time);
        return this;
    }
})(jQuery);