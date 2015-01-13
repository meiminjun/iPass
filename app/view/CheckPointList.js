/**
 * 检查点列表
 * 
 * @author yangkun
 * @create 2013-09-27
 */
Ext.define('iPass.view.CheckPointList', {
	extend : 'Ext.Container',
	xtype : 'checkPointList',
	requires : [ 'Ext.List','Ext.SegmentedButton','Ext.Toolbar'],
	config : {
		layout : 'vbox',
		items:[{
			xtype : 'list',
			loadingText : false,
			scrollToTopOnRefresh : false,
			flex : 9,
			itemTpl : [ '<div style="position:relative;top:12px;left:-5px">',
						'<div class="checkPoint-img">',
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
						'</div>',
						'<div class="checkPoint-row defaultFont-style">',
							'<div class="head"><b>{ItemName}</b></div>',
							'<div class="content">{Content}</div>',
//							'<div class="rowscontent text-overflow" style="color:#759297;">{Content}</div>',
							'<div class="rowscontent text-overflow" style="color:#414042;">{[Global.getTipsMsg("schedule")]}：{ScheduledTime}</div>',
							'<div class="rowscontent text-overflow" style="color:#414042;">{[iPass.util.PubOperation.dataFormatLogogram(values.LastCheckTime,"")]}</div>',	
							// 检查是否有图纸附件
							'<tpl if="this.hasAttachList(AttachList)">',
								'<div class="rowscontent" style="margin:3px auto 0px -1px">',
								    '<div style="position:relative;width:100%;height:40px;margin-left:.3em">',
									 	'<tpl for="AttachList">',
									 		'<div style="position: absolute;width:40px;height:40px;{[this.setLeftVal(xindex)]}">',
											     //'<img src="data:image/png;base64,{Url}" width="40px" height="40px" />',
											  '<input type="image" onclick="checkPointActionSheetCtr.viewPic(\'{parent.AttachListString}\',{[xindex]},\'checkPointList\')" src="{Key}" width="40px" height="40px" />',
										    '</div>',
									    '</tpl>',
									'</div>',
								'</div>',
							'</tpl>',
						'</div>',
						'<tpl if="PMChecked">',
							'<div class="checkPoint-enable" onclick="checkPointListCtr.goToCheckPointListHis(\'{ItemCode}\',\'CheckPointList\')"></div>',							
						'<tpl else>',
							'<div class="checkPoint-disable" onclick="checkPointListCtr.goToCheckPointListHis(\'{ItemCode}\',\'CheckPointList\')"></div>',
						'</tpl>',
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
						}]
		},{
			xtype : 'toolbar',
			docked : 'bottom',
			layout: {
		        type: 'hbox'
		    },
			items : [{
				xtype:'segmentedbutton',
				flex  : 1,
			    defaults : {
			    	flex  : 1
			    },
				items: [
				        {
				        	locales : {
				        		text: 'segmentedbutton.DMunchecked'
				        	},
				            name : 'DMunchecked'
				        },
				        {
				        	locales : {
				        		text: 'segmentedbutton.PMunchecked'
				        	},
				            name : 'PMunchecked'
				        },
				        {
				        	locales : {
				        		text: 'segmentedbutton.issues'
				        	},
				            name : 'issues'
				        },
				        {
				        	locales : {
				        		text: 'segmentedbutton.all'
				        	},
				            name : 'all',
				            pressed: true
				        }
				    ]
			}]
		}]
	}
});