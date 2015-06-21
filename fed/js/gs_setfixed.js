/**
 * input相关功能
 */
(function ($) {
    /**
    * 固定元素
    * @returns this;
    */
    $.fn.setfixed = function (opts) {
        opts = $.extend({
            'color': '#fff',
            top: 0
        }, opts);
        return this.each(function () {
            var $this = $(this),
                canDo = true,
                getParentWidth = false,
                toTop = parseInt(opts.top),
                sidePos = $this.offset(),
                sideWidth = $this.width(),
                sideHeight = $this.height(),
                sideoverflow = $this.css('overflow'),
				timmer = null,
                old = {
                    position: $this.css('position'),
                    overflow: sideoverflow,
                    top: $this.css('top'),
                    left: $this.css('left'),
                    right: $this.css('right')
                };
            getParentWidth = opts.getParentWidth || getParentWidth;
            sideWidth = opts.width || sideWidth;
            if(getParentWidth){
                sideWidth = $this.parent().width();
            }
            var css = {
                'top': toTop,
                'left': sidePos.left,
                'width': sideWidth,
                'height': sideHeight,
                'overflow': sideoverflow,
                'position': 'fixed'
            };
            var sideTop = sidePos.top - toTop;
			
			var onResize = function(){
				clearTimeout(timmer);
                $this.css(old);
                canDo = false;
				timmer = setTimeout(setNewCss, 300);
                return;
            }
			
            function setPos() {
            	//$.event.remove( this, "resize", resize_viewport);
            	$(window).unbind('resize',onResize);		//editor by ling,fixed for ie
                if(canDo){
                    if ($(window).scrollTop() > sideTop) {
                        $this.css(css);
                    } else {
                        $this.css(old);
                        if(getParentWidth){
                            sideWidth = $this.parent().width();
                            $this.css({'width': sideWidth});
                        }
                    }      
                }
                
                setTimeout(function(){
                	$(window).bind('resize',onResize);
                },1);
              
            }
            
            var throttle = GS.throttle(setPos, 25);	//editor by ling
            $(window).scroll(throttle);
            
			function setNewCss(){
                canDo = true;
				sidePos = $this.offset()
                sideWidth = $this.width();
                sideHeight = $this.height();
                sideoverflow = $this.css('overflow');
                sideWidth = opts.width || sideWidth;
                if(getParentWidth){
                    sideWidth = $this.parent().width();
                }
                css = {
                    'top': toTop,
                    'left': sidePos.left,
                    'width': sideWidth,
                    'height': sideHeight,
                    'overflow': sideoverflow,
                    'position': 'fixed'
                }; 
                setPos();
			}

            $(window).bind('resize',onResize);		//editor by ling
            setPos();
        });
    };
})(jQuery);