/**
 * 检查点model
 * 
 * @author yangkun
 * @create 2013-09-29
 */
Ext.define('iPass.model.CheckStatusInp', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		}, {
			name : 'type',
			type : 'string'
		}, {
			name : 'cls',
			type : 'string'
		}, {
			name : 'text',
			type : 'string'
		} ]
	}
});