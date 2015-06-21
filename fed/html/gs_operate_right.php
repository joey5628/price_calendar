<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>运营广告示例</title>
    <?php $fed->css('common/css/head'); ?>
    <?php $fed->css('common/css/global'); ?>
    <?php $fed->css('fed/css/button'); ?>
    <?php $fed->css('fed/css/icon'); ?>
    <?php $fed->css('fed/css/calendar'); ?>
    <?php $fed->css('fed/css/pager'); ?>
    <?php $fed->css('fed/css/suggest'); ?>
    <?php $fed->css('fed/css/tag-nav'); ?>
    <?php $fed->css('fed/css/uispecform'); ?>
    <?php $fed->css('fed/css/gs_front'); ?>
	
</head>
<body>
    
<?php $fed->model('common/html/model_head');//头部 ?>
<div class="front" style="width:980px;">	
	
	<h1>运营广告示例</h1>

	
	
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
		<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
		<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
		<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
		<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	

    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('common/js/head'); ?>
	<?php $fed->js('common/js/gs_base'); ?>
    <?php $fed->js('fed/js/gs_setfixed'); ?>
	<?php $fed->js('fed/js/gs_placeholder_1'); ?>

	<script>
		$(function(){
			
			$('#gs_operate_right_fix a.close').on('click',function(){
				$(this).parent().parent().hide();
			});

		});		
	</script>
</div>

<style>
	

</style>

<!-- 右侧广告位 -->
<div class="content">
	<div class="gs_operate_right_fix" id="gs_operate_right_fix">		
		<div class="cf"><a href="javascript:;" class="close"></a></div>
		<a href="#1" class="one">
			i旅行第5站<span class="color_f">100%有奖</span>
		</a>
		
	</div>
</div>

<?php $fed->model('common/html/model_foot');//尾部 ?>


    
</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>