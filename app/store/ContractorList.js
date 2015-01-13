/**
 * 人员列表store
 * 
 * @author yangkun
 * @create 2013-09-30
 */
Ext.define('iPass.store.ContractorList', {
	extend : 'Ext.data.Store',
	config : {
		model : 'iPass.model.ContractorList',
		autoLoad : false,
		pageSize : 10
	}
});