/**
 * 检查编辑返回提示actionsheet
 * 
 * @author duwei
 * @create 2013-09-29
 */
Ext.define('iPass.view.DelDraftActionSheet', {
	extend : 'Ext.ActionSheet',
	xtype : 'delDraftActionSheet',
	config : {
		ui : 'normal',
		items : [{
			name : '01',
			ui : 'decline',
			cls : 'actionsheetBtn',
			locales : {
				text : 'actionSheet.deleteDraft'
			}
		}, {
			name : '02',
			cls : 'actionsheetBtn',
			locales : {
				text : 'actionSheet.cancel'
			},
			handler : function(){
				this.up('actionsheet').hide();
			}
		}]
	}
});