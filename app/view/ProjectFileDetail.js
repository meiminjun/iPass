/**
 * 检查版本历史详情
 * @author duwei
 * @date 20141124
 */
Ext.define('iPass.view.ProjectFileDetail', {
	extend: 'Ext.List',
	xtype: 'projectFileDetail',
	config: {
		locales : {
			title : 'projectFileDetail.title'
		},
		grouped : false,
		scrollToTopOnRefresh : false,
		flex : 9,
		loadingText : false,
		cls : 'projectFileCls',
		store : 'ProjectFileDetail',
		itemTpl : [
			'<div class="projectFileDetail defaultFont-style">',
			'<div class="projectFileDetailsDiv" onclick="checkPointActionSheetCtr.checkDocAtt(\'{FilePath}\')">',
				'<div class="head">',
					'<div class="attImg" style="background:url(resources/images/icon/{[this.addIcon(values.FileNameLast)]}) no-repeat;background-size: 26px 26px;"></div>',
					'<div class="attFileName">',
					'<span style="display:inline-block;width:80%;">{FileName}</span>',
					'<span class="attVerNo">{VersionNo}</span>',
					'</div>',
				'</div>',
				'<div class="rowscontent">',
					'<div style="position:relative;width:100%;height:20px">',
						'<div class="text-overflow" style="display:inline-block;width:50%;top:0px;">{[Global.language==="zh-cn"?(values.Creator):(values.CreatorEn)]}({RoleType})</div>',
						'<div class="text-overflow" style="display:inline-block;width:50%;top:0px;text-align:right;">{[iPass.util.PubOperation.dataFormatLogogram(values.CreateTime2,"")]}</div>',
					'</div>',
				'</div>',	
			'</div>',
			'</div>',{
				compiled : true,
				addIcon : function(FileNameLast) {
					var result = "";
					switch (FileNameLast.toLowerCase()) {
						case "csv":
							result = "CSV.png";
							break;
						case "dwg":
							result = "DWG.png";
							break;
						case "jpg":
							result = "JPG.png";
							break;
						case "pdf":
							result = "pdf.png";
							break;
						case "png":
							result = "png.png";
							break;
						case "ppt":
							result = "ppt.png";
							break;
						case "pptx":
							result = "ppt.png";
							break;
						case "word":
							result = "WORD.png";
							break;
						case "docx":
							result = "WORD.png";
							break;
						case "doc":
							result = "WORD.png";
							break;
						case "xls":
							result = "XLS.png";
							break;
						case "xlsx":
							result = "XLS.png";
							break;
						case "zip":
							result = "zip.png";
							break;
						default:
							result = "icon_download.png";
					}
					return result;
				}
			}
		]
	}
});