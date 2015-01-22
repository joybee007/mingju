$(function(){
	var marqueeTextList=$('#marquee-text li');
	marqueeTextList.eq(0).show().find('.marquee-text-index-short,.marquee-text-index-long').css('margin-left',0);
	$('#marqueebox').y_marquee({
		nav:'#marqueeNav',
		prev:'.marquee-left',
		next:'.marquee-right',
		onChange:function(i,ci){
			marqueeTextList.eq(ci).find('.marquee-text-index-short').animate({marginLeft:830},'600','easeInBack').end().find('.marquee-text-index-long').delay(200).animate({marginLeft:830},'600','easeInBack',function(){
				marqueeTextList.eq(i).show().find('.marquee-text-index-short').animate({marginLeft:0},'600','easeOutBack').end().find('.marquee-text-index-long').delay(200).animate({marginLeft:0},'600','easeOutBack',function(){
					$('#marqueebox').data('animated',false);
				});
				marqueeTextList.eq(ci).hide();
			});
		}
	});





});