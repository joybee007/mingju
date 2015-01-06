
$(function(){
	var switchFlag=false;
	function setListPosition(){
		if($('.jobs').find('.jobs-0').is(':animated')){
			return false;
		}
		if(switchFlag=!switchFlag){
			$('.main-switch').addClass('main-switch-open');
			$('.jobs-bg-div').fadeIn(800);
			$('.jobs-bg ul li').addClass('active');
			$('.jobs').find('.jobs-0').animate({top:154},300).animate({left:360},300).animate({top:160},300).end()
			.find('.jobs-1').delay(200).animate({top:154},300).animate({left:496},300).animate({top:90},300).end()
			.find('.jobs-2').delay(1000).animate({left:370},300).animate({top:297},300).end()
			.find('.jobs-3').delay(600).animate({top:154},300).animate({left:275},300).animate({top:225},300).end()
			.find('.jobs-4').delay(400).animate({top:154},300).animate({left:290},300).animate({top:42},300);
		}else{
			$('.main-switch').removeClass('main-switch-open');
			$('.jobs-bg-div').fadeOut(800);
			$('.jobs-bg ul li').removeClass('active');
			$('.jobs').find('.jobs-0').animate({top:154},300).animate({left:0},300).animate({top:0},300).end()
			.find('.jobs-1').delay(200).animate({top:154},300).animate({left:0},300).animate({top:77},300).end()
			.find('.jobs-2').delay(1000).animate({left:0},300).animate({top:154},300).end()
			.find('.jobs-3').delay(600).animate({top:154},300).animate({left:0},300).animate({top:231},300).end()
			.find('.jobs-4').delay(400).animate({top:154},300).animate({left:0},300).animate({top:308},300);
		}
	}
	$('.main-switch').click(setListPosition);

	
});

