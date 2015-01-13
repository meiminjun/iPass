/**
 * 检查版本历史
 * @author duwei
 * @date 20141124
 */
Ext.define('iPass.view.ProjectFileList', {
	extend: 'Ext.List',
	xtype: 'projectFileList',
	config: {
		locales : {
			title : 'projectFileList.title'
		},
		grouped : true,
		scrollToTopOnRefresh : false,
		flex : 9,
		loadingText : false,
		cls : 'projectFileCls',
		store : 'ProjectFileList',
		itemTpl : [
			'<div class="projectFileList defaultFont-style">',
			'<div class="projectFileListDiv">',
				'<div class="head">',
					'<div class="attImg" style="background:url(resources/images/icon/{[this.addIcon(values.FileNameLast)]}) no-repeat;background-size: 26px 26px;"></div>',
					'<div class="attFileName text-overflow">{FileName}</div>',
				'</div>',
				'<div class="rowscontent">',
					'<div style="position:relative;width:100%;height:20px">',
						'<div class="text-overflow" style="position: absolute;width:40%;top:0px;">{[Global.language==="zh-cn"?(values.Creator):(values.CreatorEn)]}</div>',
						'<div class="text-overflow" style="position: absolute;left:40%;width:60%;top:0px;text-align:right;">{[iPass.util.PubOperation.dataFormatLogogram(values.CreateTime2,"")]}</div>',
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