<?php include('../../config.php');  ?>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>举报插件</title>
	<?php $fed->css('common/css/head'); ?>
	<?php $fed->css('common/css/animate-custom'); ?>
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
<div class="front">	
	
	<h1>举报</h1>

	<div class="inputbox">	
		<h3><span>说明<span></h3>
		<p>360搜索过来时会在页面上弹出一个广告（固定在屏幕最下方)</p>
		<p>开发: 陈为平</p>
		<p>版本: v2.0</p>
		<p>日期: 2013.06.23</p>
	</div>

	<div class="inputbox">	
		<h3><span>示例<span></h3>
		<button id="call1" class="gsn-btn-4 gsn_btn_report" data-id="1" data-type="1" data-date="2013.06.07 12:10:10">举报1</button>
		<a href="#" class="gsn_btn_report" data-id="2" data-type="2" data-date="2013.01.07">举报2</a>
	</div>
	



	<div class="inputbox">	
		<h3><span>调用方法与参数说明<span></h3>
		<div class="callcode">需要引用的的地址增加class <code>gsn_btn_report</code> </div>

	</div>


</div>
<?php $fed->model('common/html/model_foot');//尾部 ?>
<?php $fed->js('common/js/jquery-1.7.min'); ?>
<?php $fed->js('common/js/gs_popupbox'); ?>
<?php $fed->js('fed/js/gs_placeholder_1'); ?>
<?php $fed->js('fed/js/gs_report'); ?>

<script>
	$(function(){	
		
		$('body').on('click','#call1',function(){
			

			alert(1);
		
		});
	});
<script>

</body>
</html>