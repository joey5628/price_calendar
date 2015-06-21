<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>nofollow替代方案</title>
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
	
	<h1>nofollow替代方案</h1>

	<div class="inputbox">	
		<h3><span>说明<span></h3>
		<p>使用js方案来处理 nofollow</p>
	</div>

	<div class="inputbox">	
		<h3><span>调用方法与参数说明<span></h3>
		<p><a class="fixhref" href="#" fixhref="http://you.ctrip.com/"></a></p>
		<p><a class="fixhref" href="javascript:;" fixhref="http://you.ctrip.com/"></a></p>
		<p><a class="fixhref" href="http://you.ctrip.com/map/xiamen21.html" fixhref="http://you.ctrip.com/"></a></p>
		<ul>
			<li>opts.url : 选填, 图片链接地址</li>
			<li>opts.img : 选填, 图片地址</li>
            <li>opts.time : 选填, 显示时间</li>
            <li>opts.zindex: 选填, zindex层次</li>
        </ul>		
	</div>


	
    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('common/js/head'); ?>
    <?php $fed->js('common/js/gs_base'); ?>
    <?php $fed->js('common/js/gs_gotop'); ?>
    <?php $fed->js('common/js/gs_nofollow'); ?>


</div>

<?php $fed->model('common/html/model_foot');//尾部 ?>


    
</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>