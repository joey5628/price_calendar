/**
* placeholer reset for IE
* 需要引用 jqyer  
* @author  yusj@ctrip.com
* @desc 调用方法如下：
* 方法1： $("#inputid").resetPlaceholder();
* 方法2： $("#inputid").resetPlaceholder({ spaceTop: 10, spaceLeft: 30 });
* 方法3： $("#inputid").resetPlaceholder({ delay: 250 });
* option 说明： spaceTop，spaceLeft 设置placeholder标签的位置
* delay 设置需要异步赋值的input,哪日历控件等
*/

$.fn.resetPlaceholder = function (options) {
    var test = 'placeholder' in document.createElement('input');
    if (test) { return this; }
    var option = options || {};
    var $input = $(this);
    var placeholderId = "holderfor" + $input.attr("id");
    var placeholder = $input.attr("placeholder");
    var offset = $input.offset();

    var _top = 10;
    var _left = 5;
    if (option.spaceTop) {
        _top = option.spaceTop;
    }
    if (option.spaceLeft) {
        _left = option.spaceLeft;
    }

    var zindex = '';
    if (option.zindex) {
        zindex = "z-index:" + option.zindex;
    }
    _top += offset.top;
    _left += offset.left;
    $("body").append($('<span style="position:absolute;display:block;color:#999;font-size:14px;top:' + _top + 'px;left:' + _left + 'px;' + zindex +'" id="' + placeholderId + '">' + placeholder + '</span>'));
    var $trickPlaceholder = $("#" + placeholderId);
    $trickPlaceholder.bind("click", function () {
        $(this).hide();
        $input.focus();
    });

    $input.bind("mousedown focus", function () {
        $trickPlaceholder.hide();
    });

    var check = function () {
        if ($input.val() == placeholder || $input.val() == '') {
            $trickPlaceholder.show();
        }
        else {
            $trickPlaceholder.hide();
        }
    };

    //如果有延时检测的情况
    if (option.delay) {
        $("body").bind("click", function () {
            setTimeout(function () {
                check();
            }, option.delay);
            return true;
        });
    };

    $input.bind("blur change", function (e) {
        if (option.delay) {
            setTimeout(function () {
                check();
            }, option.delay);
        }
        else {
            check();
        }

    });
    return this;
};