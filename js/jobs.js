$(function () {
	var switchFlag = false,
		animated = false;

	function setListPosition() {
		if (animated) {
			return false;
		}
		animated = true;
		if (switchFlag = !switchFlag) {
			$('.main-switch').addClass('main-switch-open');
			$('.jobs-bg-div').fadeIn(800);
			$('.jobs-bg ul li').addClass('active');
			$('.jobs').find('.jobs-0').animate({top: 154}, 300).animate({left: 371}, 300).animate({top: 132}, 300).end()
				.find('.jobs-1').delay(200).animate({top: 154}, 300).animate({left: 420}, 300).animate({top: 67}, 300).end()
				.find('.jobs-2').delay(1200).animate({left: 570}, 300).animate({top: 179}, 300, function () {
				animated = false;
			}).end()
				.find('.jobs-3').delay(1000).animate({top: 154}, 300).animate({left: 273}, 300).animate({top: 215}, 300).end()
				.find('.jobs-4').delay(800).animate({top: 154}, 300).animate({left: 268}, 300).animate({top: 278}, 300).end()
				.find('.jobs-5').delay(600).animate({top: 154}, 300).animate({left: 609}, 300).animate({top: 322}, 300).end()
				.find('.jobs-6').delay(400).animate({top: 154}, 300).animate({left: 321}, 300).animate({top: 405}, 300);
		} else {
			$('.main-switch').removeClass('main-switch-open');
			$('.jobs-bg-div').fadeOut(800);
			$('.jobs-bg ul li').removeClass('active');
			$('.jobs').find('.jobs-0').animate({top: 154}, 300).animate({left: 0}, 300).animate({top: 0}, 300).end()
				.find('.jobs-1').delay(200).animate({top: 154}, 300).animate({left: 0}, 300).animate({top: 77}, 300).end()
				.find('.jobs-2').delay(1200).animate({left: 0}, 300).animate({top: 154}, 300, function () {
				animated = false;
			}).end()
				.find('.jobs-3').delay(1000).animate({top: 154}, 300).animate({left: 0}, 300).animate({top: 231}, 300).end()
				.find('.jobs-4').delay(800).animate({top: 154}, 300).animate({left: 0}, 300).animate({top: 308}, 300).end()
				.find('.jobs-5').delay(600).animate({top: 154}, 300).animate({left: 0}, 300).animate({top: 385}, 300).end()
				.find('.jobs-6').delay(400).animate({top: 154}, 300).animate({left: 0}, 300).animate({top: 462}, 300);
		}
	}

	$('.main-switch').click(setListPosition).click();
	$('#main-jobs .jobs li').each(function (i, a) {
		$(a).click(function () {
			$('#partner-list li.pl-li').hide().eq(i).fadeIn(300);
		});
	});
	$('#partner-list .pl-l-close').click(function () {
		$(this).parent().fadeOut(300);
	});
});

