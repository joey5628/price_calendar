<?php include('../../config.php');  ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>filterBaiduEdit过滤器</title>

    
</head>
<body>
    
    <h1>filterBaiduEdit过滤器</h1>


	<div id="end"></div>
	
	<script type="text/javascript">
		
		var c = '<a href="/photo/10240/scenery_993474/8939059.html" target="_blank"><img src="http://file20.mafengwo.net/M00/95/F0/wKgB21BHTNv8Umd6ABd8lmWipks85.groupinfo.w600.jpeg" title="敦煌自助游图片" alt="敦煌自助游图片" width="600" height="450" album_id="8939059" border="0" style="display: block;"></a><img src="http://o250.photo.store.qq.com/psb?/V11Ie6bw194z0s/FdMOzHxFBDPKDwQ8*d.FkgQ.Nm1pryQju5ycPANOABY!/b/dCa3DZVwKwAA&amp;bo=IANYAkAGsAQBAKw!" alt="" /><img src="http://i.gtimg.cn/qzone/em/e102.gif" alt="" />';
	
		
		
	
		function filterBaiduEdit(c) {

			c = c.replace(/<script.*?>[\s\S]*?<script>|<link.*?>|<style.*?>[\s\S]*?<\/style>|<iframe.*?>[\s\S]*?<\/iframe>/ig, '');
			c = c.replace(/<pre.*?>|<\/pre>/igm);
			//c = c.replace(/<a[^<]*?>[\n\r]*?(<img .*?>)[\n\r]*?<\/a>/igm, "$1"); //图片链接过滤
			c = c.replace(/<\/(?!p|strong).*?>|<(?!img|p|strong|hr|br|\/).*?>/gi, '');
			c = c.replace(/<(?:img|p|strong|hr|br)[\s\S]*?>/gi, function (a) {

				if (undefined == a) {
					return '';
				}
				var sx = a;
				sx = sx.replace(/\s{1,}/g, ' ');
				sx = sx.replace(/[<'">]/g, ''); //去掉空格与标签
				var sxarry = sx.split(' ');
				var htmlstr = '';
				var htmldom = sxarry[0].toLowerCase();

				switch (htmldom) {
					case 'img':
						var subnode = '';
						for (var i = 1 in sxarry) {
							var str = sxarry[i];
							
							//console.log(str);
							
							if (str.indexOf('=') != -1) {
								var inode = str.split('=');
								if (inode[0] == 'src') {
									var srcarr = [];
									//url中可能包含 = 号
									for(i=1; i< inode.length; i++){
										srcarr.push(inode[i]);
									}
									subnode += " src=\"" + srcarr.join("=") + "\"";
								}
								if (inode[0] == 'phsid') {
									subnode += " phsid=\"" + inode[1] + "\"";
								}
								if (inode[0] == 'cover') {
									subnode += " cover=\"selected\" class=\"cover\"";
								}
								if (inode[0] == 'data-id') {
									subnode += " data-id=\"" + inode[1] + "\"";
								}
								htmlstr = htmldom + subnode + ' /';
							}
						}
						break;
						/*
					case 'a':
						for (var i = 1 in sxarry) {
							var str = sxarry[i];
							if (str.indexOf('=') != -1) {
								var inode = str.split('=');
								if (inode[0] == 'href') {
									htmlstr = htmldom + " target=\"_blank\" href=\"" + inode[1].replace(/javascript:/g, '') + "\"";
								}
							}
						}
						break;
						*/
					default:
						htmlstr = htmldom;
						break;
				}
				if (htmlstr) {
					htmlstr = '<' + htmlstr + '>';
					return htmlstr;
				}
			});
			//console.log(c);
			return c;
		}	
	
	</script>

</body>
</html>
<?php $fed->get_ver(); //生成的版本号默认(v2.0) ?>