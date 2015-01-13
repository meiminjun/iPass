/**
 * 变更列表
 * 
 * @author jason
 * @create 2014-10-17
 */
Ext.define('iPass.controller.ChangePointList',{
	extend: 'Ext.app.Controller',
	config:{
		refs:{
			main : 'main',
			changePointList : 'changePointList list'
		},
		control:{
			changePointList:{
				itemsingletap:'onchangeListTap'
			}
		}
	},
	/**
	 * 进入历史列表页面
	 * 
	 * @param list
	 * @param index
	 * @param item
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	onchangeListTap:function(list,index,item,record,e,eOpts) {
		var	ItemCode = record.get('ItemCode'),
			ProjectCode = record.get('ProjectCode'),
			roleBtn = Ext.getCmp('navBarRoleBtn'),
			main = this.getMain(),
			navBar = main.getNavigationBar(),
			editBtn = navBar.down('button[name=pointEditBtn]'),
			url = Global.domain + '/api/GetCheckItem.ashx',
			store = Ext.getStore('CheckPointList'),
			record = null,
			index = 0;
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
				ProjectCode : ProjectCode,
				ItemCode : ItemCode
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
						record = store.findRecord("ItemCode", ItemCode),
						index = store.indexOf(record);
						iPass.util.PubOperation.cancelBubble();
						
						var me = checkPointListCtr,
							ckHistoryStore = Ext.getStore('CheckPointHis'),
							ckHistoryParam = {
								ProjectCode : ProjectCode,
								ItemCode : ItemCode
							};
						
						// set Global param
						Global.ckPointHisParam = ckHistoryParam;
						Global.ckPointRecord = record;
						
						// ajax or set store
						iPass.util.PubOperation.pubListLoad(ckHistoryStore, ckHistoryParam, true, false,true, 'checkPointHis',function(success,response){
							me.checkPointHisCallBackFn(success,response,record);
						});
						
						//设置全局变量Global.checkPointCode,Global.checkReplyItems,Global.checkIndex的值，后面提交是数据需要用到
						Global.projectCode = ProjectCode;
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
	}
});
