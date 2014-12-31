
$(function(){
	$('.nav-left li').hover(function(){
		$(this).toggleClass('hover');
	}).click(function(){
		$('.nav-left li').removeClass('active');
		var index=$(this).addClass('active').index();
		$('.contents .project-content').hide().eq(index).show();
	});
	$('.contents .project-content').eq(0).show();
	$('.nav-left li').eq(0).addClass('active');
});