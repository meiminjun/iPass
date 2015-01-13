/**
 * 国际化controller
 */
Ext.define('iPass.controller.Internationalization', {
    extend: 'Ext.app.Controller',

    config : {
    	refs : {
    		selectfield : '#selLanguage'
		},
        control : {
        	selectfield : {
                change : 'onLocalePick'
            }
        }
    },

    onLocalePick : function(field, value) {
    	/*
    	if (value.length > 2) {
            var store = field.getStore(),
                rec   = store.findRecord('text', value);

            value  = rec.get(field.getValueField());
        }
		*/
        iPass.ux.Manager.updateLocale(value);
    }
});
