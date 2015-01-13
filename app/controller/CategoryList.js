/**
 * 首页controller
 */
Ext.define('iPass.controller.CategoryList', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'main',
			checkPointList : 'categoryList dataview',
			inboxBtn : '#inboxBtn',
			inboxView : 'inboxView',
			settingsBtn : 'projectList button[iconCls=settings]',
			homeBackBtn : 'main button[name=homeBackBtn]'
		},
		control : {
			checkPointList : {
				itemsingletap : 'oncategoryListTap'
			},
			inboxBtn : {
				tap : 'onInboxBtnTap'
			},
			homeBackBtn : {
				tap : 'homeBackBtnFun'
			},
			settingsBtn : {
				tap : 'onSettingBtnTap'
			}
		}
	},
	/**
	 * 模板进入附录
	 * 
	 * @param list
	 * @param index
	 * @param item
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	oncategoryListTap : function(list, index, item, record, e, eOpts) {
		this.goToAppendList();
		var appendixList = this.appendixList,
			itemSegBtn = appendixList.down('toolbar > segmentedbutton'),
			pressedBtn = itemSegBtn.getPressedButtons();
		appendixList.config.title = record.get('TypeName');
		
		if(Global.appendListFilType == '' || pressedBtn[0].config.name == 'all'){
			// ajax or set store
			var store = Ext.getStore('AppendixList');
			store.removeAll();
			var params = {
					ProjectCode : Global.projectCode,
					TemplateCode : record.get('TypeCode'),
					FilType : 'all'
				};
			// set Global param
			Global.proAppendPm = params;
			Global.templateCode = record.get('TypeCode');
			// ajax 
			this.appendListAjax(store,params,record.get('TypeName'));
		}else{
			// default appendListFilType all
			Global.appendListFilType = 'all';
			// set segmentedbutton all btn pressed
			var itemAll = itemSegBtn.getItems().items[3];
			itemSegBtn.setPressedButtons(itemAll);
		}
	},
	goToAppendList : function(){
		var main = this.getMain();
		
		// ajax or set store
		if (!this.appendixList) {
			this.appendixList = Ext.widget('appendixList');
		}
		main.push(this.appendixList);
	},
	/**
	 * 项目附录ajax
	 * @param store
	 * @param url
	 * @param params
	 */
	appendListAjax : function(store,params,title){
		var main = this.getMain(),navBar = main.getNavigationBar(),appendixList = proListCtr.getAppendixList(),url = Global.domain + '/api/GetProjectStageList.ashx';
		
		navBar.setTitle(Global.loadingTpl.format(title));
		var resultFun = function(responseText) {
           if(Ext.isEmpty(responseText)){
           	store.setData(null);
           }else{
//         		alert("92 行测试");
        	   var resJson = Ext.JSON.decode(responseText);
        	   if(resJson.result){
        		   var dataArray = new Array(),headArr = resJson.rows;
        		   if(headArr.length >= 0){
					Ext.Array.each(headArr, function(headItem, index, countriesItSelf) {
					    var itemArr = headItem.rows;
					    Ext.Array.each(itemArr, function(item, index, countriesItSelf) {
							item.ParentSortNum = headItem.SortNum;
							dataArray.push(item);
						});
					});
					
					//设置用户的角色以及权限
					Global.localUserRole = resJson.LocalUserRole;
					Global.projectStatus = resJson.ProjectStatus;
//					alert("填充数组："+dataArray.length);
					store.setData(dataArray);
					//iPass.util.PubOperation.pubListLoad(store, param, true, true, 'appendixLists');
					appendixList.setStore(store);
//					console.log(dataArray);
				}else{
					iPass.util.PubOperation.showTips('emptyDataMsg', "normal");
				}
        	  }
           }
		};
		var failureFun = function() {
			iPass.util.PubOperation.showTips('requestErrorMsg','failure');
		};
		
		// ajax
		iPass.util.PubOperation.ajaxFun(url, params, resultFun, failureFun,true,true,false,'appendixList'+params.ProjectCode,function(){
			navBar.setTitle(title);
		});
	},
	/**
	 * homeBackBtn back
	 */
	homeBackBtnFun : function(){
		console.log('homeBackBtnFun');
		//调用
		if(iPass.util.PubOperation.isGoogleChrome()){
			Ext.Msg.alert('Back');
		}else{
			PhoneGapAPI.exit();
		}
//		console.log('inneritems length: '+this.getMain().getInnerItems().length);
	},
	/**
	 * 收件箱
	 */
	onInboxBtnTap : function(obj, e, eOpts) {
		var main = this.getMain(),navBar = this.getMain().getNavigationBar(), homeBackBtn = navBar.down('button[name=homeBackBtn]');
		//销毁首页back键
		if(homeBackBtn){
			homeBackBtn.destroy();
		};
		if (!this.inboxView) {
			this.inboxView = Ext.widget('inboxView');
		}
		var inboxView = this.inboxView;
		inboxView.config.title = Ext.getCmp('inboxBtn').getText();
		main.push(inboxView);
		
		// scroll to Top
		inboxView.down('list').getScrollable().getScroller().scrollToTop();
		
		// ajax or set store
		var param = {
			ProjectCode : '',
			MessageType : '',
			StartTime : '',
			EndTime : ''
		};
		this.loadInboxViewInfo(param);
	},
	/**
	 * 语言设置
	 */
	onSettingBtnTap : function(obj, e, eOpts) {
		var main = this.getMain(),navBar = this.getMain().getNavigationBar(), homeBackBtn = navBar.down('button[name=homeBackBtn]');
		//销毁首页back键
		if(homeBackBtn){
			homeBackBtn.destroy();
		};
		if (!this.settingView) {
			this.settingView = Ext.widget('settingview');
		}
		var settingView = this.settingView;
		settingView.config.title = obj.getText();
		main.push(settingView);
		Global.projectListSub = 'settingview';
	},
	/**
	 * 加载收信箱数据
	 * @param param
	 */
	loadInboxViewInfo : function(param){
		var inboxView = this.getInboxView(),listObj = inboxView.down('list'),store = Ext.getStore('InboxView');
		iPass.util.PubOperation.pubListLoad(store, param, true, false,true, 'InboxView');
		Global.inboxPm = param;
		Global.projectListSub = 'inboxView';
	}
});