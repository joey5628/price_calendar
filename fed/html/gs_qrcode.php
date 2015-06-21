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
		$(function() {
			$('#gs_qrcode a.close').on('click', function() {
				$(this).parent().parent().hide();
			});
			$('#gs_qrcode_old a.close').on('click', function() {
				$(this).parent().parent().hide();
			});
		});
	</script>
</div>

<style>
	

</style>

<!-- 微游记右侧广告位 -->
<!-- <div class="content">
	<div class="gs_qrcode" id="gs_qrcode">
		<a href="javascript:;" class="close">×</a>
		<a href="http://you.ctrip.com/travels/youyouctripstar10000/1689937.html" target="_blank" class="one"></a>
		<span>1234567</span>
	</div>
</div> -->

<!-- 经典游记右侧广告位 -->
<div class="content">
	<div class="gs_qrcode_old" id="gs_qrcode_old">
		<a href="javascript:;" class="close">×</a>
		<a href="http://you.ctrip.com/travels/youyouctripstar10000/1689937.html" target="_blank" class="one"></a>
		<span>1234567</span>
	</div>
</div>

<?php $fed->model('common/html/model_foot');//尾部 ?>


    
</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>