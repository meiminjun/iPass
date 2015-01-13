/**
 * 收信箱筛选
 * 
 * @author yangkun
 * @create 2013-12-24
 */
Ext.define('iPass.view.InboxFilter', {
	extend : 'Ext.Container',
	xtype : 'inboxFilter',
	id : 'inboxFilter',
	requires : [ 'Ext.Label', 'Ext.field.Select', 'Ext.field.DatePicker' ],
	config : {
		layout : 'fit',
		hideOnMaskTap : true,
		items : [ {
			xtype : 'container',
			style : 'background-color:#F7F7F7;font-size:14px;',
			items : [ {
				xtype : 'container',
				layout : {
					type : 'hbox'
				},
				style : 'border-bottom: 1px solid #E2E2E2;',
				items : [ {
					xtype : 'label',
					cls : 'filter-Icon-Type',
					locales : {
						html : 'inboxFilter.market'
					}
				}, {
					xtype : 'selectfield',
					flex : 1,
					name : 'projectCode',
					cls : 'selectCls'
				} ]
			}, {
				xtype : 'container',
				layout : {
					type : 'hbox'
				},
				style : 'border-bottom: 1px solid #E2E2E2;',
				items : [ {
					xtype : 'label',
					cls : 'filter-Icon-Type',
					locales : {
						html : 'inboxFilter.messageType'
					}
				}, {
					xtype : 'selectfield',
					flex : 1,
					name : 'messageType',
					cls : 'selectCls'
				} ]
			}, {
				xtype : 'container',
				layout : {
					type : 'hbox'
				},
				style : 'border-bottom: 1px solid #E2E2E2;',
				items : [ {
					xtype : 'label',
					cls : 'filter-Icon-Type',
					locales : {
						html : 'inboxFilter.beginTime'
					}
				}, {
					xtype : 'datepickerfield',
					cls : 'datepickerCls',
					name : 'startTime',
					flex : 1,
					locales : {
						placeHolder : 'inboxFilter.begindatePlaceholder',
						dateFormat : 'inboxFilter.dateFormat'
					},
					picker : {
						enableLocale : true,
						value : new Date(),
						locales : {
							months : 'months'
						}
					}
				}]
			},{
				xtype : 'container',
				layout : {
					type : 'hbox'
				},
				style : 'border-bottom: 1px solid #E2E2E2;',
				items : [ {
					xtype : 'label',
					cls : 'filter-Icon-Type',
					locales : {
						html : 'inboxFilter.endTime'
					}
				}, {
					xtype : 'datepickerfield',
					cls : 'datepickerCls',
					name : 'endTime',
					flex : 1,
					locales : {
						placeHolder : 'inboxFilter.enddatePlaceholder',
						dateFormat : 'inboxFilter.dateFormat'
					},
					picker : {
						enableLocale : true,
						value : new Date(),
						locales : {
							months : 'months'
						}
					}
				} ]
			} ]
		} ]
	}
});