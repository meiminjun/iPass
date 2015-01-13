/**
 * ProjectDetails
 * 
 * @author yangkun
 * @create 2013-09-25
 */
Ext.define('iPass.view.ProjectDetails', {
	extend : 'Ext.form.Panel',
	xtype : 'projectDetails',
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
			cls : 'div-corners defaultFont-style'
		},
		items : [ {
			xtype : 'label',
			locales  : {
				html : 'projectDetails.lblProjectName'
            }
		}, {
			// 项目名称
			xtype : 'textfield',
			name : 'proName',
			readOnly : true
		},{
			xtype : 'label',
			locales  : {
				html : 'projectDetails.lblCountry'
            }
		}, {
			// 国家
			xtype : 'textfield',
			name : 'country',
			readOnly : true
		},{
			xtype : 'label',
			locales  : {
				html : 'projectDetails.lblGFT'
            }
		}, {
			// 总建筑面积
			xtype : 'textfield',
			name : 'GFA',
			readOnly : true
		}, {
			xtype : 'label',
			locales  : {
				html : 'projectDetails.lblComm'
            }
		}, {
			// 开始日期
			xtype : 'textfield',
			name : 'commencementDate',
			readOnly : true
		}, {
			xtype : 'label',
			locales  : {
				html : 'projectDetails.lblComp'
            }
		}, {
			// 结束日期
			xtype : 'textfield',
			name : 'completeDate',
			readOnly : true
		}, {
			xtype : 'label',
			name : 'consultantLabel',
			locales  : {
				html : 'projectDetails.lblCons'
            }
		}, {
			// 顾问
			xtype : 'textfield',
			name : 'consultant',
			readOnly : true,
			padding : '0px 40px 0px 0px'
		}, {
			xtype : 'panel',
			html : '<div class="arrow-black" style="margin:-3.1em 1em auto auto;"></div>'
		} , {
			xtype : 'label',
			name : 'mainContractorLabel',
			locales  : {
				html : 'projectDetails.lblContr'
            },
            margin : '-20px auto auto auto'
		}, {
			// 总包
			xtype : 'textfield',
			name : 'mainContractor',
			readOnly : true,
			padding : '0px 40px 0px 0px'
		}, {
			xtype : 'panel',
			html : '<div class="arrow-black" style="margin:-3.1em 1em auto auto;"></div>'
		}, {
			xtype : 'label',
			name : 'subLabel',
			locales  : {
				html : 'projectDetails.lblSub'
            },
            margin : '-20px auto auto auto'
		}, {
			// 分包
			xtype : 'textfield',
			name : 'sub',
			readOnly : true,
			padding : '0px 40px 0px 0px'
		}, {
			xtype : 'panel',
			html : '<div class="arrow-black" style="margin:-3.1em 1em auto auto;"></div>'
		}]
	}
});