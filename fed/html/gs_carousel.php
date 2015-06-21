<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>消息组件合集</title>
    <?php $fed->css('common/css/head'); ?>
    <?php $fed->css('common/css/global'); ?>
	<?php $fed->css('fed/css/carousel'); ?>
    <style>
        .carousel { width: 1180px; margin-bottom: 20px; }
        .carousel-inner { height: 425px; }
    </style>
</head>
<body>
    <?php $fed->model('common/html/model_head');//头部 ?>

    <!-- deom -->
    <div id="home-carousel" class="carousel slide">
        <ol class="carousel-indicators" style="margin-left: -60px; display: block;">
            <li data-target="#home-carousel" data-slide-to="0" class="active"></li>
            <li data-target="#home-carousel" data-slide-to="1"></li>
            <li data-target="#home-carousel" data-slide-to="2"></li>
            <li data-target="#home-carousel" data-slide-to="3"></li>
            <li data-target="#home-carousel" data-slide-to="4"></li>
            <li data-target="#home-carousel" data-slide-to="5"></li>
        </ol>
        <div class="carousel-inner">
            <div class="item" style="display: block;">
                <a href="#"><img src="http://dev.c-ctrip.com/getimg.php?1180x400x1" /></a>
            </div>
            <div class="item">
                <a href="#"><img src="http://dev.c-ctrip.com/getimg.php?1180x400x2" /></a>
            </div>
            <div class="item">
                <a href="#"><img src="http://dev.c-ctrip.com/getimg.php?1180x400x3" /></a>
            </div>
            <div class="item">
                <a href="#"><img src="http://dev.c-ctrip.com/getimg.php?1180x400x4" /></a>
            </div>
            <div class="item">
                <a href="#"><img src="http://dev.c-ctrip.com/getimg.php?1180x400x5" /></a>
            </div>
            <div class="item active">
                <a href="#"><img src="http://dev.c-ctrip.com/getimg.php?1180x400x6" /></a>
            </div>
        </div>
        <a class="carousel-control left" href="#home-carousel" data-slide="prev">‹</a>
        <a class="carousel-control right" href="#home-carousel" data-slide="next">›</a>
    </div>
    <!-- deom end -->

    <?php $fed->model('common/html/model_foot');//尾部 ?>
    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('fed/js/gs_carousel'); ?>

</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>