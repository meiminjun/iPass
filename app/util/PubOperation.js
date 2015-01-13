/**
 * @description 公共方法控制器
 * @author duwei
 * @date 2013-10-09
 */

Ext.define('iPass.util.PubOperation', {

	singleton : true,

	requires : [ 'Ext.data.proxy.JsonP' ],
	/**
	 * @description 容器添加子项
	 * @param {}
	 *            id 显示面板编号
	 * @param {}
	 *            nameSpace 命名空间路径/别名
	 * @author duwei
	 * @date 2012-7-6
	 */
	viewPortAdd : function(nameSpace, xtypes) {
		var obj = Ext.create(nameSpace);
		if (undefined == obj) {
			Ext.Viewport.add({
				xtype : xtypes
			});
		}
	},
	/**
	 * @description 容器设置活动项
	 * @param {}
	 *            id 显示面板编号
	 * @param {}
	 *            jumpModel 跳转方式
	 * @author duwei
	 * @date 2012-7-6
	 */
	viewPortJump : function(nameSpace, jumpModel) {
		Ext.Viewport.animateActiveItem(Ext.create(nameSpace), jumpModel);
	},
	/**
	 * @description 默认跳转页面公共方法
	 * @param {}
	 *            id 显示面板编号
	 * @param {}
	 *            nameSpace 命名空间路径
	 * @param {}
	 *            jumpModel 跳转方式
	 * @author duwei
	 * @date 2012-7-6
	 */
	jump : function(id, nameSpace, jumpModel, historyFla) {
		var obj = Ext.getCmp(id);
		if (undefined == obj) {
			var newCard = Ext.Viewport.add({
				xtype : nameSpace
			});
			Ext.Viewport.animateActiveItem(newCard, jumpModel);
		} else {
			Ext.Viewport.animateActiveItem(obj, jumpModel);
		}
	},
	/**
	 * show loading
	 */
	showLoadMask : function() {
		iPass.ux.CustomLoading.hide();
		iPass.ux.CustomLoading.show({
			message : arguments[0] == undefined ? Global.getLoadingMsg() : arguments[0],
			// position : 'center center',
			modal : arguments[1] == undefined ? false : arguments[1]
		});
	},
	/**
	 * hide loading
	 */
	hideLoadMask : function() {
		iPass.ux.CustomLoading.hide();
	},
	/**
	 * 显示提示语，3秒自动隐藏
	 * 
	 * @param{string} key 提示语关键字，类似'succeedMsg'/'failureMsg'
	 */
	showTips : function(key, type) {
		iPass.ux.CustomLoading.hide();
		iPass.ux.CustomLoading.showTip({
			message : Global.getTipsMsg(key),
			type : type,
			showTipTime : 3,
			callback : function() {
				// Ext.Msg.alert('显示结束');
			}
		});
	},
	/**
	 * 下拉列表显示
	 * 
	 * @param {}
	 *            id 下拉列表编号
	 */
	showSelect : function(id, nameSpace) {
		// 实例化下拉列表对象
		var selectField = Ext.getCmp(id);
		if (selectField == undefined) {
			Ext.Viewport.add({
				xtype : nameSpace
			});
		}
		Ext.getCmp(id).show();
	},
	/**
	 * 判断是否为PC谷歌游览器
	 */
	isGoogleChrome : function() {
		// ios
		if (Ext.os.is.iOS) {
			return false;
			// android
		} else if (Ext.os.is.Android) {
			return false;
		} else {
			return true;
		}
	},
	/**
	 * @description 调整 list height
	 * @param {}
	 *            _this 当前面板对象
	 * @param {}
	 *            size 要减去的高度
	 * @author duwei
	 * @create 2012-8-28
	 */
	resetListHeight : function(_this, size) {
		var height = Ext.Viewport.getSize().height;
		_this.setHeight(height - size);
	},
	/**
	 * 语言
	 */
	initLanguage : function() {
		if(this.isGoogleChrome()){
			iPass.ux.Manager.setConfig({
	            ajaxConfig : {
	                method : 'GET'
	            },
	            language   : 'zh-cn',
	            tpl        : 'locales/{locale}.json',
	            type       : 'ajax'
	        });

	        iPass.ux.Manager.init();
	        
	    	// Destroy the #appLoadingIndicator element
	        Ext.fly('appLoadingIndicator').destroy();
	     // Initialize the main view
	        //Ext.Viewport.add(Ext.create('iPass.view.Internationalization'));
	        Ext.Viewport.add(Ext.create('iPass.view.Main'));
		}else{
			//获取语言缓存数据
			iPass.util.PubOperation.offlineAccess('iPassLanguage',null,function(result){
	    		if(result == ''){
	    			result = 'zh-cn';
	    		}
	    		Global.language = result;
	    		iPass.ux.Manager.setConfig({
		            ajaxConfig : {
		                method : 'GET'
		            },
		            language   : result,
		            tpl        : 'locales/{locale}.json',
		            type       : 'ajax'
		        });
	    		iPass.ux.Manager.init();
		    	//获取当前登录用户信息
		    	PhoneGapAPI.getLoginUserInfo(function(){
		    		iPass.ux.Manager.init();
			        
			    	// Destroy the #appLoadingIndicator element
			        Ext.fly('appLoadingIndicator').destroy();
			        //Ext.Viewport.add(Ext.create('iPass.view.Internationalization'));
			        Ext.Viewport.add(Ext.create('iPass.view.Main'));
				});
	    	});
		}
	},
	/**
	 * Ajax数据加载
	 * 
	 * @param url
	 *            请求URL地址
	 * @param params
	 *            请求参数
	 * @param resultFun
	 *            ajax成功回调方法
	 * @param failureFun
	 *            ajax失败回调方法
	 * @param isCheck
	 *            是否检查网络
	 * @param loadFormCache
	 *            是否加载缓冲
	 * @param isDisplay
	 *            是否显示loading
	 * @param key
	 *            加载缓存的key
	 * @param key 
	 * 			  callBackFun 回调
	 */
	ajaxFun : function(url, params, resultFun, failureFun, isCheck,loadFormCache,isDisplay, key,callBackFun) {
		try {
			var roleBtn = Ext.getCmp('navBarRoleBtn');
			
			// 收信箱进入检查历史隐藏角色
			if(key == 'checkInboxHis'){
				if(roleBtn){roleBtn.setHidden(true);}
			}
			
			//离线缓存
			if(loadFormCache){
				iPass.util.PubOperation.offlineAccess(key,null,resultFun);
			}else{
//				resultFun('');
			}
			
			// 判断网络
			if (!iPass.util.PubOperation.checkConnectionStatus()) {
				if (isCheck == true) {
					iPass.util.PubOperation.showTips('nonetworkconnection', 'normal');
//					if(roleBtn){roleBtn.setHidden(true);}
				}
				return;
			}

			// 设置请求参数
			var extraparams = this.pushExtraParams(params);
			if (key == 'checkEditorOK' || key == 'checkEditor' || key== 'checkInp') {
				// 检查编辑提示数据提交中
				iPass.util.PubOperation.showLoadMask(Global.getTipsMsg('dataSubmission'));
			} else {
				if(isDisplay){
					// default loading data
					iPass.util.PubOperation.showLoadMask();
				}
			}
			Ext.Ajax.request({
				url : url,
				params : extraparams,
				method : 'get',
				timeout : 40000,
				success : function(response, opts) {
					if(key!='checkEditor' && key!='checkEditorOK'){iPass.util.PubOperation.hideLoadMask();}
					resultFun(response.responseText);
				},
				failure : function(response, opts) {
					if(key!='checkEditor' && key!='checkEditorOK'){iPass.util.PubOperation.hideLoadMask();}
					failureFun(response.responseText);
				},
				callback : function(options, success, response) {
					if (success) {
                        // 存储项目详情和项目附录缓存
                        iPass.util.PubOperation.onlineLoad(key,null,response.responseText);
                        var responseObj = Ext.JSON.decode(response.responseText);
						if (responseObj.ErrorCode == -1) {
							iPass.util.PubOperation.showTips('abnormalMsg', 'failure');
						} else if (responseObj.ErrorCode == -2) {
							iPass.util.PubOperation.showTips('paramsMsg', 'failure');
						} else if (responseObj.ErrorCode == -3) {
							iPass.util.PubOperation.showTips('systemErrorMsg',
									'failure');
						} else if (responseObj.ErrorCode == -4) {
							iPass.util.PubOperation.showTips('permissionsMsg',
									'failure');
						} else if(responseObj.ErrorCode == -8) {
							iPass.util.PubOperation.showTips('projectStatusMsg',
							'failure');
						}
						
						if(key != 'checkInboxHis'){
							// 获取当前用户角色信息，并存储到全局变量中
							var localUserRole = responseObj.LocalUserRole;
							if (localUserRole != undefined){
								if(roleBtn){
									roleBtn.setHidden(false);
									if(localUserRole == 'pm'){
										roleBtn.setIconCls('pmBtn');
									}else if(localUserRole == 'dm'){
										roleBtn.setIconCls('dmBtn');
									}else{
										roleBtn.setHidden(true);
									}
								}
							}else{
								if(roleBtn){roleBtn.setHidden(true);}
							}
						}
					} else {
						iPass.util.PubOperation.hideLoadMask();
						setTimeout(function(){iPass.util.PubOperation.showTips('requestErrorMsg','failure');},1000);
//						if(roleBtn){roleBtn.setHidden(true);}
					}
					
					if(callBackFun != undefined)
						callBackFun();
				}
			});
		}catch(e){Ext.Logger.deprecate(e);}
	},
	/**
	 * 公共列表加载方法
	 * 
	 * @param store
	 *            store数据代理
	 * @param params
	 *            数据请求参数
	 * @param isCheck
	 *            是否检查网络
	 * @param loadFormCache
	 *            是否加载换成
	 * @param isDisplay
	 *            是否显示loading
	 * @param key
	 *            key关键字
	 * @param key 
	 * 			  callBackFun 回调
	 */
	pubListLoad : function(store, params, isCheck, loadFormCache,isDisplay, key, callBackFun) {
//		try{
			var callBackFun = arguments[6],
				roleBtn = Ext.getCmp('navBarRoleBtn');
			
			// 进入检查历史隐藏角色标识
			if(key == 'checkPointHis'){
				if(roleBtn){roleBtn.setHidden(true);}
			}
			
			// 离线加载
			if(loadFormCache){
				iPass.util.PubOperation.offlineAccess(key,store);
			}else{
	//			store.setData(null);
			}
			
			// 判断网络
			if(!iPass.util.PubOperation.checkConnectionStatus()){
				if (isCheck == true) {
					iPass.util.PubOperation.showTips('nonetworkconnection','normal');
	//				if(roleBtn){roleBtn.setHidden(true);}
				}
				return;
			}
			if(isDisplay){
				iPass.util.PubOperation.showLoadMask();
			}
			
			// 设置请求参数
			var extraparams = this.pushExtraParams(params);
			store.getProxy().setExtraParams(extraparams);
			store.loadPage(1, {
				callback : function(record, operation, success) {
					// 获取当前用户角色信息，并存储到全局变量中
					var response = Ext.JSON.decode(operation.getResponse()&&operation.getResponse().responseText),localUserRole;
					if(key == 'checkPointHis' || key == 'InboxView'){
						iPass.util.PubOperation.hideLoadMask();
					}
					if (success) {
						localUserRole = response.LocalUserRole;
						// 首页项目列表显示收件箱未读数
						if(key == 'projectList'){
							var inboxBtn = Ext.getCmp('inboxBtn');
							inboxBtn.setHtml(inboxBtn.getText()+'<span>('+response.InboxNotReadCount+')</span>');
							Global.inboxUnreadCnt = response.InboxNotReadCount;
						}
						
						if (localUserRole != undefined){
							Global.localUserRole = localUserRole;
							if(roleBtn){
								roleBtn.setHidden(false);
								if(localUserRole == 'pm'){
									roleBtn.setIconCls('pmBtn');
								}else if(localUserRole == 'dm'){
									roleBtn.setIconCls('dmBtn');
								}else{
									roleBtn.setHidden(true);
								}
							}
						}else{
							if(roleBtn){roleBtn.setHidden(true);}
						}
	
						// 检查返回数据是否为空/请求成功返回错误信息处理
						iPass.util.PubOperation.emptyDataOperation(record,
								operation.getResponse(), success,key);
					} else {
						iPass.util.PubOperation.showTips('requestErrorMsg','failure');
	//					if(roleBtn){roleBtn.setHidden(true);}
					}
					
					if(callBackFun != undefined){
						callBackFun(success,response);
					}
				},
				scope : this
			});
			
	//		var proxy = store.getProxy();
	//		proxy.getReader().setRootProperty("rows_ScheduleChangeHistoryDetail");
	//		store.load({
	//			    callback: function (record, operation, success) {
	//			    	var list =  checkPointListCtr.getCheckPointHis().down('list'),
	//						panel = list.down('panel[name=scheduleList]');
	//						panel.setRecord(record);
	//			    	console.log("*********************************成功");
	//			        //  Ext.Viewport.unmask();
	////			        iPass.util.PubOperation.hideLoadMask();
	//			    },
	//			    scope: this
	//		});
//		}catch (e) {Ext.Logger.deprecate(e);}
	},
	/**
	 * 公共列表刷新方法
	 * 
	 * @param store
	 *            store数据代理
	 * @param params
	 *            数据请求参数
	 * @param isCheck
	 *            是否检查网络
	 * @param loadFormCache
	 *            是否加载换成
	 * @param key
	 *            key关键字
	 */
	pubListRefresh : function(store, params, isCheck, loadFormCache, key) {
		// 判断网络
		if(!iPass.util.PubOperation.checkConnectionStatus()){
			if (isCheck == true) {
				iPass.util.PubOperation.showTips('nonetworkconnection','normal');
			}
			// 离线加载
			if(loadFormCache){
				iPass.util.PubOperation.offlineAccess(key,store);
			}else{
				store.setData(null);
			}
			return;
		}
		
		// 缓存List参数需重新设置
		if (params) {
			var extraparams = this.pushExtraParams(params);
			store.getProxy().setExtraParams(extraparams);
			// refresh自动获取参数
			store.loadPage(1, {
				callback : function(record, operation, success) {
					if (success) {
						// 获取当前用户角色信息，并存储到全局变量中
						var response = Ext.JSON
								.decode(operation.getResponse().responseText);
						if (response.LocalUserRole != undefined)
							Global.localUserRole = response.LocalUserRole;
						
						// 检查返回数据是否为空/请求成功返回错误信息处理
						iPass.util.PubOperation.emptyDataOperation(record,
								operation.getResponse(), success);
					}else{
						iPass.util.PubOperation.showTips('requestErrorMsg',
						'failure');
					}
				},
				scope : this
			});
		}
	},
	/**
	 * store porxy jsonp动态添加用户参数
	 * 
	 * @param {}
	 *            params 请求参数对象
	 */
	pushExtraParams : function(params) {
		params.ADAccount = Global.userAccount;
		params.Token = Global.userToken;
		params.Lan = Global.language;
		return params;
	},
	/**
	 * 检查网络
	 * 
	 * @returns {Boolean}
	 */
	checkConnectionStatus : function() {
		// verification ios or android is
		if (!this.isGoogleChrome()) {
			var connectionType = PhoneGapAPI.checkConnection();
			// check connection
			if (connectionType == 'Unknownconnection'
					|| connectionType == 'Nonetworkconnection') {
				iPass.util.PubOperation.showTips('nonetworkconnection',
						"normal");
				return false;
			}
		}

		return true;
	},
	/**
	 * list请求成功（返回错误信息/空数据）
	 * 
	 * @param {}
	 *            record
	 * @param {}
	 *            responseObj
	 * @param {}
	 *            success
	 * @param {}
	 *            key       
	 */
	emptyDataOperation : function(record, responseObj, success,key) {
		// if(operation.isComplete())
		if (success) {
			var response = Ext.JSON.decode(responseObj.responseText);
			if (!response.result) {
				if (response.ErrorCode == -1) {
					iPass.util.PubOperation.showTips('abnormalMsg', 'failure');
				} else if (response.ErrorCode == -2) {
					iPass.util.PubOperation.showTips('paramsMsg', 'failure');
				} else if (response.ErrorCode == -3) {
					iPass.util.PubOperation.showTips('systemErrorMsg',
							'failure');
				} else if (response.ErrorCode == -4) {
					iPass.util.PubOperation.showTips('permissionsMsg',
							'failure');
				} else if(response.ErrorCode == -8) {
					iPass.util.PubOperation.showTips('projectStatusMsg',
					'failure');
				}else{
					
				}
			} else {
				var response = Ext.JSON.decode(responseObj.responseText),record = response.rows;
				if(key != 'checkPointHis'){
					if (!record){
						iPass.util.PubOperation.showTips('emptyDataMsg', "normal");
					}else {
						if(record.length == 0){
							iPass.util.PubOperation.showTips('emptyDataMsg', "normal");
						}
					} 
				}
			}
		} else {
			iPass.util.PubOperation.showTips('requestErrorMsg', 'failure');
		}
	},
	/**
	 * 获取当前年月
	 */
	getCurrentMonthYear : function() {
		var myDate = new Date();
		return Ext.Date.format(myDate, 'Y-m');
	},
	/**
	 * 获取当前年月日
	 */
	getCurrentDate : function() {
		var myDate = new Date();
		return Ext.Date.format(myDate, 'Y-m-d');
	},
	/**
	 * 获取当前年月日时分 Y-m-d H:i
	 */
	getCurrentTime : function() {
		var myDate = new Date();
		return Ext.Date.format(myDate, 'Y-m-d H:i');
	},
	/**
	 * 日期格式转换 中文日期/英文日期
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	dateFormatFun : function(date, format) {
		var monthArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		var text = "",dateTime = new Date(Date.parse(date));
        if(Global.language == 'zh-cn'){
            text = dateTime.getFullYear()+"年"+(dateTime.getMonth()+1)+"月"+dateTime.getDate()+"日";
        }else{
            text = monthArray[dateTime.getMonth()]+" "+dateTime.getDate()+" "+dateTime.getFullYear();
        }
        return text;
	},
	/**
	 * 日期格式转换 中文日期/英文日期
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	dateFormatMdFun : function(date, format) {
		var monthArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		var text = "",dateTime = new Date(Date.parse(date));
        if(Global.language == 'zh-cn'){
            text = (dateTime.getMonth()+1)+"月"+dateTime.getDate()+"日";
        }else{
            text = monthArray[dateTime.getMonth()]+" "+dateTime.getDate();
        }
        return text;
	},
	/**
	 * 日期格式转换 中文日期/英文日期
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	pullRefreshDataFormat : function() {
		var monthArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

        var text = "",dateTime = new Date();
        if(Global.language == 'zh-cn'){
            text = dateTime.getFullYear()+"年"+(dateTime.getMonth()+1)+"月"+dateTime.getDate()+"日"+" "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes())+":"+(dateTime.getSeconds()>9?dateTime.getSeconds():'0'+dateTime.getSeconds());
        }else{
            text = monthArray[dateTime.getMonth()]+" "+dateTime.getDate()+" "+dateTime.getFullYear()+" "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes())+":"+(dateTime.getSeconds()>9?dateTime.getSeconds():'0'+dateTime.getSeconds());
        }
        return text;
	},
	/**
	 * 格式化日期
	 * 
	 * @param {}
	 * 
	 * @return {}
	 */
	pD : function(s) {
		var dt = s.split(/ /);
		var d = dt[0].split(/-/);
		var t;
		if (dt[1]) {
			t = dt[1].split(/:/);
			t.push(0);
			t.push(0);
		} else {
			t = [ 0, 0, 0 ];
		}
		return new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]);
	},
	/**
	 * 日期转换成整数
	 * 
	 * @param {}
	 *            d
	 * @return {}
	 */
	pS : function(d) {
		var Y = d.getFullYear();
		var M = d.getMonth() + 1;
		(M < 10) && (M = '0' + M);
		var D = d.getDate();
		(D < 10) && (D = '0' + D);
		var h = d.getHours();
		(h < 10) && (h = '0' + h);
		var m = d.getMinutes();
		(m < 10) && (m = '0' + m);
		var s = d.getSeconds();
		(s < 10) && (s = '0' + s);
		return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
	},
	/**
	 * 根据key获取指定json里面的值
	 * 
	 * @param {}
	 *            key
	 * @param {}
	 *            json
	 * @return {}
	 */
	JSONForKey : function(key, json) {
		// 转换成json对象
		var jsonObj = Ext.JSON.decode(json);
		return jsonObj[key];
	},
	/**
	 * 日期格式转换
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	dataFormatLogogram : function(date, format) {
		var now = new Date(), monthArray = [ "Jan", "Feb", "Mar", "Apr", "May",
				"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		if (date == "0001/1/1 0:00:00" || date == '') {
			return '';
		} else {
			 var day = (new Date()).getDate(),month = (new Date()).getMonth(),year = (new Date()).getFullYear(),
			 	 today = new Date(year + '/' + (month+1) + '/' + day + ' 00:00:00'),
			 	 serverDate = new Date(Date.parse(date)),
	    		 dt = parseFloat((now - serverDate) / 3600000).toFixed(2);
	            
//	    		console.log('today: '+ today);
//	    		console.log('serverDate: '+serverDate);
//	    		console.log('dt:' + dt);
//	    		console.log(today >= serverDate);
	            if(today < serverDate){
	            	if (dt > 2 && dt < 24) {
	    				return parseInt(dt) + Global.getTipsMsg('hours');
	    			} else if (dt > 1 && dt < 2) {
	    				return parseInt(dt) + Global.getTipsMsg('hour');
	    			} else {
	    				var time = parseInt(dt * 60) > 0 ? parseInt(dt * 60) : 0;
	    				return time + Global.getTipsMsg('minute');
	    			}
	            }else{
	            	var text = "";
 	                if(Global.language == 'zh-cn'){
 	                    text = serverDate.getFullYear()+"年"+(serverDate.getMonth()+1)+"月"+serverDate.getDate()+"日"+" "+(serverDate.getHours()>9?serverDate.getHours():'0'+serverDate.getHours())+":"+(serverDate.getMinutes()>9?serverDate.getMinutes():'0'+serverDate.getMinutes());
 	                }else{
 	                    text = monthArray[serverDate.getMonth()]+" "+serverDate.getDate()+" "+serverDate.getFullYear()+" "+(serverDate.getHours()>9?serverDate.getHours():'0'+serverDate.getHours())+":"+(serverDate.getMinutes()>9?serverDate.getMinutes():'0'+serverDate.getMinutes());
 	                }
 	                return text;
	            }
	            
//			var dateTime = new Date(Date.parse(date));
//			var dt = parseFloat((now - dateTime) / 3600000).toFixed(2);
//
//			if (dt >= 24) {
//				var currentTime = parseInt(dt/24);
//	            if(currentTime<=1){
//	                return currentTime + Global.getTipsMsg('day') + " "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes());
//	            }
//	            else if(currentTime<=7 && currentTime>1){
//	                return currentTime + Global.getTipsMsg('days') + " " + (dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes());
//	            }else{
//	                var text = "";
//	                if(Global.language == 'zh-cn'){
//	                    text = dateTime.getFullYear()+"年"+(dateTime.getMonth()+1)+"月"+dateTime.getDate()+"日"+" "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes());
//	                }else{
//	                    text = monthArray[dateTime.getMonth()]+" "+dateTime.getDate()+" "+dateTime.getFullYear()+" "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes());
//	                }
//	                return text;
//	            }
//			} else if (dt > 2 && dt < 24) {
//				return parseInt(dt) + Global.getTipsMsg('hours');
//			} else if (dt > 1 && dt < 2) {
//				return parseInt(dt) + Global.getTipsMsg('hour');
//			} else {
//				var time = parseInt(dt * 60) > 0 ? parseInt(dt * 60) : 0;
//				return time + Global.getTipsMsg('minute');
//			}
		}
	},
	/**
	 * 计算两个日期的间隔天数
	 * 
	 * @param {}
	 *            sDate1
	 * @param {}
	 *            sDate2
	 */
	computation : function(sDate1, sDate2) {
		var aDate, oDate1, oDate2, iDays, s1, s2;
		aDate = sDate1.split("-");
		s1 = aDate[1] + '-' + aDate[2] + '-' + aDate[0];
		oDate1 = new Date(s1.replace(/-/g, "/"));
		aDate = sDate2.split("-");
		s2 = aDate[1] + '-' + aDate[2] + '-' + aDate[0];
		oDate2 = new Date(s2.replace(/-/g, "/"));

		var days = oDate2.getTime() - oDate1.getTime();
		iDays = parseInt(days / (1000 * 60 * 60 * 24));
		return iDays;
	},
	/**
	 * 获取年月日（前一个月）
	 */
	getOneMonthBeforeDate : function() {
		var myDate = new Date();
		var currentyear = myDate.getFullYear();
		var onemonthbefore = myDate.getMonth();

		if (onemonthbefore == 0) {
			currentyear = currentyear - 1;
			onemonthbefore = 12;
		}

		// 获取当月当天
		var currentDay = myDate.getDate();
		// 获取前一个月总天数
		var lastday = this.getLastDay(currentyear, onemonthbefore);
		// 如果当月当天大于上月总天数则显示上月总天数，否则显示当月当天
		if (currentDay > lastday) {
			lastday = lastday;
		} else {
			lastday = currentDay;
		}

		if (onemonthbefore < 10) {
			onemonthbefore = "0" + onemonthbefore;
		}
		if (lastday < 10) {
			lastday = "0" + lastday;
		}
		var date = currentyear + '-' + onemonthbefore + '-' + lastday;
		return date;
	},
	/**
	 * 获取年月（前一个月）
	 */
	getOneMonthBefore : function() {
		var myDate = new Date();
		var currentyear = myDate.getFullYear();
		var onemonthbefore = myDate.getMonth();
		if (onemonthbefore < 10) {
			onemonthbefore = "0" + onemonthbefore;
		}
		var date = currentyear + '-' + onemonthbefore;
		return date;
	},
	/**
	 * 获取指定月份最后一天（本月总天数）
	 * 
	 * @param {}
	 *            year
	 * @param {}
	 *            month
	 * @return {}
	 */
	getLastDay : function(year, month) {
		// 取当前的年份
		var new_year = year;
		// 取下一个月的第一天，方便计算（最后一天不固定）
		var new_month = month++;
		// 如果当前大于12月，则年份转到下一年
		if (month > 12) {
			// 月份减
			new_month -= 12;
			// 年份增
			new_year++;
		}
		// 取当年当月中的第一天
		var newnew_date = new Date(new_year, new_month, 1);
		// 获取当月最后一天日期
		return (new Date(newnew_date.getTime() - 1000 * 60 * 60 * 24))
				.getDate();
	},
	/**
	 * 阻止事件冒泡
	 * 
	 * @param {}
	 *            e
	 */
	cancelBubble : function(e) {
		if (e && e.stopPropagation)
			e.stopPropagation();
		else
			window.event.cancelBubble = true;
	},
	/**
	 * array删除指定元素
	 * 
	 * @param {}
	 *            arr
	 * @param {}
	 *            index
	 * @return {}
	 */
	removeAtArr : function(arr, index) {
		return arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
	},
	/**
	 * 清空邮件详情tpl
	 * 
	 * @param {}
	 *            panelId 要清空的面板项ID
	 */
	clearMailInfoPanel : function(panelId) {
		var infoData = {};
		var infoPanel = Ext.getCmp(panelId);
		var infoTpl = noDataSourceTpl;
		infoTpl.overwrite(infoPanel.id, infoData);
	},
	/**
	 * 加载数据前清空面板项
	 * 
	 * @param {}
	 *            panelId 要清空的面板项ID
	 */
	clearInfoPanel : function(panelId) {
		var infoData = {};
		var infoPanel = Ext.getCmp(panelId);
		var infoTpl = infoPanel.getItemTpl();
		infoTpl.overwrite(infoPanel.id, infoData);
	},
	/**
	 * 打开附件
	 */
	attsFileOpen : function(src) {
		// android
		if (Ext.os.is.Android) {
			iPass.util.PubOperation.maskMessage('附件加载中，请稍候...');
			iPass.util.PhoneGapAPI.downloadFileForAndroid(src, {
				overwrite : false,
				open : true
			}, function(res) {
			}, function(error) {
				phoneGapAPI.showAlert(error, '提示', '确定');
			});
			// ios
		} else if (Ext.os.is.iOS) {
			var nativePluginResultHandler = function(result) {
				phoneGapAPI.showAlert(result, '提示', '确定');
			};
			var nativePluginErrorHandler = function(error) {
				phoneGapAPI.showAlert(error, '提示', '确定');
			};
			iPass.util.PhoneGapAPI.downloadFileForIOS(
					nativePluginResultHandler, nativePluginErrorHandler, src);
		}
	},
	/**
	 * 金额转换千分位
	 */
	convert : function(money) {
		// 获取小数型数据
		var s = money;
		s += "";
		// 如果没有小数点，在后面补个小数点和0
		if (s.indexOf(".") == -1)
			s += ".0";
		// 正则判断
		if (/\.\d$/.test(s))
			s += "0";
		// 符合条件则进行替换
		while (/\d{4}(\.|,)/.test(s))
			// 每隔3位添加一个
			s = s.replace(/(\d)(\d{3}(\.|,))/, "$1,$2");
		return s;
	},
	/**
	 * 保留两位小数点（四舍五入）
	 * 
	 * @param x
	 * @returns
	 */
	toDecimal : function(x) {
		var f = parseFloat(x);
		if (isNaN(f)) {
			return false;
		}
		var f = Math.round(x * 100) / 100;
		var s = f.toString();
		var rs = s.indexOf('.');
		if (rs < 0) {
			rs = s.length;
			s += '.';
		}
		while (s.length <= rs + 2) {
			s += '0';
		}
		return this.convert(s);
	},
	/**
	 * 字符串替换所有
	 * 
	 * @param{} str
	 * @param{} oldstr
	 * @param{} newstr
	 */
	replaceAll : function(str, oldstr, newstr) {
		var ret = str;
		while (ret.indexOf(oldstr) != -1) {
			ret = ret.replace(oldstr, newstr);
		}
		return ret;
	},
	/**
	 * 预览相册
	 * 
	 * @params {string} url
	 */
	openImage : function(url) {
		if (Ext.os.is.Android) {
			iPass.util.PhoneGapAPI.openImageForAndroid(url, {
				overwrite : false,
				open : true
			}, function(res) {
			}, function(error) {
			});
		} else if (Ext.os.is.iOS) {
			iPass.util.PhoneGapAPI.openImageForIOS(function() {
			}, function() {
			}, url);
		}
	},
	/**
	 * 离线访问： 离线状态时（没有可用网络访问），从CMA AIO 中获取请求缓存的响应
	 * 
	 * @params {string} key 缓存关键字，唯一 返回本地缓存内容
	 * @params {obj} store
	 * @params {obj} resultFun ajaxfun callback
	 */
	offlineAccess : function(key,store,resultFun) {
		var resultFun = arguments[2];
		if (this.isGoogleChrome()) {
			var offlineLocalStore = Ext.getStore("OfflineLocalStore");
			offlineLocalStore.load();
			var record = offlineLocalStore.findRecord("cacheItem", key);
			if (record != null) {
				return record.get('resTxt');
			}
			return null;
		} else {
			var callback = function(result){
//				console.log("callback-result:"+typeof result +','+result);
				// 缓存获取并且缓存不为空
//              console.log("======result:==="+(result != null && result != ''));
				
				if(resultFun == undefined){
					// list
                    if ( result != '(null)' && result != '') { 
                    	var obj = Ext.JSON.decode(result);
//                          console.log("ok========");
                        store.setData(obj.rows);
                    }else{
//                          console.log("NO======");
                        store.setData(null);
                    }
				}else{
					// ajaxfun缓存
                    if ( result != '(null)' && result != '') {
//                          console.log("ajaxfun ok");
                        resultFun(result);
                    }else{
//                          console.log("ajaxfun NO======");
                        resultFun('');
                    }
				}
			};
			PhoneGapAPI.GetCacheInfo(key,callback);
		}
	},
	/**
	 * 在线加载： 在线状态时，在Local storage 中缓存的请求响应内容
	 * 
	 * @params {string} key 缓存关键字，唯一
	 * @params {string} response 响应的内容
	 * 
	 */
	onlineLoad : function(key, response) {
		var resTxt = '';
		if(arguments[2] == undefined){
			//　list缓存
			resTxt = response.responseText;
		}else{
			// 项目详情和项目附录ajaxfun手动缓存
			resTxt = arguments[2];
		}
		if (this.isGoogleChrome()) {
			var offlineLocalStore = Ext.getStore("OfflineLocalStore");
			// loads any existing data from localStorage
			offlineLocalStore.load();
			var record = offlineLocalStore.findRecord("cacheItem", key);
			if (record == null) {
				offlineLocalStore.add({
					cacheItem : key,
					cacheDate : new Date(),
					resTxt : resTxt
				});
			} else {
				// 只有在数据变动情况下才更新换成数据
				if (record.get('resTxt') != resTxt) {
					record.set('cacheDate', new Date());
					record.set('resTxt', resTxt);
				}
			}
			offlineLocalStore.sync();
		} else {
			PhoneGapAPI.WriteCacheInfo(key, resTxt);
		}
	},
	/**
	 * 检查点actionSheet
	 * 
	 * @params{} title
	 */
	getCheckPointSheet : function(title) {
		if (!this.checkPointActionSheet) {
			this.checkPointActionSheet = Ext.widget('checkPointActionSheet');
		}
		var checkPointActionSheet = this.checkPointActionSheet;
		Ext.Viewport.add(checkPointActionSheet);

		checkPointActionSheet.show();

		// 先清空页面的控件，然后再根据不同角色追加
		checkPointActionSheet.removeAll(true, true);
		if(Global.checkReplyItems == ''){
			if (Global.localUserRole == 'pm') {
				checkPointActionSheet.add([ {
					xtype : 'panel',
					margin : 'auto auto 2em auto',
					style : 'text-align:center;color:white;word-break:break-word',
					html : title
				}, {
					name : '01',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.oK'
					}
				}, {
					name : '03',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.PMalternativeAccepted'
					}
				}, {
					name : '04',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.nA'
					}
				}, {
					ui : 'normal',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.cancel'
					},
					handler : function() {
						this.up('actionsheet').hide();
					}
				} ]);
			} else if (Global.localUserRole == 'dm') {
				checkPointActionSheet.add([ {
					xtype : 'panel',
					margin : 'auto auto 2em auto',
					style : 'text-align:center;color:white;word-break:break-word',
					html : title
				}, {
					name : '01',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.oK'
					}
				}, {
					name : '02',
					ui : 'decline',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.notOK'
					}
				}, {
					name : '03',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.DMalternativeAccepted'
					}
				}, {
					name : '04',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.nA'
					}
				}, {
					ui : 'normal',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.cancel'
					},
					handler : function() {
						this.up('actionsheet').hide();
					}
				} ]);
			}	
		}else{
			checkPointActionSheet.add([ {
				xtype : 'panel',
				margin : 'auto auto 2em auto',
				style : 'text-align:center;color:white;word-break:break-word',
				html : title
			}, {
				name : '01',
				cls : 'actionsheetBtn',
				locales : {
					html : 'actionSheet.oK'
				}
			}, {
				name : '02',
				ui : 'decline',
				cls : 'actionsheetBtn',
				locales : {
					html : 'actionSheet.notOK'
				}
			}, {
				name : '04',
				cls : 'actionsheetBtn',
				locales : {
					html : 'actionSheet.nA'
				}
			}, {
				ui : 'normal',
				cls : 'actionsheetBtn',
				locales : {
					html : 'actionSheet.cancel'
				},
				handler : function() {
					this.up('actionsheet').hide();
				}
			} ]);
		}
	},
	/**
	 * 设置过滤条件选中项
	 * @param scopeSegBtn
	 * @param filterCondition
	 */
	setfilterPressed : function(scopeSegBtn,filterCondition){
		switch(filterCondition){
			case 'DMunchecked' : 
				scopeSegBtn.setPressedButtons(scopeSegBtn.getItems().items[0]);
				break;
			case 'PMunchecked':
				scopeSegBtn.setPressedButtons(scopeSegBtn.getItems().items[1]);
				break;
			case 'issues':
				scopeSegBtn.setPressedButtons(scopeSegBtn.getItems().items[2]);
				break;
			case 'all':
				scopeSegBtn.setPressedButtons(scopeSegBtn.getItems().items[3]);
				break;
		}
	}
});
