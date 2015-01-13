/**
 * App首页列表
 * 
 * @author VK Chen
 * @create 2013-09-26
 */
Ext.define('iPass.view.CategoryList', {
	extend : 'Ext.Container',
	xtype : 'categoryList',
	requires : [ 'Ext.dataview.List', 'Ext.Toolbar', 'Ext.Spacer', 'Ext.Button' ],
	config : {
		ui : 'normal',
		layout : 'vbox',
		items : [
				{
					xtype : 'list',
					loadingText : false,
					cls : 'categoryList',
					pressedCls : 'categoryListPress',
					scrollToTopOnRefresh : false,
					flex : 10,
					itemTpl : [ '<div class="category defaultFont-style">',
							'<div class="title text-overflow">{TypeName}</div>',
							'<div class="content">{TypeDescription}</div>', '<div>' ]
				}]
	},
	initialize : function() {
		this.callParent(arguments);
	}
});
