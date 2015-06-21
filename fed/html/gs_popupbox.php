<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>placeholder效果</title>
	<?php $fed->css('common/css/animate-custom'); ?>
    <?php $fed->css('common/css/head'); ?>
    <?php $fed->css('common/css/global'); ?>
    <?php $fed->css('fed/css/uispecform'); ?>
	<?php $fed->css('fed/css/button'); ?>
	<?php $fed->css('fed/css/gs_front'); ?>
</head>
<body>
<div class="front">	    
    <h1>弹出层测试</h1>


	<div class="inputbox">	
		<h3><span>弹出层测试<span></h3>
        <button class="a_popup_login">弹出层测试_未登录状态</button>
		
	</div>

	<div class="inputbox">
		<button>弹出层测试_登录</button>
	</div>


    <div id="popwindowns1" class="gsn-layer" style="display:none">
        <a href="javascript:$.popupbox.close();" class="close"></a>
        

		<div style="width:500px; height:400px; background:#efefef;">我是内容</div>
        
        <a class="javascript: $.popupbox.close();"></a>        
    </div>


</div>
    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('common/js/lp_pupop_box20110527'); ?>
	<?php $fed->js('common/js/gs_popupbox'); ?>

	<script>

		function __SSO_booking(){
			alert('call booking');
		}

        $(function(){



			$('button').click(function(){

				$.popupbox.show({'id':'popwindowns1'})



			});

        });
    </script>

</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>