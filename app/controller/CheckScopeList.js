/**
 * 检查项列表controller
 */
Ext.define('iPass.controller.CheckScopeList', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'main',
			checkScopeList : 'checkScopeList list',
			checkScopeListSeg : 'checkScopeList segmentedbutton'
		},
		control : {
			checkScopeList : {
				itemsingletap : 'onCheckScopeListTap'
			},
			checkScopeListSeg : {
				toggle : 'onCheckScopeListSegTap'
			}
		}
	},
	/**
	 * 进入检查项列表
	 * 
	 * @param list
	 * @param index
	 * @param item
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	onCheckScopeListTap : function(list, index, item, record, e, eOpts) {
		var main = this.getMain(),
			navBar = main.getNavigationBar(),
			itemType = record.get('ItemType'),
			childCount = record.get('ChildCount'),
			PMChecked = record.get('PMChecked'),
			className = e.target.className;
		
		if (itemType == 'point') {
			// set Global.checkStoreName
			Global.checkStoreName = 'CheckScopeList';
			if(className != 'checkPoint-disable' && className != 'checkPoint-enable'){
				if(className == 'content' && e.target.clientHeight > 25){
					if(!this.checkPointContent){
						this.checkPointContent = Ext.widget('checkPointContent');
					}
					main.push(this.checkPointContent);
					// set Global
					Global.ckScopeListSub = 'checkPointContent';
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
						Global.ckScopeListSub = '';
						
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
		} else {
			// 子集个数大于零则进入检查项
			if(childCount > 0 && e.target.type != 'image'){
				if (!this.checkItemsList) {
					this.checkItemsList = Ext.widget('checkItemsList');
				}
				var checkItemsList = this.checkItemsList,ckPointSheet = Ext.getCmp('checkPointActionSheet'),
					itemSegBtn = checkItemsList.down('toolbar > segmentedbutton'),
					checkScopePressedBtn = this.getCheckScopeListSeg().getPressedButtons(),
					pressedBtn = itemSegBtn.getPressedButtons();
				
				checkItemsList.config.title = record.get('ItemName');
				checkItemsList.down('list').refresh();
				main.push(checkItemsList);
				
				// set Global
				Global.ckScopeListSub = '';
				
				// hide CheckPointActionSheet if show
				if(ckPointSheet && !ckPointSheet.isHidden()){
					ckPointSheet.hide();
				}
				
				if(checkScopePressedBtn[0].config.name == pressedBtn[0].config.name){
					navBar.setTitle(Global.loadingTpl.format(record.get('ItemName')));
					
					// ajax or set store
					var ckItemslist = checkItemsList.down('list'), store = Ext.getStore('CheckItemsList');
					var param = {
						ProjectCode : record.get('ProjectCode'),
						ItemCode : record.get('ItemCode'),
						TemplateCode : Global.templateCode,
						ItemDsc : ',',
						// default All
						FilType : checkScopePressedBtn[0].config.name
					};
					// set Global param
					Global.proItemPm = param;
					ckItemslist.setStore(store);
					iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'checkItemsList'+param.ProjectCode+param.ItemCode+param.FilType,function(){
						navBar.setTitle(record.get('ItemName'));
					});
				}else{
					// set filterCondition pressed
					iPass.util.PubOperation.setfilterPressed(itemSegBtn,checkScopePressedBtn[0].config.name);
				}
				
				// set Global
				Global.projectCode = record.get('ProjectCode');
				Global.itemCode = record.get('ItemCode');
			}
		}
	},
	/**
	 * 导航切换加载检查项目混合列表
	 * @param{String} filType 过滤方式
	 */
	loadCkItemList : function(filType){
		// ajax or set store
		var main = this.getMain(),navBar = main.getNavigationBar(),title = navBar.getTitle(),
			ckScopelist = this.getCheckScopeList(),store = Ext.getStore('CheckScopeList');
		var param = {
				ProjectCode :Global.projectCode,
				ItemCode : Global.scopeCode,
				TemplateCode : Global.templateCode,
				ItemDsc : '0,',
				FilType : filType
			};
		// set Global param
		Global.proScopePm = param;
		navBar.setTitle(Global.loadingTpl.format(title));
		ckScopelist.setStore(store);
		iPass.util.PubOperation.pubListLoad(store, param, true, true, false,'checkScopeList'+param.ProjectCode+param.ItemCode+param.FilType, function(){
			navBar.setTitle(title);
		});
	},
	/**
	 * 根据不同的条件筛选数据
	 * 
	 * @param container
	 * @param button
	 * @param pressed
	 */
	onCheckScopeListSegTap : function(container, button, pressed) {
		var name = button.config.name;
		if(pressed){
			this.loadCkItemList(name);
		}
	}
});
