/**
 * 首页项目列表store
 * 
 * @author yangkun
 * @create 2013-09-24
 */
Ext.define('iPass.store.ProjectList', {
	extend : 'Ext.data.Store',
	config : {
		model : 'iPass.model.ProjectList',
		autoLoad : false,
		pageSize : 10,
		grouper: {
	       groupFn: function(record) {
	           return record.get('CountryName');
	       }
	    },
	    proxy : {
			type : 'ajax',
			url : Global.domain+ '/api/GetProjectList.ashx',
			timeout : 50000,
			reader : {
				type : 'json',
				rootProperty : 'rows'
			},
			listeners : {
				exception : function(proxy, response, operation) {
//					iPass.util.PubOperation.offlineAccess("projectList", "ProjectList", operation);
				}
			}
		},
		listeners : {
			load : function(store, records, successful, operation, eOpts) {
				if (successful && operation.getResponse()) {
					iPass.util.PubOperation.onlineLoad("projectList",operation.getResponse());
				}
			}
		}
	}
});