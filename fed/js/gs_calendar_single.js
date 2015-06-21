
/*!
* extend of jQuery v1.4
* updated by ling, 2014-07-17
* 单个日期控件
*/
jQuery(function () {
    jQuery.fn.calendarSingle = function (options) {
        var calendar = jQuery.fn.calendarSingle;
        calendar.init();

        var onclick = function (date) {
            var elem = jQuery(calendar.target);
            var selectdate = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
            elem.val(selectdate);
            elem.attr("selectedvalue", selectdate);

            //add callback by Yusj@Ctrip.com
            if (elem.data("calendar.options")) {
                var callback = elem.data("calendar.options").callback;
                if (callback) {
                    callback(selectdate, elem);
                }
            }


            var next = elem.data('calendar.next');
            if (next) {
                if (!/\d/.test(next.val())) {
                    next.val('');
                }
                next.focus();
            }
        };
        return this.data('calendar.options', options || {}).each(function () {
            var elem = jQuery(this);
            var prev = elem.attr('date') ? jQuery('#' + elem.attr('date')) : null;
            if (prev) {
                prev.data('calendar.next', jQuery(this));
                elem.data('calendar.prev', prev);
            }
            calendar.register(this, onclick);
        });
    };
    jQuery.fn.calendarSingle.init = function () {
        var self = jQuery.fn.calendarSingle;
        var dateval = function (elem) {
            if (elem && elem.length) {
                var val = Date.parse(elem.val().replace(/-/g, '/'));
                return val && !isNaN(val) ? new Date(val) : null;
            } else {
                return null;
            }
        };
        var setstate = function (state) {
            switch (self.state + '' + state) {
                case '01': //show calendar for self.target
                    var elem = self.target;
                    self.frame.opt(elem.data('calendar.options'));
                    self.frame.set(dateval(elem) || new Date(), [dateval(elem), dateval(elem.data('calendar.prev'))]);
                    self.frame.show(elem);
                    break;
                case '21': //mouse out calendar, force state to 1
                    self.target[0].focus();
                    break;
                case '10': //hide on blur
                case '20': //hide on clicked
                    self.frame.hide();
                    break;
            }
            self.state = state;
        };

        self.init = jQuery.noop;
        self.target = null;
        self.state = 0;
        self.frame = new self.Frame();
        self.register = function (el, onclick) {
            jQuery(el).focus(function () {
                if (self.target && self.target[0] != this) {
                    setstate(0);
                }
                self.target = jQuery(this);
                setstate(1);
            }).blur(function () {
                if (self.state == 1) {
                    setstate(0);
                }
            }).data('calendar.onclick', onclick);
        };

        self.frame.onclick = function (date) {
            setTimeout(function () {
                self.target.data('calendar.onclick')(date);
            }, 20);
            setstate(0);
        };
        self.frame.container.hover(function () {
            setstate(2);
        }, function () {
            if (self.state == 2) {
                setstate(1);
            }
        });
    };
    jQuery.fn.calendarSingle.Frame = function () {
        this.container = jQuery(['<div id="calendarSingle" class="gs-date" style="display:none">',
			'<div id="datelistSingle" class="date-list"></div>',
			'<a id="calendar-lastmonth">&lt;&lt;</a>',
			'<a id="calendar-nextmonth">&gt;&gt;</a>',
		'</div>'].join('')).appendTo(document.body);

        this.container.css({
            left: -1000,
            top: -1000,
            display: 'block'
        });
        this.width = this.container.outerWidth();

        var that = this;
        that.units = jQuery('#datelistSingle').map(function () {
            var unit = new jQuery.fn.calendarSingle.Unit(this);
            unit.onclick = function () {
                that.onclick.apply(that, arguments);
            };
            return unit;
        });

        jQuery('#calendar-lastmonth, #calendar-nextmonth').click(function (e) {
            that.navigate(/next/.test(this.id) ? 1 : -1);
        });
    };
    jQuery.fn.calendarSingle.Frame.prototype = {
        opt: function (options) {
            jQuery.each(this.units, function () {
                delete this.options;
                this.options = jQuery.extend({}, this.options, options);
            });
        },
        set: function (date, hilits) {
            var d = new Date(date);
            var e = new Date(d.getFullYear(), d.getMonth(), 1);
            jQuery.each(this.units, function () {
                this.set(e.getFullYear(), e.getMonth());
                e.setMonth(e.getMonth() + 1);
            });
            if (hilits) {
                this.hilits = hilits;
            }
            jQuery.each(this.hilits || [], jQuery.proxy(function (i, d) {
                if (d) jQuery.each(this.units, function (i, o) {
                    o.hilit(d);
                });
            }, this));
        },
        navigate: function (dir) {
            var y = this.units[0].year;
            var m = this.units[0].month + dir * this.units.length;
            if (m >= 12) {
                ++y;
                m -= 12;
            } else if (m < 0) {
                --y;
                m += 12;
            }
            this.set(new Date(y, m, 1));
        },
        show: function (el) {
            var rect = jQuery(el).offset();
            rect.right = rect.left + jQuery(el).outerWidth();
            rect.bottom = rect.top + jQuery(el).outerHeight();

            var root = document.documentElement;
            var viewport = {
                left: root.scrollLeft,
                right: root.scrollLeft + root.offsetWidth
            };
            var r2r = rect.left + this.width > viewport.right && rect.right - this.width > viewport.left;
            this.container.css({
                left: r2r ? rect.right - this.width : rect.left,
                top: rect.bottom,
                display: 'block'
            });
        },
        hide: function () {
            this.container.css('display', 'none');
        },

        onclick: jQuery.noop
    };
    jQuery.fn.calendarSingle.Unit = function (el, options) {
        var elem = jQuery(el);
        var html = ['<label></label>', '<dl>'];
        for (var i = 0, w = this.character.weekday; i < 7; ++i) {
            html.push('<dt class="week', i, '">', w.charAt(i), '</dt>');
        }
        html.push('<dd>');
        for (var i = 0; i < 42; ++i) {
            html.push(i < 31 ? '<span>' + (i + 1) + '</span>' : '<span class="foretime"></span>');
        }
        html.push('</dd>', '</dl>');
        elem.html(html.join('')).click(jQuery.proxy(this, 'click')).mouseover(jQuery.proxy(this, 'mouseover')).mouseout(jQuery.proxy(this, 'mouseout'));
        this.label = elem.children('label');
        this.box = elem.find('dd');
        this.blanks = this.box.find('span.foretime');
        this.numbers = this.box.find('span:not(.foretime)');
    };
    jQuery.fn.calendarSingle.Unit.prototype = {
        character: {
            y: "\u5e74",
            m: "\u6708",
            weekday: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d"
        },
        options: {
            filter: function (date, today) {
                return date >= today;
            }
        },
        set: function (year, month) {
            this.year = year;
            this.month = month;
            this.label.html(this.year + this.character.y + (this.month + 1) + this.character.m);
            var n = new Date(this.year, this.month + 1, 0).getDate();
            this.numbers.slice(27, n).css('visibility', 'visible');
            this.numbers.slice(n).css('visibility', 'hidden');

            var d = new Date(this.year, this.month, 1).getDay();
            this.blanks.slice(0, d).prependTo(this.box);
            this.blanks.slice(d).appendTo(this.box);

            if (this.today) {
                this.today.removeClass('today');
                this.today = null;
            }

            var now = new Date(),
				today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            if (this.year == today.getFullYear() && this.month == today.getMonth()) {
                this.today = this.numbers.eq(today.getDate() - 1);
                this.today.addClass('today');
            }

            var t = new Date(this.year, this.month, 1);
            var f = this.options.filter;


            //add 


            var isForetime = jQuery.fn.calendarSingle.target.data('calendar.options').foretime;

            if (isForetime != 'no') {
                this.numbers.each(function (i) {
                    t.setDate(i + 1);
                    jQuery(this).toggleClass('foretime', !f(t, today));
                });
            } 

            if (this.current) {
                this.current.removeClass('current');
            }
            this.current = jQuery();
        },
        hilit: function (date) {
            if (date.getFullYear() == this.year && date.getMonth() == this.month) {
                var el = this.numbers.eq(date.getDate() - 1);
                this.current.push(el.addClass('current')[0]);
            }
        },
        click: function (e) {
            var el = jQuery(e.target),
				i = this.numbers.index(el);
            if (i >= 0 && !el.hasClass('foretime')) {
                this.current.push(el.addClass('current')[0]);
                this.onclick(new Date(this.year, this.month, i + 1));
            }
        },
        mouseover: function (e) {
            var el = jQuery(e.target);
            if (el.is('span') && !el.hasClass('foretime')) {
                el.addClass('hover');
            }
        },
        mouseout: function (e) {
            var el = jQuery(e.target);
            if (el.hasClass('hover')) {
                el.removeClass('hover');
            }
        },
        onclick: jQuery.noop
    };
});