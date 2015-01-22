$(function(){
	var arr=['transition','webkitTransition','mozTransition','oTransition','msTransition'],
		transitionSupport=false,
		div=document.createElement('div');
	for(var i=0;i<arr.length;i++){
		transitionSupport=transitionSupport||arr[i] in div.style;
	}

	$('.presentList .presentLi').hover(function(){
		if(transitionSupport){
			$(this).addClass('active');
		}else{
			var that=$(this);
			that.find('.presentDiv').stop(true,true).animate({top:113},300).end()
			.find('.presentDl dd').stop(true,true).animate({opacity:1},300).end()
			.find('.presentMask').stop(true,true).animate({opacity:.6},300);
		}

	},function(){
		if(transitionSupport){
			$(this).removeClass('active');
		}else{
			var that=$(this);
			that.find('.presentDiv').stop(true,true).animate({top:19},300).end()
			.find('.presentDl dd').stop(true,true).animate({opacity:0},300).end()
			.find('.presentMask').stop(true,true).animate({opacity:0},300);
		}
	});
});