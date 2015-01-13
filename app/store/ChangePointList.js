/**
 * 变更列表
 * 
 * @author jason
 * @create 2014-10-17
 */
Ext.define('iPass.store.ChangePointList',{
	extend:'Ext.data.Store',
	requires:[
		'iPass.model.ChangePointList',
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],
	config:{
		model:'iPass.model.ChangePointList',
		pageSize: 10,
		storeId: 'ChangePointList',
		autoLoad : true,
		proxy: {
			type: 'ajax',
			url: Global.domain+'/api/GetScheduleChangePointList.ashx',
			pageParam:'CurrentPage',
			limitParam:'PageSize',
//			url: 'https://mipassuat.capitaretail.com.cn/api/GetScheduleChangePointList.ashx?&RecordID=1&CurrentPage=1&PageSize=25',
			reader: {
				type: 'json',
				rootProperty: 'rows',
				totalProperty : 'TotalRowsCount'
			}
		}
	}
});
