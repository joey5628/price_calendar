﻿! function($) {
    $.support.transition = (function() {

        var transitionEnd = (function() {

            var el = document.createElement('bootstrap'),
                transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'OTransition': 'oTransitionEnd otransitionend',
                    'transition': 'transitionend'
                }, name

            for (name in transEndEventNames) {
                if (el.style[name] !== undefined) {
                    return transEndEventNames[name]
                }
            }

        }())

        return transitionEnd && {
            end: transitionEnd
        }

    })()

    var Carousel = function(element, options) {
        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.$indicators.css({
            'margin-left': -this.$indicators.width() / 2 + 'px'
        }).show();
        this.options = options
        this.options.pause == 'hover' && this.$element
            .on('mouseenter', $.proxy(this.pause, this))
            .on('mouseleave', $.proxy(this.cycle, this))
    }

    Carousel.prototype = {
        cycle: function(e) {
            if (!e) this.paused = false
            if (this.interval) clearInterval(this.interval);
            this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
            return this
        },
        getActiveIndex: function() {
            this.$active = this.$element.find('.item.active')
            this.$items = this.$active.parent().children()
            return this.$items.index(this.$active)
        },
        to: function(pos) {
            var activeIndex = this.getActiveIndex(),
                that = this

            if (pos > (this.$items.length - 1) || pos < 0) return

            if (this.sliding) {
                return this.$element.one('slid', function() {
                    that.to(pos)
                })
            }

            if (activeIndex == pos) {
                return this.pause().cycle()
            }

            return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
        },
        pause: function(e) {
            if (!e) this.paused = true
            if (this.$element.find('.next, .prev').length && $.support.transition.end) {
                this.$element.trigger($.support.transition.end)
                this.cycle(true)
            }
            clearInterval(this.interval)
            this.interval = null
            return this
        },
        next: function() {
            if (this.sliding) return
            return this.slide('next')
        },
        prev: function() {
            if (this.sliding) return
            return this.slide('prev')
        },
        slide: function(type, next) {
            var $active = this.$element.find('.item.active'),
                $next = next || $active[type](),
                isCycling = this.interval,
                direction = type == 'next' ? 'left' : 'right',
                fallback = type == 'next' ? 'first' : 'last',
                that = this,
                e

                this.sliding = true

                isCycling && this.pause()

                $next = $next.length ? $next : this.$element.find('.item')[fallback]()

                e = $.Event('slide', {
                    relatedTarget: $next[0],
                    direction: direction
                })

                if ($next.hasClass('active')) return

            if (this.$indicators.length) {
                this.$indicators.find('.active').removeClass('active')
                this.$element.one('slid', function() {
                    var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
                    $nextIndicator && $nextIndicator.addClass('active')
                })
            }

            this.$element.trigger(e)
            var me = this;
            if (e.isDefaultPrevented()) return
            $active.fadeOut({
                duration: 600,
                easing: 'linear',
                complete: function() {
                    $(this).removeClass('active');
                }
            });
            $next.fadeIn({
                duration: 600,
                easing: 'linear',
                complete: function() {
                    $(this).addClass('active');
                    me.sliding = false;
                    setTimeout(function() {
                        me.$element.trigger('slid')
                    }, 0)
                }
            });

            isCycling && this.cycle()

            return this
        }
    }


    var old = $.fn.carousel

    $.fn.carousel = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('carousel'),
                options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option),
                action = typeof option == 'string' ? option : options.slide
            if (!data) $this.data('carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }

    $.fn.carousel.defaults = {
        interval: 4000,
        pause: 'hover'
    }

    $.fn.carousel.Constructor = Carousel

    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old
        return this
    }

    $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function(e) {
        var $this = $(this),
            href, $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
            ,
            options = $.extend({}, $target.data(), $this.data()),
            slideIndex;
        $target.carousel(options);
        if (slideIndex = $this.attr('data-slide-to')) {
            var $pauseObj = $target.data('carousel').pause();
            $pauseObj.to(slideIndex);
            $pauseObj.cycle()
        }
        e.preventDefault()
    })

}(window.jQuery);