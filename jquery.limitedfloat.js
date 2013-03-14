/*
 * Limited Float Box  version 0.1
 * (jQuery plugin) 
 * 
 * URL       : https://github.com/STatsu/jquery.limitedfloat
 * Author    : STatsu (http://atticfactory.com/)
 * Copyright : copyright (c) 2013 atticfactory
 * License   : licensed under the MIT licenses.
 */

(function($) {

  $.fn.limitedfloat = function(exOptions){

		var options = {
			stopperID: ''
		};
		$.extend(options, exOptions);

		var _this = this;
		var win = $(window);
		var baseTop = this.offset().top;
		var baseHeight = _this.outerHeight();
		var baseMarginTop = parseInt(this.css("marginTop"), 10);
		var baseMarginBottom = parseInt(this.css("marginBottom"), 10);
		var stopper = options.stopperID ? $('#' + options.stopperID) : null;
		var stopperTop = stopper && stopper.length ? stopper.offset().top : 0;
		var stopperMarginTop = stopper && stopper.length ? parseInt(stopper.css("marginTop"), 10) : 0;

		var follow = function(){
			var marginY = win.scrollTop() - baseTop;
			var boxBottom = _this.offset().top + baseHeight;
			var boxBottomResult = marginY + baseTop + baseHeight + baseMarginBottom + stopperMarginTop;
	
			if(stopperTop && boxBottomResult > stopperTop){
				marginY -= boxBottomResult - stopperTop ;
			}
	
			if(marginY > 0){
				_this.css("marginTop", marginY + baseMarginTop);
			}else if(marginY != baseMarginTop){
				_this.css("marginTop", baseMarginTop);
			}
		}

		win.on("load",   follow);
		win.on("scroll", follow);
		win.on("resize", follow);
	};
})(jQuery);
