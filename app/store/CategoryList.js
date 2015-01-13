/**
 * 分类列表store
 * 
 * @author yangkun
 * @create 2013-10-10
 */
Ext.define('iPass.store.CategoryList', {
	extend : 'Ext.data.Store',
	config : {
		model : 'iPass.model.CategoryList',
		autoLoad : false,
		pageSize : 10,
		proxy : {
			type : 'ajax',
			url : Global.domain+ '/api/GetProjectTypeList.ashx',
			timeout : 50000,
			reader : {
				type : 'json',
				rootProperty : 'rows'
			},
			listeners : {
				exception : function(proxy, response, operation) {
//					iPass.util.PubOperation.offlineAccess("categoryList", "CategoryList", operation);
				}
			}
		},
		listeners : {
			load : function(store, records, successful, operation, eOpts) {
				if (successful && operation.getResponse()) {
					var params = operation.getRequest().getParams();
					iPass.util.PubOperation.onlineLoad("categoryList"+params.ProjectCode,operation.getResponse());
				}
			}
		}
	}
});