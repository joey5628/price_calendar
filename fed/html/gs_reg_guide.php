<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
      <title>全站登录注册引导</title>
      <?php $fed->css('common/css/head'); ?>
      <?php $fed->css('common/css/global'); ?>
      <?php $fed->css('fed/css/button'); ?>
      <?php $fed->css('fed/css/suggest'); ?>
      <?php $fed->css('fed/css/gs_front'); ?>
      <?php $fed->css('fed/css/gs_bottom_pop'); ?>
    </head>
  <body>

    <?php $fed->model('common/html/model_head');//头部 ?>
    <div class="front">

      <h1>全站登录注册引导</h1>

      <div class="inputbox">
        <h3>
          <span>
            说明</span>
        </h3>
        <p>
          1.用户未登录状态浏览you.ctrip.com域名页面，页面全部加载完成后10s，弹出该层。用户点击关闭后，cookies记录24小时，24小时内不再弹出该层。
        </p><p>
          2.点击注册/登录，进入携程主站流程页面。注册完成/登录完成后跳转回先前页面。
        </p>
        <p>
          3.点击"社区玩转指南“，新窗口打开http://you.ctrip.com/htmlpages/help.html
        </p>
        <p>4.点击送xx积分xx消费券，当前窗口打开主站注册流程页面
        </p>
      </div>

      <div class="inputbox">
        <h3>
          <span>
            示例</span>
        </h3>
        
        </div>
      <div class="inputbox">
        <h3>
          <span>
            调用方法与参数说明</span>
        </h3>
        <div class="callcode">
          
        </div>

      </div>
    </div>
    <?php $fed->model('common/html/model_foot');//尾部 ?>
    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('common/js/gs_base'); ?>
    <?php $fed->js('fed/js/jquery.cookie'); ?>
    <?php $fed->js('fed/js/gs_bottom_pop'); ?>
	
	<script>
		

		
	</script>
	
	
</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>