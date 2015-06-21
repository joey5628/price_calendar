
/**
* 2013-6-20 支持cookie 保存之前的目的地记录,如果需要配置不同的cookie , 
* 请在传入的option 中传入单独的   storeKey:'desCity', //desCity 是自定义key 
* 需要引用 jqyer  jquery.cookie.js
* update by yusj@Ctrip.com
* updata by chenwp@ctrip.com
*/

lvping.require('lvping.ui.Control');
lvping.provide('lvping.ui.Suggest');
(function($) {
	var Suggest = lvping.ui.Control.extend('lvping.ui.Suggest', {

		defaults: {
			dataUrl:null,
			defaultValue:null,
			queryName:null,
			callbackFn:function(){},
		    diffTop:0,
		    diffLeft:0,
		    storeKey:"notsupportcookie",
		    storeCount:5,
            lastData:null //取到的唯一的记纪数
		}

	}, {
		isRounding: false,
        kCode: {
            ENTER: 13,
            UP: 38,
            DOWN: 40,
            ESC: 27
        },

		init: function() {
			this.dataCache = {};
			this.initTextinput();
			this.initContainer();
			this.setContaineroffset();
		},

		initTextinput: function() {
			this.element.attr('autocomplete', 'off');
			this.setDefault();
			this.bind('focus', 'onFocus');
			this.bind('blur', 'onBlur');
            $.browser.mozilla ? this.bind('keyup', 'onKeydown') : this.bind('keydown', 'onKeydown'); //firefox bug fix
			this.hiddenInput = $('input[hiddenforid="' + this.element.attr('id') + '"]');
		},

		onFocus:function(){
			if (this.element.val() == this.options.defaultValue || this.element.val() == '') {
	            this.element.val('');
	            this.element.removeClass('sgtgray').addClass('sgtblack');
			    this.showCoolieItem(true);
	        }
		},

		onBlur:function(){
	        if (this.element.val() == this.options.defaultValue || this.element.val() == '') {
	            this.element.removeClass('sgtblack').addClass('sgtgray');
	            this.element.val(this.options.defaultValue);
                //重置 selectedvalue = '';
                this.element.attr('selectedvalue','');
                this.element.attr('code','');
	        }
			this.stop();
			this.hide();
            
            //当数据结果为1时填入数据节点
            if(this.options.lastData){
                var that = this;
                window.setTimeout(function(){
                    that.oneValueSet();
                },100); //ajax状态有点延迟                
            }


		},

		onKeydown: function (el,e) {
            switch (e.keyCode) {
                case this.kCode.UP:
                	if (this.isRounding) this.stop();
                	this.selectContent('up');
                	e.preventDefault();
                    return false;
                case this.kCode.DOWN:
                	if (this.isRounding) this.stop();
                	this.selectContent('down');
                	e.preventDefault();
                    return false;
                case this.kCode.ENTER:
                	if(!!this.selectedItem){
	                	this.setValues($(this.selectedItem));
	                }
                    return false;
                case this.kCode.ESC:
                    return false;
                default:
                    this.start();
            }
        },

		initContainer: function() {
		    if(typeof conTainer != 'undefined' && conTainer.length > 0 && conTainer.attr('id')) {
		        return;
		    }
		    var conTainer = $('<div>').attr('class','sgt-address').attr('id',this.element.attr('id') + 'Con');
			containerList = $('<div>').attr('class','sgt-address-list');
			this.conTainer = conTainer;
			this.containerList = containerList;

            //console.log(containerList);

			conTainer.append(containerList).appendTo($('body'));
		},

		setContaineroffset: function(){
            var o = this.element.offset();
            var h = this.element.outerHeight();
            this.conTainer.css({ top: o.top + h + this.options.diffTop, left: o.left + this.options.diffLeft });
		},

		setDefault:function(){
			if (this.element.val() == '') {
	            this.element.val(this.options.defaultValue);
	            this.element.removeClass('sgtblack').addClass('sgtgray');
	        }
		},

		start:function(){
			this.timeCounter = setTimeout(jQuery.proxy(this.changeContent, this), 200);
            this.isRounding = true;
		},

		stop:function(){
            if (this.timeCounter != 0) {
                clearTimeout(this.timeCounter);
            }
            this.isRounding = false;
		},
		changeContent:function(){
			 var v = this.element.val();

			if(!$.trim(v)){
				this.hide();
				return;
			}
		    this.showCoolieItem(false);
		    
			if (this.dataCache[v] !== undefined) { 
                this.fillContainer(this.dataCache[v]);
            } else { 
                this.getData(v);
            }
		},

		getData:function(v){
			var data = {},
				that = this;
			data[this.options.queryName] = escape(v);


			$.getJSON(this.options.dataUrl + '&Jsoncallback=?', data, function (obj) {
                that.options.lastData = obj.data;
                jQuery.proxy(that.fillContainer(obj), that);
				jQuery.proxy(that.fillContainer(obj), that);
				jQuery.proxy(that.addCache(v,obj), that);
           });

		},

		addCache: function (keyword, values) {
            this.dataCache[keyword] = [];
            this.dataCache[keyword] = values;
        },

		sugContainer:function(obj){
				var a = [];
                var n = obj.data.length > 12 ? 12 : obj.data.length; //最多12个数据
                for (var i = 0; i < n; i++) {
                    a.push('<a href="javascript:void(0);" code="' + obj.data[i].code + '"><span>' + obj.data[i].py + '</span><strong>' + obj.data[i].address + '</strong></a>');
                }
                return a.join('');
		},

		choseValue:function(el,e){
 			var that = $(e.target);
 			if (!that.is('a')) { that = that.closest('a'); }
 			this.setValues(that);
		},

		setValues:function(obj){
            this.element.val('');
 			this.element.val(obj.find('strong').html());
			this.hiddenInput.val(obj.attr('code'));
		    this.element.attr("code", obj.attr('code'));
		    this.element.attr("selectedvalue", obj.find('strong').html());
		    //add to cookie
		    this.addToCookie(obj);
			if(this.options.callbackFn){ this.options.callbackFn(obj)} ;
			try {
                this.onBlur();
            } catch (e) {
            }
		},

        //如果只有一个结果，离开时把这个结果填入input框
        oneValueSet:function(){

            this.dataCache = [];//移除缓存node
            if(this.options.lastData.length==1){
                var last = this.options.lastData[0];
 			    this.element.val(last.address);
			    this.hiddenInput.val(last.code);
		        this.element.attr("code",last.code);
		        this.element.attr("selectedvalue", last.address);
                this.options.lastData = null; 
            }
        
        },


		selectContent:function(s){
            var items = this.containerList.find('a'),
            	newSelectedItem;
            if(!this.selectedItem){
            	newSelectedItem = items[s =='down' ? 0 : items.length -1] ;
            }else{
				newSelectedItem = items[items.index(this.selectedItem) + (s =='down' ? 1 : -1)];
            	$(this.selectedItem).removeClass('current');
            }
            if (newSelectedItem) {
            	$(newSelectedItem).addClass('current');
            	this.selectedItem = newSelectedItem;
            }else{
            	this.selectedItem = undefined;
            }
		},

		setNoblur:function(el,e){
			var _o = this.element;
			this.element.bind('beforedeactivate',function () {
	            window.event.cancelBubble = true;
	            window.event.returnValue = false;
                _o.unbind('beforedeactivate');
            });
            e.preventDefault();
		},

		fillContainer:function(obj){
			this.selectedItem = undefined;
			this.containerList.html('').append(this.sugContainer(obj));
			this.bind(this.conTainer,'mousedown','setNoblur');
			this.bind(this.containerList.find('a'),'click','choseValue');
			this.show();
            //每次show定位一次下拉层 by rzou
            var o = this.element.offset();
            var h = this.element.outerHeight();
            this.conTainer.css({ top: o.top + h, left: o.left});
		},

		show:function () {
            if (!!$.trim(this.containerList.html())) {
                this.conTainer.show();
            } else{
            	 this.conTainer.hide();
            }
        },

        hide:function(){
			this.containerList.html('');
			this.conTainer.hide();
        },
	    
	    addToCookie:function(obj) {
	        if(this.options.storeKey =="notsupportcookie" || !$.cookie) { return false; } 
	        var key = "key" + obj.attr('code');
	        var value = ( obj.find('strong').html() );
	        var pinyin = ( obj.find('span').html() );
	        var curCookie = this.getFromCookie();
	        if(curCookie && curCookie !='') {
	            //已经存在了就不保存了
	            if(curCookie[key]) {
	                return false;
	            }
	            var count = 0;
	            
	            for(var m in curCookie) {
	                count++;
	                if(count> this.options.storeCount -1) {
	                    curCookie[m] = undefined;
	                    delete  curCookie[m];
	                }
	            }
	            curCookie[key] = value +"|" + pinyin;
	        }
	        else {
	            curCookie = { };
	            curCookie[key] = value +"|" + pinyin;
	        };

	        var cookieStr = [];
	        for(var item in curCookie) {
	            cookieStr.push(item + "|" + curCookie[item]);
	        }
            //try{
                $.cookie(this.options.storeKey,cookieStr.join("&"),{ expires: 30}); 
           // }catch(e){}
	       
	    },
	    getFromCookie:function() {
	       if(this.options.storeKey =="notsupportcookie" || !$.cookie) { return false; } 
	       if(!$.cookie) { return false; } 

	       var result = null;


           try{
                var curCookie =  $.cookie(this.options.storeKey);
           }catch(e){
           
           }

	       if(curCookie && curCookie !='') {
	           result = {};
	           var dess = curCookie.split("&");
	           for(var i=0;i< dess.length;i++) {
	               var des = dess[i].split("|");
	               result[des[0]] = des[1] + "|" + des[2];
	           }
	       }
	       return result;
	    },
	    
	    showCoolieItem:function(isshow) {
	   	  if(this.options.storeKey =="notsupportcookie" || !$.cookie) { return false; } 
	      if(isshow) {
	          var dess = this.getFromCookie();
	          if(!dess) return;
	          
	          var a = [];
	          for (var des in dess) {
	              var code = des.replace("key", '');
	              var addr = dess[des].split("|")[0];
	              var py = dess[des].split("|")[1];
	              a.push('<a class="cookieselect" href="javascript:void(0);" code="' + code + '"><span>' + py + '</span><strong>' + addr+ '</strong></a>');
	          }
            
              this.selectedItem = undefined;
              this.containerList.html('').append(a.join(''));
              this.bind(this.conTainer,'mousedown','setNoblur');
              this.bind(this.containerList.find('a'),'click','choseValue');
              this.show();
	      

	      }
	      else {
	         this.containerList.html(''); 
	         this.show();
	      }
	    }
	    
	    
	    
	});

}).call(this,jQuery);
