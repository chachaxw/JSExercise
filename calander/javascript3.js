// JavaScript Document

window.onload=function()//页面在加载时调用函数
{   
	var arr=
	    [
		   '压岁钱',
		   '回娘家',
		   '不出门',
		   '接财神',
		   '大扫除',
		   '送财神',
		   '同事聚餐',
		   '讨利是',
		   '长长久久',
		   '送灯日',
		   '宴请子婿',
		   '女儿归守',
		];//数组元素
	var oDiv=document.getElementById('tab');
	var oLi=oDiv.getElementsByTagName('li');
	var oTxt=oDiv.getElementsByTagName('div')[0];//数组，表示获取第一个div标签。
	for(var i=0;i<oLi.length;i++)
	{    
	    oLi[i].index=i;
		oLi[i].onmouseover=function()
	    {  
		   
		   for(var i=0;i<oLi.length;i++)
		   {
			   oLi[i].className='';//把class样式清空
		   }
		   this.className='active';
		   oTxt.innerHTML='<h3>'+'初'+(this.index+1)+':'+arr[this.index]+'</h3><p><marquee>'+'春节了，过年习俗必需知道。。。'+'</marquee></p>';//innerHTML表示获取当前标签的起始和结束的内容。
		};	
	}
};