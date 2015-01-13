/**
 * 拍照actionsheet
 * 
 * @author duwei
 * @create 2013-10-17
 */
Ext.define('iPass.view.PhotoActionSheet', {
	extend : 'Ext.ActionSheet',
	xtype : 'photoActionSheet',
	id : 'photoActionSheet',
	config : {
		ui : 'normal',
		items : [{
			// 拍照
			name : '01',
			cls : 'actionsheetBtn',
			locales : {
				text : 'actionSheet.Photograph'
			},
			handler : function(){
				checkPointActionSheetCtr.photographFun();
			}
		}, {
			// 相册
			name : '02',
			cls : 'actionsheetBtn',
			locales : {
				text : 'actionSheet.Album'
			},
			handler : function(){
				checkPointActionSheetCtr.albumFun();
			}
		}, {
			name : '03',
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