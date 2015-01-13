//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'iPass': 'app'
});
//</debug>

Ext.require('iPass.util.PubOperation');

Ext.require('iPass.ux.Manager');
Ext.require('iPass.ux.CustomLoading');
Ext.require('iPass.ux.ImageViewer');

Ext.require('iPass.ux.override.Component');
Ext.require('iPass.ux.override.Button');
Ext.require('iPass.ux.override.Container');
Ext.require('iPass.ux.override.TitleBar');
Ext.require('iPass.ux.override.field.Field');
Ext.require('iPass.ux.override.field.DatePicker');
Ext.require('iPass.ux.override.form.FieldSet');
Ext.require('iPass.ux.override.navigation.Bar');
Ext.require('iPass.ux.override.navigation.View');
Ext.require('iPass.ux.override.picker.Picker');
Ext.require('iPass.ux.override.picker.Date');
Ext.require('iPass.ux.override.plugin.ListPaging');
Ext.require('iPass.ux.override.plugin.PullRefresh');

Ext.application({
    name: 'iPass',

    requires: [
       'Ext.MessageBox',
       'Ext.data.proxy.LocalStorage',
       'iPass.util.PubOperation',

       'iPass.ux.Manager',
       'iPass.ux.CustomLoading',
       'iPass.ux.ImageViewer',
       
       'iPass.ux.override.Component',
       'iPass.ux.override.Button',
       'iPass.ux.override.Container',
       'iPass.ux.override.TitleBar',
       'iPass.ux.override.field.Field',
       'iPass.ux.override.field.DatePicker',
       'iPass.ux.override.form.FieldSet',
       'iPass.ux.override.navigation.Bar',
       'iPass.ux.override.navigation.View',
       'iPass.ux.override.picker.Picker',
       'iPass.ux.override.picker.Date',
       'iPass.ux.override.plugin.ListPaging',
       'iPass.ux.override.plugin.PullRefresh'
    ],
   
    views: ['Internationalization','Main','CategoryList','InboxFilter','InboxView','SettingView','ProjectList','AppendixList','ProjectDetails','ContractorList','ProjectPhaseList','CheckScopeList','CheckItemsList','CheckPointList','CheckPointContent','CheckPointActionSheet','CheckPointHis','CheckStatusInp','CheckEditor','DelDraftActionSheet','PhotoActionSheet','CarouselView','ChangePointList','ProjectFileList','ProjectFileDetail'],
    
    models: ['CategoryList','InboxView','ProjectList','AppendixList','ProjectPhaseList','CheckScopeList','CheckItemsList','CheckPointList','CheckPointHis','CheckStatusInp','ContractorList','ChangePointList','ProjectFileList'],
    
    controllers : ['Internationalization','Main','CategoryList','InboxView','SettingView','ProjectList','AppendixList','ProjectPhaseList','CheckScopeList','CheckItemsList','CheckPointList','CheckPointActionSheet','CheckStatusInp','ChangePointList'],
    
    stores: ['CategoryList','InboxView','ProjectList','AppendixList','ProjectPhaseList','CheckScopeList','CheckItemsList','CheckPointList','CheckPointHis','ContractorList','OfflineLocalStore','ChangePointList','ProjectFileList','ProjectFileDetail'],
    
    isIconPrecomposed: true,

    launch: function() {
        // get index controller
        mainCtr = this.getApplication().getController('Main');
        proListCtr = this.getApplication().getController('ProjectList');
        checkPointListCtr = this.getApplication().getController('CheckPointList');
        checkPointActionSheetCtr = this.getApplication().getController('CheckPointActionSheet');
        checkStatusInpStr = this.getApplication().getController('CheckStatusInp');
        categoryListCtr = this.getApplication().getController('CategoryList');
        inboxViewCtr = this.getApplication().getController('InboxView');
        appendixListCtr = this.getApplication().getController('AppendixList');
        projectPhaseListCtr = this.getApplication().getController('ProjectPhaseList');
        checkScopeListCtr = this.getApplication().getController('CheckScopeList');
        //获取用户选择的语言缓存信息
    	iPass.util.PubOperation.initLanguage();
    	// 推送入口
//  	if(Global.pushFlag == 1){
//  		mainCtr.goToDetail(Global.pushCode);
//			alert("plushFlag"+Global.pushFlag+"Global.pushCode");
//  	}
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
