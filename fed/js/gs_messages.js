; (function ($) {

    //fix ie6 ie7 bug
    $(function(){
        var div_notice = '<div id="gsn-notice-box" style="width: 290px; text-align: center; position: fixed; left: 50%; top: 50%; margin:-20px 0 0 -145px; z-index: 100;display:none;"></div>';
        $('body').append($(div_notice));    
    });

    //tips
    $.fn.gstips = function (opts) {
        var $this = $(this);
        $this.addClass('gsn_tips');
        opts = $.extend({
            id: 'gs_tips' + $this.attr('id'),
            width: 200,
            text: 'tips...',
            arrow: 'arrow'
        }, opts);

        var css = {
            top: $this.offset().top - 40,  //40 tips 高
            left: $this.offset().left - opts.width / 2 + $this.width() / 2
        }

        var html = '<div id="' + opts.id + '" class="gsn-tips-opacity" style="display:none;position:absolute;width:' + opts.width + 'px;top:' + css.top + 'px;left:' + css.left + 'px"><div class="spanbg"></div><div class="text">' + opts.text + '</div><span class="' + opts.arrow + '"></span></div>';
        $('body').append($(html));
        var $tips = $('#' + opts.id);
        $(this).hover(function () {
            $tips.css(css).show();
        }, function () {
            $tips.css(css).hide();
        });
    }

    $.extend({
        gsmessages: {
            callnum: 0,
            notice: function (opts) {
                var id = this.callnum++;
                opts = $.extend({
                    id: id,
                    time: 'gs_notice_' + id
                }, opts);

                $('#gsn-notice-box').show().append($(this._init_notice(opts)));
                $('#gs_notice_' + id + ' a').live('click', function (e) {
                    $(this).parent().fadeOut('slow');
                });
                if (opts.timeout) {
                    opts.time = window.setTimeout(function () {
                        $('#gs_notice_' + opts.id).fadeOut('slow');
                        window.clearTimeout(opts.time);
                    }, opts.timeout);
                }
            },
            _init_notice: function (opts) {
				//统一两种风格
                var html = '<p class="gsn-notice" id="gs_notice_' + opts.id + '">\
							<a class="close" href="#">×</a>\
							<span class="gsn-notice-inner">' + opts.text + '</a></span>\
							</p>';
                return html;
            }
        }
    })


    $.fn.gspoptext = function (opts) {
        opts = $.extend({
            css: { font: '24px/24px \"Microsoft YaHei\"', color: '#f00' }
			    , callbackFN: ''
			    , time: 5000
			    , top: 30
        }, opts);
        var $this = $(this);
        var offset = $this.offset();
        var txt = $this.attr('data-text');
        var ani = $('<div>' + txt + '</div>');
        var css = {
            'position': 'absolute'
			, 'left': offset.left + $this.width() / 2 + 10
			, 'top': offset.top
        }
        css = $.extend(opts.css, css);
        ani.appendTo($('body'))
			.css(css)
			.animate({
			    top: css.top - opts.top,
			    opacity: 0
			}, opts.time / 2);

        window.setTimeout(function () {
            ani.remove();
            if (typeof opts.callbackFN === 'function') {
                opts.callbackFN();
            }
        }, opts.time);
        return this;
    }


    /**
    * 四角订位
    * @param	{Object}	opts	Description
    * @returns	{Object}			Description
    */
    $.fn.gscorner = function (opts) {
        $.fn.gscorner.defaults = {
            pos: 'rb', //"lt,rt,lb,rb"
            time: 0
        };

        if ($.browser.msie && $.browser.version == "6.0") {
            return;
        }
        //默认四个方位相对于两条边的距离
        var posObj = {
            lt: { left: 80, top: 20 },
            rt: { right: 80, top: 20 },
            lb: { left: 80, bottom: 20 },
            rb: { right: 80, bottom: 20 }
        };

        return this.each(function () {
            opts = $.extend($.fn.gscorner.defaults, opts);
            var $this = $(this),
		$close = $this.find(".close"),
		positionObj = posObj[opts.pos],
		cornerTimer = null;

            clearTimeout(cornerTimer);
            positionObj = $.extend(positionObj, opts.css, { position: "fixed" });
            $this.css(positionObj);
            if (opts.time) {
                var time = opts.time;
                var hideThis = function () {
                    $this.hide(250);
                };
                cornerTimer = setTimeout(hideThis, time);
            }
            $close.click(function () {
                clearTimeout(cornerTimer);
                $this.hide(250);
            });
        })
    };

    /**
    * 节点轮播
    * @param	{Object}	opts	Description
    * @returns	{Object}			Description
    */
    var Noderoll = function (element, options) {
        this.$element = $(element);
        this.$inner = this.$element.find(".noderoll-inner");
        this.options = options;
        var me = this,
	    $controls = this.$element.find(".noderoll-control"),
	    $prevBtn = $controls.filter("a[data-slide='prev']"),
	    $nextBtn = $controls.filter("a[data-slide='next']");

        this.$prevBtn = $prevBtn;
        this.$nextBtn = $nextBtn;

        $prevBtn.click(function () {
            me.prev();
        });
        $nextBtn.click(function () {
            me.next();
        });
        if (this.options.interval) {
            $prevBtn.removeClass("cannot-click");
            me.cycle();
            this.$inner
	    .on('mouseenter', $.proxy(this.pause, this))
	    .on('mouseleave', $.proxy(this.cycle, this))
        }
        if(this.$inner.find(".item").length < 2){
            $controls.hide();   
        }
    }

    Noderoll.prototype = {
        cycle: function (paused) {
            if (!paused) this.paused = false;
            if (this.cycleTimer) clearInterval(this.cycleTimer);
            this.options.interval
                && !this.paused
                && (this.cycleTimer = setInterval($.proxy(this.next, this), this.options.interval))
            return this
        },
        pause: function (e) {
            if (!e) this.paused = true
            this.cycle(true);
            clearInterval(this.cycleTimer)
            this.cycleTimer = null
            return this
        },
        next: function () {
            return this.slide('next')
        },
        prev: function () {
            return this.slide('prev')
        },
        slide: function (type) {
            var me = this,
		$active = this.$inner.find(".item.active"),
		len = this.$inner.find(".item").length,
		$next = $active[type](),
		isCycling = this.cycleTimer;

            isCycling && this.pause();
            if (this.options.interval && !$next.length) {
                if (type == "next") {
                    $next = this.$inner.find(".item").eq(0);
                } else {
                    $next = this.$inner.find(".item").eq(len - 1);
                }
            }
            if ($next.hasClass("active")) return;

            if ($next.length > 0) {
                $active.fadeOut({
                    duration: 600,
                    easing: 'linear',
                    complete: function () {
                        $(this).removeClass('active');
                        activeIndex = me.$inner.find(".item").index($next)
                        if (!me.options.interval) {
                            if (activeIndex <= 0) {
                                me.$prevBtn.addClass("cannot-click");
                                me.$nextBtn.removeClass("cannot-click");
                            } else if (activeIndex >= len - 1) {
                                me.$nextBtn.addClass("cannot-click");
                                me.$prevBtn.removeClass("cannot-click");
                            } else {
                                me.$prevBtn.removeClass("cannot-click");
                                me.$nextBtn.removeClass("cannot-click");
                            }
                        }
                        $next.fadeIn({
                            duration: 600,
                            easing: 'linear',
                            complete: function () {
                                $(this).addClass('active');
                            }
                        });
                    }
                });
            }
            isCycling && this.cycle()

            return this;
        }
    }

    $.fn.gsnoderoll = function (opts) {
        $.fn.gsnoderoll.defaults = {
            time: 0
        };
        return this.each(function () {
            opts = $.extend({}, $.fn.gsnoderoll.defaults, opts);
            new Noderoll(this, opts);
        });
    };
})(jQuery);
