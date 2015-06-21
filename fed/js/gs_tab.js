; (function ($) {
    /**
    * tabs组件
    * @returns this;
    */
    $.fn.gs_tabs = function (opts) {
        opts = $.extend({
            'title': 'li > a'
            , 'active': 'active'
            , 'event': 'click'
            , 'findid' : 'href' //id在哪里标记, 默认是使用href属，如果href需要使用那可以变化成其他属性
            , 'callback': ''    //回调函数
            , 'delayTIME': 0    //延迟触发
        }, opts);
        var $this = $(this)
            , _delay = null
            , $tab_title = $this.find(opts.title)
            , idlist = [];

        /**
         * 建立对应的映射关系
         */
        $tab_title.each(function (i) {
            idlist.push($(this).attr(opts.findid)); //记录id
        });

        /**
        * 不是自己的隐藏掉
        * @param	{string}	c	id标记
        * @returns	null
        */
        var hide_content = function (c) {
            for (i in idlist) {
                if (idlist[i] != c) {
                    $(idlist[i]).hide().removeClass(opts.active);
                }
            }
        }

        /**
         * 显示对应的tabs内容
         * @param {string} showID
         * @param {objest} that
         * @return null
         */
        function show_tabs_content(showID,that){
            hide_content();
            $(showID).show().addClass(opts.active);
            //自定议结构需要把 active 写在自已无素上
            if (opts.title != 'li > a') {
                $(that).siblings().removeClass(opts.active).end().addClass(opts.active);
            } else {
                $(that).parent().siblings().removeClass(opts.active).end().addClass(opts.active);
            }     
            //回调
            opts.callback && opts.callback(that,showID);
        }

        if(opts.event == 'hover'){
            //hover效果
            $tab_title.hover(function () {
                var that = this;
                _delay = window.setTimeout(function(){                
                    show_tabs_content( $(that).attr(opts.findid) , that );
                },opts.delayTIME);
                return false;     
            },function(){
                window.clearInterval(_delay);
            });
        }else{
            $tab_title.on(opts.event, function () {
                show_tabs_content( $(this).attr(opts.findid) , this );
                return false;     
            });
        }
        return this;
    };




})(window.jQuery);