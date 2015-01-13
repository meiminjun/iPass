/**
 * 检查附件版本详情 store
 */
Ext.define('iPass.store.ProjectFileDetail', {
	extend : 'Ext.data.Store',
	config : {
		model : 'iPass.model.ProjectFileList',
		autoLoad : false,
		pageSize : 10,
		grouper : {
			groupFn : function(record) {
				return record.get('VersionNo');
			},
			sortProperty : 'CreateTime2',
			direction : 'DESC'
		},
		sorters :[{
	    	property : "CreateTime2",
	    	direction: "DESC"
	    }],
		proxy : {
			type : 'ajax',
			url : Global.domain+ '/api/GetProjectItemAttachDetails.ashx',
			timeout : 50000,
			reader : {
				type : 'json',
				rootProperty : 'rows_CMA_PROJECT_CHECK_ITEM_ATTACH'
			},
			listeners : {
				exception : function(proxy, response, operation) {
//					iPass.util.PubOperation.offlineAccess("projectFileDetail", "ProjectFileDetail", operation);
				}
			}
		},
		listeners : {
			load : function(store, records, successful, operation, eOpts) {
//				if (successful && operation.getResponse()) {
//					var param = operation.getRequest().getParams();
//					iPass.util.PubOperation.onlineLoad("projectFileDetail"+param.ProjectCode+param.ItemCode+param.Id,operation.getResponse());
//				}
			}
		}
	}
});