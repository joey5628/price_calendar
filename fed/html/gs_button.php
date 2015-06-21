<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>COMMON项目打包目录</title>
    <?php $fed->css('common/css/head'); ?>
    <?php $fed->css('common/css/global'); ?>
    <?php $fed->css('fed/css/button'); ?>
    <?php $fed->css('fed/css/icon'); ?>
    <?php $fed->css('fed/css/calendar'); ?>
    <?php $fed->css('fed/css/pager'); ?>
    <?php $fed->css('fed/css/suggest'); ?>
    <?php $fed->css('fed/css/tag-nav'); ?>
    <?php $fed->css('fed/css/uispecform'); ?>
    
</head>
<body>
    
    <h1>COMMON项目打包目录</h1>

	<div id="a1">	
		<a href="#" >数据</a>
	</div>

    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('common/js/head'); ?>
    <?php $fed->js('fed/js/gs_button'); ?>

	<script>
		
		$(function(){
		
			$('a').gsdisable();
		
		});
	
	</script>
	

</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>