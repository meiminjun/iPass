Ext.define('iPass.ux.override.picker.Picker', {
    override : 'Ext.picker.Picker',

    config : {
        doneButton   : {
            locales   : {
                text   : 'buttons.done'
            }
        },
        cancelButton : {
            locales   : {
                text   : 'buttons.cancel'
            }
        }
    }
});