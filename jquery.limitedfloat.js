/*
 * Limited Float Box  version 0.2
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
			wrapperID: ''
		};
		$.extend(options, exOptions);

		var _this = this;
		var win = $(window);
		var baseTop = this.offset().top;
		var baseHeight = _this.outerHeight() + parseInt(this.css("marginBottom"), 10);
		var baseLeft = this.offset().left;
		var wrapper = options.wrapperID ? $('#' + options.wrapperID) : null;
		
		if(wrapper.css('position') != 'relative' && wrapper.css('position') != 'absolute'){
			wrapper.css('position', 'relative');
		}

		var wrapperTop  = wrapper.offset().top;
		var wrapperLeft = wrapper.offset().left;
		var wrapperBottom = wrapper.offset().top + wrapper.height();
		var offsetLeft = baseLeft - wrapperLeft;
		var resized = false;

		var follow = function(){
			var currentTop = win.scrollTop();
			var currentPos = _this.css('position');
		
			var position = 'static';
			if(currentTop >= baseTop){
				position = currentTop + baseHeight <= wrapperBottom ? 'fixed': 'absolute';
			}
		
			if(!resized && currentPos == position){
				return;
			}

			if(position == 'fixed'){
				_this.css({
					position: "fixed",
					left: baseLeft,
					top: 0
				});
			}else if(position == 'absolute'){
				_this.css({
					position: "absolute",
					left: baseLeft - wrapperLeft,
					top: wrapperBottom - baseHeight - wrapperTop
				});
			}else{
				_this.css({
					position: "static"
				});
			}
			resized = false;
		};

		var resize = function(){
			resized = true;
			wrapperLeft = wrapper.offset().left;
			baseLeft = wrapperLeft + offsetLeft;
			follow();
		};

		win.on("load",   follow);
		win.on("scroll", follow);
		win.on("resize", resize);
	};
})(jQuery);
