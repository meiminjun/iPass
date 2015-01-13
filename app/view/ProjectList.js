/**
 * 项目列表
 * 
 * @author yangkun
 * @create 2013-09-24
 */
Ext.define('iPass.view.ProjectList', {
	extend : 'Ext.Container',
	xtype : 'projectList',
	requires : ['Ext.dataview.List'],
	config : {
		ui : 'normal',
		layout : 'vbox',
		title : 'iPass<img style="width:1.5em;vertical-align: middle;padding-left: 3px;" src="./resources/images/mask/load.gif" />',
		items : [{
			xtype : 'list',
			ui : 'index',
			grouped : true,
			scrollToTopOnRefresh : false,
			flex : 9,
			loadingText : false,
			itemTpl : [
			        '<div style="position:relative;top:12px;left:-5px">',
						'<div class="avatar-img">',
							'<img class="listImgDef" src="data:image/png;base64,{ProjectImage}" />',
						'</div>', 
					'</div>',
					'<div class="avatar-row defaultFont-style">',
						'<div class="head text-overflow"><b>{ProjectName}</b></div>',
						'<div class="rowscontent">{Description}</div>',
					'</div>', 
					'<div>',
	                    '<div style="position: absolute;bottom: 0;right: 0;margin: 0px 87px 5px 0px;max-width: 30%;height: 20px;background-color: transparent;font-size:.8em;">{PassedRealPercent}%</div>' ,
	                    '<div style="position: absolute;bottom: 0;right: 0;margin: 0px 24px 7px 0px;width:60px;height: 20px;">' ,
	                        '<div style="width:100%;position: relative;height: 20px;">',
	                            '<div style="text-align:left;height:100%;width: {PassedPercent}%;left:0%;background-color:#23903F;position: absolute;">' ,
	                            '</div>',
	                            '<div style="height:100%;width: {ExpiredPercent}%;left:{PassedPercent}%;background-color: #FFFF01;position: absolute;">',
	                            '</div>',
	                            '<div style="height:100%;width: {NotPassPercent}%;left:{TwoLevelLeftPercent}%;background-color:#DA3A3A;position: absolute;">',
	                            '</div>',
	                            '<div style="height:100%;width: {UncheckedPercent}%;left:{ThreeLevelLeftPercent}%;background-color: #909193;position: absolute;">',
	                            '</div>',
	                        '</div>',
	                    "</div>",
	                '</div>',
					'<div>',
						'<tpl if="ProjectStatus == \'Paused\'">',
							'<div class="projectListPaused-bg" style="margin:-4em -4em auto auto;"></div>',
						'<tpl elseif="ProjectStatus == \'Completed\'">',
							'<div class="projectListCompleted-bg" style="margin:-4em -4em auto auto;"></div>',
						'</tpl>',
						'<div class="arrow-black" style="margin:-2.3em -3.7em auto auto;"></div>',
					'</div>'
			],
			onItemDisclosure : function(record,btn,index){
				proListCtr.goToProjectPhaseList(record,index);
			}
		}, {
			xtype : 'toolbar',
			docked : 'bottom',
			ui : 'dark',
			flex : 1,
			defaults : {
				xtype : 'button',
				ui : 'dark',
				iconMask : true
			},
			items : [ {
				id : 'inboxBtn',
				align : 'left',
				locales : {
					text : 'categoryList.inboxBtnText'
				}
			}, {
				xtype : 'spacer'
			}, {
				id : 'settingsBtn',
				align : 'right',
				iconCls : 'settings',
				locales : {
					text : 'categoryList.settingsBtnText'
				}
			} ]
		}]
	}
});
