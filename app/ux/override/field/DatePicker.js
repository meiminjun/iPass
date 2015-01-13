Ext.define('iPass.ux.override.field.DatePicker', {
    override : 'Ext.field.DatePicker',

    requires : [ 'iPass.ux.override.Component' ],
    
    setLocale : function(locale) {
        
    	var me          = this,
            locales     = me.locales || me.getInitialConfig().locales,
            dateFormat  = locales.dateFormat,
            manager     = me.locale,
            defaultDateFormat = '';
    	
        if (dateFormat) {
            if (Ext.isObject(dateFormat)) {
            	defaultDateFormat = dateFormat.defaultText;
            	dateFormat        = dateFormat.key;
            }

            dateFormat = manager.get(dateFormat, defaultDateFormat);

            if (Ext.isString(dateFormat)) {
                me.setDateFormat(dateFormat);
            }
        }

        me.callParent(arguments);
    }
//    getPicker : function() {
//        var picker     = this._picker,
//            needLocale = picker && !picker.isPicker;
//
//        picker = this.callParent(arguments);
//
//        if (needLocale && picker.enableLocale) {
//            picker.setLocale(iPass.ux.Manager.getLanguage());
//        }
//
//        return picker;
//    }
});