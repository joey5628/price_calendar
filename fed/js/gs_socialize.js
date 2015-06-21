var bds_config = {
    "snsKey": {
        'tsina': '1491333562',
        'tqq': '801412986'
    }
};

//判断支持 canvas;
var isCanvasSupported = function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

$(function () {

    //初始化二维码容器
    $('body').append($('<div id="qcode_share"><a class="close" href="javascript:;"></a></div>'));
    //关闭事件二维码容器
    $('body').on('click', '#qcode_share .close', function () {
        $('#qcode_share').hide();
        !isCanvasSupported() ? $('#qcode_share table').remove() : $('#qcode_share canvas').remove();
    });

    var bdNode = [];
    bdNode.push('<div id="bdshare" class="shareulbg_2 bdshare_t get-codes-bdshare" style="display: none;">');
    bdNode.push('<a class="bds_tsina"><span>新浪微博</span></a>');
    bdNode.push('<a class="weibo" href="javascritp:;"><span>微信</span></a>');
    bdNode.push('<a class="bds_renren"><span>人人网</span></a>');
    bdNode.push('<a class="bds_qzone"><span>QQ空间</span></a>');
    bdNode.push('</div>');

    var $bdNode = $("#bdshare");
    if ($bdNode.length === 0) {
        $bdNode = $(bdNode.join(''));
        $bdNode.appendTo(document.body);
    }

    (function () {
        //注入百度分享代码
        //2013-10-10 chenwp
        var bdshare = document.createElement('script');
        bdshare.type = 'text/javascript';
        bdshare.id = "bdshare_js";
        bdshare.setAttribute('data', 'type=tools&amp;mini=1&amp;uid=6841276'); //uid 由  zhangln@Ctrip.com 提供
        var bdshell = document.createElement('script');
        bdshell.type = 'text/javascript';
        bdshell.id = 'bdshell_js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(bdshare, s);
        s.parentNode.insertBefore(bdshell, s);
        document.getElementById('bdshell_js').src = "http://share.baidu.com/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date() / 3600000);
    })();

    var isAppend = 0;

    //----- share --
    $.fn.gsshare = function (opts) {
        $(this).gsbaseshare(opts);
    };

    //分享 yi.z
    $.fn.gsbaseshare = function (opts) {
        opts = $.extend({
            api: '/ajax-data.php?act=share',
            'url': location.href,
            'title': document.title,
            'pic': 'http://youresource.c-ctrip.com/img/common/ctrip_logo_90x90.png',
            style: 'shareulbg',
            countArea: 'span',
            hasCount: false, //是否后边有数字 可以用来加一
            fixed: false,
            top: false,
            left: false,
            offset: {
                top: 0,
                left: 0
            }, //控制偏移
            requestFn: null, //给后台发送请求的方法  有这个方法时api 参数是无效的
            callback: function () {}
        }, opts);

        var setPosition = function ($this) {
            if (opts.fixed) {
                $bdNode.css({
                    position: "fixed"
                });
            } else {
                $bdNode.css({
                    position: "absolute"
                });
            }
            var offset = $this.offset(),
                top = offset.top + opts.offset.top,
                left = offset.left - $this.outerWidth() / 2 + opts.offset.left, //修改为居中弹出 by cwp
                height = $this.height(),
                ulTop = top + height + 3;
            var ulTop = opts.top || ulTop;
            var left = opts.left || left;
            $bdNode.css({
                top: ulTop,
                left: left
            });
        }

        $bdNode.unbind();

        //二维码
        $bdNode.on('click', '.weibo', function (e) {
            var thatPOS = $(this).offset(),
                qcode_width = $('#qcode_share').width(),
                share_data = $bdNode.data('curOpts'),
                isRight = thatPOS.left + qcode_width > window.screen.width;

            //显示二维码图层
            //判断下是否在右边，如果是的话，像右偏移
            $('#qcode_share').css({
                top: thatPOS.top,
                left: isRight ? thatPOS.left - qcode_width : thatPOS.left - qcode_width / 2 //太右边靠左
            }).show();

            var shareURL = share_data.url ? share_data.url : window.location.href;

            //移余上次生成url
            !isCanvasSupported() ? $('#qcode_share table').remove() : $('#qcode_share canvas').remove();

            $('#qcode_share').qrcode({
                width: 185,
                height: 185,
                correctLevel: 0,
                render: !isCanvasSupported() ? "table" : 'canvas',
                text: shareURL
            });

            hideUl();

            //todo 待加统计代码, 不走微信分享了

            return false;
        });

        $bdNode.on('click', 'a:not(.weibo)', function () {
            var curOpts = $bdNode.data('curOpts');
            var pr = $bdNode.data('obj');
            var _f = $(this).attr('class');
            var toCategory = "";
            var openHeight = 360;
            switch (_f) {
            case 'bds_tsina':
                toCategory = 0;
                break;
            case 'bds_tqq':
                toCategory = 1;
                break;
            case 'bds_renren':
                toCategory = 2;
                break;
            case 'bds_qzone':
                toCategory = 3;
                break;
            }

            if (curOpts.hasCount) {
                var $countArea = pr.find(curOpts.countArea),
                    count = parseInt($countArea.text(), 10);
                count = isNaN(count) ? 0 : count;
                count++;
                $countArea.text(count);
            }
            curOpts.callback(pr);
            //判断requestFn是否为一个方法
            if (typeof opts.requestFn === "function") {
                opts.requestFn(pr);
            } else {
                //发送点击情况记录点击的是那个分享
                var shareId = pr.attr("data-shareId"),
                    shareCategory = pr.attr("data-shareCategory");
                $.post(
                    curOpts.api, {
                        shareId: shareId,
                        shareCategory: shareCategory,
                        toCategory: toCategory
                    },
                    function (data) {
                        //data.RetCode 0：失败；1：成功
                    }
                );
            }
            hideUl(); //点击后隐藏 by cwp
            return false;
        });

        function hideUl() {
            $bdNode.hide();
        }

        //根据不同的url构建不同的参数
        function checkShareUrl(url) {
            //window._USER
            //数据来源于 head.js 中的 /ajaxnew/GetUserCate.ashx?callback=? 接口返回
            if (window._USER.userid == undefined) {
                return url;
            }
            if (window._USER.allianceid && window._USER.sid) {
                //GS07OPT-1523绑定网盟账户的用户PC分享的URL规则调整 by chenwp 2015.2.25
                url = 'http://u.ctrip.com/union/CtripRedirect.aspx?TypeID=2&allianceid='+window._USER.allianceid+'&sid='+window._USER.sid+'&ouid=&utm_medium=share&utm_campaign=you&utm_source=tourist&isctrip=&jumpUrl=' + escape(url);
            }
            return url;
        }


        if (GS.ismoblie) { //pad by yi.z

            $(document.body).on('click', function () {
                $bdNode.hide();
            });
            return this.each(function () {
                var $this = $(this),
                    timmer = null;
                $this.on('click', function (e) {
                    setPosition($this);
                    var shareTitle = $this.attr('data-share-title') || opts.title,
                        sharePic = $this.attr('data-share-pic') || opts.pic,
                        shareUrl = $this.attr('data-share-url') || opts.url;
                    shareUrl = checkShareUrl(shareUrl); //增加联盟分享功能
                    var data = '{pic:\'' + sharePic + '\',text:\'' + shareTitle + '\',url:\'' + shareUrl + '\'}';
                    $bdNode.attr("data", data);
                    $bdNode.show();

                    $bdNode.data('obj', $this);
                    $bdNode.data('curOpts', opts);
                    e.stopPropagation();
                });

                return this;
            });
        } else {
            return this.each(function () {
                var $this = $(this),
                    timmer = null;
                $this.hover(function () {
                    setPosition($this);
                    var shareTitle = $this.attr('data-share-title') || opts.title,
                        sharePic = $this.attr('data-share-pic') || opts.pic,
                        shareUrl = $this.attr('data-share-url') || opts.url;
                    shareUrl = checkShareUrl(shareUrl); //增加联盟分享功能
                    var data = '{pic:\'' + sharePic + '\',text:\'' + shareTitle + '\',url:\'' + shareUrl + '\'}';
                    $bdNode.attr("data", data);
                    $bdNode.show();
                }, function () {
                    timmer = setTimeout(hideUl, 50);
                    $bdNode.hover(function () {
                        $bdNode.data('obj', $this);
                        $bdNode.data('curOpts', opts);
                        clearTimeout(timmer);
                    }, function () {
                        $bdNode.hide();
                    });
                });
                return this;
            });
        }
    }

    //----- like --
    $.fn.gslike = function (opts) {
        opts = $.extend({
            type: 'gl',
            api: '/ajax-data.php?act=like'
        }, opts);

        return this.each(function () {
            var that = this;
            var $this = $(this);
            var count = $this.find('span').text();
            var id = $(this).attr('data-id');

            if (isAppend == 0) {
                $('body').append($('<div id="gs_addone_1" class="gs_addone_1">+1</div>'));
                isAppend++;
            }

            var re_data = function () {
                if ($this.hasClass('a_popup_login')) {
                    return false;
                }

                //不要二次点击
                if ($this.hasClass('click_like')) {
                    $this.find('span').text('已喜欢');
                    time = window.setTimeout(function () {
                        $this.find('span').text(count);
                        window.clearTimeout(time);
                    }, 2000);
                    return false;
                }

                var offset = $(this).offset(),
                    top = offset.top,
                    left = offset.left + 40,
                    time = null;
                $.ajax({
                    url: opts.api,
                    type: 'get',
                    dataType: "text",
                    async: false,
                    data: {
                        writing: id,
                        tps: 'h',
                        random: Math.random().toString()
                    },
                    timeout: 50000,
                    error: function (data) {
                        //alert("失败");
                    },
                    success: function (data) {
                        //0 成功 +1
                        //- 已经喜欢过
                        var count = $this.find('span').text();
                        if (data.substr(0, 1) == '-') {
                            $this.find('span').text('已喜欢');
                            time = window.setTimeout(function () {
                                $this.find('span').text(count);
                                window.clearTimeout(time);
                            }, 2000);
                        } else {
                            count++;
                            $('#gs_addone_1').css({
                                'opacity': 1,
                                'top': top,
                                'left': left,
                                'display': 'block'
                            }).animate({
                                top: top - 30,
                                opacity: 0
                            }, 'slow');
                            $this.find('span').text(count);
                        }
                        $this.addClass('click_like');
                    }
                });
                return false;
            }

            $(this).on('click', re_data);

            return this;
        });
    };

    //----- like -- yi.z 2013-07-29
    $.fn.gsbaselike = function (opts) {
        opts = $.extend({
            api: '/ajax-data.php?act=like',
            countArea: 'span',
            requestFn: null, //给后台发送请求的方法  有这个方法时api 参数是无效的
            addoneDiff: {
                top: 0,
                left: 40
            },
            callback: function () {}
        }, opts);

        return this.each(function () {
            var that = this;
            var $this = $(this);

            if (isAppend == 0) {
                $('body').append($('<div id="gs_addone_1" class="gs_addone_1">+1</div>'));
                isAppend++;
            }

            var re_data = function () {
                //已经喜欢过的，就不在处理
                if ($this.hasClass('click_like')) {
                    return;
                }
                if ($this.hasClass('a_popup_login')) {
                    return;
                }
                var offset = $this.offset(),
                    top = offset.top,
                    left = offset.left + opts.addoneDiff.left;
                var $countArea = $this.find(opts.countArea),
                    count = parseInt($countArea.text(), 10);
                count = isNaN(count) ? 0 : count;
                count++;
                $('#gs_addone_1').css({
                    'opacity': 1,
                    'top': top,
                    'left': left,
                    'display': 'block'
                }).animate({
                    top: top - 30,
                    opacity: 0
                }, 'slow');
                $countArea.text(count);
                $this.addClass("click_like");
                $this.attr("title", "已喜欢");
                opts.callback(that);

                //判断requestFn是否为一个方法
                if (typeof opts.requestFn === "function") {
                    opts.requestFn($this);
                } else {
                    var likeId = $this.attr("data-likeId") || "",
                        likeCategory = $this.attr("data-likeCategory") || "";
                    $.post(
                        opts.api, {
                            likeId: likeId,
                            likeCategory: likeCategory
                        },
                        function (data) {}
                    );
                }
                return;
            }

            $(this).on('click', re_data);
            return this;
        });
    };

    $.fn.gsbasecollect = function (opts) {
        opts = $.extend({
            api: '/ajax-data.php?act=like',
            countArea: 'span',
            requestFn: null, //给后台发送请求的方法  有这个方法时api 参数是无效的
            callback: function () {}
        }, opts);

        return this.each(function () {
            var that = this;
            var $this = $(this);
            if (isAppend == 0) {
                $('body').append($('<div id="gs_addone_1" class="gs_addone_1">+1</div>'));
                isAppend++;
            }

            var re_data = function () {
                //已经收藏过的，就不在处理
                if ($this.hasClass('click_collect')) {
                    return;
                }
                if ($this.hasClass('a_popup_login')) {
                    return;
                }
                var offset = $this.offset(),
                    top = offset.top,
                    left = offset.left + 40;
                var $countArea = $this.find(opts.countArea),
                    count = parseInt($countArea.text(), 10);
                count = isNaN(count) ? 0 : count;
                count++;
                $('#gs_addone_1').css({
                    'opacity': 1,
                    'top': top,
                    'left': left,
                    'display': 'block'
                }).animate({
                    top: top - 30,
                    opacity: 0
                }, 'slow');
                $countArea.text(count);
                $this.addClass('click_collect');
                $this.attr("title", "已收藏");

                if (typeof opts.requestFn === "function") {
                    opts.requestFn($this);
                } else {
                    var favouriteId = $this.attr("data-favouriteId") || "";
                    var favouriteCategory = $this.attr("data-favouriteCategory") || "";

                    opts.callback(that);
                    $.post(
                        opts.api, {
                            favouriteId: favouriteId,
                            favouriteCategory: favouriteCategory
                        },
                        function (data) {}
                    );
                }
                return;
            }

            $(this).on('click', re_data);
            return this;
        });
    };
});
