$(function(){
	var arr=['transition','webkitTransition','mozTransition','oTransition','msTransition'],
		transitionSupport=false,
		div=document.createElement('div');
	for(var i=0;i<arr.length;i++){
		transitionSupport=transitionSupport||arr[i] in div.style;
	}
	//案例展示特效
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
	}).click(function(){
		showPop($(this).index());
	});
	//弹窗图片特效
	var exImgs=[
			{
				name:'办公空间',
				img:7
			},
			{
				name:'会所设计',
				img:6
			},
			{
				name:'酒店设计',
				img:7
			},
			{
				name:'私人定制府邸',
				img:6
			},
			{
				name:'艺术软装',
				img:6
			},
			{
				name:'建筑结构',
				img:[
					{
						name:'钢筋',
						img:3
					},
					{
						name:'浇筑',
						img:3
					},
					{
						name:'布线',
						img:7
					},
					{
						name:'砌筑室外',
						img:2
					},
					{
						name:'室内',
						img:16
					},
					{
						name:'木作',
						img:5
					},
					{
						name:'室外',
						img:18
					}
				]
			}
		],
		imgPath='../images/presents/pop/';

	$('#pop .pop-close').click(function(){
		$('#pop,#mask').hide();
	});
	$.ajax({
		url:'presents-pop.html',
		type:'get',
		dataType:'html',
		success:function(html){
			$.each(exImgs,function(i,a){
				var li=$(html).clone();
				var oLi=$('.presentLi').eq(i);
				li.find('h2').html(oLi.find('.e-title').html()).end()
				.find('h4').html(oLi.find('.ch-title').html()).end()
				.find('.pop-text').html(oLi.find('dd').html());
				if(a.img.length){
					$.each(a.img,function(j,b){
						var ul=li.find('.pop-img ul');
						var imgName=$('<li>'+j+'. '+b.name+'</li>');
						li.find('.pop-img-name').append(imgName);
						for(var k=0;k<b.img;k++){
							ul.append($('<li><img src="'+imgPath+i+'/'+j+'/'+k+'.jpg'+'" alt="" /></li>').data('imgName',imgName));
						}
					});
				}else{
					var ul=li.find('.pop-img ul');
					var imgName=$('<li>'+a.name+'</li>');
					for(var k=0;k<a.img;k++){
						ul.append($('<li><img src="'+imgPath+i+'/'+k+'.jpg'+'" alt="" /></li>').data('imgName',imgName));
					}
					li.find('.pop-img-name').append(imgName);
				}
				li.appendTo('#pop .popList');
			});
			$('img').on('contextmenu dragstart',function(){
				return false;
			});
			$(document).on('copy',function(){return false});
		}
	});
	var animated=false;
	function showPop(i){
		$('#pop .popLi').hide();
		$('#pop,#mask,#pop .popLi:eq('+i+')').show();
		showImg($('#pop .popLi:eq('+i+')').find('.pop-img'),0);
	}
	function showImg(ul,i){
		if(animated) return;
		animated=true;
		var list=ul.find('li'),
			shown=list.filter(':visible');
		while(i<0){
			i+=list.length;
		}
		while(i>=list.length){
			i-=list.length;
		}
		list.hide();
		if(shown.length){
			shown.fadeOut('fast',function(){
				list.eq(i).fadeIn('fast',function(){
					animated=false;
				});
			});
		}else{
			list.eq(i).fadeIn('fast',function(){
				animated=false;
			});
		}
		$('#pop .pop-next,#pop .pop-prev').show();
		if(i==0){
			$('#pop .pop-prev').hide();
		}else if(i==list.length-1){
			$('#pop .pop-next').hide();
		}
		var imgName=list.eq(i).data('imgName');
		ul.closest('.pop-img').next('.pop-img-name').find('li').removeClass('active');
		imgName.addClass('active');
	}
	$('#pop .pop-next').click(function(){
		var ul=$('#pop .popLi:visible .pop-img ul'),
			ci=$('#pop .popLi:visible .pop-img ul li:visible').index();
		showImg(ul,ci+1);
	});
	$('#pop .pop-prev').click(function(){
		var ul=$('#pop .popLi:visible .pop-img ul'),
			ci=$('#pop .popLi:visible .pop-img ul li:visible').index();
		showImg(ul,ci-1);
	});
	$('#pop .btns div').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover mousedown');
	}).on('mousedown',function(){
		$(this).addClass('mousedown');
	}).on('mouseup',function(){
		$(this).removeClass('mousedown');
	});

});
