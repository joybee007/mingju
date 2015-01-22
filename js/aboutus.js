$(function(){
	var myScroll=new yScroll({
		wrap:$('.scroll'),
		hideScrollBar:true
	});
	myScroll.scrollBar.hover(function(){
		$(this).stop(true,true).css('opacity',1);
	},function(){
		$(this).stop(true,true).css('opacity',1).animate({fontSize:0},1500).animate({opacity:0},800);
	});
});
