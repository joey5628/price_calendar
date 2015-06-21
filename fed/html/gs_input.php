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
	

<h1>统一输入框处理示例</h1>
<div class="inputbox gsn-form">
  <h3>input示例</h3>
  <div class="gsn-inputbox">
   style="ime-mode:disabled"
    <input type="text" placeholder="最多输入5汉字" id="maxLen1" class="gsn-inputext">
    <span id="tips1" class="gsn-tiptext">不超过<span>5</span>个字</span>
  </div>	
</div>

	<div class="inputbox gsn-form">
  <h3>textarea示例</h3>
  <div class="gsn-inputbox">
    <textarea id="maxLen2" wrap="SOFT" placeholder="最多输入50汉字" class="gsn-textarea"></textarea>
    <span id="tips2" class="gsn-tiptext">不超过<span>10</span>个字</span>
  </div>	
</div>

<div class="inputbox">
  <h2>引用与参数，具体可以查看源代码</h2>
  <h4>$('#maxLen1').gsInputLen(function(len){ //你的代码 });</h4>
  
  <ol class="use">
        <li>callback (必填) 回调函数，用于处理上传成功后逻辑</li>
  </ol>
  
  <h4>$.gsSubstring(text,5,1) 截字函数_支持中文与英文混合</h4>
  <ol class="use">
        <li>传入的字符串 (必填)</li>
        <li>截取长度 (必填) 回调函数，用于处理上传成功后逻辑</li>
        <li>是否支持中英文混合 (选填) 1: 开启中英混合排</li>
  </ol>
  
  <h2>引用说明</h2>
  <ul>
    <li>&lt;script charset=&quot;utf-8&quot; type=&quot;text/javascript&quot; src=&quot;/js/lib/jquery-1.7.2.min.js&quot;&gt;&lt;/script&gt;</li>
    <li>&lt;script charset=&quot;utf-8&quot; type=&quot;text/javascript&quot; src=&quot;/js/app/common/gs_input.js&quot;&gt;&lt;/script&gt;</li>
    </ul>
  <h2>bug与未完成</h2>
  <ol>
    <li>-</li>
        <li>-</li>
  </ol>		
</div>
	
    <?php $fed->js('common/js/jquery-1.7.min'); ?>
    <?php $fed->js('common/js/head'); ?>
    <?php $fed->js('common/js/gs_base'); ?>
    <?php $fed->js('fed/js/gs_input'); ?>
	<?php $fed->js('fed/js/gs_placeholder_1'); ?>


</div>

<?php $fed->model('common/html/model_foot');//尾部 ?>

<script type="text/javascript">
  
  $(function(){
    
    
  
    
    
    //字符提示 input
    var oldValue = $('#tips1 span').html(); //最大可输入字符(中文为2字)
    $('#maxLen1').gsInputLen(function(len){
      var lastLen = oldValue - len;
      if (lastLen <= -1 ) {
        var inputName = $('#maxLen1');
        var text = inputName.val();



        var newText = $.gsSubstring(text,5,1); //截字函数



        inputName.val( newText ); 	//多出来的文字删除


				


        //$('#tips1 span').html(lastLen);	
      }else{
        $('#tips1 span').html(lastLen); // 提示文字减少
      }
    });
    
    //字符提示 input
    var oldValue2 = $('#tips2 span').html(); //最大可输入字符(中文为2字)
    $('#maxLen2').gsInputLen(function(len){
      var lastLen = oldValue2 - len;
      if (lastLen <= -1 ) {
        var inputName = $('#maxLen2');
        var text = inputName.val();
        var newText = $.gsSubstring(text,10,1); //截字函数



        inputName.val( newText ); 	//多出来的文字删除
      }else{
        $('#tips2 span').html(lastLen); // 提示文字减少
      }
    });		
    
  });
  
  
  
</script>
    
</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>