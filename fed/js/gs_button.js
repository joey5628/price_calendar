(function ($) {    
    /**
     * 无效按钮插件
     * @param opts.time (选填) 无效时间 (默认3000)
     * @param opts.text (选填) 无效时文字 (默认提交)
     * @param opts.disable (选填) 无效时样式 (gsn-btn-8)
     * @param opts.callback (选填) 回调执行 (默认)
     * @returns this;
	 * @see $('a').gsdisable();
     */
    $.fn.gsdisable = function(opts){
        opts = $.extend({
			disable:'gsn-btn-8'
			,text:'<img class="btn_ajax" src="http://youresource.c-ctrip.com/img/load.gif" alt="...">' //也可以传入ajax的图片
            ,time:3000
			,callback:function(){}
        }, opts);
		var that = $(this);
		var oldClass = that.attr('class');
		var oldText = that.html();
		if(that.data('isOne')==0){
			if (opts.callback) {
				opts.callback();
			}
			that.data('isOne',1);
			that.attr('class',opts.disable);			
			that.html(opts.text);
			window.setTimeout(function(){
				that.data('isOne','0');
				that.attr('class',oldClass);
				that.html(oldText);
			},opts.time);				
		}
        return this;
    };
	
	

	$(function(){	
		$('[data-onsubmit]').each(function(){
			$(this).data('isOne',0);
		});
	});
	
})(jQuery);