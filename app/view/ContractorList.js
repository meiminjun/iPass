/**
 * 人员列表
 * 
 * @author yangkun
 * @create 2013-09-30
 */
Ext.define('iPass.view.ContractorList', {
	extend : 'Ext.List',
	xtype : 'contractorList',
	// requires : [ 'Ext.plugin.PullRefresh', 'Ext.plugin.ListPaging' ],
	config : {
		ui : 'index',
		loadingText : false,
		height : '100%',
		store : 'ContractorList',
		itemTpl : [ '<div class="defaultFont-style">',
		            	'<div class="contractorListItem">',
		            		'<div class="contractorDetails">',
			            		'<div class="title">{SupplierName}</div>',
			            		'<div class="content" style="color:#144E11">{SupplierTypeName}</div>',
			            		'<div class="content" style="color:#495762">{[this.contantsText()]}：{SupplierContact}&nbsp;&nbsp;{SupplierContactTel}</div>',
			            		'</div>',
			            	'</div>',
		            '</div>',{
		            	// 编译
						compiled : true,
		            	contantsText : function(){
		            		return Global.getTipsMsg('consultantContantText');
		            	}
					}]
	}
});