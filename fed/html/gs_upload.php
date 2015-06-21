<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>上传组件</title>

    <?php $fed->css('common/css/global'); ?>
    <?php $fed->css('common/css/head'); ?>
    <style>    
    #swfUploadcon{}
    #gsuload{background: blue; width: 200px; height: 40px;}
    #show img{ margin: 10px;}
    </style>
</head>
<body>
    
    <h1>上传组件</h1>

    <div id="swfUploadcon"><i id="spanButtonPlaceholder">ajaxupload</i></div>

    
    <div id="show">
        
    </div>


    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('common/js/gs_base'); ?>
    <?php $fed->js('fed/js/swfupload/swfupload'); ?>
    <?php $fed->js('fed/js/swfupload/swfupload.queue'); ?>
    <?php $fed->js('components/js/ajaxupload'); ?>
    <?php $fed->js('components/js/gs_upload'); ?>

    <script>

    
    var upLoadApi = 'http://youimgupload.ctrip.com/uploadphotosvc/photoupload.ashx'; //上传图片
    var swfAddres = 'http://youimgupload.ctrip.com/uploadphotosvc/images/swfupload_fp9.swf';
    var gsupload = new gs_upload(); //需要优先于 uploadset

    //flash上传与ajax上传共用参数
    var uploadset = {
            domain:'ctrip.com', //ajax上传时的作用域_new add
            upload_url: upLoadApi,
            flash_url: swfAddres,
            file_types: "*.jpg;*.png;*.gif",
            file_size_limit: "10MB",
            file_queue_limit: 5,    //setFileQueueLimit 动态设置可上传数
            button_placeholder_id: "swfUploadcon",
            button_image_url: 'http://dev.c-ctrip.com/destination/img/picupload.png',
            button_width: 61,
            button_height: 30,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            debug: false,
            prevent_swf_caching: false,
            preserve_relative_urls: false,
            button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
            button_cursor: SWFUpload.CURSOR.HAND,
            button_disabled: false,
            post_params: {
                "typeID": 13,
                "type": "journals",
                "token": "78A566F2-AA8A-4C4C-8EE8-F99FB3D4A1D8",
                "randomKey": +new Date()
            },
            //文件队列错误处理程序
            file_queue_error_handler: function (file, errorCode, message) {
                console.log(file, errorCode, message);
            },
            //文件排队处理程序
            file_queued_handler: function (file) {
                console.log(file);
            },
            //文件对话框完整的处理程序
            file_dialog_complete_handler: function (numFilesSelected, numFilesQueued) {
                try {
                    this.startUpload();
                    deleteErroeField = true;
                } catch (ex) {
                    this.debug(ex);
                };
                console.log(numFilesSelected, numFilesQueued);
            },
            //上传进度处理程序
            upload_progress_handler: function (file, bytesLoaded, bytesTotal) {
                //var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
                //var $speedText = $(".picuploadbox #" + file.id).find(".speed-text");
                //$speedText.text(percent + "%");
                console.log(file, bytesLoaded, bytesTotal);
            },
            //上传完整的处理程序
            upload_complete_handler: function (file) {
                console.log(file);
            },
            //上传成功处理程序
            upload_success_handler: function (file, server_data) {
                console.log('upload_success_handler');
                var data = gsupload.format_data(server_data);
                if(data.data > 0){
                    $('#show').append($('<img src="'+data.thumbUrl+'" />'))
                }  
            }
        };        
        gsupload.type = 'ajax';
        gsupload.upload(uploadset);

    </script>


</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>
