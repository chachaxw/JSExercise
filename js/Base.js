// JavaScript Document

//封装常用js
//对象式
// var Base = {
//     getId: function(id) {
//         return document.getElementById(id);
//     },
//     getName: function(name) {
//         return document.getElementsByName(name);
//     },
//     getTagName: function(tag) {
//         return document.getElementsByTagName(tag);	 
//     }
// }

//创建一个Base库对象
function Base(_this) {
	//创建一个数组，保存获取的节点和节点数组
	this.elements = [];
	if(_this != undefined)//_this是一个对象，undefined也是一个对象，区别于typeof返回的带单引号的'undefined'
	{
		this.elements[0] = _this;
	}
}

var $ = function (_this) {
	return new Base(_this);
};

//要实现连缀写法，每个方法都要返回一个Base对象

//获取id节点
Base.prototype.getId = function(id) {
	this.elements.push(document.getElementById(id));
	return this;		 
};

//获取元素节点
Base.prototype.getTagName= function(tag) {
	var tags = document.getElementsByTagName(tag);
		
	for (var i = 0; i < tags.length; i++)
	{
		this.elements.push(tags[i]); 
	}
    return this;
};	 
	
//获取class节点数组
Base.prototype.getClass = function(className, idName) {
	var node = null;
	if(arguments.length === 2)
	{
		node = document.getElementById(idName);	
    }
    else
	{
		node = document;	
    }

	var all = node.getElementsByTagName('*');
	for(var i = 0; i< all.length; i++)
	{
		if(all[i].className === className)
		{
			this.elements.push(all[i]);
		}
	}
	return this;
};

//封装css方法
Base.prototype.css = function(attr, value) {
	for(var i = 0; i < this.elements.length; i++)
	{
		if(arguments.length === 1)
		{
            if(typeof window.getComputedStyle!='undefined')
			{
				//W3C标准
                return window.getComputedStyle(this.elements[i],null)[attr]; 
			} else if(typeof this.elements[i].currentStyle !== 'undefined')
			{
				//IE标准
				return this.elements[i].currentStyle[attr];
			}
			
		}
		this.elements[i].style[attr] = value;	 
	}	
	return this;
};

//封装添加class方法
Base.prototype.addClass = function(className) {
	for(var i = 0; i < this.elements.length; i++)
	{
		if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)')))//正则表达式表示什么都没有或者空字符
		{
			this.elements[i].className += '' + className;
		}
	
	}
	return this;
};

//封装移除class方法
Base.prototype.removeClass = function(className){
	for(var i = 0; i<this.elements.length; i++)
	{
		if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)')))
		{
			this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'));
		}
	
	}
	return this;
};

//添加link或style的css规则
Base.prototype.addRule = function(num, selectorText, cssText, position) {
    var sheet = document.styleSheets[num];

	if(typeof sheet.insertRule !== 'undefined')
	{
		//W3C标准
		sheet.insertRule(selectorText+'{'+cssText+'}',position);
	} else if (typeof sheet.addRule !== 'undefined')
	{
		//IE标准
		sheet.addRule(selectorText, cssText, position);	
	}
	return this;
};

//移除link或style的css规则
Base.prototype.removeRule = function(num, index) {
    var sheet = document.styleSheets[num];

	if(typeof sheet.deleteRule !== 'undefined')
	{
		//W3C标准
		sheet.deleteRule(index);
	} else if (typeof sheet.removeRule)
	{
		//IE标准
		sheet.removeRule(index);	
	}
	return this;
};

//封装html方法
Base.prototype.html = function(str) {
	for(var i = 0; i<this.elements.length; i++)
	{
		if(arguments.length === 0)
		{
			return this.elements[i].innerHTML;	
		}
		this.elements[i].innerHTML = str;
	}
	return this;
};

//封装鼠标移入移出方法
Base.prototype.hover = function(over,out){
	for(var i = 0; i<this.elements.length; i++)
	{
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
	return this;
};

//封装click方法
Base.prototype.click = function(fn){
	for(var i=0; i<this.elements.length; i++)
	{
		this.elements[i].onclick = fn;	
	}	
	return this;
};

//获取视口尺寸的兼容性写法
function getInner(){
    if(typeof window.innerWidth !== 'undefined')
	{
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}	
	}
	else
	{
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}
	}
};

//封装锁屏方法
Base.prototype.lock=function(){
	var innerWidth = window.innerWidth || document.documentElement.clientWidth;
	var innerHeight = window.innerHeight || document.documentElement.clentHeight;
    for(var i = 0; i < this.elements.length; i++)
	{
        this.elements[i].style.width = innerWidth + "px";	
		this.elements[i].style.height = innerHeight + "px";
		this.elements[i].style.display = "block";
		document.documentElement.style.overflow = "hidden";
	}	
	return this;    
};

