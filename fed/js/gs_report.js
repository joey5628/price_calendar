/**
 * 举报组件
 * 需要引用 jqyer , gs_popupbox
 * @author  chenwp@ctrip.com
 */

$(function () {

    var gs_report_close_time = null;
    var gs_report_attr = {};
    var gs_cur_report = {};

    //关闭举报弹出层
    gs_report_close = function () {
        $.popupbox.close();
        $('#gsn_frame_report').remove();
        window.clearTimeout(gs_report_close_time);
    }

    //初始化举报表单
    var gs_report_init = function () {
        var html = [];
        html.push('<div id="gsn_frame_report" class="gsn-layer" style="display:none">');
        html.push('<a href="javascript:gs_report_close();" class="close" data-close="gsn_frame_report"></a>');
        html.push('<div class="gsn-form">');
        html.push('<h3>举报</h3>');
        html.push('<ul>');
        html.push('<li><input type="radio" name="reportType" value="0" id="r_0"><label for="r_0">广告帖和灌水帖</label></li>');
        html.push('<li><input type="radio" name="reportType" value="1" id="r_1"><label for="r_1">谩骂、诽谤和聊天帖</label></li>');
        html.push('<li><input type="radio" name="reportType" value="2" id="r_2"><label for="r_2">违反国家相关法律法规的内容</label></li>');
        html.push('<li><input type="radio" name="reportType" value="3" id="r_3"><label for="r_3">其他问题</label></li></ul>');
        html.push('<div class="gsn-inputbox"><p>具体描述</p><textarea id="content" name="content" class="gsn-textarea"></textarea></div>');
        html.push('<div class="gsn-inputbox"><span class="gsn-tiptext" id="report_err_tips">&nbsp;</span><button id="report_submit" type="submit" class="gsn-btn-2">提交</button></div>');
        html.push('</div></div>');
        $('body').append($(html.join('')));
    }

    //举报节点
    $('body').on('click', '.gsn_btn_report', function () {
        if($(this).text()=='已举报'){
            return ;
        }
        //判断下是否登录
        if (!$(this).hasClass('a_popup_login')) {
            gs_cur_report = $(this); //赋值当前处理的节点
            gs_report_init();
            $.popupbox.show({ id: 'gsn_frame_report' });
            gs_report_attr = $(this).data();
        }
    });

    //举报弹出层按钮
    $('body').on('click', '#gsn_frame_report .gsn-btn-2', function (e) {

        var that = this;
        var v = $(':radio[name="reportType"]:checked').val();
        if (v == undefined) {
            $('#report_err_tips').html('请选择投诉类型！');
        } else {
            var content = $('#content').val();
            if (v === '3' && content.length <= 10) {
                $('#report_err_tips').html('请填写其他问题的具体内容(至少10个字符)');
                $('#content').focus();
            } else {
                $('#report_err_tips').html('&nbsp;');
                $(this).removeClass().addClass('gsn-btn-8').html('<img src="http://youresource.c-ctrip.com/img/load.gif">').prop('disabled', true);
                var url = location.href + (reply ? "#browseMes" : "");
                var reply = $('#reply').length ? $('#reply').val() : 0;
                var index = v;
                var reportType = v;
                var reportId = 0;
                var ct = '';
                var con = '';
                var r = new Date().getTime();

                var postData = {
                    url: url,
                    reportType: v,
                    content: escape(content),
                    reportId: reportId,
                    ct: ct,
                    con: con,
                    r: r
                };

                $.extend(postData, gs_report_attr);

                $.ajax({
                    url: '/AjaxNew/AjaxComplain.ashx',
                    //url: '/components/html/mock.php?act=report',
                    type: 'get',
                    dataType: "text",
                    async: false,
                    data: postData,
                    timeout: 50000,
                    error: function (data) {
                        alert("举报失败");
                        $(that).removeClass().addClass('gsn-btn-2').html('提交').prop('disabled', false);
                    },
                    success: function (data) {
                        if (data == "true") {
                            var s = "<h3>举报已经发送</h3><br><p>我们收到你的投诉信息后会立即进行审核并处理，感谢你对我们的支持！</p><p style=\"color:#999; font-size:12px; margin-top:30px;\">本提示会在 3 秒后自动关闭...</p>";
                            $('#gsn_frame_report .gsn-form').html(s);
                            $('#gsn_frame_report').animate({
                                width: 400,
                                height: 160
                            }, 500);
                            gs_report_close_time = window.setTimeout(function () { gs_report_close(); }, 3000);

                            //显示当前无素为已举报
                            gs_cur_report.html('已举报');
                        } else {
                            alert("举报失败，请检查输入的项是否合法");
                            $(that).removeClass().addClass('gsn-btn-2').html('提交').prop('disabled', false);
                        }
                    }
                });
            }
            return false;
        }
    }); //end gsn_frame_report function

});
