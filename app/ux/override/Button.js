Ext.define('iPass.ux.override.Button', {
    override : 'Ext.Button',

    requires : [
        'iPass.ux.override.Component'
    ],

    constructor : function() {
        this.callSuper(arguments);
    },

    setLocale : function(locale) {
        
    	var me          = this,
            locales     = me.locales || me.getInitialConfig().locales,
            text        = locales.text,
            placeHolder = locales.placeHolder,
            manager     = me.locale,
            defaultText = '',
            defaultPlaceHolder = '';

        if (text) {
            if (Ext.isObject(text)) {
                defaultText = text.defaultText;
                text        = text.key;
            }

            text = manager.get(text, defaultText);

            if (Ext.isString(text)) {
                me.setText(text);
                me.refreshIconAlign();
            }
        }
        
        if (placeHolder) {
            if (Ext.isObject(placeHolder)) {
            	defaultPlaceHolder = text.defaultPlaceHolder;
                placeHolder        = text.key;
            }

            placeHolder = manager.get(placeHolder, defaultPlaceHolder);

            if (Ext.isString(placeHolder)) {
                me.setPlaceHolder(placeHolder);
                me.refreshIconAlign();
            }
        }

        me.callParent(arguments);
    }
});