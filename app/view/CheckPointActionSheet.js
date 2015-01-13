/**
 * 检查Action
 * 
 * @author yangkun
 * @create 2013-09-27
 */
Ext.define('iPass.view.CheckPointActionSheet', {
	extend : 'Ext.ActionSheet',
	xtype : 'checkPointActionSheet',
	id : 'checkPointActionSheet',
	config : {
		ui : 'normal',
		modal : true,
		hideOnMaskTap : true
	},
	initialize : function() {
		this.callParent(arguments);
	}
});