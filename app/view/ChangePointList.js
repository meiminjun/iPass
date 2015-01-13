/**
 * 变更列表
 *
 * @author jason
 * @create 2014-10-16
 */
Ext.define('iPass.view.ChangePointList', {
	extend: 'Ext.Container',
	xtype: 'changePointList',
	requires: [
		'Ext.dataview.List',
		'Ext.XTemplate',
		'Ext.plugin.ListPaging'
	],
	config: {
		title: 'title',
		items: [{
			xtype: 'list',
			height: '100%',
			cls: 'cpList',
			itemTpl: [
			'<div class="changePointRows">',
			'<div style="display:inline-block;width:32px;float:left;">',
				'<tpl if="ItemStatus==\'pass\'">',
					'<img class="checkPointListImg" src="resources/images/status/third-status.png" />',
				'<tpl elseif="ItemStatus==\'notpass\'">',
					'<img class="checkPointListImg" src="resources/images/status/fourth-status.png" />',
				'<tpl elseif="ItemStatus==\'altpass\'">',
					'<img class="checkPointListImg" src="resources/images/status/first-status.png" />',
				'<tpl elseif="ItemStatus==\'expires\'">',
					'<img class="checkPointListImg" src="resources/images/status/second-status.png" />',
				'<tpl elseif="ItemStatus==\'unchecked\'">',
					'<img class="checkPointListImg" src="resources/images/status/fifth-status.png" />',
				'<tpl elseif="ItemStatus==\'justexpires\'">',
					'<img class="checkPointListImg" src="resources/images/status/eight-status.png" />',
				'<tpl else>',
					'<img class="checkPointListImg" src="resources/images/status/seventh-status.png" />',
				'</tpl>',
			'</div>',
			'<div class="defaultFont-style" style="margin-left:43px;margin-right:60px;">',
				'<div class="changePointItemName">{ItemName}</div>',
				'<div class="rowscontent text-overflow" style="color: #414042;margin-top:1px;"><span>{[Global.getTipsMsg("Schedule")]}</span>&nbsp;&nbsp;<b>:</b>&nbsp;&nbsp;<span>{ScheduleDate}</span></div>',
			'</div>',
			'<div class="scopeItemDivNum" style="font-size:16px;">{HistoryCount}</div>',
			'</div>'],
			store: 'ChangePointList',
			plugins: [
//			{
//				type: 'pullrefresh',
//				locales : {
//					loadingText : 'pullRefresh.loadingText',
//					lastUpdatedText : 'pullRefresh.lastUpdatedText',
//					pullRefreshText : 'pullRefresh.pullRefreshText',
//					releaseRefreshText : 'pullRefresh.releaseRefreshText'
//				},
//				
//			},
			{
				type: 'listpaging',
				autoPaging: false,
				locales : {
					loadMoreText : 'listPaging.loadMoreText',
					noMoreRecordsText : 'listPaging.noMoreRecordsText'
				}
			}]
		}]
	}
});