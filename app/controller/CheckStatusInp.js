/**
 * 填空项controller
 */
Ext.define('iPass.controller.CheckStatusInp', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'main',
			checkStatusInp : 'checkStatusInp'
		},
		control : {}
	},
	/**
	 * 检查输入
	 * @param titile
	 */
	jumpToCheckInp : function(title){
		var main = this.getMain(),
			navBar = main.getNavigationBar(),
			navBarBtn = navBar.down('button[align=left]'),
			pointEditBtn = navBar.down('button[name=pointEditBtn]'),
			cancelBtn =  navBar.down('button[name=ckStatusInpCancelBtn]'),
			ckStatusInpBtn = navBar.down('button[name=ckStatusInpBtn]'),
			roleBtn = Ext.getCmp('navBarRoleBtn');
		if (!this.checkStatusInp) {
			this.checkStatusInp = Ext.widget('checkStatusInp');
		}
		var checkStatusInp = this.checkStatusInp;
		checkStatusInp.config.title = Global.getTipsMsg('checkInpTitle');
		main.push(checkStatusInp);
		
		// set history sub page
		Global.ckPointHisSub = 'checkStatusInp';
		
		//hidden backBtn
		navBarBtn.setHidden(true);
		
		// hidden roleBtn
		if(roleBtn){roleBtn.setHidden(true);}
		
		//动态追加控件
		checkStatusInp.removeAll(true,true);
		if(!Ext.isEmpty(Global.replyItemsPMLastCheck) && Global.localUserRole == 'dm'){
			var valArr = Ext.JSON.decode(Global.replyItemsPMLastCheck);
			for(var i = 0;i < valArr.length;i++){
				checkStatusInp.add({
					xtype : 'label',
					html : decodeURI(valArr[i].Key),
					cls : 'div-label'
				});
				
				checkStatusInp.add({
					xtype : 'textfield',
					name : decodeURI(valArr[i].Key),
					cls : 'div-corners',
					placeHolder : 'Required',
					readOnly : true,
					value : decodeURI(valArr[i].Value)
				});
			}
		}else{
			var inpArr = Global.checkReplyItems.split('|');
			for(var i = 0;i < inpArr.length;i++){
				checkStatusInp.add({
					xtype : 'label',
					html : decodeURI(inpArr[i]),
					cls : 'div-label'
				});
				
				checkStatusInp.add({
					xtype : 'textfield',
					name : decodeURI(inpArr[i]),
					cls : 'div-corners',
					locales : {
						placeHolder : 'checkStatusInp.textPlaceHolder'
					}
				});
			}
		}
		
		if(pointEditBtn){
			pointEditBtn.destroy();
		}
		if(cancelBtn){
			cancelBtn.destroy();
		}
		if(ckStatusInpBtn){
			ckStatusInpBtn.destroy();
		}
		
		//动态追加 
		navBar.insert(0,{
			xtype : 'button',
			ui : 'dark',
			align : 'left',
			name : 'ckStatusInpCancelBtn',
			locales : {
				text : 'navigationView.cancelButtonText'
			}
		});
		var flag = false;
		// 控制编辑按钮是否有效
		if(Global.localUserRole == 'pm'){
			flag = false;
		}else if(Global.localUserRole == 'dm'){
			if(Global.PMChecked){
				flag = false;
			}else{
				flag = true;
			}
		}
		navBar.insert(1,{
			xtype : 'button',
			ui : 'dark',
			align : 'right',
			name : 'ckStatusInpBtn',
			disabled : flag,
			locales : {
				text : 'navigationView.confirmButtonText'
			}
		});
		
		navBar.down('button[name=ckStatusInpCancelBtn]').on({
			tap : mainCtr.checkStatusInpBack,
			scope : this
		});
		
		navBar.down('button[name=ckStatusInpBtn]').on({
			tap : this.confirmCheckStatusInp,
			scope : this
		});
	},
	/**
	 * 提交检查点检查状态(输入)
	 */
	confirmCheckStatusInp : function() {
		var main = this.getMain(),
			navBar = main.getNavigationBar(),
			editBtn = navBar.down('button[name=ckStatusInpBtn]'),
			checkResult='pass',
			checkResultType='check',
			checkContent = new Array(), 
			checkStatusInp = this.getCheckStatusInp(),
			checkInpTxtArr = checkStatusInp.query('textfield');
		
		Global.checkPointStatus = 'oK';
		var title = '';
		for(var i=0;i<checkInpTxtArr.length;i++){
			var name = checkInpTxtArr[i].getName();
			var txt = checkInpTxtArr[i].getValue();
			if(Ext.String.trim(txt) == ''){
				iPass.util.PubOperation.showTips('requiredMsg', "normal");
				checkInpTxtArr[i].focus();
				return;
			}
			
			checkContent.push({
				"Key" : "" + name + "",
				"Value" : "" + txt + ""
			});
			
			title += '<span style="padding:6px 10px;">' + name + ' : ' + txt+'</span>';
		}
		if(Global.localUserRole == 'pm'){
			// 禁用编辑按钮
			if(editBtn){editBtn.setDisabled(true);}
			//ajaxFun
			var url = Global.domain + '/api/SubCheckRecord.ashx';
			var params = {
					ProjectCode : Global.projectCode,
					ItemCode : Global.checkPointCode,
					CheckType : Global.localUserRole,
					CheckResult : checkResult,
					CheckResultType : checkResultType,
					CheckContent : Ext.JSON.encode(checkContent)
			};
			var resultFun = function(responseText) {
				var resJson = Ext.JSON.decode(responseText);
				if(resJson.result){
					//修改store
					checkPointActionSheetCtr.changeCheckPointStore();
					//调用返回
					mainCtr.checkStatusInpBack();
//					//数据递交成功把Global.checkPointCode、Global.checkPointStatus全局变量还原
//					Global.checkPointStatus = '';
//					Global.checkPointCode = '';
				}
			};
		
			var failureFun = function() {
				if(editBtn){editBtn.setDisabled(false);}
				iPass.util.PubOperation.showTips('requestErrorMsg','failure');
			};
			// 调用ajax
			iPass.util.PubOperation.ajaxFun(url, params, resultFun, failureFun, '');
		}else{
			iPass.util.PubOperation.getCheckPointSheet(title);
		}
	}
});