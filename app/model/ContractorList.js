/**
 * 人员列表model
 * 
 * @author yangkun
 * @create 2013-09-30
 */
Ext.define('iPass.model.ContractorList', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'SupplierName',
			type : 'string'
		} ,{
			name : 'SupplierTypeName',
			type : 'string'
		},{
			name : 'SupplierContact',
			type : 'string'
		},{
			name : 'SupplierContactTel',
			type : 'string'
		}]
	}
});