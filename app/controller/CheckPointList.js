/**
 * 检查点列表controller
 */
Ext.define('iPass.controller.CheckPointList', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'main',
			checkPointHis : 'checkPointHis',
			scheduleListP : '#scheduleListP',
			hisSummaryPanel : 'checkPointHis > list panel[name=hisSummary]',
			lastReplyPanel : 'checkPointHis > list panel[name=lastReply]',
			fileListPanel : 'checkPointHis > list panel[name=projectFileListPanel]',
			checkPointList : 'checkPointList list',
			checkPointActionSheet : 'checkPointActionSheet',
			checkPointListSeg : 'checkPointList segmentedbutton',
			projectFileList : 'projectFileList',
			projectFileHeader : 'checkPointHis > list listitemheader[name=projectFileHeader]'
		},
		control : {
			checkPointList : {
				itemsingletap : 'oncheckPointListTap'
			},
			checkPointListSeg : {
				toggle : 'oncheckPointSegTap'
			},
			projectFileList : {
				itemsingletap : 'projectFileListTap'
			}
		}
	},
	/**
	 * PM、DM检查
	 * 
	 * @param list
	 * @param index
	 * @param item
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	oncheckPointListTap : function(list, index, item, record, e, eOpts) {
		var className = e.target.className,PMChecked = record.get('PMChecked'),main = this.getMain();
		
		// set Global.checkStoreName
		Global.checkStoreName = 'CheckPointList';
		if(className != 'checkPoint-disable' && className != 'checkPoint-enable'){
			if(className == 'content' && e.target.clientHeight > 25){
				if(!this.checkPointContent){
					this.checkPointContent = Ext.widget('checkPointContent');
				}
				main.push(this.checkPointContent);
				// set Global
				Global.ckPointListSub = 'checkPointContent';
				// set Content record
				this.checkPointContent.down('panel').setRecord(record);
			}else{
				if(e.target.type != 'image'){
					//设置全局变量Global.checkPointCode,Global.checkReplyItems,Global.checkIndex的值，后面提交是数据需要用到
					Global.checkPointCode = record.get('ItemCode');
					Global.checkReplyItems = record.get('ReplyItems');
					Global.replyItemsPMLastCheck = record.get('ReplyItemsPMLastCheck');
					Global.PMChecked = record.get('PMChecked');
					Global.checkIndex = index;
					Global.ckPointListSub = '';
					
					if(Global.localUserRole != 'pm' && Global.localUserRole != 'dm'){
						return;
					}
					if(Global.projectStatus != 'Implementation'){
						if(Global.projectStatus == 'Paused'){			//项目状态:暂停
							iPass.util.PubOperation.showTips('pausedMsg', 'normal');
							
						}else if(Global.projectStatus == 'Completed'){	//项目状态:已结项
							iPass.util.PubOperation.showTips('completedMsg', 'normal');
						}
						return;
					}
					
					if(record.get('ReplyItems') == ''){
						if(Global.localUserRole == 'pm' || (Global.localUserRole == 'dm' && PMChecked == true)){
							iPass.util.PubOperation.getCheckPointSheet(record.get('ItemName'));
						}
					}else{
						checkStatusInpStr.jumpToCheckInp('');
					}
					
					//并且作提示
					if(Global.localUserRole == 'dm' && Global.PMChecked == false){
						iPass.util.PubOperation.showTips('pmIsCheck', 'normal');
					}
				}
			}
		}
	},
	/**
	 * CheckPointHis edit click
	 */
	goToCheckPoinHisEdit : function(){
		if(Global.localUserRole != 'pm' && Global.localUserRole != 'dm'){
			return;
		}
		
		if(Global.checkReplyItems == ''){
			if(Global.localUserRole == 'dm' && Global.PMChecked == false){
				return;
			}
		}
		
		var hisSummaryData = Global.ckPointHisSummaryRecord;
		if(Global.checkReplyItems == ''){
			if(hisSummaryData)
			iPass.util.PubOperation.getCheckPointSheet(hisSummaryData.ItemName);
		}else{
			checkStatusInpStr.jumpToCheckInp('');
		}
	},
	/**
	 * 导航加载检查点列表
	 * @param filType 过滤方式
	 */
	loadCkPointList : function(filType){
		// ajax or set store
		var main = this.getMain(),navBar = main.getNavigationBar(),title = navBar.getTitle(),  
			ckPointlist = this.getCheckPointList(),store = Ext.getStore('CheckPointList');
		var param = {
				ProjectCode :Global.projectCode,
				ItemCode : Global.pointCode,
				TemplateCode : Global.templateCode,
				ItemDsc : Global.itemCodeDsc,
				FilType : filType
			};
		// set Global param
		Global.proPointPm = param;
		navBar.setTitle(Global.loadingTpl.format(title));
		ckPointlist.setStore(store);
		iPass.util.PubOperation.pubListLoad(store, param, true,true,false, 'checkPointList'+param.ProjectCode+param.ItemCode+param.FilType,function(){
			navBar.setTitle(title);
		});
	},
	/**
	 * 根据不同的条件筛选数据
	 * @param container
	 * @param button
	 * @param pressed
	 */
	oncheckPointSegTap : function(container, button, pressed) {
		var name = button.config.name;
		if(pressed){
			this.loadCkPointList(name);
		}
	},
	/**
	 * 跳转到检查历史-公共方法
	 */
	jumpToCkPointHis : function(){
		var me = this,
			main = me.getMain();;
		if (!this.checkPointHis) {
			this.checkPointHis = Ext.widget('checkPointHis');
		}
		me.checkPointHis = this.checkPointHis;
		main.push(me.checkPointHis);
		me.checkPointHis.config.title = Global.historyTitle[Global.language];
	},
	/**
	 * 进入检查点历史页面
	 * @param record
	 * @param index
	 */
	goToCheckPointListHis : function(ItemCode, storeName){
		var me = this,
			main = me.getMain(), navBar = main.getNavigationBar(), editBtn = navBar.down('button[name=pointEditBtn]'), 
			store = Ext.getStore(storeName), record = store.findRecord("ItemCode", ItemCode),index = store.indexOf(record);
		
		iPass.util.PubOperation.cancelBubble();
		
		// 跳转到检查历史
		checkPointListCtr.jumpToCkPointHis();
		
		if(this.getCheckPointActionSheet()){
			this.getCheckPointActionSheet().hide();
		}

		//动态追加 
		if(editBtn){
			editBtn.destroy();
		}
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
		
		if(Global.localUserRole != 'pm' && Global.localUserRole != 'dm'){
			navBar.down('button[name=pointEditBtn]').setDisabled(true);
		}
		if(Global.projectStatus != 'Implementation'){
			navBar.down('button[name=pointEditBtn]').setDisabled(true);
		}
		
		if(Global.checkReplyItems == ''){
			if(Global.localUserRole == 'dm' && record.get('PMChecked') == false){
				navBar.down('button[name=pointEditBtn]').setDisabled(true);
			}
		}
		
		navBar.down('button[name=pointEditBtn]').on({
			tap : this.goToCheckPoinHisEdit,
			scope : this
		});
		
		
		var	store = Ext.getStore('CheckPointHis'),
			param = {
				ProjectCode : Global.projectCode,
				ItemCode : record.get('ItemCode')
			};
		// set Global param
		Global.ckPointHisParam = param;
		Global.ckPointRecord = record;
		
		// set Global
		Global.ckPointListSub = '';
		Global.ckScopeListSub = '';
		Global.ckItemListSub = '';
		
		// ajax or set store
		iPass.util.PubOperation.pubListLoad(store, param, true, false, true, 'checkPointHis',function(success,response){
			me.checkPointHisCallBackFn(success,response,record);
		});
		
		//设置全局变量Global.checkPointCode,Global.checkReplyItems,Global.checkIndex的值，后面提交是数据需要用到
		Global.checkPointCode = record.get('ItemCode');
		Global.checkReplyItems = record.get('ReplyItems');
		Global.replyItemsPMLastCheck = record.get('ReplyItemsPMLastCheck');
		Global.checkIndex = index;
		Global.checkHisStoreName = storeName;
		Global.PMChecked = record.get('PMChecked');
	},
	/**
	 * 加载检查历史（检查附件版本、最后回复、回复历史）
	 * @param success
	 * @param response
	 * @param record
	 */
	checkPointHisCallBackFn : function(success,response,record){
		try{
			var me = this,
				main = me.getMain(), 
				navBar = main.getNavigationBar(),
				list =  me.checkPointHis.down('list'),
				// widget只创建一次可以用down或者getObj获取组件，如果重复创建，则必须用down获取组件
				hisSummaryPanel = me.getHisSummaryPanel(),
				lastReplyPanel = me.getLastReplyPanel(),
				fileListPanel = me.getFileListPanel(),
				ckPointStore = Ext.getStore('CheckPointHis'),
				cnt = ckPointStore.getCount(),
				hisSummaryData={},
				projectFileHeader = hisSummaryPanel.getComponent('projectFileHeader');
			if(success){
				hisSummaryData = {
						ItemStatus : record.get('ItemStatus'),
						ItemName : record.get('ItemName'),
						ScheduledTime : record.get('ScheduledTime'),
						AttachList : record.get('AttachList'),
						AttachListString : record.get('AttachListString')
				};
				
				if(response){
					var itemAttach = response.rows_CMA_PROJECT_CHECK_ITEM_ATTACH;
					console.log(projectFileHeader.element.dom.style.display);
					if(!Ext.isEmpty(itemAttach)) {
						fileListPanel.setData(itemAttach);
//						projectFileHeader.setHidden(false);
						projectFileHeader.element.dom.style.setProperty('display','block');
					}else{
						fileListPanel.setData(null);
//						projectFileHeader.setHidden(true);
						projectFileHeader.element.dom.style.setProperty('display','none');
					}
				}
					// 添加附件版本详情标识
//					if(itemAttach){
//						hisSummaryData.itemAttach = itemAttach;
//						if(hisSummaryPanel){
//							hisSummaryPanel.on({
//					            element: 'element',
//					            delegate: '.projectItemAnnex-Div',
//					            scope : me,
//					            tap: me.onItemAnnexTap,
//					            args : [itemAttach]
//							});
//						}
//					}
//					console.log(typeof itemAttach+"--------"+Ext.isEmpty(itemAttach));
//					var projectListData = Ext.JSON.encode(response.rows_CMA_PROJECT_CHECK_ITEM_ATTACH);
//					console.log(projectListData);
//					console.log(response.rows_CMA_PROJECT_CHECK_ITEM_ATTACH);
//					console.log(Ext.JSON.encode(response.rows_CMA_PROJECT_CHECK_ITEM_ATTACH));
					
				// set Summary data
				hisSummaryPanel.setData(hisSummaryData);
				// set Global.ckPointHisSummaryRecord
				Global.ckPointHisSummaryRecord = hisSummaryData;
				
				// 加载最后回复和回复历史
				if(cnt>1){
					ckPointStore.removeAt(0);
					lastReplyPanel.setData(response.rows[0]);
				}else if(cnt == 1){
					//set history data
					ckPointStore.getAt(0).set('isOnly',true);
					// set lastReply data
					lastReplyPanel.setData(response.rows[0]);
				}else{
					ckPointStore.setData({
						isOnly : true
					});
					lastReplyPanel.setData({
						isOnly : true
					});
				}
				list.refresh();
				

			}
			iPass.util.PubOperation.hideLoadMask();
			navBar.setTitle(Global.historyTitle[Global.language]);
		}catch(e){Ext.Logger.deprecate(e);}
	},
	/**
	 * 进入检查附件版本详情列表
	 * @param itemAttach
	 */
	onItemAnnexTap : function(itemAttach){
		var me = this,
			main = me.getMain(),
			navBar = main.getNavigationBar(),
			editBtn = navBar.down('button[name=pointEditBtn]'), 
			store = Ext.getStore('ProjectFileList');
		if (!me.projectFileList) {
			me.projectFileList = Ext.widget('projectFileList');
		}
		main.push(me.projectFileList);
		if(editBtn){
			editBtn.destroy();
		}
		
		Ext.Function.defer(function(){
			store.setData(itemAttach);
		},500);
	},
	/**
	 * 进入检查附件版本详情
	 * @param list
	 * @param index
	 * @param item
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	projectFileListTap : function(list, index, item, record, e, eOpts){
		var me = this,
			main = me.getMain(),
			navBar = main.getNavigationBar(),
			title,
			store = Ext.getStore('ProjectFileDetail');
		if (!me.projectFileDetail) {
			me.projectFileDetail = Ext.widget('projectFileDetail');
		}
		main.push(me.projectFileDetail);
		title = navBar.getTitle();
		
		Ext.Function.defer(function(){
			var param = {
					ProjectCode :Global.projectCode,
					ItemCode : Global.checkPointCode,
					FilePathGroup : record.get('FilePathGroup')
				};
			navBar.setTitle(Global.loadingTpl.format(title));
			iPass.util.PubOperation.pubListLoad(store, param, true,false,false, 'projectFileDetail',function(){
				navBar.setTitle(title);
			});
		},500);
	},
	jumpToProjectFileList : function(FilePathGroup) {
		var me = this,
			main = me.getMain(),
			navBar = main.getNavigationBar(),
			title,
			store = Ext.getStore('ProjectFileDetail'),
			editBtn = navBar.down('button[name=pointEditBtn]'), 
			pathGroup = FilePathGroup;
		var target = window.event.target;
		var className = target.className;
		if(className !="attImgButton") {
			return;
		}
		
		iPass.util.PubOperation.cancelBubble();	
		if (!me.projectFileDetail) {
			me.projectFileDetail = Ext.widget('projectFileDetail');
		}
		if(editBtn){
			editBtn.destroy();
		}
		
		
		main.push(me.projectFileDetail);
		title = navBar.getTitle();
		
		Ext.Function.defer(function(){
			var param = {
					ProjectCode :Global.projectCode,
					ItemCode : Global.checkPointCode,
					FilePathGroup : pathGroup
				};
			navBar.setTitle(Global.loadingTpl.format(title));
			iPass.util.PubOperation.pubListLoad(store, param, true,false,false, 'projectFileDetail',function(){
				navBar.setTitle(title);
			});
		},500);
		
		
	},
	checkAtt:function(path) {
		var target = window.event.target;
		var className = target.className;
//		alert(className);
		if(className != "attImgButton") {
			checkPointActionSheetCtr.checkDocAtt(path);
		}

	}
//	fileDetailTap : function(list, index, item, record, e, eOpts) {
//		var me = this,
//		path = record.get('FilePath');
//		if(!Ext.isEmpty(path)) {
//			checkPointActionSheetCtr.checkDocAtt(path);
//		}
//	}
});
