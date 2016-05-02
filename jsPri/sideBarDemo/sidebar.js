// JavaScript Document

(function(){
    var Menubar=function(){
        this.el=document.querySelector('#sidebar ul');
        this.state='allClosed';//hasOpened
        this.el.addEventListener('click',function(e){
            e.stopPropagation();
        });
        var self=this;
        this.currentOpenedMenuContent=null;
        this.menuList=document.querySelectorAll('#sidebar ul > li');
        for(var i= 0,length=this.menuList.length;i<length;i++){
            this.menuList[i].addEventListener('click',function(e){
                var menuContentEl=document.getElementById(e.currentTarget.id+'-content');
                if(self.state==='allClosed'){
                    //console.log('打开'+menuContentEl.id);
                    menuContentEl.style.top='0';
                    menuContentEl.style.left='-85px';
                    menuContentEl.className='nav-content';
                    menuContentEl.classList.add('nc_move_right');
                    self.state='hasOpened';
                    self.currentOpenedMenuContent=menuContentEl;
                }else{
                    //console.log('关闭'+self.currentOpenedMenuContent);
                    //console.log('打开'+menuContentEl.id);
                    self.currentOpenedMenuContent.className='nav-content';
                    self.currentOpenedMenuContent.style.top='0';
                    self.currentOpenedMenuContent.style.left='35px';
                    self.currentOpenedMenuContent.classList.add('nc_move_left');

                    menuContentEl.className='nav-content';
                    menuContentEl.style.top='250px';
                    menuContentEl.style.left='35px';
                    menuContentEl.classList.add('move_up');
                    self.state='hasOpened';
                    self.currentOpenedMenuContent=menuContentEl;
                }
            });
        }
        this.menuContentList=document.querySelectorAll('.nav-content > div.nav-con-close');
        for(i=0,length=this.menuContentList.length;i<length;i++){
            this.menuContentList[i].addEventListener('click',function(e){
                var menuContent= e.currentTarget.parentNode;
                menuContent.className='nav-content';
                menuContent.style.top='0';
                menuContent.style.left='35px';
                menuContent.classList.add('nc_move_left');
                self.state='allClosed';
            });
        }
    };

    Menubar.prototype.close = function() {
        this.currentOpenedMenuContent.className = 'nav-content';
        this.currentOpenedMenuContent.style.top = '0px';
        this.currentOpenedMenuContent.style.left = '35px';
        this.currentOpenedMenuContent.classList.add('nc_move_left');
        this.state = 'allClosed';
    };

    var menuBar = new Menubar();

	var Sidebar=function(eId,closeBarId){
		this.state='opened';
		this.el=document.getElementById(eId||'sidebar');
		this.closeBarEl=document.getElementById(closeBarId||'closeBar');
        var self=this;
        this.menubar=new Menubar();
		this.el.addEventListener('click',function(event){
			if(event.target!==self.el) {
                self.triggerSwitch();
            }
		});
	};
	
	Sidebar.prototype.open=function(){
        //console.log('打开侧栏');
        this.el.style.left='-120px';
        this.el.className='move_right';
        this.closeBarEl.style.left='160px';
        this.closeBarEl.className='closeBar_move_left';
        this.state='opened';
    };
	
	Sidebar.prototype.close=function(){
        //console.log('关闭侧栏');
        menuBar.close();
        this.el.style.left='0';
        this.el.className='move_left';
        this.closeBarEl.style.left='0';
        this.closeBarEl.className='closeBar_move_right';
        this.state='closed';
    };

    Sidebar.prototype.triggerSwitch=function(){
        if(this.state==='opened') {
            this.close();
        }
        else {
            this.open();
        }
    };
    var sideBar=new Sidebar();

})();