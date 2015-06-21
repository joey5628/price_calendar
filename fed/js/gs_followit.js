
/**
* 关注 <---> 取消关注
* 需要引用 jqyer  
* @author  yusj@ctrip.com
* @desc 调用方法如下：
*  $("#关注id").followIt();
* option 说明：
*/

$.fn.followIt = function (options) {
    var defaults = {
        hadFollow: false, //当前状态="已关注" = true,"未关注" = false
        beforeTxt: "关注",
        beforeClass: "gsn-btn-3",
        inprocessingClass: "gsn-btn-22",
        inprocessingTxt: "请稍等",
        afterClass: "gsn-btn-22",
        afterTxt: "取消关注",
        followIt: null,      //有回调，必须被重写，调用成功返回true,或false即可
        cancelFollowIt: null //有回调，必须被重写，调用成功返回true,或false即可
    };

    var setting = $.extend(defaults, options);

    if (!setting.followIt) {
        alert("请设置setting.followIt 作为回调");
    }

    if (!setting.cancelFollowIt) {
        alert("请设置setting.cancelFollowIt 作为回调");
    }

    var $followEelement = $(this);

    var changeStateByClass = function () {
        //已经关注
        if ($followEelement.hasClass(setting.beforeClass)) {
            $followEelement.html(setting.beforeTxt);
            setting.hadFollow = false;
        }
        else if ($followEelement.hasClass(setting.afterClass)) {
            $followEelement.html(setting.afterTxt);
            setting.hadFollow = true;
        }
    };

    //先设置一次当前状态
    changeStateByClass();

    var show_cancelFollowItFrom = function (callback) {
        if ($(".clue_uplayer").length > 0) {
            $(".clue_uplayer").remove();
        };
        var strA = '<div class="clue_uplayer"><div class="close_layerClue"></div><ul><li>确认取消？</li><li><input name="" id="btnNO" type="button" value="否" /><input name="" id="btnYes" type="button" value="是" /></li></ul></div>';
        var confirmBox;

        var ele = $followEelement;
        var offset = ele.offset();
        confirmBox = confirmBox || jQuery(strA);
        confirmBox.css({
            display: 'none',
            left: offset.left + 3 + 'px',
            top: offset.top + 18 + 'px'
        }).appendTo("body").show()
            .find('#btnYes').bind('click', function () {
                callback(true);
                confirmBox.slideUp(function () {
                    confirmBox.remove();
                });
            })
            .parent().find('#btnNO').bind('click', function () {
                confirmBox.slideUp(function () {
                    confirmBox.remove();
                });
                callback(false);
            });
    };


    $followEelement.bind("click", function () {
        if ($followEelement.hasClass('a_popup_login')) {
            return ;
        }
        if ($(this).html == setting.inprocessingTxt) {
            return false;
        }

        if (setting.hadFollow) {

            //弹出是否取消
            show_cancelFollowItFrom(function (isSure) {
                if (isSure) {
                    //设置为...请稍后
                    $followEelement.removeClass(setting.beforeClass).removeClass(setting.afterClass).addClass(setting.inprocessingClass);
                    $followEelement.html(setting.inprocessingTxt);

                    //调用取消是否成功回调
                    setting.cancelFollowIt(function (state) {
                        //取消关注成功
                        if (state) {
                            $followEelement.removeClass(setting.inprocessingClass).addClass(setting.beforeClass);
                            $followEelement.html(setting.beforeTxt);
                            setting.hadFollow = false;
                        }
                        else {
                            //取消关注失败>恢复
                            $followEelement.removeClass(setting.inprocessingClass).addClass(setting.afterClass);
                            $followEelement.html(setting.afterTxt);

                        }
                    }, $followEelement);
                }
                else {
                    changeStateByClass();
                }

            });


        }
        else {

            //设置为...请稍后
            $followEelement.removeClass(setting.beforeClass).removeClass(setting.afterClass).addClass(setting.inprocessingClass);
            $followEelement.html(setting.inprocessingTxt);
            setting.followIt(function (state) {
                //关注成功
                if (state) {
                    $followEelement.removeClass(setting.inprocessingClass).addClass(setting.afterClass);
                    $followEelement.html(setting.afterTxt);
                    setting.hadFollow = true;
                }
                else {
                    //关注失败>恢复
                    $followEelement.removeClass(setting.inprocessingClass).addClass(setting.beforeClass);
                    $followEelement.html(setting.beforeTxt);
                }
            }, $followEelement);
        }
    });




    return this;
};



