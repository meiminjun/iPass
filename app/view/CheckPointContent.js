/**
 * 检查点描述
 * @auto duwei
 * @date 2014-01-03
 */
Ext.define('iPass.view.CheckPointContent', {
	extend : 'Ext.Container',
	xtype : 'checkPointContent',
	requires : [ 'Ext.Panel'],
	config : {
		layout : 'vbox',
		locales  : {
            title : 'checkPointContent.title'
        },
		items : [{
			xtype : 'panel',
			scrollable : true,
			flex : 1,
			tpl: Ext.create('Ext.XTemplate',
				'<div class="checkPoint-row defaultFont-style" style="margin: 5px 10px 0px 10px;font-size:.8em">'+
					'<div class="rowscontent" style="color:#414042;">{Content}</div>',
				'</div>')
		}]
	}
});