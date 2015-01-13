/*
 * @class iPass.util.Global
 * @desc Tour Global
 */
var mainCtr,proListCtr, checkPointListCtr,checkPointActionSheetCtr,checkStatusInpStr,categoryListCtr,inboxViewCtr,appendixListCtr,projectPhaseListCtr,checkScopeListCtr;

var Global = {
	/*
	 * _globleParam_countryCode :全局变量 ，记录检查项编码 _globleParam_checkItemCode :全局变量
	 * ，记录检查项编码 _globleParam_floorName :全局变量 ，记录检查点编码 _globleParam_pointCode
	 * :全局变量 ，记录检查点编码 _globleParam_pointName :全局变量 ，记录检查点名称
	 * _globleParam_marketCode :全局变量 ，记录商场ID _globleParam_userName :
	 * 全局变量，记录用户账户名 _globleParam_userToken : 全局变量，记录Token值
	 * _globleParam_checkPointType :
	 * 用于在用户在checkpointview上点击不同的按钮时，取哪一个localstorage的值 _globleParam_telephone :
	 * 商场经理的电话 _globleParam_numberCode : _globleParam_floorCode : 楼层编码
	 * 
	 */
	userAccount : "huangcheng1",
	userToken : "R3TWGNeql8k3bamyXzhURhwbbIxi6z56",
	// liuyifei pwd:simon_401a
	// AppTestUser15 pwd:p@ssword123
	userPwd : "hc@12345",
	appID : '',
	localUserRole : '',
	width : "",
	height : "",
	longitude : "",
	latitude : "",
	deviceType : "",
	requestObj : "",
	pushFlag : "",
	pushType : "",
	pushCode : "",
	language : "zh-cn",
	domain : "https://mipassuat.capitaretail.com.cn",
//	domain : "http://10.36.70.153:81",
	loadingTpl : '<div class="text-overflow" style="float:left;max-width:80%">{0}</div><div style="float:left;width:25px;"><img style="width:1.5em;vertical-align: middle;padding-left: 3px;" src="./resources/images/mask/load.gif" /></div>',
	inboxUnreadCnt : -1,
	ckPointHisParam : null,
	ckPointRecord : null,
	projectInfo : null,
	checkPointHis : null,
	checkStoreName : '',
	ckPointHisSummaryRecord : null,
	globleParam_imgeUrl1 : '',
	globleParam_imgeUrl2 : '',
	globleParam_imgeUrl3 : '',
	/**
	 * 过滤条件
	 */
	filterCondition : 'all',
	/**
	 * 收件箱筛选起始日期
	 */
	startTime : '',
	/**
	 * 收件箱筛选截止日期
	 */
	endTime : '',
	/**
	 * 项目列表param
	 */
	proListPm : null,
	/**
	 * 项目附录列表param
	 */
	proAppendPm : null,
	/**
	 * 项目阶段列表param
	 */
	proPhasePm : null,
	/**
	 * 项目检查混合列表param
	 */
	proScopePm : null,
	/**
	 * 项目检查项列表param
	 */
	proItemPm : null,
	/**
	 * 项目检查点列表param
	 */
	proPointPm : null,
	/**
	 * 收件箱请求param
	 */
	inboxPm : null,
	/**
	 * 项目状态
	 */
	projectStatus : '',
	/**
	 * 所属项目编码
	 */
	projectCode : '',
	/**
	 * 模板ID
	 */
	templateCode : '',
	/**
	 * 检查项混合code
	 */
	scopeCode : 0,
	/**
	 * 检查项code
	 */
	itemCode : 0,
	/**
	 * 检查点code
	 */
	pointCode : 0,
	/**
	 * 查询字符串(后面的参数中需要使用到,不绑定到页面,与数据结构有关)
	 */
	itemCodeDsc : '',
	/**
	 * PM是否检查
	 */
	PMChecked : false,
	/**
	 * 项目附录筛选类型
	 */
	appendListFilType : '',
	/**
	 * 检查点用户选择的值
	 */
	checkPointStatus : '',
	/**
	 * 检查点用户选中的item
	 */
	checkPointCode : '',
	/**
	 * 检查点用户选中
	 */
	checkReplyItems : '',
	/**
	 * 输入项默认值
	 */
	replyItemsPMLastCheck : '',
	/**
	 * 检查点用户选中
	 */
	checkIndex : -1,
	/**
	 * 历史上级页面
	 */
	checkHisStoreName : '',
	/**
	 * navigationView id
	 */
	navigationViewId : 'mainNavigationView',
	/**
	 * 历史页面子级
	 */
	ckPointHisSub : '',
	/**
	 * 项目列表子级
	 */
	projectListSub : '',
	/**
	 * 检查点列表子级
	 */
	ckPointListSub : '',
	/**
	 * 检查混合列表子级
	 */
	ckScopeListSub : '',
	/**
	 * 检查项列表子级
	 */
	ckItemListSub : '',
	/**
	 * 提示语(加载中)配置
	 */
	loadingMsg : {
		"zh-cn" : "数据加载中，请稍候...",
		"en-us" : "Data is loading, please wait..."
	},
	//  ========== 
	//  = 历史计划变更 = 
	//  ========== 
	changePointTitle:{
		"zh-cn" : "历史计划变更",
		"en-us" : "Schedule Change History"
	},
	/**
	 * 历史页面标题
	 */
	historyTitle : {
		"zh-cn" : "历史",
		"en-us" : "History"
	},
	/**
	 * 获取LoadingMsg字符
	 * @returns
	 */
	getLoadingMsg : function() {
		var language = this.language,
		loadingMsg = this.loadingMsg[language];
		
		return loadingMsg;
	},
	/**
	 * 获取附件上传msg
	 */
	getUploadingMsg : function(){
		var language = this.language,
		upLoadingMsg = this.uploadingMsg[language];
		
		return upLoadingMsg;
	},
	/**
	 * 提示语配置
	 */
	tipsMsg : {
		"hisNoContent" : {
			"zh-cn" : "暂无备注",
			"en-us" : "No note"
		},
		"schedule" : {
			"zh-cn" : "计划",
			"en-us" : "Schedule"
		},
		"lastCheckUser" : {
			"zh-cn" : "最后回复人",
			"en-us" : "Last one"
		},
		"minute" : {
			"zh-cn" : "分钟前",
			"en-us" : "min ago"
		},
		"hour" : {
			"zh-cn" : "小时前",
			"en-us" : "hr ago"
		},
		"hours" : {
			"zh-cn" : "小时前",
			"en-us" : "hrs ago"
		},
		"day" : {
			"zh-cn" : "天前",
			"en-us" : "day ago"
		},
		"days" : {
			"zh-cn" : "天前",
			"en-us" : "days ago"
		},
		/**
		 * 提交成功
		 */
		"succeedMsg" : {
			"zh-cn" : "数据提交成功.",
			"en-us" : "Data submitted to the success."
		},
		/**
		 * 提交失败
		 */
		"failureMsg" : {
			"zh-cn" : "数据提交失败.",
			"en-us" : "Data submission failed."
		},
		/**
		 * 服务器请求错误
		 */
		"requestErrorMsg" : {
			"zh-cn" : "请求服务器失败，请稍候重试.",
			"en-us" : "Request that the server failed, please try again."
		},
		/**
		 * 空数据
		 */
		"emptyDataMsg" : {
			"zh-cn" : "暂无数据.",
			"en-us" : "No data."
		},
		/**
		 * 必填项
		 */
		"requiredMsg" : {
			"zh-cn" : "请输入内容.",
			"en-us" : "Please enter the content."
		},
		/**
		 * 无网络连接
		 */
		"nonetworkconnection" : {
			"zh-cn" : "网络连接不可用.",
			"en-us" : "Network connection is unavailable."
		},
		/**
		 * 系统异常错误
		 */
		"abnormalMsg" : {
			"zh-cn" : "系统异常.",
			"en-us" : "System abnormalities."
		},
		/**
		 * 参数错误错误
		 */
		"paramsMsg" : {
			"zh-cn" : "参数错误.",
			"en-us" : "Parameter error."
		},
		/**
		 * 系统错误
		 */
		"systemErrorMsg" : {
			"zh-cn" : "系统错误.",
			"en-us" : "System Error."
		},
		/**
		 * 无权限
		 */
		"permissionsMsg" : {
			"zh-cn" : "无权限.",
			"en-us" : "No permissions."
		},
		/**
		 * 项目状态，提示
		 */
		"projectStatusMsg" : {
			"zh-cn" : "项目已结项或暂停,不能提交数据.",
			"en-us" : "Project has knot or pause, you can not submit data."
		},
		/**
		 * 拍照提示
		 */
		"photoMsg" : {
			"zh-cn" : "最多保存三张图片.",
			"en-us" : "Only support to upload three images or less."
		},
		/**
		 * 提示
		 */
		"Prompt" : {
			"zh-cn" : "提示",
			"en-us" : "Prompt"
		},
		/**
		 * 确定
		 */
		"OK" : {
			"zh-cn" : "确定",
			"en-us" : "OK"
		},
		/**
		 * 数据提交
		 */
		"dataSubmission" : {
			"zh-cn" : "数据提交中，请稍候...",
			"en-us" : "Data submission, please wait..."
		},
		/**
		 * 图片上传
		 */
		"picUpload" : {
			"zh-cn" : "附件上传中，请稍候...",
			"en-us" : "Annex upload, please wait..."
		},
		/**
		 * 图片加载
		 */
		"picLoad" : {
			"zh-cn" : "图片加载中，请稍候...",
			"en-us" : "Image loading, please wait..."
		},
		/**
		 * 切换语言提示语
		 */
		"switchLanguage" : {
			"zh-cn" : "设置语言中...",
			"en-us" : "Setting Language..."
		},
		/**
		 * 检查输入项标题
		 */
		"checkInpTitle" : {
			"zh-cn" : "备注",
			"en-us" : "Remarks"
		},
		/**
		 * 显示图片
		 */
		"showPicText" : {
			"zh-cn" : "显示图片",
			"en-us" : "Show picture"
		},
		/**
		 * 总包分包空提示
		 */
		"consultantEmpty" : {
			"zh-cn" : "空",
			"en-us" : "empty"
		},
		/**
		 * 联系人
		 */
		"consultantContantText" : {
			"zh-cn" : "联系人",
			"en-us" : "Contacts"
		},
		"all" : {
			"zh-cn" : "全部",
			"en-us" : "All"
		},
		"scheduleChanged" : {
			"zh-cn" : "计划变更",
			"en-us" : "Schedule changed"
		},
		"projectRelease" : {
			"zh-cn" : "项目发布",
			"en-us" : "Project release"
		},
		"notOK" : {
			"zh-cn" : "不通过",
			"en-us" : "NotOK"
		},
		"delay" : {
			"zh-cn" : "过期",
			"en-us" : "Delay"
		},
		"projeceCompleted" : {
			"zh-cn" : "项目结项",
			"en-us" : "Projece completed"
		},
		"announcement" : {
			"zh-cn" : "公告信息",
			"en-us" : "Announcement"
		},
		"willexpire" : {
			"zh-cn" : "即将过期",
			"en-us" : "Will expire"
		},
		"dateInvalid" : {
			"zh-cn" : "起始日期大于截止日期",
			"en-us" : "Start date is greater than the end date"
		},
		"pmIsCheck" : {
			"zh-cn" : "PM还未检查，暂无数据.",
			"en-us" : "PM has not been checked, no data."
		},
		"pausedMsg" : {
			"zh-cn" : "项目已暂停，只能查看。",
			"en-us" : "The project/Mall was paused. It’s read only."
		},
		"completedMsg" : {
			"zh-cn" : "项目已结项，只能查看。",
			"en-us" : "The project/Mall had been completed. It’s read only."
		},
		"okMsg" : {
			"zh-cn" : "通过",
			"en-us" : "Pass"
		},
		"OriginalDate" : {
			"zh-cn" : "原计划日期",
			"en-us" : "Original schedule date"
		},
		"NewSchDate" : {
			"zh-cn" : "新计划日期",
			"en-us" : "New schedule date"
		},
		"ChangeReson" : {
			"zh-cn" : "修改理由",
			"en-us" : "Change reason"
		},
		"Schedule" : {
			"zh-cn" : "计划",
			"en-us" : "Schedule"
		}
	},
	/**
	 * 
	 * @param key
	 */
	getTipsMsg : function(key) {
		var language = this.language;
		if(this.tipsMsg[key]){
			return this.tipsMsg[key][language];
		}else{
			return null;
		}
	}
};

/**
 * string format格式化
 * @param args
 * @returns {String}
 */
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                	//var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                	var reg=new RegExp ("({)"+i+"(})","g"); 
                	result = result.replace(reg, arguments[i]); 
                }
            }
        }
    }
    return result;
};