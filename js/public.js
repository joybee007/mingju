$(function(){
	var arr=['transition','webkitTransition','mozTransition','oTransition','msTransition'],
		transitionSupport=false,
		div=document.createElement('div');
	for(var i=0;i<arr.length;i++){
		transitionSupport=transitionSupport||arr[i] in div.style;
	}
	if(!transitionSupport){
		$('#header .nav li a').hover(function(){
			$(this).find('.nav-ch').stop(true,true).fadeOut('fast');
		},function(){
			$(this).find('.nav-ch').stop(true,true).fadeIn('fast');
		});
	}


});
