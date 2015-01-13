/**
 * 项目阶段列表store
 * @author duwei
 * @date 2013-09-25
 */
Ext.define('iPass.store.ProjectPhaseList', {
	extend : 'Ext.data.Store',
	config : {
		model : 'iPass.model.ProjectPhaseList',
		autoLoad : false,
		pageSize : 10,
		proxy : {
			type : 'ajax',
			url : Global.domain+ '/api/GetCheckItemList.ashx',
			timeout : 50000,
			reader : {
				type : 'json',
				rootProperty : 'rows'
			},
			listeners : {
				exception : function(proxy, response, operation) {
//					iPass.util.PubOperation.offlineAccess("projectPhaseList", "ProjectPhaseList", operation);
				}
			}
		},
		listeners : {
			load : function(store, records, successful, operation, eOpts) {
				if (successful && operation.getResponse()) {
					var params = operation.getRequest().getParams();
					iPass.util.PubOperation.onlineLoad("projectPhaseList"+params.ProjectCode+params.ItemCode,operation.getResponse());
				}
			}
		}
	}
});