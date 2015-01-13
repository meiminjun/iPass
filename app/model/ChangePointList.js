/**
 * 变更列表
 * 
 * @author jason
 * @create 2014-10-17
 */
Ext.define('iPass.model.ChangePointList', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    config: {
        fields: [
            {
                name: 'ItemName',
                type: 'string'
            },
            {
            	name: 'ItemCode',
            	type: 'string'
            },
            {
                name: 'ScheduleDate',
                type: 'string'
            },
            {
                name: 'HistoryCount',
                type: 'string'                
            },
            {
                name: 'ItemStatus',
                type: 'string'                               
            },
            {
                name: 'ProjectCode',
                type: 'string'
            },
            {
                name: 'TemplateCode',
                type: 'string'
            }
        ]
    }
});