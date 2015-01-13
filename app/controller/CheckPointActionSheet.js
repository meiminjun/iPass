/**
 * 检查Actioncontroller
 */
Ext.define('iPass.controller.CheckPointActionSheet', {
	extend : 'Ext.app.Controller',
	config : {
		refs : {
			main : 'main',
			checkPointList : 'checkPointList list',
			checkPointHis : 'checkPointHis',
			checkPointActionSheet : 'checkPointActionSheet',
			delDraftActionSheet : 'delDraftActionSheet',
			photoActionSheet : 'photoActionSheet',
			checkEditor : 'checkEditor',
			delDraftBtn : 'delDraftActionSheet button[name=01]',
			checkPointBtn01 : 'checkPointActionSheet button[name=01]',
			checkPointBtn02 : 'checkPointActionSheet button[name=02]',
			checkPointBtn03 : 'checkPointActionSheet button[name=03]',
			checkPointBtn04 : 'checkPointActionSheet button[name=04]',
			checkStatusInp : 'checkStatusInp'
		},
		control : {
			checkPointBtn01 : {
				tap : 'checkPointBtn01Tap'
			},
			checkPointBtn02 : {
				tap : 'checkPointBtn02Tap'
			},
			checkPointBtn03 : {
				tap : 'checkPointBtn03Tap'
			},
			checkPointBtn04 : {
				tap : 'checkPointBtn04Tap'
			},
			delDraftBtn : {
				tap : 'delDraftFun'
			},
			photoActionBtn01 : {
				tap : 'photographFun'
			},
			photoActionBtn02 : {
				tap : 'albumFun'
			}
		}
	},
	/**
	 * check ok
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	checkPointBtn01Tap : function(obj, e, eOpts) {
		var roleBtn = Ext.getCmp('navBarRoleBtn');
		// 隐藏角色标识
		if(roleBtn){roleBtn.setHidden(true);}
		Global.checkPointStatus = 'oK';
		obj.setDisabled(true);
		if(Global.checkReplyItems == ''){
//			this.jumpToCheckEditor(obj.getHtml());
			// 系统自动提交通过/Pass
			this.confirmCheckOK();
		}else{
			this.confirmCheckInp();
		}
	},
	/**
	 * check not OK
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	checkPointBtn02Tap : function(obj, e, eOpts) {
		var roleBtn = Ext.getCmp('navBarRoleBtn');
		// 隐藏角色标识
		if(roleBtn){roleBtn.setHidden(true);}
		Global.checkPointStatus = 'notOK';
		obj.setDisabled(true);
		if(Global.checkReplyItems == ''){
			this.jumpToCheckEditor(obj.getHtml());
		}else{
			this.confirmCheckInp();
		}
	},
	/**
	 * check Alternative Accepted
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	checkPointBtn03Tap : function(obj, e, eOpts) {
		var roleBtn = Ext.getCmp('navBarRoleBtn');
		// 隐藏角色标识
		if(roleBtn){roleBtn.setHidden(true);}
		Global.checkPointStatus = 'alternativeAccepted';
		obj.setDisabled(true);
		if(Global.checkReplyItems == ''){
			this.jumpToCheckEditor(obj.getHtml());
		}
	},
	/**
	 * check NA
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	checkPointBtn04Tap : function(obj, e, eOpts) {
		var roleBtn = Ext.getCmp('navBarRoleBtn');
		// 隐藏角色标识
		if(roleBtn){roleBtn.setHidden(true);}
		Global.checkPointStatus = 'nA';
		obj.setDisabled(true);
		if(Global.checkReplyItems == ''){
			this.jumpToCheckEditor(obj.getHtml());
		}else{
			this.confirmCheckInp();
		}
	},
	/**
	 * 提交检查点输入项
	 */
	confirmCheckInp : function() {
		var main = this.getMain(),navBar = main.getNavigationBar(),
			editBtn = navBar.down('button[name=ckStatusInpBtn]'),
			checkContent = new Array(),
			checkStatusInp = this.getCheckStatusInp(),
			checkInpTxtArr = checkStatusInp.query('textfield'),
			ckPointSheet = Ext.getCmp('checkPointActionSheet');

		var checkResult,checkResultType;
		if(Global.checkPointStatus == 'oK'){
			checkResult = 'pass', checkResultType = 'check';
		}else if(Global.checkPointStatus == 'notOK'){
			checkResult = 'notpass', checkResultType = 'check';
		}else if(Global.checkPointStatus == 'alternativeAccepted'){
			checkResult = 'passed', checkResultType = 'alternative';
		}else if(Global.checkPointStatus == 'nA'){
			checkResult = 'na', checkResultType = 'na';
		}else{
			iPass.util.PubOperation.showTips('paramsMsg', "normal");
			return;
		}
		
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
		}
		// hide actionSheet
		if(ckPointSheet && !ckPointSheet.isHidden()){
			ckPointSheet.hide();
		}
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
				CheckContent : (Global.localUserRole == 'dm' ? '' : Ext.JSON.encode(checkContent))
		};
		var resultFun = function(responseText) {
			var resJson = Ext.JSON.decode(responseText);
			console.log(resJson.result);
			if(resJson.result){
				main.pop();
			}
		};
	
		var failureFun = function() {
			if(editBtn){editBtn.setDisabled(false);}
			iPass.util.PubOperation.showTips('requestErrorMsg','failure');
		};
		// 调用ajax
		iPass.util.PubOperation.ajaxFun(url, params, resultFun, failureFun, true,false,true,'checkInp');
	},
	/**
	 * 检查编辑
	 * @param states
	 */
	jumpToCheckEditor : function(states){
		if(!this.checkEditor){
			this.checkEditor = Ext.widget('checkEditor');
		}
		var checkEditor = this.checkEditor;
		checkEditor.config.title = states;
		this.getMain().push(checkEditor);
		// set history sub page
		Global.ckPointHisSub = 'checkEditor';
		checkEditor.down('textareafield').setValue('');
		this.getCheckPointActionSheet().hide();
		
		var main = this.getMain(),navBar = main.getNavigationBar(),backBtn =navBar.down('button[align=left]'),editBtn = navBar.down('button[name=pointEditBtn]'),
			ckEditorBackBtn = navBar.down('button[name=ckEditorBackBtn]');
		
		//hidden backBtn
		backBtn.setHidden(true);
		
		// editBtn destroy
		if(editBtn){
			editBtn.destroy();
		}
		if(ckEditorBackBtn){
			ckEditorBackBtn.destroy();
		}
		
		//动态追加 
		navBar.insert(0,{
			xtype : 'button',
			name : 'ckEditorBackBtn',
			ui : 'normal',
			iconMask : true,
			align : 'left',
			locales : {
				text : 'navigationView.cancelButtonText'
			}
		});
		
		navBar.insert(1,{
			xtype : 'button',
			name : 'ckEditorConfirm',
			ui : 'dark',
			iconMask : true,
			align : 'right',
			locales : {
				text : 'navigationView.confirmButtonText'
			}
		});
		
		// 自定义back返回
		navBar.down('button[name=ckEditorBackBtn]').on({
			tap: mainCtr.navigationViewBack,
			scope : this
		});
		
		// 检查编辑提交
		navBar.down('button[name=ckEditorConfirm]').on({
			tap : this.confirmCheckStatusEdit,
			scope : this
		});
		
		// 启用编辑提交按钮
		navBar.down('button[name=ckEditorConfirm]').setDisabled(false);
	},
	/**
	 * 提交检查点检查状态(输入)
	 */
	confirmCheckStatusEdit : function() {
		var main = this.getMain(),navBar = main.getNavigationBar(),checkPointStatus = Global.checkPointStatus,
			checkEditor = this.getCheckEditor(),ckOpinion = checkEditor.down('textareafield[name=ckOpinion]'),
			ckEditorConfirm = navBar.down('button[name=ckEditorConfirm]');
		
		//如果是DM角色，用户选中alternativeAccepted可以不输入内容直接提交
		if(Global.localUserRole == 'dm'){
			if(checkPointStatus == 'notOK' || checkPointStatus == 'alternativeAccepted'){
				if(Ext.String.trim(ckOpinion.getValue()) == ''){
					iPass.util.PubOperation.showTips('requiredMsg', "normal");
					return;
				}
			}
		} else {
			if(checkPointStatus == 'alternativeAccepted'){
				if(Ext.String.trim(ckOpinion.getValue()) == ''){
					iPass.util.PubOperation.showTips('requiredMsg', "normal");
					return;
				}
			}
		}

		var checkResult,checkResultType;
		if(Global.checkPointStatus == 'oK'){
			checkResult = 'pass', checkResultType = 'check';
		}else if(Global.checkPointStatus == 'notOK'){
			checkResult = 'notpass', checkResultType = 'check';
		}else if(Global.checkPointStatus == 'alternativeAccepted'){
			checkResult = 'passed', checkResultType = 'alternative';
		}else if(Global.checkPointStatus == 'nA'){
			checkResult = 'na', checkResultType = 'na';
		}else{
			iPass.util.PubOperation.showTips('paramsMsg', "normal");
			return;
		}
		
		// 禁用提交按钮
		ckEditorConfirm.setDisabled(true);
		
		//ajaxFun
		var url = Global.domain + '/api/SubCheckRecord.ashx',
		ckVal = iPass.util.PubOperation.replaceAll(Ext.String.trim(ckOpinion.getValue()),"\n","<br/>");
//		console.log(ckVal);
		var params = {
				ProjectCode : Global.projectCode,
				ItemCode : Global.checkPointCode,
				CheckType : Global.localUserRole,
				CheckResult : checkResult,
				CheckResultType : checkResultType,
				CheckContent : '[{"Key":"","Value":"' + ckVal + '"}]'
		};
		var resultFun = function(responseText) {
			var resJson = Ext.JSON.decode(responseText);
			if(resJson.result){
				setTimeout(function(){
					//附件上传
					checkPointActionSheetCtr.fileUpload(resJson.RelationDataID);
				},2000);
			}
		};
	
		var failureFun = function() {
			iPass.util.PubOperation.showTips('requestErrorMsg','failure');
			// 启用提交按钮
			ckEditorConfirm.setDisabled(false);
		};
		// 调用ajax
		iPass.util.PubOperation.ajaxFun(url, params, resultFun, failureFun, true,false,true,'checkEditor');
	},
	/**
	 * 提交检查点检查状态(输入)
	 * 选择ok，不需要填写备注，系统默认提交
	 */
	confirmCheckOK : function() {
		var main = this.getMain(),checkResult,checkResultType,
			activeItemType = main.getActiveItem().xtype;
		
		this.getCheckPointActionSheet().hide();
		if(Global.checkPointStatus == 'oK'){
			checkResult = 'pass', checkResultType = 'check';
		}else if(Global.checkPointStatus == 'notOK'){
			checkResult = 'notpass', checkResultType = 'check';
		}else if(Global.checkPointStatus == 'alternativeAccepted'){
			checkResult = 'passed', checkResultType = 'alternative';
		}else if(Global.checkPointStatus == 'nA'){
			checkResult = 'na', checkResultType = 'na';
		}else{
			iPass.util.PubOperation.showTips('paramsMsg', "normal");
			return;
		}

		
		//ajaxFun
		var url = Global.domain + '/api/SubCheckRecord.ashx',
		ckVal = Global.getTipsMsg("okMsg");
//		console.log(ckVal);
		var params = {
				ProjectCode : Global.projectCode,
				ItemCode : Global.checkPointCode,
				CheckType : Global.localUserRole,
				CheckResult : checkResult,
				CheckResultType : checkResultType,
				CheckContent : '[{"Key":"","Value":"' + ckVal + '"}]'
		};
		var resultFun = function(responseText) {
			var resJson = Ext.JSON.decode(responseText);
			if(resJson.result){
				iPass.util.PubOperation.showTips('succeedMsg','success');
				setTimeout(function(){
					if(activeItemType == 'checkPointHis'){
						//如果是从iPass.store.CheckPointHisList页面进入编辑页面就修改数据
						checkPointActionSheetCtr.changeCheckPointHisStore();
					}
					//修改checkpoint store
					checkPointActionSheetCtr.changeCheckPointStore();
				},2000);
			}
		};
	
		var failureFun = function() {
			iPass.util.PubOperation.showTips('requestErrorMsg','failure');
		};
		// 调用ajax
		iPass.util.PubOperation.ajaxFun(url, params, resultFun, failureFun, true,false,true,'checkEditorOK');
	},
	/**
	 * show showDraftActionSheet
	 */
	showDraftActionSheet : function(){
		if(!this.delDraftActionSheet){
			this.delDraftActionSheet = Ext.widget('delDraftActionSheet');
		}
		var delDraftActionSheet = this.delDraftActionSheet;
		delDraftActionSheet.down('button[name=01]').setDisabled(false);
		Ext.Viewport.add(delDraftActionSheet);
		delDraftActionSheet.show();
	},
	/**
	 * 提交成功后修改iPass.store.CheckPointList
	 */
	changeCheckPointStore : function(){
		var store = Ext.getStore(Global.checkStoreName);
		
		if(!Ext.isEmpty(Global.checkStoreName))
		if(Global.checkIndex != -1){
			var status = '';
			if(Global.localUserRole == 'dm'){
				if(Global.checkPointStatus == 'oK'){
					status = 'pass';
				}else if(Global.checkPointStatus == 'notOK'){
					status = 'notpass';
				}else if(Global.checkPointStatus == 'alternativeAccepted'){
					status = 'altpass';
				}else if(Global.checkPointStatus == 'nA'){
					status = 'na';
				}
			}
			
			if(status != ''){
				store.getAt(Global.checkIndex).set('ItemStatus',status);
			}
			//修改状态图标
			if(Global.localUserRole == 'pm'){
				store.getAt(Global.checkIndex).set('PMChecked',true);
			}
			store.getAt(Global.checkIndex).set('LastCheckTime',Ext.Date.format(new Date(), 'Y/m/d H:i:s'));
//			//还原全局变量Global.checkIndex
//			Global.checkIndex = -1;
		}
	},
	/**
	 * 提交后修改iPass.store.CheckPointHisList里面的store及面板上的记录
	 */
	changeCheckPointHisStore : function(){
		var me = checkPointListCtr,
			store = Ext.getStore('CheckPointHis');

		var param = {
			ProjectCode : Global.projectCode,
			ItemCode : Global.checkPointCode
		};
		
		// ajax or set store
		iPass.util.PubOperation.pubListLoad(store, param, true, false, true, 'checkPointHis',function(success,response){
			me.checkPointHisCallBackFn(success,response,Global.ckPointRecord);
		});
	},
	/**
	 * 删除草稿并返回
	 */
	delDraftFun : function(){
		var main = this.getMain(),delDraftActionSheet = this.getDelDraftActionSheet(),navBar = main.getNavigationBar(),
			backBtn =navBar.down('button[name=ckEditorBackBtn]'),editBtn = navBar.down('button[name=ckEditorConfirm]');
		
		
		if(delDraftActionSheet){
			// set delDraftBtn disabled
			delDraftActionSheet.down('button[name=01]').setDisabled(true);
			//隐藏ActionSheet
			delDraftActionSheet.hide();	
		}
		
		// 移除自定义back btn
		if(backBtn){
			backBtn.destroy();
		}
		
		// 移除提交按钮 
		if(editBtn){
			editBtn.destroy();
		}
		
		// del pic
		this.delPic(1);
		this.delPic(2);
		this.delPic(3);
		
		//set system backbtn hidden and back
		var sysBackBtn = navBar.down('button[align=left]');
		sysBackBtn.setHidden(false);
		// reset history sub val
		Global.ckPointHisSub = '';
		main.pop();
		// 隐藏相册actionsheet
		if(this.photoActionSheet && !this.photoActionSheet.isHidden()){
			this.photoActionSheet.hide();
		}
	},
	/**
     * 获取图片actionsheet 从相册/拍照
     */
    getPhoto : function(){
    	if(!this.photoActionSheet){
			this.photoActionSheet = Ext.widget('photoActionSheet');
		}
		var photoActionSheet = this.photoActionSheet;
		Ext.Viewport.add(photoActionSheet);
		photoActionSheet.show();
    },
    /**
     * 拍照
     * phonegap > camera.getPicture
     * successCallback {},
     * failCallback {},
     * config {sourceType : 0 相册/sourceType : 1拍照,
     * 		   destinationType : 0 return base64/destinationType ：1 reurn url}
     */ 
    photographFun : function(){
    	if(!iPass.util.PubOperation.isGoogleChrome()){
	    	navigator.camera.getPicture(function(data){
	    		 if(Ext.getDom('myImage1').style.display=='none'){
		    		 Ext.getDom('iDelBtn1').style.display = "block";
		    		 // Ext.getDom('myImage1').src = "data:image/jpeg;base64,"+data;
		    		 Ext.getDom('myImage1').src = data;
		    		 Ext.getDom('myImage1').style.display = 'inline';
		    		 console.log(data);
		    		 window.localStorage.setItem("_globleParam_imgeUrl1",data);
	    		 }
	    		 else if(Ext.getDom('myImage2').style.display=='none'){
		    		 Ext.getDom('iDelBtn2').style.display = "block";
		    		 Ext.getDom('myImage2').src = data;
		    		 Ext.getDom('myImage2').style.display = 'inline';
		    		 window.localStorage.setItem("_globleParam_imgeUrl2",data);
	    		 }
	    		 else if(Ext.getDom('myImage3').style.display=='none'){
		    		 Ext.getDom('iDelBtn3').style.display = "block";
		    		 Ext.getDom('myImage3').src = data;
		    		 Ext.getDom('myImage3').style.display = 'inline';
		    		 window.localStorage.setItem("_globleParam_imgeUrl3",data);
	    		 }else{
	    			 navigator.notification.alert(Global.getTipsMsg('photoMsg'),null,Global.getTipsMsg('Prompt'),Global.getTipsMsg('OK'));
	    		 }
	    		
			 },function(error){
				 console.log('error',error);
				 return;
			 },{
				 quality:80,
				 sourceType:1,
				 destinationType:1,
				 targetWidth :720,
				 targetHeight :1280
		     });
    	}
    },
    /**
     * 相册
     * phonegap > camera.getPicture
     * successCallback {},
     * failCallback {},
     * config {sourceType : 0 相册/sourceType : 1拍照,
     * 		   destinationType : 0 return base64/destinationType ：1 reurn url}
     */
    albumFun : function(){
    	if(!iPass.util.PubOperation.isGoogleChrome()){
	    	navigator.camera.getPicture(function(data){
	    		 if(Ext.getDom('myImage1').style.display=='none'){
		    		 Ext.getDom('iDelBtn1').style.display = "block";
		    		 // Ext.getDom('myImage1').src = "data:image/jpeg;base64,"+data;
		    		 Ext.getDom('myImage1').src = data;
		    		 Ext.getDom('myImage1').style.display = 'inline';
		    		 console.log(data);
		    		 window.localStorage.setItem("_globleParam_imgeUrl1",data);
	    		 }
	    		 else if(Ext.getDom('myImage2').style.display=='none'){
		    		 Ext.getDom('iDelBtn2').style.display = "block";
		    		 Ext.getDom('myImage2').src = data;
		    		 Ext.getDom('myImage2').style.display = 'inline';
		    		 window.localStorage.setItem("_globleParam_imgeUrl2",data);
	    		 }
	    		 else if(Ext.getDom('myImage3').style.display=='none'){
		    		 Ext.getDom('iDelBtn3').style.display = "block";
		    		 Ext.getDom('myImage3').src = data;
		    		 Ext.getDom('myImage3').style.display = 'inline';
		    		 window.localStorage.setItem("_globleParam_imgeUrl3",data);
	    		 }else{
	    			 navigator.notification.alert(Global.getTipsMsg('photoMsg'),null,Global.getTipsMsg('Prompt'),Global.getTipsMsg('OK'));
	    		 }
	    		
			 },function(error){
				 console.log('error',error);
				 return;
			 },{
				 quality:80,
				 sourceType:0,
				 destinationType:1,
				 targetWidth :720,
				 targetHeight :1280
			 });
    	}
    },
    /**
     * 删除图片
     */
    delPic : function(num){
    	var numStr = num.toString(),
    	path=window.localStorage.getItem("_globleParam_imgeUrl"+numStr);
    	if(!Ext.isEmpty(path)){
	    	Ext.getDom('iDelBtn'+numStr).style.display = "none";
			Ext.getDom('myImage'+ numStr).src = "";
			Ext.getDom('myImage'+ numStr).style.display = 'none';
			// clear localstorage
			window.localStorage.removeItem("_globleParam_imgeUrl"+numStr);
    	}
    },
    /**
     * 附件上传
     * @des ft.upload 上传此url的本地图片资源
     *      android  不存储本地图片资源/ ios 存储本地图片资源
     *      
     * @param {} dataid
     */
    fileUpload : function(dataid){
    	var path1=window.localStorage.getItem("_globleParam_imgeUrl1"),
        path2=window.localStorage.getItem("_globleParam_imgeUrl2"),
        path3=window.localStorage.getItem("_globleParam_imgeUrl3"),
        main = checkPointActionSheetCtr.getMain(),
        navBar = main.getNavigationBar(),
        ckEditorConfirm = navBar.down('button[name=ckEditorConfirm]'),
        accessoryUrl = Global.domain+ '/api/file/upload.ashx?adaccount='+Global.userAccount+
        			   '&Token='+Global.userToken+'&dataid='+dataid+'&atttype=ipassrecord&_dc=' + Math.floor(Math.random() * ( 1000 + 1));
    	
    	if(!Ext.isEmpty(path1)){
    		setTimeout(function(){
    			//photo upload tips
        		iPass.util.PubOperation.showLoadMask(Global.getTipsMsg('picUpload'));
	    		var ft = new FileTransfer();
	    		// upload path1
		    	ft.upload(path1,accessoryUrl,
					function(result) {
//					  console.log('path1: ' +path1+ 'Upload success: ' + result.result+ '/Upload SuccNum: ' + result.SuccNum);
					  // upload path2
					  if(!Ext.isEmpty(path2)){
						  ft.upload(path2,accessoryUrl,
							  function(result) {
//								  console.log('path2: ' +path2+ 'Upload success: ' + result.result+ '/Upload SuccNum: ' + result.SuccNum);
								  // upload path3
								  if(!Ext.isEmpty(path3)){
									  ft.upload(path3,accessoryUrl,
										function(result) {
//										  console.log('path3: ' +path3+ 'Upload success: ' + result.result+ '/Upload SuccNum: ' + result.SuccNum);
										  setTimeout(function(){iPass.util.PubOperation.showTips('succeedMsg', "success");},1000);
										  // del local pic resources
										  checkPointActionSheetCtr.delLocalFile(path3);
								    	  //如果是从iPass.store.CheckPointHisList页面进入编辑页面就修改数据
								    	  checkPointActionSheetCtr.changeCheckPointHisStore();
								    	  //修改checkpoint store
								    	  checkPointActionSheetCtr.changeCheckPointStore();
										  //调用返回
										  checkPointActionSheetCtr.delDraftFun();
										},
									 	function(error) {
//											console.log('Error uploading file ' + path3 + ': ' + error.code);
											setTimeout(function(){iPass.util.PubOperation.showTips('failureMsg', "failure");ckEditorConfirm.setDisabled(false);},1000);
									 	},{},true);
								  }else{
									  setTimeout(function(){iPass.util.PubOperation.showTips('succeedMsg', "success");},1000);
									  // del local pic resources
									  checkPointActionSheetCtr.delLocalFile(path2);
							    	  //如果是从iPass.store.CheckPointHisList页面进入编辑页面就修改数据
							    	  checkPointActionSheetCtr.changeCheckPointHisStore();
							    	  //修改checkpoint store
							    	  checkPointActionSheetCtr.changeCheckPointStore();
									  //调用返回
									  checkPointActionSheetCtr.delDraftFun();
								  }
						  	  },
						      function(error) {
//						  		 console.log('Error uploading file ' + path2 + ': ' + error.code);
						  		 setTimeout(function(){iPass.util.PubOperation.showTips('failureMsg', "failure");ckEditorConfirm.setDisabled(false);},1000);
					      },{},true);
					  }else{
						  setTimeout(function(){iPass.util.PubOperation.showTips('succeedMsg', "success");},1000);
						  // del local pic resources
						  checkPointActionSheetCtr.delLocalFile(path1);
			    		  //如果是从iPass.store.CheckPointHisList页面进入编辑页面就修改数据
			    		  checkPointActionSheetCtr.changeCheckPointHisStore();
			    		  //修改checkpoint store
			    		  checkPointActionSheetCtr.changeCheckPointStore();
						  //调用返回
						  checkPointActionSheetCtr.delDraftFun();
					  }
				  	},
				  	function(error) {
//				  		console.log('Error uploading file ' + path1 + ': ' + error.code);
				  		setTimeout(function(){iPass.util.PubOperation.showTips('failureMsg', "failure");ckEditorConfirm.setDisabled(false);},1000);
				  	},{},true);
    		},500);
    	}else{
    		//调用返回
    		checkPointActionSheetCtr.delDraftFun();
    		//如果是从iPass.store.CheckPointHisList页面进入编辑页面就修改数据
    		checkPointActionSheetCtr.changeCheckPointHisStore();
    		//修改checkpoint store
    		checkPointActionSheetCtr.changeCheckPointStore();
    		setTimeout(function(){iPass.util.PubOperation.showTips('succeedMsg', "success");},1000);
    	}
    },
    /**
     * 删除本地图片资源(ios)
     * @param path 本地图片资源路径
     */
    delLocalFile : function(url){
//    	var urlarray= new Array(); //定义一数组
//	    url=url.replace("file://localhost/","/");
//	    urlarray=url.split('/');
//	    console.log("path:"+url);
//	    console.log("length:"+urlarray.length);
//	    console.log("name:"+urlarray[urlarray.length-1]);
//	    var entry = new FileEntry(urlarray[urlarray.length-1],url);
//	    entry.remove(function(){console.log("删除成功");},function(){console.log("删除失败");});
    },
    /**
     * 打开附件
     * @params{array} 
     * 		Name ： 附件名称
     *      Url : 附件路径
     */
    openAttachFile : function(arr){
    	var pathStr = arr,pathArr = pathStr.split('|'),myItem = [],main = this.getMain(),
    		navBar = main.getNavigationBar(),editBtn = navBar.down('button[name=pointEditBtn]');
    	
    	Ext.Array.each(pathArr,function(path){
    		myItem.push({
    			xtype : 'imageviewer',
    			imageSrc : decodeURIComponent(path),
    			style : 'background : rgba(53, 49, 49,1)'
    		});
    	});
    	
		this.carouselView = Ext.widget('carouselView');
		var carouselView = this.carouselView;
		carouselView.setItems(myItem);
		this.getMain().push(carouselView);
		
		// set history sub page
		Global.ckPointHisSub = 'carouselView';
		// 隐藏检查历史编辑按钮
		if(editBtn){editBtn.destroy();}
    },
    /**
     * 检查点缩略图查看图片
     *
     * @param pathStr
     * @param currentIndex
     */
    viewPic:function(pathStr,currentIndex){
        var pathArr = pathStr.split('|'),
            subItem = [],
            main = this.getMain(),
            navBar = main.getNavigationBar(),
            editBtn = navBar.down('button[name=pointEditBtn]'),
            roleBtn = Ext.getCmp('navBarRoleBtn'),
            activePanel = arguments[2];
        if(this.carouselView){
            this.carouselView.destroy();
        }
        this.carouselView = Ext.widget('carouselView');
        var carouselView = this.carouselView;

        try{
	        Ext.Array.each(pathArr,function(path){
	            subItem.push({
	                xtype : 'imageviewer',
	                imageSrc : decodeURIComponent(path),
	                style : 'background : rgba(53, 49, 49,1)'
	            });
	        });
	        carouselView.setItems(subItem);
	        carouselView.setActiveItem(currentIndex-1);
	        main.push(carouselView);
        }catch(e){}
        
        // set history sub page
		Global.ckPointHisSub = 'carouselView';
		// 隐藏检查历史编辑按钮
		if(editBtn){editBtn.destroy();}
		// 隐藏角色按钮
		if(roleBtn){roleBtn.setHidden(true);}
		// 进入相册控制检查项子级变量
		if(activePanel){
			if(activePanel == 'checkScopeList'){
				Global.ckScopeListSub = 'carouselView';
			}else if(activePanel == 'checkItemsList'){
				Global.ckItemListSub = 'carouselView';
			}else if(activePanel == 'checkPointList'){
				Global.ckPointListSub = 'carouselView';
			}
		}
   },
   /**
     * 预览附件
     *
     * @param attUrl
     */
   checkDocAtt:function(attUrl) {
	   PhoneGapAPI.checkAtt(attUrl);
   }
});
