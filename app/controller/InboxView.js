/**
 * 收信箱 controller
 */
Ext.define('iPass.controller.InboxView', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'main',
			inboxView : 'inboxView',
			inboxViewList : 'inboxView list',
			inboxFilter : 'inboxFilter',
			filterBtn : '#inboxBtnFilter',
			datepicker : 'inboxFilter datepickerfield',
			inboxViewList : '#inboxViewList',
			changePointList : 'changePointList',
		},
		control : {
			inboxViewList : {
				itemsingletap : 'inboxViewListTapFun'
			},
			filterBtn : {
				tap : 'filterBtnTapFun'
			},
			datepicker : {
				change : 'datepickerChangeFun',
				clearicontap : 'datepickerTapFun'
			}
		}
	},
	/**
	 * 收信箱列表点击
	 * 
	 * @param obj
	 * @param index
	 * @param target
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	inboxViewListTapFun : function(obj, index, target, record, e, eOpts) {
		var store = Ext.getStore('CheckPointList'),
			messageType = record.get('MessageType'),
			projectCode = record.get('ProjectCode'),
			templateCode = record.get('TemplateCode'),
			rowsObj = record.get('rows'),
			itemValueEx = '',
			main = this.getMain(),
			navBar = main.getNavigationBar(),
			editBtn = navBar.down('button[name=pointEditBtn]'),
			roleBtn = Ext.getCmp('navBarRoleBtn'),
			record = null,
			index = 0,
			url = Global.domain + '/api/GetCheckItem.ashx';
		
		// 邮件状态不通过，进入检查点历史
		if(messageType == '不通过' || messageType == 'Not OK'){
			// 遍历不通过邮件项
			Ext.Array.each(rowsObj,function(rows){
				// 获取检查点的ItemValueEx
				if(rows.ItemKey == '检查点' || rows.ItemKey == 'CheckPoint'){
					itemValueEx = rows.ItemValueEx;
				}
			});
			
			// 进入检查点历史
			checkPointListCtr.jumpToCkPointHis();

			
			
			// hidden roleBtn
			if(roleBtn){roleBtn.setHidden(true);}
			
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
			
//			console.log('projectCode: '+ projectCode);
//			console.log('itemValueEx: '+ itemValueEx);
			// 请求参数
			var params = {
				ADAccount : Global.userAccount,
				ProjectCode : projectCode,
				ItemCode : itemValueEx
			};
			var resultFun = function(responseText) {
	           if(Ext.isEmpty(responseText)){
	                store.setData(null);
	           }else{
	        	   var resJson = Ext.JSON.decode(responseText);
	        	   if(resJson.result){
	        		    // 获取当前用户角色信息，并存储到全局变量中
						Global.localUserRole = resJson.LocalUserRole;
						Global.projectStatus = resJson.ProjectStatus;
						if(Global.localUserRole != 'pm' && Global.localUserRole != 'dm'){
							navBar.down('button[name=pointEditBtn]').setDisabled(true);
						}
						if(Global.projectStatus != 'Implementation'){
							navBar.down('button[name=pointEditBtn]').setDisabled(true);
						}
						if(Global.localUserRole == 'dm' && resJson.CheckItem.PMChecked == false){
							navBar.down('button[name=pointEditBtn]').setDisabled(true);
						}
						navBar.down('button[name=pointEditBtn]').on({
							tap : checkPointListCtr.goToCheckPoinHisEdit,
							scope : this
						});
						// 设置检查点store record
						store.setData(resJson.CheckItem);
						record = store.findRecord("ItemCode", itemValueEx),
						index = store.indexOf(record);
						iPass.util.PubOperation.cancelBubble();
						
						var me = checkPointListCtr,
							ckHistoryStore = Ext.getStore('CheckPointHis'),
							ckHistoryParam = {
								ProjectCode : projectCode,
								ItemCode : itemValueEx
							};
						
						// set Global param
						Global.ckPointHisParam = ckHistoryParam;
						Global.ckPointRecord = record;
						
						// ajax or set store
						iPass.util.PubOperation.pubListLoad(ckHistoryStore, ckHistoryParam, true, false,true, 'checkPointHis',function(success,response){
							me.checkPointHisCallBackFn(success,response,record);
						});
						
						//设置全局变量Global.checkPointCode,Global.checkReplyItems,Global.checkIndex的值，后面提交是数据需要用到
						Global.projectCode = projectCode;
						Global.checkPointCode = record.get('ItemCode');
						Global.checkReplyItems = record.get('ReplyItems');
						Global.replyItemsPMLastCheck = record.get('ReplyItemsPMLastCheck');
						Global.checkIndex = index;
						Global.checkHisStoreName = 'CheckPointList';
						Global.PMChecked = record.get('PMChecked');
					}else{
						iPass.util.PubOperation.showTips('emptyDataMsg', "normal");
					}
	           }
			};
			failureFun = function() {
				iPass.util.PubOperation.showTips('requestErrorMsg','failure');
			};
			// ajax
			iPass.util.PubOperation.ajaxFun(url, params, resultFun, failureFun,true,false,true,'checkInboxHis');
		}else if (messageType == '计划变更' || messageType == 'Schedule changed') {
			var itemValueEx = "";
			// 遍历不通过邮件项
			Ext.Array.each(rowsObj,function(rows){
				// 获取检查点的ItemValueEx
				if(rows.ItemKey == '检查点个数' || rows.ItemKey == 'CheckPointCount'){
					itemValueEx = rows.ItemValueEx;
				}
			});
			
			// 进出变更列表页
			var main = this.getMain(),changePointList = Ext.widget('changePointList');
			var changePointListMain = this.getChangePointList();
			var title = Global.changePointTitle[Global.language];
			changePointList.setTitle(title);
			var changePointListStore = Ext.getStore('ChangePointList');
			changePointListStore.removeAll();
			var proxy = changePointListStore.getProxy();
			proxy.setExtraParams({
			    RecordID:itemValueEx
			});
//			changePointListStore.load({
//				params:{
//					RecordID:itemValueEx,
//					CurrentPage:1,
//					PageSize:10
//				},
//				callback:function(records,operation,success) {
//					console.log(records);
//					iPass.util.PubOperation.hideLoadMask();
//				}
//			});
			changePointListStore.loadPage(1, {
			    callback: function (record, operation, success) {
			        //  Ext.Viewport.unmask();
			        iPass.util.PubOperation.hideLoadMask();			        
			    },
			    scope: this
			});

			main.push(changePointList);
			iPass.util.PubOperation.showLoadMask();
//			this.getChangePointListPanel().setData(changePointListStore);
			

//			changePointList.config.title = Global.changePointTitle[Global.language];
		}else if (messageType == '即将过期' || messageType == 'Before expire') {
			categoryListCtr.goToAppendList();
			// ajax or set store
			var appendixList = categoryListCtr.appendixList,
				itemSegBtn = appendixList.down('toolbar > segmentedbutton'),
				pressedBtn = itemSegBtn.getPressedButtons();
//			appendixList.config.title = messageType;  --jason-2014/11/3
			
			if(Global.appendListFilType == '' || pressedBtn[0].config.name == 'all'){
				// ajax or set store
				var store = Ext.getStore('AppendixList');
				store.removeAll();
				var params = {
						ProjectCode : projectCode,
						TemplateCode : templateCode,   
						FilType : 'all'
					};
					
				// set Global param
				Global.proAppendPm = params;
				Global.templateCode = templateCode;
				// ajax 
				categoryListCtr.appendListAjax(store,params,"");
			}else{
				// default appendListFilType all
				Global.appendListFilType = 'all';
				// set segmentedbutton all btn pressed
				var itemAll = itemSegBtn.getItems().items[3];
				itemSegBtn.setPressedButtons(itemAll);
			}
			
		}
	},
	/**
	 * 收信箱筛选
	 * 
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	filterBtnTapFun : function(obj, e, eOpts) {
		var main = this.getMain(),navBar = main.getNavigationBar(), downBtn = navBar.down('button[name=downBtn]'),
			filterBtn = this.getFilterBtn();
		
		// 禁用筛选按钮
		filterBtn.setDisabled(true);
		if (this.inboxFilter) {
			this.inboxFilter.destroy();
		}
		this.inboxFilter = Ext.widget('inboxFilter');
		var inboxFilter = this.inboxFilter;
		inboxFilter.config.title = obj.getText();
		main.push(inboxFilter);
		
		//动态追加 
		if(downBtn){
			downBtn.destroy();
		}
		navBar.add({
			xtype : 'button',
			ui : 'dark',
			name : 'downBtn',
			iconMask : true,
			align : 'right',
			locales  : {
                text : 'inboxFilter.downText'
            }
		});
		
		navBar.down('button[name=downBtn]').on({
			tap : this.downBtnTapFun,
			scope : this
		});
		
		var store = Ext.getStore('ProjectList'), proSeleleFild = inboxFilter.down('selectfield[name=projectCode]'),
		 	typeSeleleFild = inboxFilter.down('selectfield[name=messageType]'),
  	 		proArr = new Array({
				text : Global.getTipsMsg('all'),
				value : ''
			}), 
			typeArr = new Array({
				text : Global.getTipsMsg('all'),
				value : ''
			},{
				text : Global.getTipsMsg('scheduleChanged'),
				value : '计划变更'
			},{
				text : Global.getTipsMsg('projectRelease'),
				value : '项目发布'
			},{
				text : Global.getTipsMsg('notOK'),
				value : '不通过'
			},{
				text : Global.getTipsMsg('delay'),
				value : '过期'
			},{
				text : Global.getTipsMsg('projeceCompleted'),
				value : '项目结项'
			},{
				text : Global.getTipsMsg('announcement'),
				value : '公告信息'
			},{
				text : Global.getTipsMsg('willexpire'),
				value : '即将过期'
			});
		
		store.each(function (item, index, length) {
			proArr.push({
				text : item.get('ProjectName'),
				value : item.get('ProjectCode')
			});
		});
		proSeleleFild.setOptions(proArr);
		typeSeleleFild.setOptions(typeArr);
		
		if(Global.language == 'en-us'){
			Ext.Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		}else if(Global.language == 'zh-cn'){
			Ext.Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
		}
	},
	/**
	 * 完成条件选择
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	downBtnTapFun : function(obj, e, eOpts){
		var main = this.getMain(), 
			navBar = main.getNavigationBar(),
			filterDownBtn = navBar.down('button[name=downBtn]');
		
		// 禁用完成按钮
		filterDownBtn.setDisabled(true);
		
		var inboxFilter = this.getInboxFilter(),
			projectCodeField = inboxFilter.down('selectfield[name=projectCode]'),
			messageTypeField = inboxFilter.down('selectfield[name=messageType]') ,
			startTimeFieldVal = Global.startTime, 
			endTimeFieldVal = Global.endTime, 
			param = {
				ProjectCode : projectCodeField.getValue(),
				MessageType : messageTypeField.getValue(),
				StartTime : Ext.isEmpty(startTimeFieldVal) ? '' : Ext.Date.format(startTimeFieldVal,'Y-m-d H:i:s'),
				EndTime : Ext.isEmpty(endTimeFieldVal) ? '' : Ext.Date.format(endTimeFieldVal,'Y-m-d H:i:s')
			};
		
		// 起始日期大于截止日期判断
//		console.log('startTime: ' + startTimeFieldVal);
//		console.log('endTime: ' + endTimeFieldVal);
		if(!Ext.isEmpty(startTimeFieldVal) && !Ext.isEmpty(endTimeFieldVal)){
			var startTime = Ext.util.Format.date(startTimeFieldVal, "Y-m-d"),
				endTime = Ext.util.Format.date(endTimeFieldVal, "Y-m-d");
			if(startTime > endTime){
				iPass.util.PubOperation.showTips('dateInvalid', 'failure');
				filterDownBtn.setDisabled(false);
				return;
			}
		}
		// load inboxView
		categoryListCtr.loadInboxViewInfo(param);
		// 返回至收件箱
		main.pop();
	},
	/**
	 * Fires when a date is selected
	 * @param obj
	 * @param newValue
	 * @param oldValue
	 * @param eOpts
	 */
	datepickerChangeFun : function( obj, newValue, oldValue, eOpts ){
		if(!Ext.isEmpty(newValue)){
			var clearIcon = obj.element.select('div[class=x-clear-icon]', obj.element.dom);
			clearIcon.setStyle('display','block');
			if(obj.getName() == 'startTime'){Global.startTime = Ext.ComponentQuery.query('datepickerfield[name=startTime]')[0].getValue();}
			if(obj.getName() == 'endTime'){Global.endTime = Ext.ComponentQuery.query('datepickerfield[name=endTime]')[0].getValue();}
		}
	},
	/**
	 * Fires when the clear icon is tapped
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	datepickerTapFun : function(obj, e, eOpts ){
		var clearIcon = obj.element.select('div[class=x-clear-icon]', obj.element.dom);
		clearIcon.setStyle('display','none');

		if(obj.getName() == 'startTime'){Global.startTime = '';}
		if(obj.getName() == 'endTime'){Global.endTime = '';}
	}
});