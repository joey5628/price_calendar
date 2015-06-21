<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ie6时提示层</title>
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
<div class="front">	
	
	<h1>ie6 提示层</h1>
    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('fed/js/gs_fixie6'); ?>
</div>

<?php $fed->model('common/html/model_foot');//尾部 ?>




    
</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>