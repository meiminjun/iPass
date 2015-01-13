/**
 * phoneGap js with native api
 * 
 * @author yangkun
 * @date 2013-9-30
 */

// Call onDeviceReady when Cordova is loaded.
//
// At this point, the document has loaded but cordova-2.5.0.js has not.
// When Cordova is loaded and talking with the native device,
// it will call the event `deviceready`.
//
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}
/**
 * phoneGap js with native api
 * 
 * @author duwei
 * @date 2013-10-09
 */
function onDeviceReady() {
	// 注册回退按钮事件监听器
	document.addEventListener("backbutton", onBackKeyDown, false);
}

/**
 * android返回键处理
 * 
 * @author duwei
 * @date 2013-10-09
 */
function onBackKeyDown() {
	
	var navigationViewId = Global.navigationViewId, navigationObj = Ext.getCmp(navigationViewId);

	if (navigationObj) {
		// navigationView parent
		if (navigationObj.getInnerItems().length > 1) {
			// 检查编辑
			if(Global.ckPointHisSub == 'checkEditor'){
				// show DraftActionSheet back before
				mainCtr.navigationViewBack();
			// 检查输入项
			}else if(Global.ckPointHisSub == 'checkStatusInp'){
				 mainCtr.checkStatusInpBack();
			}else{
				navigationObj.pop();
			}
		} else {
			PhoneGapAPI.exit();
		}
	} else {
		PhoneGapAPI.exit();
	}
}

var PhoneGapAPI = {
	/**
	 * 退出程序
	 */
	exit : function() {
		Cordova.exec(null, null, "Application", "exit", [ Global.inboxUnreadCnt, -1, "no", Global.appID ]);
		// 此处加上退出App的逻辑 ， 待API提供中
		// window.localStorage.clear();
	},
	/**
	 * 获取登录用户信息
	 * @param callback
	 */
	getLoginUserInfo : function(callback) {
		Cordova.exec(function(result){
			Global.userAccount = result.userName;
			Global.userToken = result.userToken;
			Global.userPwd = result.userPassword;
			Global.appID = result.appID;
			Global.deviceType = result.device;
			Global.longitude = result.longitude;
			Global.latitude = result.latitude;
			Global.pushFlag = result.pushFlag;
			
			
			Global.CMAAIOKey = result.CMAAIO;
			if (Global.pushFlag == "1") {
				Cordova.exec(function(result) {
					Global.pushType = result.pushType;
					// pushType="iTell";
					// pushType="iTellInbox";
					Global.pushCode = result.pushCode;
					console.log("result.pushType:" + result.pushType);
					console.log("result.pushCode:" + result.pushCode);

				}, null, "UserInfo", "GetSettingInfo", []);
			}
			// callback fun
			callback();
		}, null, "UserInfo", "GetUserInfo", []);
	},
	/**
	 * 检测网络状态
	 */
	checkConnection : function(){
		var networkState = navigator.network.connection.type;

		var states = {};
		states[Connection.UNKNOWN] = 'Unknownconnection';
		states[Connection.ETHERNET] = 'Ethernetconnection';
		states[Connection.WIFI] = 'WiFiconnection';
		states[Connection.CELL_2G] = 'Cell2Gconnection';
		states[Connection.CELL_3G] = 'Cell3Gconnection';
		states[Connection.CELL_4G] = 'Cell4Gconnection';
		states[Connection.NONE] = 'Nonetworkconnection';

		return states[networkState];
	},
	/**
	 * 存储缓冲
	 * @param key
	 * @param val
	 */
	WriteCacheInfo : function(key,val){
//		return null;
		Cordova.exec(function(result){
//			 alert('写入缓存成功'+val);
			 console.log("写入本地缓存成功:" + (new Date()).getTime());
		},null,"UserInfo", "WriteApplicationCacheInfo",[key,val,'iPass']);
	},
	/**
	 * 获取缓冲
	 * @param key
	 */
	GetCacheInfo : function(key,callback){
//		var str = "{\"result\":true,\"ErrorCode\":\"0\",\"rows\":[{\"TypeName\":\"M & E\",\"TypeCode\":\"Mod_CS\",\"TypeDescription\":\"Mechanical & Electrical\"},{\"TypeName\":\"C & S\",\"TypeCode\":\"Mod1\",\"TypeDescription\":\"Civil & Structure\"},{\"TypeName\":\"TestNewTemplate\",\"TypeCode\":\"58820f97-0d35-4447-bc1f-76ebc736ab33\",\"TypeDescription\":\"TestNewTemplate\"},{\"TypeName\":\"测试测试测试测\",\"TypeCode\":\"14b6302c-43c0-4abf-b6e5-187155cb6604\",\"TypeDescription\":\"测试测试测试测试测试\"}]}";
//		callback(str);
		Cordova.exec(function(result){
//			alert('获取缓存成功'+result);
			console.log("获取本地缓存成功:" + (new Date()).getTime());
			callback(result);
		},null,"UserInfo", "GetApplicationCacheInfo",[key,'iPass']);
	},
	checkAtt : function(Url) {
		Cordova.exec(function(result) {
   		}, function(fail) {
   		}, "UserInfo", "openUrl", [Url]);
	}
};