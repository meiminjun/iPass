/**
 * 收信箱列表model
 * 
 * @author yangkun
 * @create 2013-10-28
 */
Ext.define('iPass.model.InboxView', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			name : 'ProjectCode',
			type : 'string'
		}, {
			name : 'ProjectName',
			type : 'string'
		}, {
			name : 'ScheduledTime',
			type : 'string'
		}, {
			name : 'MessageType',
			type : 'string'
		}, {
			name : 'CreateTime',
			type : 'string'
		},{
			name : 'TemplateCode',
			type : 'string'
		},
		{
			name : 'rows',
			type : 'object'
		} ]
	}
});