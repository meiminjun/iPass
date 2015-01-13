Ext.define('iPass.controller.Main', {
    extend: 'Ext.app.Controller',

    config : {
    	refs : {
    		main : 'main',
    		carouselView : 'carouselView',
    		checkPointList : 'checkPointList list',
    		checkScopeList : 'checkScopeList list',
    		checkItemsList : 'checkItemsList list',
    		inboxView : 'inboxView'
    	},
        control : {}
    },
    /**
     * 获取navigationBar
     * @returns
     */
    getNavigationViewBar : function(){
    	var main = mainCtr.getMain(),navBar = main.getNavigationBar();
    	return navBar;
    },
    /**
     * navigationView back function (back event first)
     * pop > back 
     */
    navigationViewBack : function(obj,eOpts){
    	var main = this.getMain(),
    		navBar = main.getNavigationBar(),
    		activeItem = main.getActiveItem(),
    		editBtn = navBar.down('button[name=pointEditBtn]'),
    		activeItemType = activeItem.xtype,
    		ckPointSheet = Ext.getCmp('checkPointActionSheet'),
    		inboxFilter = Ext.getCmp('inboxFilter'),
    		homeBackBtn = navBar.down('button[name=homeBackBtn]'),
    		inpEditBtn = navBar.down('button[name=ckStatusInpBtn]'), 
    		impCancelBtn = navBar.down('button[name=ckStatusInpCancelBtn]'),
    		filterDownBtn = navBar.down('button[name=downBtn]'),
    		roleBtn = Ext.getCmp('navBarRoleBtn'),
    		filterBtn = Ext.getCmp('inboxBtnFilter');
    	
//    	console.log('activeItemType: ' + activeItemType);
		// 返回至首页
		if(activeItemType == 'projectList'){
			// hidden roleBtn
			if(roleBtn){roleBtn.setHidden(true);}
			// refresh projectList
			proListCtr.getProjectList().refresh();
			// if homeBackBtn undefined
			if(!homeBackBtn){
				navBar.add({
					name : 'homeBackBtn',
					ui : 'normal',
					align : 'left',
					locales : {
						text : 'navigationView.homeBackButtonText'
					}
				});
			}
		}
		// 返回至检查项目/检查混合/检查点/收件箱
		if(activeItemType == 'checkPointList' || activeItemType == 'checkItemsList' || activeItemType == 'checkScopeList' || activeItemType== 'inboxView' || activeItemType == 'changePointList'){
			// 销毁编辑按钮
			if(editBtn){
				editBtn.destroy();
			}
			if(inboxFilter){
				inboxFilter.destroy();
			}
			if(filterDownBtn){
				filterDownBtn.destroy();
			}
			if(inpEditBtn){
				inpEditBtn.destroy();
			}
			if(impCancelBtn){
				impCancelBtn.destroy();
			}
			if(filterBtn){
				filterBtn.setDisabled(false);
			}
			if(activeItemType != 'inboxView'){
				// show roleBtn
				if(roleBtn){roleBtn.setHidden(false);}
			}
			if(activeItemType == 'changePointList') {
				if(roleBtn){roleBtn.doSetHidden(true);}
			}
		}
		
		// hide CheckPointActionSheet if show
		if(ckPointSheet && !ckPointSheet.isHidden()){
			ckPointSheet.hide();
		}
		
//		console.log(activeItemType);
		// 返回至检查历史
		if(activeItemType == 'checkPointHis'){
			if(inpEditBtn){
				inpEditBtn.destroy();
			}
			if(impCancelBtn){
				impCancelBtn.destroy();
			}
			//动态追加 
			if(!editBtn){
				navBar.add({
					xtype : 'button',
					ui : 'dark',
					name : 'pointEditBtn',
					iconMask : true,
					align : 'right',
					locales  : {
		                text : 'checkPointHis.editBtn'
		            }
				});
			}
			
			navBar.down('button[name=pointEditBtn]').on({
				tap : checkPointListCtr.goToCheckPoinHisEdit,
				scope : this
			});
		}
		
		// 检查编辑返回
		if(Global.ckPointHisSub == 'checkEditor'){
			mainCtr.handleCkEditorSheet();
		}
		
		// loadMask hide
		iPass.util.PubOperation.hideLoadMask();
		// back to reload list
		mainCtr.backReLoadList(activeItemType);
    },
    /**
     * back to reload list
     * @param{string} activeItemType
     */
    backReLoadList : function(activeItemType){
//    	console.log('activeItemType: '+activeItemType);
    	var main = this.getMain(),navBar = main.getNavigationBar(),title = navBar.getTitle(),store = null,param = null;
//    	console.log(navBar.getTitle());
    	// 项目列表列表
    	if(activeItemType == 'projectList'){
//    		navBar.setTitle(title + "<img style='width:1.5em;vertical-align: middle;padding-left: 3px;' src='./resources/images/mask/load.gif' />");
    		// refresh from categoryList back
    		if(Global.projectListSub == 'categoryList' || Global.projectListSub == 'settingview' || Global.projectListSub == 'inboxView'){
    			navBar.setTitle(Global.loadingTpl.format('iPass'));
	    		store = Ext.getStore('ProjectList');
	    		param = Global.proListPm;
	    		iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'projectList',function(){
	    			navBar.setTitle('iPass');
	    		});
    		}
    	// 项目附录列表
    	}else if(activeItemType == 'appendixList'){
    		store = Ext.getStore('AppendixList');
    		param = Global.proAppendPm;
    		categoryListCtr.appendListAjax(store,param,title);
    	// 项目阶段列表
    	}else if(activeItemType == 'projectPhaseList'){
    		navBar.setTitle(Global.loadingTpl.format(title));
    		store = Ext.getStore('ProjectPhaseList');
    		param = Global.proPhasePm;
    		iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'projectPhaseList'+param.ProjectCode+param.ItemCode,function(){
    			navBar.setTitle(title);
    		});
    	// 项目检查混合
    	}else if(activeItemType == 'checkScopeList'){
    		var list = this.getCheckScopeList();
    		list.refresh();
    		if(Global.ckScopeListSub != 'checkPointContent' && Global.ckScopeListSub != 'carouselView'){
    			navBar.setTitle(Global.loadingTpl.format(title));
	    		store = Ext.getStore('CheckScopeList');
	    		param = Global.proScopePm;
	    		iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'checkScopeList'+param.ProjectCode+param.ItemCode+param.FilType,function(){
	    			navBar.setTitle(title);
	    		});
    		}
	    // 项目检查点列表
    	}else if(activeItemType == 'checkPointList'){
    		var list = this.getCheckPointList();
    		list.refresh();
    		if(Global.ckPointListSub != 'checkPointContent' && Global.ckPointListSub != 'carouselView'){
    			navBar.setTitle(Global.loadingTpl.format(title));
	    		store = Ext.getStore('CheckPointList');
	    		param = Global.proPointPm;
	    		iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'checkPointList'+param.ProjectCode+param.ItemCode+param.FilType,function(){
	    			navBar.setTitle(title);
	    		});
    		}
	    // 检查项列表
    	}else if(activeItemType == 'checkItemsList'){
    		var list = this.getCheckItemsList();
    		list.refresh();
    		if(Global.ckItemListSub != 'checkPointContent' && Global.ckItemListSub != 'carouselView'){
    			navBar.setTitle(Global.loadingTpl.format(title));
    			store = Ext.getStore('CheckItemsList');
        		param = Global.proItemPm;
        		iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'checkItemsList'+param.ProjectCode+param.ItemCode+param.FilType,function(){
        			navBar.setTitle(title);
        		});
    		}
    	// 收件箱
    	}else if(activeItemType == 'inboxView'){
    		// scroll to Top
    		var list = this.getInboxView().down('list');
    		list.getScrollable().getScroller().scrollToTop();
    		list.refresh();
    		
    		store = Ext.getStore('InboxView');
    		param = Global.inboxPm;
    		iPass.util.PubOperation.pubListLoad(store, param, true, false, true, 'InboxView');
    	}
    },
    /**
     * 检查编辑页面返回并处理actionsheet
     */
    handleCkEditorSheet : function(){
    	var photoActionSheet = Ext.getCmp('photoActionSheet');
    	// hide photoActionSheet if show
		if(photoActionSheet && !photoActionSheet.isHidden()){
			photoActionSheet.hide();
			setTimeout(function(){
				checkPointActionSheetCtr.showDraftActionSheet();
			},500);
		}else{
			checkPointActionSheetCtr.showDraftActionSheet();
		}
    },
    /**
	 * 检查输入项返回
	 */
    checkStatusInpBack : function(){
		var main = this.getMain(), navBar = main.getNavigationBar(), navBarBtn = navBar.down('button[align=left]'), editBtn = navBar.down('button[name=ckStatusInpBtn]'), cancelBtn = navBar.down('button[name=ckStatusInpCancelBtn]');
		
		//动态控制 
		if(editBtn){
			editBtn.destroy();
		}
		if(cancelBtn){
			cancelBtn.destroy();
		}
		
		if(!navBarBtn.isHidden()){
			navBarBtn.setHidden(false);
		}
		
		// reset history sub page
		Global.ckPointHisSub = '';
		
		main.pop();
		
		if(main.getActiveItem().xtype == 'checkPointHis'){
			var editBtn = navBar.down('button[name=pointEditBtn]');
			//动态追加 
			if(!editBtn){
				navBar.add({
					xtype : 'button',
					ui : 'dark',
					name : 'pointEditBtn',
					iconMask : true,
					align : 'right',
					locales  : {
		                text : 'checkPointHis.editBtn'
		            }
				});
			}
			
			navBar.down('button[name=pointEditBtn]').on({
				tap : checkPointListCtr.goToCheckPoinHisEdit,
				scope : this
			});
			
			//如果是从iPass.store.CheckPointHisList页面进入编辑页面就修改数据
			checkPointActionSheetCtr.changeCheckPointHisStore();
		}
	}
});
