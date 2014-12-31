//Javascript Document	yuhao
/* 
 * 本文档为jyu主要工具集，包含常用js方法和三个组件。
 * 常用工具：Jyu.addEvent(node,evt,fn)--添加事件监听函数
 * Jyu.delEvent(node,evt,fn)--删除事件监听函数
 * Jyu.getOffset(node)--获取元素坐标
 * Jyu.getRealStyle(node,styleName)--获取元素样式
 * Jyu.swapNode(a,b)--在文档中交换a,b元素
 * Jyu.delNode(node)--删除元素
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
String.prototype.trim=function(){
	return this.replace(/^\s+/,"").replace(/\s+$/,"");
};
var Browser={
	isIE:!!window.ActiveXObject,
	isOpera:window.opera+""=="[object Opera]"
};
String.prototype.repeat=function(n){
	return newArray(n+1).join(this);
};
Number.prototype.inner=function(a,b){
	var min=Math.min(a,b),max=Math.max(a,b);
	return this==a||this==b||(Math.max(this,min)==this&&Math.min(this,max)==this);
};
function addClass(node,cn){
	var class1=node.className;
	var cns=[];
	cns=class1.split(/\s+/);
	for(var i=0;i<cns.length;i++){
		if(cns[i]==cn) return;
	}
	cns.push(cn);
	node.className=cns.join(" ");
	return node.className;
}
function delClass(node,cn){
	var class1=node.className.trim();
	if(class1==cn){
		node.className="";
		return node.className;
	}
	var cns=[];
	cns=class1.split(/\s+/);
	for(var i=0;i<cns.length;i++){
		if(cns[i]==cn) cns.splice(i,1);
	}
	node.className=cns.join(' ');
	return node.className;
}
function hasClass(node,cn){
	var names=node.className.split(/\s+/);
	for(var i=0;i<names.length;i++){
		if(names[i]==cn) return true;
	}
	return false;
}
function addEvent(obj,evt,fn){ //添加多个事件监听函数
	if(obj.addEventListener && (!Browser.isOpera)){
		obj.addEventListener(evt,fn,false);
		return obj;
	}
	if(!obj.fns) obj.fns={};
	if(!obj.fns[evt]) obj.fns[evt]=[];
	var fns=obj.fns[evt];
	for(var i=0;i<fns.length;i++){
		if(obj.fns[evt][i]===fn) return obj;
	}
	fns.push(fn);
	if(typeof obj["on"+evt]=="function"){
		if(obj["on"+evt]!=handler) fns.push(obj["on"+evt]);
	}
	obj["on"+evt]=handler;	
	return obj;
}
function handler(evt){
	var evt=fixEvt(evt||window.event,this);
	var evtype=evt.type;
	var fns=this.fns[evtype];
	for(var i=0;i<fns.length;i++){
		fns[i].call(this,evt);
	}
}
//删除事件函数，只能删除由addEvent函数加入的函数
function delEvent(obj,evt,fn){
	if(obj.removeEventListener && !Browser.isOpera){
		obj.removeEventListener(evt,fn,false);
		return;
	}
	var fns=obj.fns;
	if(fns!=null){
		fns=fns[evt];
		if(fns!=null){
			for(var i=0;i<fns.length;i++){
				if(fns[i]==fn){
					fns.splice(i,1);
				}
			}
		}
	}
	return obj;
}
function fixEvt(evt,o){			//解决IE与W3C规范evt对象兼容函数。
	if(!evt.target){
		evt.target=evt.srcElement;
		if(evt.type=="mouseover"){
			evt.relatedTarget=evt.fromElement;
		}else if(evt.type=="mouseout"){
			evt.relatedTarget=evt.toElement;
		}
		evt.stopPropagation=function(){
			evt.cancleBubble=true;
		};
		evt.preventDefault=function(){
			evt.returnValue=false;
		};
		evt.pageX=evt.clientX+document.documentElement.scrollLeft;
		evt.pageY=evt.clientY+document.documentElement.scrollTop;
	}
	if(o!=window && o.nodeType){
		var offset=getOffset(o);
		evt.layerX=evt.pageX-offset.x;
		evt.layerY=evt.pageY-offset.y;
	}
	return evt;
}
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
function swapNode(a,b){
	var tmp=document.createTextNode('');
	a.parentNode.replaceChild(tmp,a);
	b.parentNode.replaceChild(a,b);
	tmp.parentNode.replaceChild(b,tmp);
}
function delNode(){
	for(var i=0,node;i<arguments.length;i++){
		node=arguments[i];
		node.parentNode.removeChild(node);
	}
}
Jyu.delNode=delNode;
Jyu.swapNode=swapNode;
Jyu.addEvent=addEvent;
Jyu.delEvent=delEvent;
Jyu.getOffset=getOffset;
Jyu.getRealStyle=getRealStyle;
Jyu.addClass=addClass;
Jyu.delClass=delClass;
Jyu.hasClass=hasClass;
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
				far=parseInt(Jyu.getRealStyle($this.knob,$this.modeAttr.css)) || 0,
				range=dnd.getRange(),
				rangeLength=range[$this.modeAttr.raMax]-range[$this.modeAttr.raMin],
				percent=far/rangeLength,
				value=parseInt(percent*$this.valueLength)+$this.values[0];
			$this.value=value;
			if($this.onChange) $this.onChange(value,$this,dnd);
		}
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
		this.knob.style[this.modeAttr.css]=pos+'px';
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
Mscroll.scrollBar=$('<div></div>');
Mscroll.scrollBar.html('<div class="scrollUp">'+'</div>'+'<div class="scrollBtn">'+'<div class="scrollBtnTop">'+'</div>'+'<div class="scrollBtnBottom">'+'</div>'+'</div>'+
'<div class="scrollDown">'+'</div>'+'<div class="scrollBar_top">'+'</div>'+'<div class="scrollBar_bottom">'+'</div>');
Mscroll.scrollBar.addClass('scrollBar');

function Mscroll(wrap){
	var _this=this;
	this.wrap=wrap;
	this.content=$('scrollContent',wrap);
	this.inside=$('scrollInside',this.content);
	this.scrollBar=Mscroll.scrollBar.clone();
	this.scrollBtn=$('scrollBtn',this.scrollBar);
	this.scrollUp=$('scrollUp',this.scrollBar);
	this.scrollDown=$('scrollDown',this.scrollBar);
	this.wrap.appendChild(this.scrollBar);
	this.inside.style.position='absolute';
	this.slider=new Slider({							//构造Slider滑块，在滑块的onChange事件上绑定内容移动函数。
		knob:this.scrollBtn,
		range:this.scrollBar,
		mode:'V',
		onChange:function(v,slider){
			var content=_this.content.clientHeight,
				inside=_this.inside.offsetHeight;
			_this.inside.style.top=-(inside-content)*v/100+'px';
		}
	});
	this.scrollUp.click(function(){
		_this.scroll(-15);
	});
	this.scrollDown.click(function(){
		_this.scroll(15);
	});
	this.enable();
}
Mscroll.prototype={
	scroll:function(value){							//滚动指定值，-100~+100，负数为向上滚动，正数为向下滚动
		if(this.functional===false) return;
		var oldValue=this.slider.getValue(),
			targetValue=oldValue+value;
		if(targetValue>100) targetValue=100;
		if(targetValue<0) targetValue=0;
		this.slider.setValue(targetValue);
	},
	reset:function(){
		if(this.content.clientHeight<this.inside.offsetHeight){
			this.scrollBtn.style.height=this.content.clientHeight*this.scrollBar.clientHeight/this.inside.offsetHeight+'px';
		}else{
			this.scroll(-100);
			this.disable();
		}
	},
	enable:function(){
		var _this=this;
		this.functional=true;
		this.scrollHandle1=function(e){
			e.preventDefault();
			if(e.detail>0) _this.scroll(15);
			else if(e.detail<0) _this.scroll(-15);
		};
		this.scrollHandle2=function(e){
			e.preventDefault();
			if(e.wheelDelta<0) _this.scroll(15);
			else if(e.wheelDelta>0) _this.scroll(-15);
		};
		this.scrollBar.style.visibility='visible';
		Jyu.addEvent(this.content,'DOMMouseScroll',this.scrollHandle1);
		Jyu.addEvent(this.content,'mousewheel',this.scrollHandle2);
		this.reset();
	},
	disable:function(){
		this.functional=false;
		this.scrollBar.style.visibility='hidden';
		Jyu.delEvent(this.content,'DOMMouseScroll',this.scrollHandle1);
		Jyu.delEvent(this.content,'mousewheel',this.scrollHandle2);
	}
};
window.Mscroll=Mscroll;
})();