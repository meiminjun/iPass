/**
 * 项目附录列表store
 * @author yangkun
 * @date 2013-10-18
 */
Ext.define('iPass.store.AppendixList', {
	extend : 'Ext.data.Store',
	config : {
		model : 'iPass.model.AppendixList',
		autoLoad : false,
		pageSize : 10,
		grouper: {
	       groupFn: function(record) {
	           return ['<div style="width:100%;height:50px;margin-top:-10px;">',
						  '<div class="text-overflowHidden" style="width:50%;font-size:0.9em;display: inline-block;float:left;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">'+record.get('ParentName')+'</div>',
//		  		   		  '<div style="display:inline-block;width:100%;padding-left:14px;padding-right:36px;">',
		  		   		  '<div style="display:inline-block;width:100%;padding-left:3px;">',
						  	'<div style="position:relative;height:20px;display:inline-blick;float:left;width:110px;">',
						   		'<div style="text-align:left;height:100%;width:'+record.get('PassedPercent2')+'%;left:0%;background-color:#23903F;position: absolute;"></div>',
	                            '<div style="height:100%;width: '+record.get('ExpiredPercent2')+'%;left:'+record.get('PassedPercent2')+'%;background-color: #FFFF01;position: absolute;"></div>',
	                            '<div style="height:100%;width:'+record.get('NotPassPercent2')+'%;left:'+record.get('TwoLevelLeftPercent2')+'%;background-color:#DA3A3A;position: absolute;"></div>',
	                            '<div style="height:100%;width: '+record.get('UncheckedPercent2')+'%;left:'+record.get('ThreeLevelLeftPercent2')+'%;background-color: #909193;position: absolute;"></div>',
	                         '</div>',
	                         '<div style="display:inline-block;margin-left:3px; float:left;width:36px;height:20px;font-size:13px;line-height: 20px;">'+record.get('PassedRealPercent2')+'%</div>',
                             '<div style="display:inline-block;float:right;text-align:right;font-size:.8em;margin-top: -4px">'+record.get('ParentScheduledTime')+'</div>',
                          '</div>',
//				      	  '<div style="width:36px;text-align:right;margin:-2.2em 2px auto auto;height:20px;font-size:13px;line-height: 20px;">'+record.get('PassedRealPercent2')+'%</div>',
				      '</div>',
	           ].join('');
	       },
	       sortProperty : 'ParentSortNum'
	    },
	    sorters :[{
	    	property : "SortNum",
	    	direction: "ASC"
	    }], 
		proxy : {
			type : 'ajax',
			url : Global.domain+ '/api/GetProjectStageList.ashx',
			timeout : 50000,
			reader : {
				type : 'json',
				rootProperty : 'rows'
			},
			listeners : {
				exception : function(proxy, response, operation) {
//					iPass.util.PubOperation.offlineAccess("appendixList", "AppendixList", operation);
				}
			}
		},
		listeners : {
			load : function(store, records, successful, operation, eOpts) {
				if (successful && operation.getResponse()) {
//					iPass.util.PubOperation.onlineLoad("appendixList",operation.getResponse());
				}
			}
		}
	}
});