/**
 * 检查点检查状态(输入)
 * 
 * @author yangkun
 * @create 2013-09-29
 */
Ext.define('iPass.view.CheckStatusInp', {
	extend : 'Ext.Container',
	xtype : 'checkStatusInp',
	requires : [ 'Ext.Label', 'Ext.field.Text' ],
	config : {
		ui : 'normal',
		scrollable : {
			direction : 'vertical',
			directionLock : true
		},
		padding : '5 10 5 10',
		cls : 'defaultFont-style',
		defaults : {
			margin : '10 0 10 0'
		}
	}
});