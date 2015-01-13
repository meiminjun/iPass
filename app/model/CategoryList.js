/**
 * 分类列表model
 * 
 * @author yangkun
 * @create 2013-10-10
 */
Ext.define('iPass.model.CategoryList', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			name : 'TypeName',
			type : 'string'
		}, {
			name : 'TypeCode',
			type : 'string'
		}, {
			name : 'TypeDescription',
			type : 'string'
		}]
	}
});