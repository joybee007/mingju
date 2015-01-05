
$(function(){
	$('.jobs-bg ul li').addClass('active');
	
	function setListPosition(d){
		if($('.jobs').find('.jobs-0').is(':animated')){
			return false;
		}
		if(d){
		/* 	.jobs-0{top:0;left:0}
			.jobs-1{top:77px;}
			.jobs-2{top:154px;}
			.jobs-3{top:231px;}
			.jobs-4{top:308px;}
			$('.jobs').find('.jobs-0').css({
				top:160,
				left:360
			}).end()
			.find('.jobs-1').css({
				top:90,
				left:496
			}).end()
			.find('.jobs-2').css({
				top:297,
				left:370
			}).end()
			.find('.jobs-3').css({
				top:225,
				left:275
			}).end()
			.find('.jobs-4').css({
				top:42,
				left:290
			});
		 */
			$('.jobs').find('.jobs-0').animate({top:154},300).animate({left:360},300).animate({top:160},300).end()
			.find('.jobs-1').delay(200).animate({top:154},300).animate({left:496},300).animate({top:90},300).end()
			.find('.jobs-2').delay(1000).animate({left:370},300).animate({top:297},300).end()
			.find('.jobs-3').delay(600).animate({top:154},300).animate({left:275},300).animate({top:225},300).end()
			.find('.jobs-4').delay(400).animate({top:154},300).animate({left:290},300).animate({top:42},300);
		}else{
			$('.jobs').find('.jobs-0').animate({top:154},300).animate({left:0},300).animate({top:0},300).end()
			.find('.jobs-1').delay(200).animate({top:154},300).animate({left:0},300).animate({top:77},300).end()
			.find('.jobs-2').delay(1000).animate({left:0},300).animate({top:154},300).end()
			.find('.jobs-3').delay(600).animate({top:154},300).animate({left:0},300).animate({top:231},300).end()
			.find('.jobs-4').delay(400).animate({top:154},300).animate({left:0},300).animate({top:308},300);
		}
		return true;
	}
setListPosition(true);
	
	
setTimeout(function(){
	setListPosition(false);
},3000);
	
});

