<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>前端 XSS过滤</title>
    <?php $fed->css('common/css/head'); ?>
    <?php $fed->css('common/css/global'); ?>
	<?php $fed->css('fed/css/button'); ?>
	<?php $fed->css('fed/css/poi_pop'); ?>
	<?php $fed->css('fed/css/gs_front'); ?>    
	

	
</head>
<body>

<?php $fed->model('common/html/model_head');//头部 ?>

<div class="front">	    
    <h1>COOKIE记录临时数据</h1>
	<div class="inputbox" >
        <h3>前端 XSS过滤</h3>
		<p>具体请查看源代码</p>
	</div>	
</div>


<?php $fed->js('common/js/jquery-1.7.min'); ?>
<?php $fed->js('common/js/gs_base'); ?>
<script>

console.log(		GS.xssFilter('<img src="#" onerror="alert(1)">') );

		console.log(	GS.xssFilter('<script>alert(1);<\/script>') );


</script>
</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>