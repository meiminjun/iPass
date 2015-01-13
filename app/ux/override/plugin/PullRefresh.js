/**
 * override Ext.plugin.PullRefresh
 * @author duwei 
 * @date 20131031
 */
Ext.define('iPass.ux.override.plugin.PullRefresh', {
    override: 'Ext.plugin.PullRefresh',
    
    requires: [
	   'iPass.ux.override.Component'
    ],
    
    config : {
 	   pullTpl: [
           '<div class="x-list-pullrefresh">',
               '<div class="x-list-pullrefresh-arrow"></div>',
               '<div class="x-loading-spinner2">',
                   '<span class="x-loading-top"></span>',
                   '<span class="x-loading-right"></span>',
                   '<span class="x-loading-bottom"></span>',
                   '<span class="x-loading-left"></span>',
               '</div>',
               '<div class="x-list-pullrefresh-wrap">',
                   '<h3 class="x-list-pullrefresh-message">{message}</h3>',
                   '<div class="x-list-pullrefresh-updated">{lastUpdatedText}&nbsp;{[iPass.util.PubOperation.pullRefreshDataFormat()]}</div>',
               '</div>',
           '</div>'
       ].join('')
    },
    
   setLocale: function(locale) {
       var me = this,
           locales = me.locales || me.getInitialConfig().locales,
           loadingText = locales.loadingText,
           defaultLoadingText = 'Loading...',
           lastUpdatedText = locales.lastUpdatedText,
           defaultLastUpdatedText = 'Last update time',
           pullRefreshText = locales.pullRefreshText,
           defaultPullRefreshText = 'Pull down to refresh...',
           releaseRefreshText = locales.releaseRefreshText,
           defaultReleaseRefreshText = 'Release to refresh...',
           manager = me.locale;
       
       if(loadingText) {
           if(Ext.isObject(loadingText)) {
               defaultEmptyText = emptyText.defaultLoadingText;
               loadingText = loadingText.key;
           }

           loadingText = manager.get(loadingText, defaultLoadingText);

           if(Ext.isString(loadingText)) {
               me.setLoadingText(loadingText);
           }
       }
       
       if(lastUpdatedText) {
           if(Ext.isObject(lastUpdatedText)) {
        	   defaultLastUpdatedText = emptyText.defaultLastUpdatedText;
               lastUpdatedText = lastUpdatedText.key;
           }

           lastUpdatedText = manager.get(lastUpdatedText, defaultLastUpdatedText);

           if(Ext.isString(lastUpdatedText)) {
               me.setLastUpdatedText(lastUpdatedText);
           }
       }
       
       if(pullRefreshText) {
           if(Ext.isObject(pullRefreshText)) {
        	   defaultPullRefreshText = emptyText.defaultPullRefreshText;
        	   pullRefreshText = pullRefreshText.key;
           }

           pullRefreshText = manager.get(pullRefreshText, defaultPullRefreshText);

           if(Ext.isString(pullRefreshText)) {
               me.setPullRefreshText(pullRefreshText);
           }
       }
       
       if(releaseRefreshText) {
           if(Ext.isObject(releaseRefreshText)) {
        	   defaultReleaseRefreshText = emptyText.defaultReleaseRefreshText;
        	   releaseRefreshText = releaseRefreshText.key;
           }

           releaseRefreshText = manager.get(releaseRefreshText, defaultReleaseRefreshText);

           if(Ext.isString(releaseRefreshText)) {
               me.setReleaseRefreshText(releaseRefreshText);
           }
       }
       
       // reset date format
       me.resetRefreshState();
       
       this.callParent(arguments);
   },
   resetRefreshState: function() {
       var me = this;

       me.isRefreshing = false;

       me.setViewState('pull');
       
       if(me.updatedEl){
    	   me.updatedEl.setHtml(this.getLastUpdatedText() + '&nbsp;' + iPass.util.PubOperation.pullRefreshDataFormat());
       }
   }
});