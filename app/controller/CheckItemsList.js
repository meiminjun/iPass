/**
 * 检查项列表controller
 */
Ext.define('iPass.controller.CheckItemsList', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'main',
			checkItemsList : 'checkItemsList',
			checkItemsListObj : 'checkItemsList list',
			checkPointActionSheet : 'checkPointActionSheet',
			checkItemsListSeg : 'checkItemsList segmentedbutton',
			checkPointListSeg : 'checkPointList segmentedbutton'
		},
		control : {
			checkItemsListObj : {
				itemsingletap : 'oncheckItemsListTap'
			},
			checkItemsListSeg : {
				toggle : 'oncheckItemsSegTap'
			}
		}
	},
	/**
	 * 进入检查点列表页面
	 * 
	 * @param list
	 * @param index
	 * @param item
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	oncheckItemsListTap : function(list, index, item, record, e, eOpts) {
		var main = this.getMain(),
			navBar = main.getNavigationBar(),
			itemType = record.get('ItemType'),
			childCount = record.get('ChildCount'),
			PMChecked = record.get('PMChecked'),
			className = e.target.className;
		
		if (itemType == 'point') {
			var itemStatus = record.get('ItemStatus');
			// set Global.checkStoreName
			Global.checkStoreName = 'CheckItemsList';
			if(className != 'checkPoint-disable' && className != 'checkPoint-enable'){
				if(className == 'content' && e.target.clientHeight > 25){
					if(!this.checkPointContent){
						this.checkPointContent = Ext.widget('checkPointContent');
					}
					main.push(this.checkPointContent);
					// set Global
					Global.ckItemListSub = 'checkPointContent';
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
						Global.ckItemListSub = '';
						
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
		}else{
			// 子集个数大于零则进入检查项
			if(childCount > 0 && e.target.type != 'image'){
				if (!this.checkPointList) {
					this.checkPointList = Ext.widget('checkPointList');
				}
				var checkPointList = this.checkPointList,ckPointSheet = Ext.getCmp('checkPointActionSheet'),
					checkItemPressedBtn = this.getCheckItemsListSeg().getPressedButtons(),
					pointSegBtn = checkPointList.down('toolbar > segmentedbutton'),
					pressedBtn = pointSegBtn.getPressedButtons();
				
				checkPointList.config.title = record.get('ItemName');
				checkPointList.down('list').refresh();
				main.push(checkPointList);
				// set Global
				Global.ckItemListSub = '';
				
				// hide CheckPointActionSheet if show
				if(ckPointSheet && !ckPointSheet.isHidden()){
					ckPointSheet.hide();
				}
				
				// band navitionview back event
	//			navBar.on({
	//	            back: mainCtr.navigationViewBack,
	//	            scope: this
	//	        });
				
				if(checkItemPressedBtn[0].config.name == pressedBtn[0].config.name){
					navBar.setTitle(Global.loadingTpl.format(record.get('ItemName')));
					
					// ajax or set store
					var ckPointlist = checkPointList.down('list'), store = Ext.getStore('CheckPointList');
					var param = {
						ProjectCode : record.get('ProjectCode'),
						ItemCode : record.get('ItemCode'),
						TemplateCode : Global.templateCode,
						ItemDsc : record.get('ItemCodeDsc'),
						// default All
						FilType : checkItemPressedBtn[0].config.name
					};
					// set Global param
					Global.proPointPm = param;
					ckPointlist.setStore(store);
					iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'checkPointList'+param.ProjectCode+param.ItemCode+param.FilType,function(){
						navBar.setTitle(record.get('ItemName'));
					});
				}else{
					// set filterCondition pressed
					iPass.util.PubOperation.setfilterPressed(pointSegBtn,checkItemPressedBtn[0].config.name);
				}
					
				Global.pointCode = record.get('ItemCode');
				Global.itemCodeDsc = record.get('ItemCodeDsc');
			}
		}
	},
	/**
	 * 加载检查项目列表
	 * @param{String} filType 过滤方式
	 */
	loadCkItemList : function(filType){
		// ajax or set store
		var main = this.getMain(),navBar = main.getNavigationBar(),title = navBar.getTitle(), 
			ckItemlist = this.getCheckItemsListObj(),store = Ext.getStore('CheckItemsList');
		var param = {
				ProjectCode :Global.projectCode,
				ItemCode : Global.itemCode,
				TemplateCode : Global.templateCode,
				ItemDsc : '0,',
				FilType : filType
			};
		// set Global param
		Global.proItemPm = param;
		navBar.setTitle(Global.loadingTpl.format(title));
		ckItemlist.setStore(store);
		iPass.util.PubOperation.pubListLoad(store, param, true,true,false,'checkItemsList'+param.ProjectCode+param.ItemCode+param.FilType,function(){
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
	oncheckItemsSegTap : function(container, button, pressed) {
		var name = button.config.name;
		if(pressed){
			this.loadCkItemList(name);
		}
	}
});
