/**
 * 检查项列表store
 * 
 * @author yangkun
 * @create 2013-09-26
 */
Ext.define('iPass.store.CheckItemsList', {
	extend : 'Ext.data.Store',
	config : {
		model : 'iPass.model.CheckItemsList',
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
//					iPass.util.PubOperation.offlineAccess("checkItemsList", "CheckItemsList", operation);
				}
			}
		},
		listeners : {
			load : function(store, records, successful, operation, eOpts) {
				if (successful && operation.getResponse()) {
					var params = operation.getRequest().getParams();
					iPass.util.PubOperation.onlineLoad("checkItemsList"+params.ProjectCode+params.ItemCode+params.FilType,operation.getResponse());
				}
			}
		}
	}
});