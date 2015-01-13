/**
 * 首页controller
 */
Ext.define('iPass.controller.SettingView', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'main',
			checkPointList : 'settingview list'
		},
		control : {
			checkPointList : {
				itemsingletap : 'onCheckPointListTap'
			}
		}
	},
	/**
	 * 设置语言
	 * @param list
	 * @param index
	 * @param item
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	onCheckPointListTap : function(list, index, item, record, e, eOpts){
		iPass.util.PubOperation.showLoadMask(Global.getTipsMsg('switchLanguage'),true);
		Global.language = record.get('value');
		//缓存当前用户选择的语言数据
		iPass.util.PubOperation.onlineLoad('iPassLanguage',null,record.get('value'));
		iPass.ux.Manager.updateLocale(record.get('value'));
		var main = this.getMain();
		
		setTimeout(function(){
			main.pop();
			iPass.util.PubOperation.hideLoadMask();
		},1000);
	}
});