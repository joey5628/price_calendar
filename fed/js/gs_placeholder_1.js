/* utf 8 */

(function ($) {

    /**
    * @description: placeholde插件, ie有效, ie6提交时需要判断下 value != placeholder
    * @author: chenwp@ctrip.com
    * @update: chenwp (2013-07-21 18:32)
    */

    $.fn.placeholder = function (opts) {
        var ck = 'placeholder' in document.createElement('input');
        if (ck) { return this; }

        opts = $.extend({
            incolor: '#aaa',
            outcolor: '#333',
            callback: function () { }
        }, opts);

        return this.each(function () {
            //不支持的做				
            var that = this;
            var $this = $(this);
            var p = $(this).attr('placeholder');
            var v = $(this).attr('value');
            var pstyle = { color: opts.incolor }
            if (v == '' || v == p) {
                $(this).val(p).css(pstyle);
            }
            $this.on('focusin', function (e) {
                if ($this.val() == p) {
                    $this.val('');
                }
                $this.css({ color: '#333' });
            });
            $this.on('focusout', function (e) {
                if ($this.val() == '' || $this.val()==p) {
                    $this.val(p).css(pstyle);
                } else {
                    $this.css({ color: '#333' });
                }
            });
            return this;
        });
    }
})(jQuery);