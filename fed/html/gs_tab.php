<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TABS插件</title>
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
    <style>
        .tab-title a{ font-size: 12px; color: #000; padding: 5px 10px; display: block;}
        .tab-title .active{ background: red; color: #fff;}
        .gs-tab-content div{ display: none;}
        .gs-tab-content div.active{ display: block; }
        #a,#a1{ background: #ccc; color: #fff; padding: 10px; margin: 10px 0;}
        #b,#b1{ background: #999; color: #fff; padding: 10px; margin: 10px 0;}
        #c,#c1{ background: #666; color: #fff; padding: 10px; margin: 10px 0;}
    </style>	

</head>
<body>
    
<?php $fed->model('common/html/model_head');//头部 ?>
<div class="front">	
	
	<h1>TAB切换插件</h1>

	<div class="inputbox">	
		<h3><span>说明<span></h3>
		<p>TAB切换</p>
		<p>开发: 陈为平</p>
		<p>版本: v2.0</p>
		<p>日期: 2013.10.30</p>
	</div>

	<div class="inputbox">	
		<h3><span>示例1<span></h3>
		<div class="tab-title" id="demo">
			<ul>
				<li class="active"><a href="#a">tab a</a></li>
				<li><a href="#b">tab b</a></li>
				<li><a href="#c">tab c</a></li>
			</ul>
		</div>
		<div class="gs-tab-content">
			<div id="a" class="active">content a</div>
			<div id="b">content b</div>
			<div id="c">content c</div>
		</div>
	</div>

	<div class="inputbox">	
		<h3><span>示例2<span></h3>    
		<div class="tab-title" id="demo2">
			<a href="#a1" class="active">tab a1</a>
			<a href="#b1">tab b1</a>
			<a href="#c1">tab c1</a>
		</div>
		<div id="one">
			<div id="a1" class="active">content a1</div>
			<div id="b1">content b1</div>
			<div id="c1">content c1</div>
		</div>    
	</div>

	<div class="inputbox">	
		<h3><span>调用请查看源代码<span></h3>
	</div>


	
    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('common/js/head'); ?>	
    <?php $fed->js('common/js/gs_base'); ?>	
    <?php $fed->js('fed/js/gs_placeholder_1'); ?>
    <?php $fed->js('fed/js/gs_tab'); ?>

    <script>
        $(function(){
            
            //简单模式
            $('#demo').gs_tabs(); 
            
            //完整模式
            $('#demo2').gs_tabs({
                 'title':'>a'       //监听 对向的子节点
                ,'active':'active'  //当前选中节点增加class 可以修改
                ,'content':'#one'
                ,'callback':function(d){
                    console.log(d);
                }
            });
            
        });
    </script>

</div>
<?php $fed->model('common/html/model_foot');//尾部 ?>

</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>