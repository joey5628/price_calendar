/**
 *  含有价格的日历组件
 *  @author yi.z@ctrip.com
 *  @date 2015-06-15
 */
 var priceCalendar = null;
;(function($){
    if(!Date.prototype.Format){
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
    }


    var PriceCalendar = function(options){
        var me = this,
            minDate = options.minDate ? ((new Date(options.minDate.replace(/-/g,'/'))).getTime() < (new Date()).getTime() ? (new Date()).Format("yyyy-MM-dd") : options.minDate) : (new Date()).Format("yyyy-MM-dd"); //最小日期

        //me.config = $.extend(defaults, options);
        console.log(options);
        me.config = {
            selectedDate: options.selectedDate || (new Date).Format('yyyy-MM-dd'),
            minDate: minDate + ' 00:00:00', //不加上准确时间 取得的时间是从 08 时开始的
            priceData: options.priceData || null,
            showPrice: options.showPrice || true,
            description: options.description || '因票价变动频繁，请以实时查询报价为准。',
            listener: {
                onInitData: options.onInitData || null  //初始化外部方法
            }
        };


        me.$wrapper = null;
        me.$control = null;
        //me.$caption = null;
        me.$calendar = null;
        me.selectedDate = me.config.selectedDate;
        me.year = '';
        me.month = '';
        me.priceData = me.config.priceData;

        me.init();
    };

    PriceCalendar.prototype = {
        template: {
            wrapper:
                '<div class="price_calendar">'+
                    '<div class="month_control">'+
                        '<a href="javascript:;" data-bind="prev" class="prev disable"></a>'+
                        '<a href="javascript:;" data-bind="next" class="next disable"></a>'+
                    '</div>'+
                    '<div class="price_calendar_box cf">'+
                    '</div>'+
                    '<p class="calendar_text">${description}</p>'+
                '</div>'
            ,
            calendar:'\
                <table>\
                    <caption>${data.year}年${data.month}月</caption>\
                    <thead>\
                        <tr>\
                            <th class="weekend">SUN 日</th>\
                            <th>MON 一</th>\
                            <th>TUE 二</th>\
                            <th>WED 三</th>\
                            <th>THU 四</th>\
                            <th>FRI 五</th>\
                            <th class="weekend">SAT 六</th>\
                        </tr>\
                    </thead>\
                    <tbody>\
                    {{each(i,d) data.dataList}}\
                        {{if i%7==0}}\
                            <tr>\
                        {{/if}}\
                            {{if d.type == "none" }}\
                                <td></td>\
                            {{else d.type == "past"}}\
                                <td class="past{{if d.weekend}} weekend {{/if}}">\
                                    <span class="date{{if d.today}} today{{/if}}">${d.date}</span>\
                                    <span class="text">--</span>\
                                </td>\
                            {{else d.type == "sellOut"}}\
                                <td class="sell_out{{if d.weekend}} weekend {{/if}}">\
                                    <span class="date{{if d.today}} today{{/if}}">${d.date}</span>\
                                    <span class="text">无房</span>\
                                </td>\
                            {{else d.type == "price"}}\
                                <td class="item {{if d.lowestPrice}}lowest {{/if}}{{if d.weekend}} weekend{{/if}}">\
                                    <span class="date{{if d.today}} today{{/if}}">${d.date}</span>\
                                    {{html d.price}}\
                                </td>\
                            {{/if}}\
                        {{if (i+1)%7==0}}\
                            </tr>\
                        {{/if}}\
                    {{/each}}\
                    </tbody>\
                </table>\
            '
        },

        MASK: 'yyyy-MM-dd',

        init: function(){
            var me = this;

            me.updateDate(me.selectedDate);

            me.initWrapper();
            // 没有传入priceData的时候 通过ajax加载
            if(!this.priceData){
                this.config.listener.onInitData(this.setPriceData);
            }else{
                this.getLowestPrice(me.priceData);
            }
            me.setCalendar();
        },

        initWrapper: function(){
            var me = this;

            me.$wrapper = $.tmpl(me.template.wrapper, {
                description: me.config.description
            });
            $(document.body).append(me.$wrapper);

            //me.$caption = me.$wrapper.find('table caption');
            me.$control = me.$wrapper.find('.month_control');
            me.$calendar = me.$wrapper.find('.price_calendar_box');
            me.initLayoutEvent();
        },

        updateDate: function(dateStr){
            console.log('dateStr---'+dateStr);
            this.year = (new Date(dateStr)).Format("yyyy");
            this.month = (new Date(dateStr)).Format("MM");
            this.date = (new Date(dateStr)).Format("dd");
        },

        setCalendar: function(control){
            var me = this,
                data = this.handleData(this.priceData);

            /*if(control == 'next'){
                this.$calendar.append($.tmpl(this.template.calendar, {
                    data: data
                }));
                // this.$calendar.find('table').eq(1).css({
                //     left:
                // });
            }else if(control == 'prev'){
                this.$calendar.prepend($.tmpl(this.template.calendar, {
                    data: data
                }));
            }else{*/
                this.$calendar.html($.tmpl(this.template.calendar, {
                    data: data
                }));
            //}

            var minDateArr = me.config.minDate.split('-');

            if(me.year == minDateArr[0] && me.month == minDateArr[1]){
                me.$control.find('.prev').addClass('disable');
            }else{
                me.$control.find('.prev').removeClass('disable');
            }
            if(me.config.maxDate){
                var maxDateArr = me.config.maxDate.split('-');
                if(me.year == maxDateArr[0] && me.month == maxDateArr[1]){
                    me.$control.find('.next').addClass('disable');
                }else{
                    me.$control.find('.next').removeClass('disable');
                }
            }else{
                me.$control.find('.next').removeClass('disable');
            }

        },

        //格式化数据
        handleData: function(priceData){
            console.log('me.month---'+this.month);
            var me = this,
                cycleLen = 42,
                firstDate = 1,
                firstDay = (new Date(me.year, me.month - 1, firstDate)).getDay(),   //获取展示的第一天是星期几，前面要有几个空白，0-6
                total = (new Date(me.year, me.month, 0)).getDate(),     //获取当前月的总天数
                i = 0,

                today = (new Date()).Format(me.MASK),
                minTime= (new Date(me.config.minDate).getTime());
                // console.log(me.config.minDate);
                // console.log((new Date(me.config.minDate)).Format('yyyy-MM-dd hh:mm:ss'));

            var dataNull = {
                type: 'none',
                none: true,
                today: false,
                price: me.config.showPrice ? '<span>--</span>' : '',
                weekend: false
            };

            var dataList = [];
            for(; i < cycleLen; i++){
                if(i < firstDay || i >= total + firstDay){
                    dataList.push(dataNull);
                }else{
                    // console.log(me.config.minDate);
                    var date = i + firstDate - firstDay,
                        dateTime = new Date(me.year, me.month - 1, date),
                        day = dateTime.getDay(),
                        time = dateTime.getTime(),
                        isPast = time < minTime ? true : false,
                        key = dateTime.Format(me.MASK),
                        isToday = false,
                        price = '',
                        lowestPrice = false,
                        weekend = day%6 === 0 ? true : false,
                        type = 'past';

                    // console.log('date----'+date);
                    // console.log('dateTime----'+dateTime.Format('yyyy-MM-dd hh:mm:ss'));
                    // console.log('minTime----'+(new Date(me.config.minDate)).Format('yyyy-MM-dd hh:mm:ss'));

                    if(priceData){
                        if(isPast){
                            type = 'past';
                        }else{
                            if(!priceData[key]){
                                type = 'price';
                                price = '<span class="price">实时计价</span>';
                            }else if(priceData[key] === -1){
                                //price = '<span>--</span>';
                                //isPast = true;
                                type = 'sellOut'; // 为0 当作售罄
                            }else if(priceData[key] > 0){
                                type = 'price';
                                price = '<span class="price"><dfn>&yen;</dfn>'+ priceData[key] +'</span>';

                                var month = key.split('-')[1];
                                if (priceData[key] == me.lowestPrice[month] * 1) {
                                    lowestPrice = true;
                                }
                            }
                        }
                    }

                    if(today == key){
                        isToday = true;
                        date = '今';
                    }

                    var data = {
                        type: type,
                        date: date,
                        none: false,
                        today: isToday,
                        price: me.config.showPrice ? price : '',
                        past: isPast,
                        id: key,
                        lowestPrice: lowestPrice,
                        weekend: weekend
                    };

                    dataList.push(data);

                }
            }
            // console.info('dataList---', dataList);
            var data = {
                dataList: dataList,
                year: me.year,
                month: me.month
            };
            return data;
        },

        /*setDates: function(dataList){
            this.$calendar.append($.tmpl(this.template.calendar, {
                dataList: dataList
            }));
        },
*/
        setPriceData: function(priceData){
            var me = this;
            if(!me.priceData){
                me.priceData = priceData;
                me.getLowestPrice(priceData);
                me.setCalendar();
                //me.setDates(me.handleData(priceData));
                /*for(key in priceData){
                    if(priceData.hasOwnProperty(key)){
                        var $td = me.$calendar.find('td[data-id="'+ key +'"]');
                        if($td.length > 0){
                            var price = '',
                                isPast = false;
                            if(!priceData[key]){
                                price = '<span>--</span>';
                                isPast = true;
                            }else{
                                price = '<span class="price"><dfn>&yen;</dfn>'+ priceData[key] +'</span>';
                            }
                            $td.find('span').not('.date').remove();
                            $td.append(price);
                            if(isPast){

                            }
                        }
                    }
                }*/
            }
        },

        // 获取每个月最低价格
        getLowestPrice: function(priceData){
            var lowestPrice = {};
            for(key in priceData){
                if(priceData.hasOwnProperty(key)){
                    var month = key.split('-')[1],
                        price = priceData[key];

                    if(price > 0){
                        if(lowestPrice[month]){
                            if(lowestPrice[month] > price){
                                lowestPrice[month] = price;
                            }
                        }else{
                            lowestPrice[month] = price;
                        }
                    }
                }
            }
            this.lowestPrice = lowestPrice;
        },

        initLayoutEvent: function(){
            var me = this;
            this.$control.find('a').on('click', function(e){
                var $that = $(this),
                    control = $that.attr('data-bind');
                if(!$that.hasClass('disable')){
                    me.changeMn(control);
                }
                e.stopPropagation();
                return false;
            });
        },

        handleChangeMn: function(control){
            var me = this;

            me.year = parseInt(me.year, 10);
            me.month = parseInt(me.month, 10);
            if(control == 'next'){
                me.month++;
            }else{
                me.month--;
            }

            if(me.month < 1){
                me.month = 12;
                me.year--;
            }else if(me.month > 12){
                me.month = 1;
                me.year++;
            }
            var minDateArr = me.config.minDate.split('-'),
                minMonth = minDateArr[1],
                minDay = minDateArr[2];
            if(me.month != minMonth){
                me.date = '01';
            }else{
                me.date = minDay;
            }
            me.selectedDate = me.year + '-' + me.month + '-' + me.date;
            console.log(me.year);
            console.log(me.month);
        },

        changeMn: function(control){
            var me = this;
            if(!me.animate){

                me.handleChangeMn(control);
                me.setCalendar(control);

                me.slideEffect(control);
            }
        },

        // 切换月份动画
        slideEffect: function(control){
            /*var me = this;
            me.animate = true;
            if(control == 'next'){
                var $table = me.$wrapper.find('table').eq(0);
                $table.animate({'margin-left': $table.outerWidth()*-1}, 200, function(){
                    $table.remove();
                    me.animate = false;
                });
            }else if(control == 'prev'){
                var $table = me.$wrapper.find('table').eq(0);
                $table.animate({'margin-left': '10px'}, 200, function(){
                    me.$wrapper.find('table').eq(1).remove();
                    me.animate = false;
                });
            }*/
        }



    };

    priceCalendar = new PriceCalendar({
        priceData: {"2015-06-19":3025,"2015-06-20":561,"2015-06-21":408,"2015-06-22":547,"2015-06-23":315,"2015-06-24":447,"2015-06-25":495,"2015-06-26":576,"2015-06-27":495,"2015-06-28":433,"2015-06-29":391,"2015-06-30":495,"2015-07-01":466,"2015-07-02":490,"2015-07-03":597,"2015-07-04":315,"2015-07-05":379,"2015-07-06":257,"2015-07-07":326,"2015-07-08":344,"2015-07-09":425,"2015-07-10":480,"2015-07-11":238,"2015-07-12":409,"2015-07-13":258,"2015-07-14":344,"2015-07-15":344,"2015-07-16":409,"2015-07-17":579,"2015-07-18":302,"2015-07-19":299,"2015-07-20":238,"2015-07-21":309,"2015-07-22":370,"2015-07-23":344,"2015-07-24":344,"2015-07-25":249,"2015-07-26":229,"2015-07-27":199,"2015-07-28":209,"2015-07-29":269,"2015-07-30":269,"2015-07-31":289,"2015-08-01":239,"2015-08-02":299,"2015-08-03":239,"2015-08-04":240,"2015-08-05":299,"2015-08-06":299,"2015-08-07":319,"2015-08-08":364,"2015-08-09":344,"2015-08-10":269,"2015-08-11":269,"2015-08-12":389,"2015-08-13":344,"2015-08-14":344,"2015-08-15":315,"2015-08-16":344,"2015-08-17":344,"2015-08-18":344,"2015-08-19":279,"2015-08-20":250,"2015-08-21":299,"2015-08-22":269,"2015-08-23":249,"2015-08-24":199,"2015-08-25":226,"2015-08-26":276,"2015-08-27":276,"2015-08-28":299,"2015-08-29":286,"2015-08-30":276,"2015-08-31":267,"2015-09-01":281,"2015-09-02":490,"2015-09-03":430,"2015-09-04":344,"2015-09-05":315,"2015-09-06":344,"2015-09-07":485,"2015-09-08":344,"2015-09-09":370,"2015-09-10":370,"2015-09-11":528,"2015-09-12":315,"2015-09-13":344,"2015-09-14":485,"2015-09-15":370,"2015-09-16":370,"2015-09-17":0,"2015-09-18":0}
        // listener: {
        //     onInitData: function(callback){
        //         $.getJSON("calendar_mock.php", function(data){
        //             priceCalendar.setPriceData(data.Prices);
        //         });
        //     }
        // }
    });

})(jQuery)
