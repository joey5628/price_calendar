<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>360合作弹出层</title>
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


    <img src="http://dimg02.c-ctrip.com/images/tg/045/131/548/af0b9408baba460386e807dfefeae5af_R_900_600.jpg" id="img" >
    
    
	<h1>360合作弹出层</h1>

	<div class="inputbox">	
		<h3><span>说明<span></h3>
		<p>360搜索过来时会在页面上弹出一个广告（固定在屏幕最下方)</p>
		<p>开发: 陈为平</p>
		<p>版本: v2.0</p>
		<p>日期: 2013.06.23</p>
	</div>

	<div class="inputbox">	
		<h3><span>示例<span></h3>
		<button id="call1" class="gsn-btn-4">弹出广告</button>
	</div>

	<div class="inputbox">	
		<h3><span>调用方法与参数说明<span></h3>
		<div class="callcode">$('body').gs360({opts});</div>
		<ul>
			<li>opts.url : 选填, 图片链接地址</li>
			<li>opts.img : 选填, 图片地址</li>
            <li>opts.time : 选填, 显示时间</li>
            <li>opts.zindex: 选填, zindex层次</li>
        </ul>		
	</div>

	<div class="inputbox">	
		<h3><span>缺陷与待改进列表<span></h3>
		<ul>
			<li>ie6页面滚动时不会滚下去(ie6不支持 fiexd 属性，生新用js或者css算，性能低，不做支持)</li>
			<li>未打包进入 fed.js</li>
		</ul>
	</div>
	
    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('common/js/head'); ?>
    <?php $fed->js('common/js/gs_base'); ?>
    <?php $fed->js('common/js/gs_gotop'); ?>
    <?php $fed->js('fed/js/gs_360'); ?>
	<?php $fed->js('fed/js/gs_placeholder_1'); ?>

	<script>
        $(function(){
        $('#call1').on('click',function(){
        $('body').gs360();
        });
        



        });
    </script>
</div>

<?php $fed->model('common/html/model_foot');//尾部 ?>


    
</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>