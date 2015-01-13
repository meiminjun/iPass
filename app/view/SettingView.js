/**
 * Created with JetBrains WebStorm. User: issuser Date: 13-6-19 Time: 下午4:23 To
 * change this template use File | Settings | File Templates.
 */
Ext.define('iPass.view.SettingView', {
	extend : 'Ext.Container',
	xtype : 'settingview',
	requires : [ 'Ext.form.FieldSet', 'Ext.List' ],
	config : {
		fullscreen : true,
		padding : '10px 10px 10px 10px',
		items : [ {
			xtype : 'fieldset',
			style : 'font-size:12px',
			height : 'auto',
			locales  : {
                title        : 'settingview.fieldset.title',
                instructions : 'settingview.fieldset.instructions'
            },
			items : [ {
				xtype : 'list',
				loadingText : false,
				height : 108,
				scrollable : false,
				itemTpl : '<div class="settinglist defaultFont-style">{title}</div>',
				selectedCls : 'settingSelected',
				data : [ {
					title : "中文",
					value : 'zh-cn'
				}, {
					title : "English",
					value : 'en-us'
				} ]
			} ]
		} ]
	},
	initialize : function() {
		this.callParent(arguments);
		var languageList = this.down('list'), store = languageList.getStore();
		var record = store.findRecord('value',Global.language);

		languageList.select(record, true, true);
	}
});