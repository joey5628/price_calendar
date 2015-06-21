/**
 * input相关功能
 */
(function($) {
    
    /**
     * 监听输入框最大字数
     * @param 回调函数
     * @returns this;
     */
	$.fn.gsInputLen = function(callback){
        var $dom=$(this);
        $dom.bind("keyup change mousedown blur focus",function(){
			var oldval=$dom.val();
            var newVal = oldval.replace( /\s/ig, 'x').replace( /[^x00-xff]/g, 'xx' );		  
            var len =  Math.ceil(newVal.length/2);
            callback(len, $dom);
        });
        return this;
	}
	
    /**
     * 截字功能函数_支持中文与英文截取
     * @author chenwp gs_front@ctrip.com
     * @param 字符串
     * @param 截取数量
     * @param 是否截取中文字
     * @returns 截取后的字符串
     */
    $.gsSubstring = function(str,len,isChinese) {
        if (isChinese) {
            len = len *2;
        }
        var strlen = 0; 
        var s = "";
        for(var i = 0;i < str.length;i++){
            if(str.charCodeAt(i) > 128){
                strlen += 2;
            }else{
                strlen++;
            }
            s += str.charAt(i);
            if(strlen >= len){ 
                return s ;
            }
        }
        return s;
 	}

})(jQuery);