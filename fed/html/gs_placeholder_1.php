<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>placeholder效果</title>
    <?php $fed->css('common/css/head'); ?>
    <?php $fed->css('common/css/global'); ?>
	<?php $fed->css('fed/css/gs_front'); ?>
	
	<style>
		
		/*ie10需要指定样式*/

		#d1:-ms-input-placeholder,
		#d2:-ms-input-placeholder{
			color: #aaa;
		}
        
        
    </style>
	
</head>
<body>
<div class="front">	    
    <h1>placeholder效果</h1>

	<div class="inputbox">	
		<h3><span>input<span></h3>
		<input id="d1" placeholder="我是placeholder">
	</div>

	<div class="inputbox">	
		<h3><span>无历史日期<span></h3>
		<textarea id="d2" cols="45" rows="15" placeholder="我是placeholder"></textarea>
	</div>

	</div>
	<?php $fed->js('common/js/jquery-1.7.min'); ?>
	<?php $fed->js('fed/js/gs_placeholder_1'); ?>

	<script>
	$(function(){

		
		
		$('#d1').placeholder();
		$('#d2').placeholder();
			});
	</script>

</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>