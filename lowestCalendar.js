alert(1);
; (function ($) {
    var cls = {
        name: 'lowestPrice_calendar',
        version: '1.0',
        module: lowestPriceCalendar
    };
    var isMaxFlag=false,isPastFlag=false,isPreDisabled=false;
    var mousedownEvent=false;
    function lowestPriceCalendar(obj, opt) {
        var _this = this;
        /*配置数据*/
        _this.isShow=false;
        //console.log(opt);
        _this.option = {
            DCityInput: opt.DCityInput || null, //出发城市的文本框
            ACityInput: opt.ACityInput || null, //到达城市的文本框
            minDate: opt.minDate ? ((new Date(opt.minDate.replace(/-/g,'/'))).getTime() < (new Date()).getTime() ? (new Date()).toFormatString("yyyy-MM-dd") : opt.minDate) : (new Date()).toFormatString("yyyy-MM-dd"), //最小日期
            maxDate:opt.maxDate||"",
            showPrice:opt.showPrice||false,
            showWeek: opt.showWeek || false, //是否展示周几
            //nextEl: opt.nextEl || null, //获取光标的元素是谁
            description: opt.description || "因票价变动频繁，请以实时查询报价为准。",
            tipText: opt.tipText || "yyyy-MM-dd", //最后文本框展示的日期的格式
            prevEl: opt.prevEl!=""?opt.prevEl: null,
            listener: {
                Show: opt.Show || null,
                onFocus: opt.onFocus || null,
                onChange : opt.onChange || function(){},
                onBlur:opt.onBlur||function(){},
                onChangeMonth:opt.onChangeMonth||function(){}
            }
        };

        /*私有数据*/
        _this.data={};
        this.selectedDate = opt.selectedDate || (new Date()).toFormatString("yyyy-MM-dd");
        _this.target = $(obj); //目标文本框

        _this.uid = "calendar" + _this.target.uid();
        _this.MaxDate = opt.MaxDate || "";
        _this.firstSelectedDate = _this.selectedDate; //第一次被初始化时的日期


       _this.target.bind("focus", function (event) {
            if(!_this.isShow){
                //console.log(_this.option.listener.onFocus);
                _this.init(_this.target);
                _this.option.listener.onFocus && _this.option.listener.onFocus(_this);
                //console.log("focus");
            }

        });
        _this.target.bind("mousedown", function (event) {

            if(!_this.isShow){
                _this.init(_this.target);
                _this.option.listener.onFocus && _this.option.listener.onFocus(_this);
                //console.log("mousedown");
            }
        });
        _this.target.bind("blur", function (event) {
            _this.blur(event);
        });
       _this.target.bind("mouseup",function(){
            var t = _this.target[0];
            if (t.releaseCapture) {
                t.releaseCapture();
            }
        });
    }
    $.extend(lowestPriceCalendar.prototype, {
        template: {
            wrapper: '\
				<div class="calendar_mini" data-bind="all">\
					<div class="lowprice_main">\
						<a class="prev" data-bind="prev" href="javascript:void(0);"></a>\
						<a class="next" data-bind="next" href="javascript:void(0);"></a>\
						<a class="close" data-bind="close" href="javascript:void(0);">×</a>\
						<h4 class="clearfix">\
							<span class="weekend">日</span>\
							<span>一</span>\
							<span>二</span>\
							<span>三</span>\
							<span>四</span>\
							<span>五</span>\
							<span class="weekend">六</span>\
						</h4>\
						<div class="calendar_scroll" id="${uid}">\
						</div>\
						<p class="text_low">${description}</p>\
					</div>\
				</div>\
			',
            calendar: '\
			<table class="calendar">\
				{{each(i,dateData) dateDataList}}\
							{{if i%7==0}}\
								<tr {{if !dateData.isSingle&&i==14}}class="prevmonth"{{/if}}>\
							{{/if}}\
								<td data-value="${dateData.id}" class="{{if dateData.None||dateData.Past||dateData.maxDate}}none {{/if}}{{if dateData.LowestPrice}} lowest {{/if}}{{if dateData.isSelected}} current{{/if}}" data-bind="select">\
									{{if !dateData.None}}\
										{{if dateData.Festival}}\
											<span class="date festival">${dateData.Festival}</span>\
										{{else}}\
											<span class="date{{if dateData.today}} today{{/if}}">${dateData.date}</span>\
										{{/if}}\
                                            ${Price}\
									{{/if}}\
								</td>\
							{{if (i+1)%7==0}}\
								<th>${dateData.Month}</th></tr>\
							{{/if}}\
				{{/each}}\
			</table>'
        },
        weekText: ["pic_sun", "pic_mon", "pic_tue", "pic_wed", "pic_thu", "pic_fir", "pic_sat"],
        todayText: ["pic_today", "pic_tomorrow", "pic_aftertomorrow"],
        MASK: "yyyy-MM-dd",
        festival: {
            "除夕": "c_chuxi",
            "春节": "c_chunjie",
            "元宵": "c_yuanxiao",
            "清明": "c_qingming",
            "端午": "c_duanwu",
            "中秋": "c_zhongqiu",
            "元旦": "c_yuandan",
            "劳动": "c_wuyi",
            "国庆": "c_guoqing",
            "圣诞": "c_shengdan"
        },
        pad: function (num, len) {
            for (num += "", len = len || 2; num.length < len; ) {
                num = "0" + num;
            }
            return num;
        },
        checkFestival: function (date) {
            var festival = date.toDate().getFestival();
            for (var i in this.festival) {
                if (this.festival.hasOwnProperty(i) && festival.indexOf(i) > -1) {
                    return this.festival[i];
                }
            }
            return false;
        },
        getWhatDay: function (t) {
            var a = t.toDate().toFormatString("yyyy-MM-dd");
            var n = this.checkFestival(a);
            if (n) return n.replace("c_", "pic_");
            var i = new Date,
            s = new Date(i.getFullYear(), i.getMonth(), i.getDate()),
            r = parseInt((t - s) / 864e5, 10);
            return (r >= 0 && 3 > r ? this.todayText[r] : this.weekText[t.getDay()]);
        },
        setWeek: function (target) {
            var showTarget = null;
            showTarget = (target ? $(target) : this.target);
            var date = showTarget.value().toDate();
            if (date) {
                var i = this.getWhatDay(date);
                i && showTarget.offset().width >= 105 && showTarget.css({
                    "background-image": "url(http://pic.c-ctrip.com/cquery/" + i + ".png)",
                    "background-position": "right center",
                    "background-repeat": "no-repeat"
                });
            } else{
                 showTarget.css({
                    "background-image": "none"
                });
            }
        },
        init: function (obj) {
            var _this = this;
            var opt = _this.option;
            _this.initTpl(); //初始化模板
            _this.selectedDate=_this.firstSelectedDate;
            //console.info('selectedDate-----', _this.selectedDate);
            if (opt.prevEl) {
                var prevDate = $("#" + _this.option.prevEl).value();
                if(prevDate!=""){
                    _this.option.minDate = prevDate;
                    _this.selectedDate = prevDate;
                }

            }
            if($("#"+_this.uid).length==0){
                $.container.append(_this.layOut);
            }
            _this.value=_this.target.value()!=""?_this.target.value():_this.selectedDate;
             _this.layOut=$("#"+_this.uid);
            _this.content=$("#c_" + _this.uid);
            _this.content.html("");
            //console.info('selectedDate---', _this.selectedDate);
            _this.showAllDay(_this.selectedDate);

            _this.show();
        },
        initTpl: function () {
            var _this = this;
            //如果日历弹出框已经存在了，只需要展示一下就可以了
            var uid = _this.uid;
            var template = _this.template;
            var calendarDiv = document.createElement("div");
            calendarDiv.id = uid;
            var calendarDivObj = $(calendarDiv);
            calendarDivObj.html($.tmpl.render(template.wrapper, {
                uid: "c_" + uid,
                description: _this.option.description
            }));
            _this.layOut = calendarDivObj;
            _this.initLayoutEvent();
            _this.content = calendarDivObj.find("#c_" + uid);
        },
        show: function () {

            this.setOffset();
            this.isShow=true;
        },
        blur: function (event) {
            var _this=this;
            _this.hide();
           _this.option.listener.onBlur && setTimeout(function () {
                _this.option.listener.onBlur(this, _this.target);
            });

        },
        setOffset: function () {
            var _this = this;
            _this.layOut.offset({ "top": _this.target.offset().top + _this.target.offset().height, "left": _this.target.offset().left });
        },
        hide: function () {
            $("#" + this.uid).remove();
            this.isShow=false;
        },
        showAllDay: function (str,directorStr,data) {
            /*console.info('str----',str);
            console.info('directorStr----',directorStr);*/
            console.info('data----',data);
            isMaxFlag=false;isPastFlag=false;isPreDisabled=false;
            str=str.replace(/-/g, "/");
            //console.info('str---2-',str);
            var _this = this;
            _this.update(str);
            var Dd = parseInt((new Date(str)).toFormatString("dd"), 10);
            newDd = new Date(str);
            //console.info('Dd----',Dd);
            //console.info('newDd----',newDd);
            var dateDataList = [];
            var sumDays = (new Date(newDd.toFormatString("yyyy"),newDd.toFormatString("MM"), 0)).getDate();
            //console.info('sumDays----',sumDays);
            if (Dd > (sumDays/2)) {
                dateDataList = _this.handleData("double", 1,data);
                //如果第一个半月没有占四行，那么后面的正常进行，如果第一个半月占了四行，就展示全月
                if(!_this.fourthTr){
                    _this.handleChangeMn("next");
                    var secondMonthDataList=_this.handleData("double", 2,data);
                    dateDataList = dateDataList.concat(secondMonthDataList);
                    _this.handleChangeMn("prev");
                }
            } else {
                dateDataList = _this.handleData("single", 1,data);
            }
            //console.info('dateDataList----',dateDataList);
            var html = $.tmpl.render(_this.template.calendar, {
                dateDataList: dateDataList
            });
            if(directorStr=="next"||directorStr==undefined){
                //_this.content.html(oldHtml+html);
                _this.content.append($.instance(html));
            }else if(directorStr=="prev"){
                 //_this.content.html(html+oldHtml);
                 _this.content.prepend($.instance(html));
                 //prepend()
            }
            _this.initContentEvent();
             if(isPastFlag||isPreDisabled){
                _this.layOut.find("[data-bind='prev']").addClass("prev_disable");
            }else{
                _this.layOut.find("[data-bind='prev']").removeClass("prev_disable");
            }
            if(isMaxFlag){
                _this.layOut.find("[data-bind='next']").addClass("next_disable");
            }else{
                _this.layOut.find("[data-bind='next']").removeClass("next_disable");
            }


        },
        initLayoutEvent:function(){
            var _this=this;
            _this.layOut.bind("mousedown",function(event){
                 var target = $(event.target || event.srcElement);
                if (!target.attr("data-bind")) {
                        target = target.parents("[data-bind]");
                 }
                 if(target.length>0){
                    if(target.attr("data-bind")!="close"){
                        if ((target.attr("data-bind") == "prev"&&!target.hasClass("prev_disable")) || (target.attr("data-bind") == "next"&&!target.hasClass("next_disable"))) {
                            _this.changeMn(target.attr("data-bind"));
                        }
                        event.stop();
                        if (_this.target[0].setCapture) {
                            _this.target[0].setCapture();
                        }

                     }else{
                        _this.hide();
                        return;
                     }
                 }
            });

        },
        initContentEvent:function(){
            var _this=this;
            _this.content.bind("mousedown",function(event){
                var target = $(event.target || event.srcElement);
                if (!target.attr("data-bind")) {
                        target = target.parents("[data-bind]");
                 }
                if(target.attr("data-bind")=="select"&&!target.hasClass("none")){
                    _this.select(target);
                }
                event.stop();
            });
        },
        handleData: function (type, firstMonth,data) {
            //参数firstMonth：当跨月展示的时候，是第一个月还是第二个月
            var _this = this;
            var sumDays = (new Date(_this.showYear, _this.showMonth, 0)).getDate(); //一个月的总天数
            var firstD = 1; //需要展示的这个月的第一天，如果是单月展示的话，这个值是1，双月展示的话，第一个月是16，第二个月是1号
            var cycleLen = 42; //循环的次数，单月展示的话，一共有6行，一行7天，所以是42次，双月的话，是21次

            var isSingle=(type == "single")?true:false; //是不是单月
            var subLen = 0; //这个月一共有几天，减去subLen就是需要展示的天数。单月份的情况的话就全部展示不需要减

            if (type != "single"){
                cycleLen = 21;
                //第一个月是从16号开始，第二个月是从1号开始
                if (firstMonth == 1) {
                    firstD = parseInt(sumDays/2)+1; //从这个月的几号开始
                    subLen = parseInt(sumDays/2); //这个月的总天数-subLen就是需要展示的天数。双月份的话，第一个月减15天，第二个月一共有21个空白，减去
                }
                var ddate=new Date(_this.showYear, _this.showMonth-1,firstD);
                if((7-ddate.getDay())<(sumDays-ddate.getDate()+1)%7&&(sumDays-ddate.getDate()+1)>14){
                    //INC000002456127||国内机票预订日期控件不显示5-31
                    //30,31是重复，有什么问题呢？如果大于3行就完整展示这个月的呀。
                    firstD =1; //从这个月的几号开始
                    subLen =0; //这个月的总天数-subLen就是需要展示的天数。双月份的话，第一个月减15天，第二个月一共有21个空白，减去
                    type="single";
                    cycleLen=42;
                    _this.fourthTr=true;//由于半月的展示占了四行，修改为全月展示
                    isSingle=true; //是不是单月
                }else{
                    _this.fourthTr=false;
                }
            }

            var firstDay = (new Date(_this.showYear, _this.showMonth - 1, firstD)).getDay();  //获取展示的第一天是星期几，前面要有几个空白，0-6
            var dateDataList = [];
            var dayLen = sumDays - subLen; //需要展示的天数
            if (type == "double" && firstMonth == 2) {
                dayLen = cycleLen - (firstDay);
            }
            //dayLen：这个月一共展示几天，第一个月展示15号以后的剩余天数，第二个月展示的是剩余三行所有的td，除了第一天前面的空白
            //始终保持3行
            //showPrice
           var dateDataOri = {
                LowestPrice: false,
                None: true,//空白，既没有日期又没有价格
                festival: false,
                isSingle: isSingle,
                today:false,
                isSelected:false,
                Price:_this.option.showPrice?"<span class='price'></span>":"",
                LowestPrice:false,
                Disabled: false//定义了最大日期，超过最大日期的日期
            };


            for (var j = 0; j < cycleLen; j++) {

                if (j < firstDay || j >= dayLen + firstDay) {
                    dateDataList.push(dateDataOri);
                } else {
                     var price="",lowestPrice=false;
                    var isToday=false;
                    var days = (j + firstD - firstDay);
                    var date = new Date(_this.showYear, _this.showMonth - 1, days);
                    var key = date.toFormatString(_this.MASK);
                    var today=(new Date()).toFormatString(_this.MASK);
                    /*console.info('MASK----',_this.MASK);
                    console.info('days----',days);
                    console.info('date----',date);
                    console.info('key----',key);
                    console.info('today----',today);*/
                    if(data){
                        //price=data[key];
                        if (data[key] == 0) {
                            price="--";

                        } else if (data[key] > 0){
                            price="<dfn>&yen;</dfn>" + data[key];
                        }
                        //lowestPrice
                        var month = (new Date(key.replace(/-/g, "/"))).toFormatString("MM");
                        console.log(month);
                        console.log(_this.lowestPrice[month]);
                        if (data[key] == _this.lowestPrice[month] * 1) {
                            lowestPrice=true;

                        }
                    }
                    if(today==key){
                        days="今";
                        isToday=true;
                    }
                    var selected=_this.value==key?true:false;
                    var dateTime= date.getTime();
                    var minDateTime=(new Date(_this.option.minDate.replace(/-/g,'/'))).getTime();
                    var isPastTag = dateTime <minDateTime ? true : false;
                    var preDisabled=dateTime <=minDateTime ? true : false;
                    var festival = key.toDate() ? key.toDate().getFestival() : "";
                    var month = (j == 13) ? '<span><i>' + _this.showYear + '</i>年</span><i>' + _this.showMonth + '</i>月' : "";
                    var ismaxDate = _this.MaxDate ? (dateTime > (new Date(_this.MaxDate)).getTime() ? true : false) : false;
                    //console.log(price);
                    var dateData = {
                        date: days,
                        today:isToday,
                        LowestPrice: false,
                        None: false,
                        Festival: festival,
                        Price: _this.option.showPrice?"<span class='price'>"+price+"</span>":"",
                        LowestPrice:lowestPrice,
                        Past:isPastTag,
                        id: key,
                        Month: month,
                        isSingle: isSingle,
                        maxDate: ismaxDate,
                        isSelected:selected,
                        preDisabled:preDisabled
                    };
                    if(dateData.Past&&!isPastFlag){
                        isPastFlag=true;
                    }
                    if(dateData.preDisabled&&!isPreDisabled){
                        isPreDisabled=true;
                    }
                    if(dateData.maxDate&&!isMaxFlag){
                        isMaxFlag=true;
                    }
                    dateDataList.push(dateData);
                }
            }
            //console.log(dateDataList);
            return dateDataList;
        },

        update: function (str) {
            var _this = this;
            _this.showYear = (new Date(str)).toFormatString("yyyy");
            _this.showMonth = (new Date(str)).toFormatString("MM");
            _this.showDay = (new Date(str)).toFormatString("dd");
        },
        select: function (target) {
            var id = target.attr("data-value"),
				_this = this;

            var value = (new Date(id.replace(/-/g,"/"))).toFormatString(this.option.tipText);
            _this.target.value(value);
            _this.selectedDate = id;
            _this.value=_this.selectedDate;
            _this.hide();
            _this.option.listener.onChange && setTimeout(function () {
                _this.option.listener.onChange(this, _this.target, value, !1);
            });
            this.option.showWeek && _this.setWeek(_this.target);


        },
        handleChangeMn: function (directorStr) {
            var _this = this;
            this.showYear = parseInt(_this.showYear, 10);
            this.showMonth = parseInt(_this.showMonth, 10);

            if (directorStr == "next") {
                this.showMonth++;
            } else {
                this.showMonth = _this.showMonth - 1;
            }
            if (this.showMonth < 1) {
                this.showMonth = 12;
                this.showYear -= 1;
            } else if (_this.showMonth > 12) {
                this.showMonth = 1;
                this.showYear = _this.showYear + 1;
            }
        },
        changeMn: function (directorStr) {
            //console.log('changeMn');
            var _this = this;
            if(!_this.animate){

                this.handleChangeMn(directorStr);
                var minDate=(new Date(_this.option.minDate.replace(/-/g,"/")));
                var minDateMonth=minDate.toFormatString("MM");
                var minDay=minDate.toFormatString("dd");
                if(minDateMonth!= _this.showMonth){
                    _this.showDay="01";
                }else{
                    _this.showDay=minDay;
                    }
                    this.selectedDate = _this.showYear + "-" + _this.showMonth + "-" + _this.showDay;
                var data=_this.option.listener.onChangeMonth && _this.option.listener.onChangeMonth(_this);
                _this.showAllDay(_this.selectedDate,directorStr,data);

                _this.slideEffect(directorStr);

            }

        },
        slideEffect:function(directorStr){
            var _this=this;
            _this.animate=true;
            if(directorStr=="next"){
                setTimeout(function() {
                    window.Utils.animate(_this.content.find(".calendar")[0], 'marginTop', -1*$(".calendar_scroll")[0].offsetHeight+ 'px', 200,function(){
                        $(_this.content.find(".calendar")[0]).remove();
                         //_this.option.listener.onChangeMonth && _this.option.listener.onChangeMonth(_this);
                        _this.animate=false;
                    });
                });

            }else{
                _this.content.find(".calendar")[0].style.marginTop=-1*$(".calendar_scroll")[0].offsetHeight+ 'px';
                setTimeout(function() {
                window.Utils.animate(_this.content.find(".calendar")[0], 'marginTop', '0px', 200,function(){
                    $(_this.content.find(".calendar")[1]).remove();
                    //_this.option.listener.onChangeMonth && _this.option.listener.onChangeMonth(_this);
                    _this.animate=false;

                });
            });
            }


        }
    });
    $.mod.reg(cls);
})(cQuery);
