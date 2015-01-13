/**
 * 检查编辑
 * @author duwei
 * @date 2013-09-29
 */
Ext.define('iPass.view.CheckEditor', {
	extend : 'Ext.Container',
	xtype : 'checkEditor',
	// requires : [ 'Ext.plugin.PullRefresh', 'Ext.plugin.ListPaging' ],
	config : {
		ui : 'normal',
		scrollable : {
			direction : 'vertical',
			directionLock : true
		},
		padding : '5 10 5 10',
		defaults : {
			margin : '10 0 10 0',
		},
		items : [{
			xtype : 'textareafield',
			cls : 'div-corners',
			maxRows : 4,
			style : 'font-size:15px',
			locales : {
				placeHolder : 'checkEditor.placeHolder'
			},
			name : 'ckOpinion'
		}, {
			xtype : 'label',
			 html:'<div style=" padding-top:10px;">' +
		     '<div onclick="checkPointActionSheetCtr.getPhoto()" style=" position:relative; float: left; margin-right: 10px; width:48px; height:38px;">' +
		     '<img id="photo" src="resources/images/icon_photo.png"  width="48px" height="38px" style="display:block; position:absolute; "/>' +
		     '</div>' +
		     '<div style=" position:relative; float: left; margin-right: 5px;">' +
		     '<input type="image" id="iDelBtn1" src="resources/images/icon_del.png" style=" display:none;height:30px; width:30px;top:-15px;margin-left:30px;z-index:999;position: absolute; " onclick="checkPointActionSheetCtr.delPic(1)" />' +
		     '<img id="myImage1" width="40px" height="40px" style="display:none;"/>' +
		     '</div>' +
		     '<div  style=" position:relative; float: left; margin-right: 5px;">' +
		     '<input type="image" id="iDelBtn2" src="resources/images/icon_del.png" style="display:none;height:30px; width:30px;top:-15px;margin-left:30px;z-index:999;position: absolute; " onclick="checkPointActionSheetCtr.delPic(2)" />' +
		     '<img id="myImage2" width="40px" height="40px" style="display:none;"/>' +
		     '</div>' +
		     '<div  style=" position:relative; float: left;">' +
		     '<input type="image" id="iDelBtn3" src="resources/images/icon_del.png" style="display:none;height:30px; width:30px;top:-15px;margin-left:30px;z-index:999;position: absolute; " onclick="checkPointActionSheetCtr.delPic(3)" />' +
		     '<img id="myImage3" width="40px" height="40px" style="display:none;"/>' +
		     '</div>' +
		     '</div>'
		}]
	}
});