//封装解锁方法
Base.prototype.unlock = function(){
    for(var i=0; i<this.elements.length; i++)
	{
        this.elements[i].style.display = "none";	
		document.documentElement.style.overflow = "scroll";
	}
	return this;
};

//封装窗口resize事件
Base.prototype.resize = function(fn){
	for(var i=0; i<this.elements.length; i++)
	{
		var element=this.elements[i];
		window.onresize = function() {
			fn();	
			if(element.offsetLeft > getInner().width - element.offsetWidth)
				element.style.left = getInner().width - element.offsetWidth + 'px';
			if(element.offsetTop > getInner().height - element.offsetHeight)
				element.style.top = getInner().height - element.offsetHeight + 'px';
		};
	}
	return this;	
};

//获取事件
function getEvent(e){
	return e || window.event;	
};

//阻止默认行为
function preDefault(e){
	var e = getEvent(e);
	if(typeof e.preventDefault !== 'undefined')
		e.preventDefault();
	else
		e.returnValue = false;	
};

//封装拖拽功能: 1.先点击; 2.在点下的物体被选中，进行move移动; 3.拾起鼠标，停止移动。
Base.prototype.drag = function(){
	for(var i = 0; i< this.elements.length; i++)
	{
		this.elements[i].onmousedown = function(e) {
			preDefault(e);
			var e = getEvent(e);
			var _this = this;
			var diffx = e.clientX - _this.offsetLeft;
			var diffy = e.clientY - _this.offsetTop;
			
			if(typeof _this.setCapture !== 'undefined')
				_this.setCapture();

            document.onmousemove = function(e) {
                var e = getEvent(e);
                var left = e.clientX - diffx;
                var top = e.clientY - diffy;
                
                if(left < 0)
                    left = 0;
                else if(left > getInner().width - _this.offsetWith)
                    left = getInner().width - _this.offsetWidth;
                if(top < 0)
                    top = 0;
                else if(top > getInner().height - _this.offsetHeight)
                    top = getInner().height - _this.offsetHeight;

                _this.style.left = left + 'px';
                _this.style.top = top + 'px';
            }
			
			document.onmouseup = function() {
				this.onmousemove = null;
				this.onmouseup = null;
				if(typeof _this.releaseCapture !== 'undefined')
                    _this.releaseCapture();
			}
		};
	}	
	return this;
};

/***
 * 无法顺序执行的解决办法是为每一个事件分配一个计数器，实现累加，
 * 并清晰的指定给addEvent使用, js一切皆为对象, 
 * 所以addEvent.ID正确，实际上是一个全局变量。
 */

//跨浏览器事件绑定--IE浏览器与W3C的标准的区别：
function addEvent(obj, type, fn){
	if(typeof addEventListener !== 'undefined')
	{
        //第三个参数为true时，表示为捕获阶段；为false时，表示为冒泡阶段。一般使用false,原因是IE浏览器，不支持捕获阶段的事件监听。
		obj.addEventListener(type, fn, false);
	}
	/***else if(typeof obj.attachEvent!='undefined')
	{

		obj.attachEvent('on'+type,function(){
			//对象冒充: fn.call(obj, window.event); 此写法未解决问题：1，无法删除事件；2，无法顺序执行；3，IE的现代事件绑定问题存在内存泄漏问题。
		});
	}	***/

	else {
		//创建一个存放事件的哈希表（散列表）
        if(!obj.events) obj.events = {};

		//第一次执行时执行
		if(!obj.events[type]){
			//创建一个存放事件处理函数的数组
            obj.events[type] = [];

			//把第一次事件处理函数先储存到第一个位置上
			if(obj['on'+type])
				obj.events[type][0] = fn;
		} else {
			if(addEvent.equal(obj.events[type], fn)) return false;
        }

		//从第二个开始我们用事件计数器来存储
		obj.events[type][addEvent.ID++] = fn;
		//执行处理函数
		obj['on' + type] = addEvent.exec;
	}
};

//为每一个事件分配一个计数器
addEvent.ID=1;
//执行处理函数
addEvent.exec = function(event) {
	var e = e || window.event;
	var es = this.events[e.type];
	for(var i in es)
	{
		es[i].call(this,e);
	}
};

//屏蔽注册的同一函数
addEvent.equal = function(es, fn) {
	for(var i in es)
		if(es[i] === fn) return true;
	return false;
};

//把ie常用的event对象配到w3c
addEvent.fixEvent = function(event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropragation = addEvent.fixEvent.stopPropragation;
	return event;
};

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function() {
	this.returnValue = false;
};

//ie取消事件冒泡
addEvent.fixEvent.stopPropragation = function(){
	this.cancelBubble = true;
};

//跨浏览器删除事件
function removeEvent(obj, type, fn) {
	if(typeof removeEventListener!='undefined')
	{
		obj.removeEventListener(type, fn, false);
	}else{
		for(var i in obj.events[type])
		{
			if(obj.events[type][i] === fn)
				delete obj.events[type][i];
		}
	}
};










