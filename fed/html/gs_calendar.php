<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>日期控件</title>
    <?php $fed->css('common/css/head'); ?>
    <?php $fed->css('common/css/global'); ?>
	<?php $fed->css('fed/css/calendar'); ?>
	<?php $fed->css('fed/css/gs_front'); ?>    
</head>
<body>
<div class="front">	    
    <h1>日历控件</h1>

	<div class="inputbox">	
		<h3><span>无历史日期<span></h3>
		<input id="d1"  >
	</div>

	<div class="inputbox">	
		<h3><span>禁用历史日期<span></h3>
		<input id="d2"  >
	</div>

	<div class="inputbox">	
		<h3><span>用回调函数<span></h3>
		<input id="d3"  >
	</div>
	
	<div class="inputbox">	
		<h3><span>用回调函数(按钮调用)<span></h3>
		<input id="d4"  >
		<input type="button" id="d5" value="第二个">
	</div>	
	
	</div>
	<?php $fed->js('common/js/jquery-1.7.min'); ?>
	<?php $fed->js('fed/js/gs_calendar'); ?>

	<script>
	$(function(){
		$('#d1').calendar({foretime:'no'});		$('#d2').calendar();		$('#d3').calendar({callback:function(){			alert('callback');		}});
		
		
		$('#d5').click(function(){
			$('#d4').calendar();
			$('#d4').trigger('click');
		});
		
		
			});
	</script>

</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>