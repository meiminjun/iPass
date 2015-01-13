/**
 * 收信箱
 * 
 * @author yangkun
 * @create 2013-10-28
 */
Ext.define('iPass.view.InboxView', {

	extend : 'Ext.Container',
	xtype : 'inboxView',
	requires : ['Ext.List','Ext.plugin.PullRefresh','Ext.plugin.ListPaging'],
		
	config : {
		layout : 'vbox',
		items:[{
			id:'inboxViewList',
			xtype : 'list',
			loadingText : false,
			scrollToTopOnRefresh : false,
			flex : 9,
			store : 'InboxView',
			plugins : [ {
				xclass : 'Ext.plugin.PullRefresh',
				locales : {
					loadingText : 'pullRefresh.loadingText',
					lastUpdatedText : 'pullRefresh.lastUpdatedText',
					pullRefreshText : 'pullRefresh.pullRefreshText',
					releaseRefreshText : 'pullRefresh.releaseRefreshText'
				},
				refreshFn : function(loaded, arguments){
	            	var params = {};
	            	iPass.util.PubOperation.pubListRefresh(loaded.getList().getStore(),params,true, true, 'InboxView');
	            }
			}, {
				xclass : 'Ext.plugin.ListPaging',
				autoPaging : false,
				locales : {
					loadMoreText : 'listPaging.loadMoreText',
					noMoreRecordsText : 'listPaging.noMoreRecordsText'
				}
			} ],
		    itemTpl : '<div style="clear:both;height:auto;">'
				+ '<div style="height:20px;">'
				+ '<p style="color:#b1b3b6;font-size:13px;" >{[iPass.util.PubOperation.dataFormatLogogram(values.CreateTime,"")]}</p>'
				+ '</div>'
				+ '<div style="border:1px solid gainsboro; border-radius:5px; position:relative; height:auto;">'
				+ '<div style="padding:10px 5px 0px 5px;border-radius:4px 4px 0px 0px; min-height:43px;background:#F1F5F6;border-bottom:1px solid gainsboro;">'
				+ '<p style="font-size:16px;float:left;width:60%;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#23903F;font-weight:bold;">{ProjectName}</p>'
//				+ '<p style="float:right;font-size:14px;width:60%;font-weight:bold;overflow:hidden;text-overflow:ellipsis;text-align: right;"><span style="color:#759297;">{[iPass.util.PubOperation.dateFormatMdFun(values.CreateTime,"")]}</span>&nbsp;&nbsp;<span style="color:#bc201b;">{MessageType}</span></p>'
				+ '<p style="float:right;font-size:14px;width:40%;font-weight:bold;overflow:hidden;text-overflow:ellipsis;text-align: right;"><span style="color:#bc201b;">{MessageType}</span></p>'
				+ '</div>'
				+ '<table width="100%">'
				+ '<tpl for="rows">'
				+ '<tr style="{[xindex === xcount ? "min-height:30px;height:auto;" : "border-bottom:1px solid gainsboro;min-height:30px;height:auto;"]}">'
				+ '<td style="border-right:1px solid gainsboro;width:40%;"><p style="padding:5px 0px 5px 10px;font-weight:bold;font-size:14px;word-break:break-word;">{ItemKey}</p></td>'
				+ '<td style="width:50%;">'
				+ '<tpl if="ItemValueType == \'datetime\'">'
				+ '<p style="margin:5px 0px 5px 10px;font-size:14px;word-break:break-word;">{[iPass.util.PubOperation.dateFormatFun(values.ItemValue,"")]}</p>'
				+ '<tpl else>'
				+ '<p style="margin:5px 0px 5px 10px;font-size:14px;word-break:break-word;">{ItemValue}</p>'
				+ '</tpl>'
				+ '</td>'
				+ '</tr>'
				+ '</tpl>'
				+ '</table>'
				+ '</div>'
				+ '</div>'
		},{
			xtype : 'toolbar',
			flex : 1,
			docked : 'bottom',
			layout: {
		        type: 'hbox'
		    },
			items : [{
				xtype : 'button',
				id : 'inboxBtnFilter',
				align : 'left',
				locales : {
					text : 'inboxView.inboxBtnFilter'
				}
			}]
		}]
	}
});