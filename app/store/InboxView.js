/**
 * 收信箱列表store
 * 
 * @author yangkun
 * @create 2013-10-28
 */
Ext.define('iPass.store.InboxView', {
	extend : 'Ext.data.Store',
	config : {
		model : 'iPass.model.InboxView',
		autoLoad : false,
		pageSize : 10,
		proxy : {
			type : 'ajax',
			url : Global.domain+ '/api/GetInboxMessageList.ashx',
			timeout : 50000,
			limitParam : 'PageSize',
			pageParam : 'CurrentPage',
			reader : {
				type : 'json',
				rootProperty : 'rows',
				totalProperty : 'TotalRowsCount'
			},
			listeners : {
				exception : function(proxy, response, operation) {
//					iPass.util.PubOperation.offlineAccess("inboxView", "InboxView", operation);
				}
			}
		},
		listeners : {
			load : function(store, records, successful, operation, eOpts) {
				if (successful && operation.getResponse()) {
//					iPass.util.PubOperation.onlineLoad("inboxView",operation.getResponse());
				}
			}
		}
	}
});