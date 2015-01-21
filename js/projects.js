
$(function(){
	$('.nav-left li').hover(function(){
		$(this).toggleClass('hover');
	}).click(function(){
		if($(this).is('.active')) return;
		$('.nav-left li').removeClass('active');
		var index=$(this).addClass('active').index();
		$('.contents .project-content').hide().eq(index).show();
		myScroll.scroll(-100000);
		myScroll.refresh();
	});
	$('.contents .project-content').eq(0).show();
	$('.nav-left li').eq(0).addClass('active');
	
	var myScroll=new yScroll({
		wrap:$('.contents'),
		hideScrollBar:true
	});
	myScroll.scrollBar.hover(function(){
		$(this).stop(true,true).css('opacity',1);
	},function(){
		$(this).stop(true,true).css('opacity',1).animate({fontSize:0},1500).animate({opacity:0},800);
	});
});