//Javascript Document	yuhao
/* 
 * 组件 DND ，Slider ，Mscroll
 * DND--拖动函数，元素需提前制定position为relative或者absolute
 * 参数：{
 * layer:node对象，拖动的主体
 * handle:node对象 可选 拖动手柄
 * rang:node对象|一个包含四个坐标的对象 可选 拖动范围
 * mode:V|H限制拖动方向 可选 V为竖 H为横 不传为可以随意拖动
 * className:str 可选 拖动时给layer添加的class 默认为moving
 * onDragStart:function 可选 开始拖动时运行的函数，return false会阻止拖动
 * onMove:function 可选 拖动时运行的函数，return false会阻止拖动 每拖动一像素就会运行一次，请谨慎传入
 * onDragStop:function 可选 停止拖动时运行的函数
 * }
 * 方法：
 * startDrag开始拖动
 * stopDrag停止拖动
 * disable拖动不可用
 * enable拖动可用
 * getRange获取范围
 * 
 * Slider--滑块函数，构建一个可以返回拖动比值的滑块。
 * 参数:{
 * knob:node对象，滑块
 * range:node对象，滑动条
 * mode:同DND的mode
 * values:[0,100] 或者自己传参，参照默认样式
 * onChange:function 滑动时运行的函数
 * }
 * 方法：
 * setValue
 * getValue
 * 
 * yScroll--模拟滚动条函数
 * 参数:wrap:node要添加模拟滚动条的容器
 * 准备情况：wrap需定义position为relative或者absolute
 * 需在wrap里面添加scrollContent>scrollInside并指定相应样式
 * 需制定scrollBar指定样式
 * 方法：
 * scroll 向上或向下滚动指定百分比-100~100
 * disbale 强制禁用滚动条
 * enable 启用滚动条，如果scrollContent高度不够，会启用失败。
 */

