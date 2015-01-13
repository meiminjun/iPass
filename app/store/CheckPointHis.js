/**
 * 检查点历史store
 * 
 * @author yangkun
 * @create 2013-09-26
 */
Ext.define('iPass.store.CheckPointHis', {
	extend : 'Ext.data.Store',
	config : {
		model : 'iPass.model.CheckPointHis',
		autoLoad : false,
		pageSize : 10,
		sorters : [{
			property : "CheckTime",
            direction: "DESC"
		}],
		proxy : {
			type : 'ajax',
			url : Global.domain+ '/api/GetRecordList.ashx',
			timeout : 50000,
			limitParam : 'PageSize',
			pageParam : 'CurrentPage',
			reader : {
				type : 'json',
				rootProperty : 'rows'
			},
			listeners : {
				exception : function(proxy, response, operation) {
//					iPass.util.PubOperation.offlineAccess("checkPointHis", "CheckPointHis", operation);
				}
			}
		},
		listeners : {
			load : function(store, records, successful, operation, eOpts) {
				if (successful && operation.getResponse()) {
//					iPass.util.PubOperation.onlineLoad("checkPointHis",operation.getResponse());
					var response = Ext.JSON.decode(operation.getResponse().responseText),
						schedulePanel = checkPointListCtr.getScheduleListP();
//						fileListPanel = checkPointListCtr.getFileListPanel();
//					console.log("-----"+response.rows_ScheduleChangeHistoryDetail);	
					schedulePanel.setData(response.rows_ScheduleChangeHistoryDetail);
//					fileListPanel.setData(response.rows_CMA_PROJECT_CHECK_ITEM_ATTACH);
					
					if(response.rows_ScheduleChangeHistoryDetail.length == 0){
						schedulePanel.setHidden(true);
					}else{
						schedulePanel.setHidden(false);
					}
				}
			}
		}
	}
});