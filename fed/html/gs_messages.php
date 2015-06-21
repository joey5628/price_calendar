<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>消息组件合集</title>
    <?php $fed->css('common/css/head'); ?>
    <?php $fed->css('common/css/global'); ?>
	<?php $fed->css('fed/css/uispecform'); ?>    
	<?php $fed->css('fed/css/gs_front'); ?>
	<style>
		.noderoll{
			position: relative;
			overflow: hidden;
		}
		.noderoll .noderoll-control{
			padding: 3px 5px;
			color: bule;
		}
		.noderoll .cannot-click{
			color: red;	
		}
		.noderoll .noderoll-inner{
			width: 400px;
			height: 205px;
		}
		.noderoll .noderoll-inner .item{
			display: none;
			position: absolute;
			/*transition: left 0.6s ease-in-out 0s;*/
		}
		.noderoll .noderoll-inner .item.active{
			display: block;
		}
	</style>
</head>
<body>
	<div class="front">	    
	    <h1>消息组件合集</h1>

        <div class="inputbox">
            <h3>加经验弹出层</h3>
            <button id="style1">弹出层风格1</button>
            <button id="style2">弹出层风格2</button>            
        </div>
        
        



        <div class="inputbox">	
			<h3><span>内容切换<span></h3>
			<div class="noderoll">
				<a href="javascript:;" class="noderoll-control prev" data-slide="prev">上</a>
				<a href="javascript:;" class="noderoll-control next" data-slide="next">下</a>
				<div class="noderoll-inner">
					<div class="item"><img src="http://dev.c-ctrip.com/getimg.php?400x200x1" alt=""></div>
					<div class="item active"><img src="http://dev.c-ctrip.com/getimg.php?400x200x2" alt=""></div>
					<div class="item"><img src="http://dev.c-ctrip.com/getimg.php?400x200x3" alt=""></div>
					<div class="item"><img src="http://dev.c-ctrip.com/getimg.php?400x200x4" alt=""></div>
				</div>
			</div>
		</div>
        
        
        

        <div class="gs_strategy">
            <a class="close" href="#"></a>
            <div class="img">
                <a href="#">
                    <img width="70" height="96" alt="" src="http://gonglue.c-ctrip.com/district/TaipeiCity/88/cover210300.jpg">
			</a>
            </div>
            <div>
                <h3>
                    <a href="#">厦门</a>
                </h3>
                <p>31213131次下载</p>
                <a class="download" href="#">下载攻略</a>
            </div>
        </div>
        
        
        
        
	</div>
	
	
	
	    <!-- 最新活动 -->        
        <div id="inner-ad-bar" class="gs_activity noderoll" style="width: 270px; margin-bottom: 50px;">
            <h3>
                最新活动
                <div class="gs_activity_tab">
                    <a class="noderoll-control" href="javascript:;" data-slide="prev"></a>
                    <a class="noderoll-control" href="javascript:;" data-slide="next"></a>
                </div>
            </h3>
            <div class="gs_activity_tabbox noderoll-inner">
                <div class="item active">
                    <a target="_blank" href="/special/gotravel.aspx" title="精打细算,景点免费游">
                        <img alt="" src="http://images4.c-ctrip.com/target/tg/619/536/516/d078149932e84dfe9e78a1b07554ad0b.jpg"></a>
                        <p class="line"></p>
                    <a target="_blank" href="http://you.ctrip.com/group/topic/f1200021-641859.html" title="折扣特价">
                        <img alt="" src="http://images4.c-ctrip.com/target/tg/619/536/516/d078149932e84dfe9e78a1b07554ad0b.jpg"></a>
                </div>
                <div class="item">
                    <a target="_blank" href="http://you.ctrip.com/group/topic/f1200021-641859.html" title="折扣特价">
                        <img alt="" src="http://images4.c-ctrip.com/target/tg/619/536/516/d078149932e84dfe9e78a1b07554ad0b.jpg"></a>
                        <p class="line"></p>
                    <a target="_blank" href="http://you.ctrip.com/group/topic/f1200021-641859.html" title="折扣特价">
                        <img  alt="" src="http://images4.c-ctrip.com/target/tg/619/536/516/d078149932e84dfe9e78a1b07554ad0b.jpg"></a>
                </div>
                <div class="item">
                    <a target="_blank" href="http://you.ctrip.com/group/topic/f1200021-641859.html" title="折扣特价">
                        <img alt="" src="http://images4.c-ctrip.com/target/tg/619/536/516/d078149932e84dfe9e78a1b07554ad0b.jpg"></a>
                        <p class="line"></p>
                    <a target="_blank" href="http://you.ctrip.com/group/topic/f1200021-641859.html" title="折扣特价">
                        <img alt="" src="http://images4.c-ctrip.com/target/tg/619/536/516/d078149932e84dfe9e78a1b07554ad0b.jpg"></a>
                </div>
            </div>
        </div>

    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('common/js/gs_gotop'); ?>
    <?php $fed->js('common/js/gs_base'); ?>
    <?php $fed->js('fed/js/gs_messages'); ?>

    <script>
        $(function(){

            //4角定位
            $(".gs_strategy").gscorner({pos: 'rb'});

            //滚动播放
            $('.inputbox').gsnoderoll({interval: 5000});

            //滚动播放动定时
            $('#inner-ad-bar').gsnoderoll({interval: 5000});

            //定时弹出经验提示
            $('#style1').click(function(){
                $.gsmessages.notice({text:'6条系统提醒，<a href="#">查看</a>',color:'y'});
            });

            $('#style2').click(function(){
                $.gsmessages.notice({text:'游记发表功能, +<em>200</em> 经验',color:'b',timeout:3000});
            });


        });

    </script>

</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>