(function(window,undefined){
var Jyu={};
function getOffset(o){
	var x=y=0;
	while(o){
		x+=o.offsetLeft;
		y+=o.offsetTop;
		o=o.offsetParent;
		if(o && !Browser.isOpera){
			x+=o.clientLeft;
			y+=o.clientTop;
		}
	}
	return {
		x:x,
		y:y
	};
}
function getRealStyle(o,name) {
	if (window.getComputedStyle) {
		var style=window.getComputedStyle(o,null);
		return style.getPropertyValue(name);
	}else{
		var style=o.currentStyle;
		name=camelize(name);
		if (name=="float") name="styleFloat";
		return style[name];
	}
}
Jyu.init=function(Class,$this,args){
	$this.originalArgs=args;
	for (var i in args) {
		$this[i]=args[i];
	}
	if (Class.defaultArgs) {
		for (i in Class.defaultArgs) {
			if (args[i]===undefined)
				$this[i]=Class.defaultArgs[i].valueOf($this);
		}
	}
};
function camelize(s){
	return s.replace(/-[a-z]/gi,function(c){
		return c.charAt(1).toUpperCase();
	});
}

window.Jyu=Jyu;
})(window);
/*
	滑块函数
*/
(function(){
function Slider(args){
	Jyu.init(Slider,this,args);
	var $this=this;
	this.value=this.values[0];
	this.valueLength=this.values[1]-this.values[0];
	this.modeAttr=this.mode=='H'?{
		raMax:'maxX',
		raMin:'minX',
		css:'left'
	}:{
		raMax:'maxY',
		raMin:'minY',
		css:'top'
	};
	this.DNDinstance=new DND({
		layer:this.knob,
		range:this.range,
		mode:this.mode,
		onMove:function(evt,dnd){
			var value,
				far=parseInt($this.knob.css($this.modeAttr.css)) || 0,
				range=dnd.getRange(),
				rangeLength=range[$this.modeAttr.raMax]-range[$this.modeAttr.raMin],
				percent=far/rangeLength,
				value=parseInt(percent*$this.valueLength)+$this.values[0];
			$this.value=value;
			if($this.onChange) $this.onChange(value,$this,dnd);
		},
		onDragStart:args.onDragStart,
		onDragStop:args.onDragStop
	});
}
Slider.defaultArgs={
	values:[0,100],
	mode:'H'
};
Slider.prototype={
	getValue:function(){
		return this.value
	},
	setValue:function(v){
		var percent=(v-this.values[0])/this.valueLength,
		range=this.DNDinstance.getRange(),
		rangeLength=range[this.modeAttr.raMax]-range[this.modeAttr.raMin],
		pos=percent*rangeLength;
		this.knob.css(this.modeAttr.css,pos);
		this.value=v;
		if(typeof this.onChange=='function') this.onChange(v,this);
	}
};
window.Slider=Slider;
})();
/*
	模拟滚动条函数
	需要自行嵌套div.scrollContent>div.scrollInside
	div.scrollContent要自行指定高度，
	scrollBar也要自行指定高度
*/
(function(){
yScroll.scrollBar=$('<div></div>');
yScroll.scrollBar.html('<div class="scrollUp">'+'</div>'+'<div class="scrollBtn">'+'<div class="scrollBtnTop">'+'</div>'+'<div class="scrollBtnBottom">'+'</div>'+'</div>'+
'<div class="scrollDown">'+'</div>'+'<div class="scrollBar_top">'+'</div>'+'<div class="scrollBar_bottom">'+'</div>');
yScroll.scrollBar.addClass('scrollBar');

function yScroll(opt){
	var _this=this;
	this.wrap=opt.wrap;
	this.hideScrollBar=opt.hideScrollBar;
	if(this.hideScrollBar){
		this.hideScrollBarId=-1;
	}
	this.content=$('.scrollContent',this.wrap);
	this.inside=$('.scrollInside',this.content);
	this.scrollBar=yScroll.scrollBar.clone();
	this.scrollBtn=$('.scrollBtn',this.scrollBar);
	this.scrollUp=$('.scrollUp',this.scrollBar);
	this.scrollDown=$('.scrollDown',this.scrollBar);
	this.wrap.append(this.scrollBar);
	this.inside.css({
		position:'absolute',
		zIndex:2,
		top:0,
		left:0
	});
	this.content.css({
		overflow:'hidden',
		position:'relative',
		zIndex:2,
		height:'100%',
		width:'100%'
	});
	this.slider=new Slider({							//构造Slider滑块，在滑块的onChange事件上绑定内容移动函数。
		knob:this.scrollBtn,
		range:this.scrollBar,
		mode:'V',
		onChange:function(v,slider){
			var content=_this.content[0].clientHeight,
				inside=_this.inside[0].offsetHeight;
			_this.inside.css('top',-1*(inside-content)*v/100);
		},
		onDragStart:function(){
			_this.scrollBar.stop(true,true).css('opacity',1);
		},
		onDragStop:function(){
			_this.scrollBar.stop(true,true).css('opacity',1).animate({fontSize:0},1500).animate({opacity:0},800);
		}
	});
	this.scrollHandle1=function(e){
		e.preventDefault();
		var originalEvent=e.originalEvent;
		if(originalEvent.detail>0) _this.scroll(15);
		else if(originalEvent.detail<0) _this.scroll(-15);
	};
	this.scrollHandle2=function(e){
		e.preventDefault();
		var originalEvent=e.originalEvent;
		if(originalEvent.wheelDelta<0) _this.scroll(15);
		else if(originalEvent.wheelDelta>0) _this.scroll(-15);
	};
	this.scrollUp.click(function(){
		_this.scroll(-15);
	});
	this.scrollDown.click(function(){
		_this.scroll(15);
	});
	this.refresh();
}
yScroll.prototype={
	scroll:function(value){							//滚动指定值，-100~+100，负数为向上滚动，正数为向下滚动
		if(this.functional===false) return;
		if(this.hideScrollBar){
			this.scrollBar.stop(true,true).css('opacity',1).animate({fontSize:0},1500).animate({opacity:0},800);
		}else{
			this.scrollBar.css('opacity',1);
		}
		var oldValue=this.slider.getValue(),
			targetValue=oldValue+value;
		if(targetValue>100) targetValue=100;
		if(targetValue<0) targetValue=0;
		this.slider.setValue(targetValue);
	},
	reset:function(){
		this.scrollBtn.height(this.content[0].clientHeight*this.scrollBar[0].clientHeight/this.inside[0].offsetHeight);
	},
	refresh:function(){
		if(this.content[0].clientHeight<this.inside[0].offsetHeight){
			this.reset();
			this.enable();
		}else{
			this.scroll(-100);
			this.disable();
		}
	},
	enable:function(){
		if(this.functional) return;
		var _this=this;
		this.functional=true;
		this.content.on('DOMMouseScroll',this.scrollHandle1);
		this.content.on('mousewheel',this.scrollHandle2);
		if(this.hideScrollBar){
			this.scrollBar.stop(true,true).css('opacity',1).animate({fontSize:0},1500).animate({opacity:0},800);
		}else{
			this.scrollBar.css('opacity',1);
		}
		this.reset();
	},
	disable:function(){
		if(!this.functional) return;
		this.functional=false;
		this.scrollBar.stop(true,true).css('opacity',0);
		this.content.off('DOMMouseScroll',this.scrollHandle1);
		this.content.off('mousewheel',this.scrollHandle2);
	}
};
window.yScroll=yScroll;
})();