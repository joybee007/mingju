//DND Document author Yuhao QQ:77975539
//Drag And Drop tool dependence: jQuery
/*
args:{
layer:要拖动的元素,
handle:拖动手柄,
mode:H横向，V纵向，不设置表示任意拖动,
range:限制坐标，也可传入一个元素,
className:拖动时元素的样式,
onDragStart:function开始拖动时调用的函数,
onDragStop:function结束拖动时的调用函数,
onMove:移动时的调用函数	
}
*/
(function(){
function init(Class,$this,args){
	$this.originalArgs=args;
	for(var i in args){
		$this[i]=args[i];
	}
	if(Class.defaultArgs){
		for(i in Class.defaultArgs){
			if(args[i]===undefined)
				$this[i]=Class.defaultArgs[i].valueOf($this);
		}
	}
}
function DND(args){
	init(DND,this,args);
	var $layer=this.$layer=$(this.layer);
	if(this.range.jquery||this.range.nodeType){
		var $range=$(this.range);
		if(this.range.valueOf && this.range.valueOf()==document.documentElement){
			this.range={
				valueOf:function(_this){
					var offset=$range.offset(),
					ml=parseInt($layer.css('margin-left')) || 0,
					mr=parseInt($layer.css('margin-right')) || 0,
					mt=parseInt($layer.css('margin-top')) || 0,
					mb=parseInt($layer.css('margin-bottom')) || 0;
					return {
						minX:offset.left+document.documentElement.scrollLeft+document.body.scrollLeft,
						minY:offset.top+document.documentElement.scrollTop+document.body.scrollTop,
						maxX:offset.left+$range[0].clientWidth-_this.layer.offsetWidth-ml-mr+(document.documentElement.scrollLeft||document.body.scrollLeft),
						maxY:offset.top+$range[0].clientHeight-_this.layer.offsetHeight-mt-mb+(document.documentElement.scrollTop||document.body.scrollTop)
					};
				}
			};
		}else{
			this.range={
				valueOf:function(_this){
					var offset=$range.offset(),
					ml=parseInt(_this.$layer.css('margin-left')) || 0,
					mr=parseInt(_this.$layer.css('margin-right')) || 0,
					mt=parseInt(_this.$layer.css('margin-top')) || 0,
					mb=parseInt(_this.$layer.css('margin-bottom')) || 0;
					return {
						minX:offset.left,
						minY:offset.top,
						maxX:offset.left+$range[0].clientWidth-$layer.outerWidth()-ml-mr,
						maxY:offset.top+$range[0].clientHeight-$layer.outerHeight()-mt-mb
					};
				}
			};
		
		}
	}
	this.enable();
}
DND.defaultArgs={
	handle:{
		valueOf:function(_this){
			return _this.originalArgs.layer;
		}
	},
	range:{
		valueOf:function(){
			return document.documentElement;
		}
	},
	className:'moving'
};
DND.prototype={
	startDrag:function(evt){
		var ret,_this=this;
		if(this.onDragStart) ret=this.onDragStart(evt,this);
		if(ret===false){
			return false;
		}
		evt.preventDefault();
		var layerOffset=this.$layer.offset();
		this.offset={
			x:evt.pageX-layerOffset.left,
			y:evt.pageY-layerOffset.top
		};
		this.$layer.addClass(this.className);
		this.mousemoveHandler=function(evt){
			evt.preventDefault();
			_this.move(evt);
		};
		this.mouseupHandler=function(){
			evt.preventDefault();
			_this.stopDrag();
		};
		$(document).bind('mousemove',this.mousemoveHandler).bind('mouseup',this.mouseupHandler);
		$(window).bind('blur',this.mouseupHandler);
		if(document.selection && document.selection.empty){
			document.selection.empty();
		}else if(window.getSelection){
			window.getSelection().removeAllRanges();
		}
		if(this.layer.setCapture){
			this.layer.setCapture();
		}
		$(this.layer).bind('dragstart',function(evt){
			evt.preventDefault();
		});
	},
	move:function(evt){
		var x=evt.pageX-this.offset.x-parseInt($(this.layer).css('margin-left')),
			y=evt.pageY-this.offset.y-parseInt($(this.layer).css('margin-top'));
		var de=document.documentElement;
		var range=this.range.valueOf(this);
		x=Math.max(x,range.minX);
		x=Math.min(x,range.maxX);
		y=Math.max(y,range.minY);
		y=Math.min(y,range.maxY);
		var ret;
		if(this.onMove) ret=this.onMove(evt,this,{x:x,y:y});
		if(ret===false) return false;
		if(this.layer[0].offsetParent!=de){
			var parentPos=$(this.layer[0].offsetParent).offset();
		}else{
			var parentPos={left:0,top:0};
		}
		if(this.mode!="V"){
			this.layer.css('left',x-parentPos.left);
		}
		if(this.mode!="H"){
			this.layer.css('top',y-parentPos.top);
		}
	},
	stopDrag:function(evt){
		$(document).unbind('mousemove',this.mousemoveHandler).unbind('mouseup',this.mouseupHandler);
		$(window).unbind('blur',this.mouseupHandler);
		if(this.layer[0].releaseCapture){
			this.layer[0].releaseCapture();
		}
		$(this.layer).removeClass(this.className);
		if(this.onDragStop) this.onDragStop(this);
	},
	disable:function(){
		this.stopDrag();
		$(this.handle).unbind('mousedown',this.mousedownHandle);
	},
	enable:function(){
		var _this=this;
		this.mousedownHandle=function(evt){
			_this.startDrag(evt);
		};
		$(this.handle).bind('mousedown',this.mousedownHandle);
	},
	getRange:function(){
		return this.range.valueOf(this);
	}
};
window.DND=DND;
})();
