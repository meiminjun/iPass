/**
 * 检查点历史
 * 
 * @author yangkun
 * @create 2013-09-26
 */
Ext.define('iPass.view.CheckPointHis', {
	extend : 'Ext.Container',
	xtype : 'checkPointHis',
	requires : [ 'Ext.Panel','Ext.List','Ext.dataview.ListItemHeader','Ext.plugin.ListPaging'],
	config : {
		layout : 'vbox',
		fullscreen : true,
		locales  : {
            title : 'checkPointHis.title'
        },
		items : [{
			xtype : 'list',
			loadingText : false,
			flex : 1,
			ui : 'ckPointHis',
			cls : 'ckPointHis',
			store : 'CheckPointHis',
			itemTpl :  [ '<tpl if="isOnly">',
			            	'<center name="ckPointHisCt" class="defaultFont-style" style="margin-top:.2em;font-size:.8em">{[Global.getTipsMsg("emptyDataMsg")]}</center>',
			            '<tpl else>',
				            '<div class="defaultFont-style">',
					            '<div style="position:relative;top:12px;left:-5px">',
									'<div class="checkPointHis-img">',
										'<tpl if="CheckResult==\'pass\' || CheckResult==\'pmpass\'">',
											'<img class="checkPointListImg" src="resources/images/status/third-status.png" />',
										'<tpl elseif="CheckResult==\'notpass\'">',
											'<img class="checkPointListImg" src="resources/images/status/fourth-status.png" />',
										'<tpl elseif="CheckResult==\'pmalt\'">',
											'<img class="checkPointListImg" src="resources/images/status/sixth-status.png" />',
										'<tpl elseif="CheckResult==\'altpass\'">',
											'<img class="checkPointListImg" src="resources/images/status/first-status.png" />',
										'<tpl elseif="CheckResult==\'expires\'">',
											'<img class="checkPointListImg" src="resources/images/status/second-status.png" />',
										'<tpl elseif="CheckResult==\'unchecked\'">',
											'<img class="checkPointListImg" src="resources/images/status/fifth-status.png" />',
										'<tpl elseif="CheckResult==\'justexpires\'">',
											'<img class="checkPointListImg" src="resources/images/status/eight-status.png" />',
										'<tpl elseif="CheckResult==\'pmna\' || CheckResult==\'na\'">',
											'<img class="checkPointListImg" src="resources/images/status/seventh-status.png" />',
										'<tpl else>',
											'<img class="checkPointListImg" src="resources/images/status/fifth-status.png" />',
										'</tpl>',
									'</div>',
								'</div>',
								'<div class="checkHis-row">',
									'<div class="head text-overflow" style="position:relative;width:100%;height:24px;">',
										'<div class="text-overflow" style="position: absolute;width:75%;height:21px;top:2px"><b>{CheckUserName}({[this.upperCase(values.RoleType)]})</b></div>',
										'<div class="text-overflow" style="position: absolute;left:75%;width:25%;top:2px;text-align:right;color:#bc201b;">{[this.getUpdateStatus(values.Uploadstatus)]}</div>',
									'</div>',
									'<div class="rowscontent" style="color:#759297;margin-left:.3em;min-height: 20px">{[this.joinContent(values.CheckContent)]}</div>',
										'<tpl if="this.checkAnnex(AttachCount)">',
											'<div class="rowscontent" style="margin:3px auto 0px 0px">',
											    '<div style="position:relative;width:100%;height:40px;margin-left:.3em">',
												 	'<tpl for="AttachList">',
												 		'<div style="position: absolute;width:40px;height:40px;{[this.setLeftVal(xindex)]}">',
														     //'<img src="data:image/png;base64,{Url}" width="40px" height="40px" />',
														  '<input type="image" onclick="checkPointActionSheetCtr.viewPic(\'{parent.ImgList}\',{[xindex]})" src="{Key}" width="40px" height="40px" />',
													    '</div>',
												    '</tpl>',
												'</div>',
											'</div>',
										'</tpl>',
										'<tpl if="this.checkAnnex(AttachCount2)">',
											'<div class="rowscontent text-overflow" style="margin-top:10px">',
												'<tpl for="AttachList2">',
													'<div class="projectFileListDiv">',
														'<div class = "docAtt" style="background:url(resources/images/icon/{[this.addIcon(values.Url)]}) no-repeat;background-size: 26px 26px;"></div>',
														'<div class="docAttFileName">{FileName}</div>',
													'</div>',
												'</tpl>',
											'</div>',
										'</tpl>',
										'<div class="rowscontent">',
											'<div style="position:relative;width:100%;height:20px;margin-left:.3em">',
												'<div style="position: absolute;width:0%;height:20px"></div>',
												'<div style="position: absolute;width:100%;left:0%;text-align:right;height:20px">{[iPass.util.PubOperation.dataFormatLogogram(values.CheckTime,"")]}</div>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',
							'</div>',
						'</tpl>',{
						// 编译
						compiled : true,
						joinContent : function(content) {
							if(!Ext.isEmpty(content)){
								var contentStr = Ext.JSON.decode(content),str = '',replaceStr = '';
					        	Ext.Array.each(contentStr, function(contents) {
					        		str += contents.Key == '' ? contents.Value + '&nbsp;&nbsp;' : contents.Key + '：' + contents.Value+'&nbsp;&nbsp;';
					        	});
					        	
					        	// 替换空格是否为空
					        	replaceStr = iPass.util.PubOperation.replaceAll(str,"&nbsp;&nbsp;","");
						        if(Ext.String.trim(replaceStr) == ''){
						        	 str = Global.getTipsMsg('hisNoContent');
						        }
				                return str;
							}else{
								return Global.getTipsMsg('hisNoContent');
							}
						},
						// 检查是否包含附件
						checkAnnex : function(AttachCount){
							if(AttachCount == 0){
								return false;
							}else{
								return true;
							}
						},
						// 角色转换大写
						upperCase : function(RoleType){
							if(RoleType == 'dm'){
								return 'HQDM';
							}else if(RoleType == 'pm'){
								return 'RDM/RPM';
							}
						},
						//显示图片文字
						showPicText : function(){
							return Global.getTipsMsg('showPicText');
						},
						setLeftVal : function(index){
							if(index == 1){
								return 'margin-left:0px;';
							}else if(index == 2){
								return 'margin-left:45px;';
							}else if(index == 3){
								return 'margin-left:90px;';
							}
						},
						/**
						 * 根据长度截取先使用字符串，超长部分追加...
						 * @param str 对象字符串
						 * @param len 目标字节长度
						 * @return 处理结果字符串
						 */
						cutString:function(str) {
						    //length属性读出来的汉字长度为1
						    var len = 20;
					
						    if(str.length*2 <= len) {
						        return str;
						    }
						    var strlen = 0;
						    var s = "";
						    for(var i = 0;i < str.length; i++) {
						        s = s + str.charAt(i);
						        if (str.charCodeAt(i) > 128) {
						            strlen = strlen + 2;
						            if(strlen >= len){
						            	
						                return s.substring(0,s.length-1) + "...";
						            }
						        } else {
						            strlen = strlen + 1;
						            if(strlen >= len){
						                return s.substring(0,s.length-2) + "...";
						            }
						        }
						    }
						    return s;
						},
						addIcon : function(Url) {
							var str1 = Url.substring(Url.lastIndexOf("."));
							var attStr = str1.substring(1).toLowerCase();
							var result = "";
							switch (attStr) {
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
						},
						getUpdateStatus : function(Uploadstatus){
							if(Uploadstatus){return Uploadstatus;}
						}
			}],
//			plugins : [{
//				xclass : 'Ext.plugin.ListPaging',
//				autoPaging : false,
//				locales : {
//					loadMoreText : 'listPaging.loadMoreText',
//					noMoreRecordsText : 'listPaging.noMoreRecordsText'
//				}
//			}],

//{				
//				xtype : 'panel',
//				name : 'scheduleList',
//				id : 'scheduleListP',
//				scrollable : false,
//				scrollDock: 'top',
//		        docked: 'top',
//				style:'padding:"0px";',
//				tpl : Ext.create('Ext.XTemplate',
//				'<tpl for=".">',
//					'<div class="scheduleDiv defaultFont-style">',
//						'<p><span class="scheduleDivLeft">{[Global.getTipsMsg("OriginalDate")]}</span><b>:</b>&nbsp;&nbsp;{OldScheduleTime}</p>',
//						'<p><span class="scheduleDivLeft">{[Global.getTipsMsg("NewSchDate")]}</span><b>:</b>&nbsp;&nbsp;{NewScheduleTime}</p>',
//						'<p><span class="scheduleDivLeft">{[Global.getTipsMsg("ChangeReson")]}</span><b>:</b>&nbsp;&nbsp;{ChangeReason}</p>',
//						'<p class="content"><span class="scheduleName">{UserName}</span><span class="scheduleDivTime">{[iPass.util.PubOperation.dataFormatLogogram(values.CreateTime,"")]}</span></p>',
//					'</div>',
//				'</tpl>',
//				{compiled : true}),
//				items: [{
//					xtype : 'listitemheader',
//					scrollDock: 'bottom',
//			        docked: 'bottom',
//					flex : 1,
//					style : 'display : block',
//					locales  : {
//		                html : 'checkPointHis.historyVal'
//		            }
//				}]
//			
//			},

			items : [{
				xtype : 'panel',
				scrollable : false,
				scrollDock: 'top',
		        docked: 'top',
				name : 'lastReply',
				padding: '0.65em 0.8em',
				tpl : Ext.create('Ext.XTemplate',
						'<tpl if="isOnly">',
			            	'<center name="lastReplyCt" class="defaultFont-style" style="margin-top:.2em;font-size:.8em">{[Global.getTipsMsg("emptyDataMsg")]}</center>',
			            '<tpl else>',
				            '<div class="defaultFont-style">',
					            '<div style="position:relative;top:12px;left:-5px">',
									'<div class="checkPointHis-img">',
										'<tpl if="CheckResult==\'pass\' || CheckResult==\'pmpass\'">',
											'<img class="checkPointListImg" src="resources/images/status/third-status.png" />',
										'<tpl elseif="CheckResult==\'notpass\'">',
											'<img class="checkPointListImg" src="resources/images/status/fourth-status.png" />',
										'<tpl elseif="CheckResult==\'pmalt\'">',
											'<img class="checkPointListImg" src="resources/images/status/sixth-status.png" />',
										'<tpl elseif="CheckResult==\'altpass\'">',
											'<img class="checkPointListImg" src="resources/images/status/first-status.png" />',
										'<tpl elseif="CheckResult==\'expires\'">',
											'<img class="checkPointListImg" src="resources/images/status/second-status.png" />',
										'<tpl elseif="CheckResult==\'unchecked\'">',
											'<img class="checkPointListImg" src="resources/images/status/fifth-status.png" />',
										'<tpl elseif="CheckResult==\'justexpires\'">',
											'<img class="checkPointListImg" src="resources/images/status/eight-status.png" />',
										'<tpl elseif="CheckResult==\'pmna\' || CheckResult==\'na\'">',
											'<img class="checkPointListImg" src="resources/images/status/seventh-status.png" />',
										'<tpl else>',
											'<img class="checkPointListImg" src="resources/images/status/fifth-status.png" />',
										'</tpl>',
									'</div>',
								'</div>',
								'<div class="checkHis-row">',
									'<div class="head text-overflow" style="position:relative;width:100%;height:24px;">',
										'<div class="text-overflow" style="position: absolute;width:75%;height:21px;top:2px"><b>{CheckUserName}({[this.upperCase(values.RoleType)]})</b></div>',
										'<div class="text-overflow" style="position: absolute;left:75%;width:25%;top:2px;text-align:right;color:#bc201b;">{[this.getUpdateStatus(values.Uploadstatus)]}</div>',
									'</div>',
									'<div class="rowscontent" style="color:#759297;margin-left:.3em;min-height: 20px">{[this.joinContent(values.CheckContent)]}</div>',
									'<tpl if="this.checkAnnex(AttachCount)">',
										'<div class="rowscontent" style="margin:3px auto 0px 0px">',
										    '<div style="position:relative;width:100%;height:40px;margin-left:.3em">',
											 	'<tpl for="AttachList">',
											 		'<div style="position: absolute;width:40px;height:40px;{[this.setLeftVal(xindex)]}">',
													     //'<img src="data:image/png;base64,{Url}" width="40px" height="40px" />',
													  '<input type="image" onclick="checkPointActionSheetCtr.viewPic(\'{parent.ImgList}\',{[xindex]})" src="{Key}" width="40px" height="40px" />',
												    '</div>',
											    '</tpl>',
											'</div>',
										'</div>',
									'</tpl>',
									'<tpl if="this.checkAnnex(AttachCount2)">',
									'<div class="rowscontent text-overflow" style="margin-top:10px">',
										'<tpl for="AttachList2">',
											'<div class="projectFileListDiv">',
												'<div class = "docAtt" style="background:url(resources/images/icon/{[this.addIcon(values.Url)]}) no-repeat;background-size: 26px 26px;"></div>',
												'<div class="docAttFileName">{FileName}</div>',
											'</div>',
										'</tpl>',
									'</div>',
									'</tpl>',
									'<div class="rowscontent">',
										'<div style="position:relative;width:100%;height:20px;margin-left:.3em">',
											'<div style="position: absolute;width:0%;height:20px"></div>',
											'<div style="position: absolute;width:100%;left:0%;text-align:right;height:20px">{[iPass.util.PubOperation.dataFormatLogogram(values.CheckTime,"")]}</div>',
										'</div>',
									'</div>',
								'</div>',
								'</div>',
							'</tpl>',{
						// 编译
						compiled : true,
						joinContent : function(content) {
							if(!Ext.isEmpty(content)){
								var contentStr = Ext.JSON.decode(content),str = '',replaceStr = '';
					        	Ext.Array.each(contentStr, function(contents) {
					        		str += contents.Key == '' ? contents.Value + '&nbsp;&nbsp;' : contents.Key + '：' + contents.Value+'&nbsp;&nbsp;';
					        	});
					        	
					        	// 替换空格是否为空
					        	replaceStr = iPass.util.PubOperation.replaceAll(str,"&nbsp;&nbsp;","");
						        if(Ext.String.trim(replaceStr) == ''){
						        	 str = Global.getTipsMsg('hisNoContent');
						        }
				                return str;
							}else{
								return Global.getTipsMsg('hisNoContent');
							}
						},
						// 检查是否包含附件
						checkAnnex : function(AttachCount){
							if(AttachCount == 0){
								return false;
							}else{
								return true;
							}
						},
						// 角色转换大写
						upperCase : function(RoleType){
							if(RoleType == 'dm'){
								return 'HQDM';
							}else if(RoleType == 'pm'){
								return 'RDM/RPM';
							}
						},
						//显示图片文字
						showPicText : function(){
							return Global.getTipsMsg('showPicText');
						},
						setLeftVal : function(index){
							if(index == 1){
								return 'margin-left:0px;';
							}else if(index == 2){
								return 'margin-left:45px;';
							}else if(index == 3){
								return 'margin-left:90px;';
							}
						},
						addIcon : function(Url) {
							var str1 = Url.substring(Url.lastIndexOf("."));
							var attStr = str1.substring(1).toLowerCase();
							var result = "";
							switch (attStr) {
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
						},
						getUpdateStatus : function(Uploadstatus){
							if(Uploadstatus){return Uploadstatus;}
						}
			}),
				items: [{
					xtype : 'listitemheader',
					scrollDock: 'bottom',
			        docked: 'bottom',
					flex : 1,
					style : 'display : block',
					locales  : {
		                html : 'checkPointHis.historyVal'
		            }
				}]
			},{
				xtype : 'panel',
				scrollable : false,
				scrollDock: 'top',
		        docked: 'top',
				name : 'projectFileListPanel',
				cls : 'projectFileCls',
				tpl: Ext.create('Ext.XTemplate',
					'<tpl for=".">',
						'<div class="projectFileList defaultFont-style" onclick="checkPointListCtr.checkAtt(\'{FilePath}\')">',
						'<div class="projectFileListDiv">',
							'<div class="head">',
								'<div class="attImg" style="background:url(resources/images/icon/{[this.addIcon(values.FileNameLast)]}) no-repeat;background-size: 26px 26px;"></div>',
								'<div class="attFileName text-overflow">',
								'<span display:inline-block;width:80%;>{FileName}</span>',
								'<tpl if="VersionNo==\'V1\'">',
									'<span class="attImgButton" style="background:none"></span>',
								'<tpl else>',
									'<span class="attImgButton" onclick="checkPointListCtr.jumpToProjectFileList(\'{FilePathGroup}\')"></span>',
								'</tpl>',
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
						'</div>',
					'</tpl>',{
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
				}),
				items: [{
						xtype : 'listitemheader',
						scrollDock: 'bottom',
				        docked: 'bottom',
						flex : 1,
						style : 'display : block;background:#e9ecf1 !important;border-top: 0.2em solid #C5D0E0!important;border-bottom: 0.1em solid #ECF0F4!important;color : #B7C0CE !important',
						locales  : {
			                html : 'checkPointHis.lastReply'
			            }
				}]
			},{
				xtype : 'panel',
				scrollable : false,
				scrollDock: 'top',
		        docked: 'top',
				name : 'hisSummary',
				tpl: Ext.create('Ext.XTemplate',
						'<div style="position:relative;padding : .5em .5em">'+
						'<div class="checkPoint-img">'+
							'<tpl if="ItemStatus==\'pass\'">',
							'<img class="checkPointListImg" src="resources/images/status/third-status.png" />',
						'<tpl elseif="ItemStatus==\'notpass\'">',
							'<img class="checkPointListImg" src="resources/images/status/fourth-status.png" />',
						'<tpl elseif="ItemStatus==\'altpass\'">',
							'<img class="checkPointListImg" src="resources/images/status/first-status.png" />',
						'<tpl elseif="ItemStatus==\'expires\'">',
							'<img class="checkPointListImg" src="resources/images/status/second-status.png" />',
						'<tpl elseif="ItemStatus==\'unchecked\'">',
							'<img class="checkPointListImg" src="resources/images/status/fifth-status.png" />',
						'<tpl elseif="ItemStatus==\'justexpires\'">',
							'<img class="checkPointListImg" src="resources/images/status/eight-status.png" />',
						'<tpl else>',
							'<img class="checkPointListImg" src="resources/images/status/seventh-status.png" />',
						'</tpl>',
						'</div>',
						'<div class="checkPoint-row defaultFont-style" style="margin: 10px 0px 5px 40px;">',
							'<div class="head"><b>{ItemName}</b></div>',
			//				'<div class="rowscontent text-overflow" style="color:#759297;">{Content}</div>',
							'<div class="rowscontent text-overflow" style="color:#414042;">{[Global.getTipsMsg("schedule")]}：{ScheduledTime}</div>',
							'<tpl if="this.hasAttachList(AttachList)">',
								'<div class="rowscontent" style="margin:3px auto 0px -1px">',
								    '<div style="position:relative;width:100%;height:40px;margin-left:.3em">',
									 	'<tpl for="AttachList">',
									 		'<div style="position: absolute;width:40px;height:40px;{[this.setLeftVal(xindex)]}">',
											     //'<img src="data:image/png;base64,{Url}" width="40px" height="40px" />',
											  '<input type="image" onclick="checkPointActionSheetCtr.viewPic(\'{parent.AttachListString}\',{[xindex]})" src="{Key}" width="40px" height="40px" />',
										    '</div>',
									    '</tpl>',
									'</div>',
								'</div>',
							'</tpl>',
						'</div>',
//						// 检查是否有附件版本
//						'<tpl if="this.hasAttachList(itemAttach)">',
//							'<div style="position:absolute;top:45px;left:13px">',
//								'<div class="projectItemAnnex-Div">',
//									'<img class="projectItemAnnexImg" src="resources/images/annex.png" />',
//								'</div>',
//							'</div>',
//						'</tpl>',
						{
							compile : true,
							hasAttachList : function(attachList){
								if(attachList){
									if(attachList.length > 0){return true;}
									else {return false;}
								}
							},
							setLeftVal : function(index){
								if(index == 1){
									return 'margin-left:0px;';
								}else if(index == 2){
									return 'margin-left:45px;';
								}else if(index == 3){
									return 'margin-left:90px;';
								}
							}
						}),
					items: [{
						xtype : 'listitemheader',
						itemId : 'projectFileHeader',
						scrollDock: 'bottom',
				        docked: 'bottom',
						flex : 1,
						style : 'display : block;background:#e9ecf1 !important;border-top: 0.2em solid #C5D0E0!important;border-bottom: 0.1em solid #ECF0F4!important;color : #B7C0CE !important',
						locales  : {
			                html : 'projectFileList.title'
			            }
					}]
				},{
					xtype : 'panel',
					name : 'scheduleList',
					id : 'scheduleListP',
					scrollDock: 'bottom',
			        docked: 'bottom',
					scrollable : false,
					padding: '0px',
					tpl : Ext.create('Ext.XTemplate',
							'<tpl for=".">',
								'<div class="scheduleDiv defaultFont-style">',
									'<p><span class="scheduleDivLeft" style="margin-right: 8px;">{[Global.getTipsMsg("OriginalDate")]}:</span>{OldScheduleTime}</p>',
									'<p><span class="scheduleDivLeft" style="margin-right: 8px;">{[Global.getTipsMsg("NewSchDate")]}:</span>{NewScheduleTime}</p>',
									'<p style="white-space: normal;word-break: break-word;-webkit-line-clamp: 2;-webkit-box-orient: vertical;margin-right: 8px;"><span class="scheduleDivLeft">{[Global.getTipsMsg("ChangeReson")]}:</span>{ChangeReason}</p>',
									'<p class="content"><span class="scheduleName">{UserName}({UserRole})</span><span class="scheduleDivTime">{[iPass.util.PubOperation.dataFormatLogogram(values.CreateTime,"")]}</span></p>',
								'</div>',
							'</tpl>',
					{compiled : true}),
					items: [{
						xtype : 'listitemheader',
						scrollDock: 'bottom',
				        docked: 'top',
						flex : 1,
						style : 'display : block',
						cls : 'scheduleHead',
						locales  : {
			                html : 'checkPointHis.schedule'
			            }
					}]
				}]
		}]
	}
});