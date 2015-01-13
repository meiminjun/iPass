/**
 * 检查附件版本详情 store
 */
Ext.define('iPass.store.ProjectFileList', {
	extend : 'Ext.data.Store',
	config : {
		model : 'iPass.model.ProjectFileList',
		autoLoad : false,
		pageSize : 10,
		grouper : {
			groupFn : function(record) {
				return record.get('VersionNo');
			}
		},
		sorters :[{
	    	property : "CreateTime2",
	    	direction: "DESC"
	    }]
	}
});