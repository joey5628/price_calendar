/**
 * @fileOverview 用以全站的临时活动类的js
 * @author yi.z
 * @date 2013-12-24
 */
$(function(){
	/**
	 * 新浪微博抢红包
	 */
	(function(){
		var html = '<em class="icon_red_package"></em>',
			bdPackageCss = {
				"top": "-12px",
				"left": "45px",
				"display": "none"
			};
		
		$(".titleright .link_share")
		.add(".bottombox .link_share")
		.add(".sharebox")
		.add(".ct_btn_share").each(function(){
			var $this = $(this),
				$package = $(html),
				$dbPackage = $(html),
				timmer = null,
				$bdNode = $("#bdshare"),
				top = 0,
				left = $this.width() / 2;
			$this.append($package);
			$bdNode.append($dbPackage);
			
			$bdNode.css({"overflow": "visible"});
			$dbPackage.css(bdPackageCss);
			
			if($this.hasClass("link_share")){
				$this.css({"position": "relative"});
				top = "-28px"
			}else if($this.hasClass("ct_btn_share")){
				$this.css({"position": "relative"});
				top = "-28px"
				left = left + 12;
			}else{
				top = "-28px"
			}
			$package.css({"left": left, "top": top});
			
			$package.hover(function(){
				return false;
			}, function(){
				return false;
			});
			
			$this.hover(function () {
				$package.hide();
				$dbPackage.show();
            }, function () {
                timmer = setTimeout(function(){
					$package.show();
					$dbPackage.hide();
				}, 50);
                $bdNode.hover(function () {
                    clearTimeout(timmer);
                }, function () {
					$package.show();
					$dbPackage.hide();
                });
            });
		});
	}());
	
	
});