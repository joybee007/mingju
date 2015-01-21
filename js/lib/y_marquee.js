(function(){
	$.fn.extend({
		y_marquee:function(options){
			var list=this.children(),
				index=0,
				length=list.length,
				zIndex=4,
				currentIndex=0;
				marqueeId=-1,
				that=this;
			marqueeId=setTimeout(function(){
				show(1);
			},6000);
			function show(i){
				if(that.data('animated')) return;
				that.data('animated',true);
				if(i==index-1||(index==0&&i+1==length)) return;
				clearTimeout(marqueeId);
				list.eq(i).css({zIndex:zIndex}).hide().fadeIn(800);
				if(typeof options.onChange=='function'){
					options.onChange(i,currentIndex);
				}
				currentIndex=i;
				zIndex++;
				if(i+1==length){
					index=0;
				}else{
					index=i+1;
				}
				marqueeId=setTimeout(function(){
					show(index);
				},6000);
			}
			function go(a){
				var i=a+currentIndex;
				while(i<0){
					i+=length;
				}
				i=i%length;
				show(i);
			}
			options.prev&&$(options.prev).on('click',function(){
				go(-1);
			});
			options.next&&$(options.next).on('click',function(){
				go(1);
			});
			list.eq(0).css({zIndex:zIndex}).show();
			return this;
		}
	});

})();