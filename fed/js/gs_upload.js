(function ($) {
    /**
    * 简单上传 使用 SWFUpload 
    * @param 参数
    * @param 正确回调函数
    * @param 出错回调函数
    * @returns this;
    * @see $('#btnUPload').simpleUpload();
    */
    $.fn.simpleUpload = function (opts, callback, errorCallBack) {
        opts = $.extend({
            site: 'http://youresource.c-ctrip.com',
            debug: false,
            custom_settings: {
                progressTarget: "" //进度条id
            },
            button_placeholder_id: $(this).attr('id'),
            //upload_url: "/html/components/upload.php",
            upload_url: 'http://youimgupload.ctrip.com/uploadphotosvc/photoupload.ashx',
            file_size_limit: "5 MB",
            file_types: "*.jpg;*.jpeg;*.bmp;*.gif;*.png",
            file_types_description: "JPG Images",
            file_upload_limit: 0,
            button_image_url: "/img/member/editor/bg-swfuploadimg.png",
            button_width: 74,
            button_height: 24,
            button_cursor: SWFUpload.CURSOR.HAND,
            //button_window_mode: 'transparent', //加了会导致ie下需要点两次.
            button_text: '<span class="button"></span>',
            button_text_style: '.button {font-size: 12;}',
            button_text_top_padding: 1,
            button_text_left_padding: 5,
            flash_url: "http://youimgupload.ctrip.com/uploadphotosvc/images/swfupload_fp9.swf",
            //flash9_url: "/js/app/member/swfupload/swfupload.swf",
            //The event handler functions are defined in handlers.js
            file_queued_handler: function (file) {
                //console.log('--fileQueued--');
                //console.log(file);
            },
            file_queue_error_handler: function (file, errorCode, message) {
                try {
                    var errorName = "";
                    switch (errorCode) {

                        case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                            alert("选择的图片太大，只能上传小于5M的图片");
                            break;
                        case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                            alert("无效的文件类型，只能上传jpg,png,gif格式");
                            break;
                        default:
                            alert(message);
                            break;
                    }
                } catch (ex) {
                    //this.debug(ex);
                    //console.log(ex);
                }
            },
            file_dialog_complete_handler: function (numFilesSelected, numFilesQueued) {
                //console.log('--file_dialog_complete_handler--');
                try {
                    if (numFilesQueued > 0) {
                        this.startUpload();
                    }
                } catch (ex) {
                    this.debug(ex);
                }
            },
            upload_start_handler: function (file) {
                //console.log('--upload_start_handler--');
                //console.log(file);
            },
            upload_progress_handler: function (file, bytesLoaded, bytesTotal) {
                if (this.customSettings.progressTarget) {
                    var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
                    $('#' + this.customSettings.progressTarget).html(percent + '%');
                }
            },
            upload_error_handler: function (file, errorCode, message) {
                if (this.customSettings.progressTarget) {
                    $('#' + this.customSettings.progressTarget).html('');
                }
                //console.log('--upload_error_handler--');
                if (typeof errorCallBack === 'function') {
                    errorCallBack(file, errorCode, message);
                } else {
                    try {
                        alert('errorCode' + errorCode + ':' + message);
                    } catch (ex) {
                        this.debug(ex);
                    }
                }
            },
            upload_success_handler: function (file, serverData) {
                //console.log('--upload_success_handler--');
                //console.log(file);
                //console.log('--serverData--');
                //console.log(serverData);
                if (typeof callback === 'function') {
                    callback(file, serverData);
                }
            },
            upload_complete_handler: function (file) {
                if (this.customSettings.progressTarget) {
                    $('#' + this.customSettings.progressTarget).html('');
                }
            }
        }, opts);
        var d = new Date().getTime();
        opts.button_image_url = opts.site + opts.button_image_url + '?' + d; //改变图片地址
        var swfu = new SWFUpload(opts);
        return this;
    }
})(jQuery);