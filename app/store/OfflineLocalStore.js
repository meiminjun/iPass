/**
 * 缓存列表store
 * 
 * @author yangkun
 * @create 2013-10-16
 */
Ext.define('iPass.store.OfflineLocalStore', {
	extend : 'Ext.data.Store',
	config : {
		autoLoad : false,
		fields : [ 'cacheItem', 'cacheDate', 'resTxt' ],
		proxy : {
			type : 'localstorage',
			id : 'iPass'
		}
	}
});