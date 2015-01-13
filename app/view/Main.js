/**
 * 首页
 * 
 * @author yangkun
 * @create 2013-09-24
 */
Ext.define('iPass.view.Main', {

	extend : 'Ext.NavigationView',
	xtype : 'main',

	config : {
		id : 'mainNavigationView',
		fullscreen : true,
		autoDestroy : false,
		locales : {
			defaultBackButtonText : 'navigationView.defaultBackButtonText'
		},
		// add pop event listeners
		listeners : {
			'pop' : function(obj,view,eOpts){
				mainCtr.navigationViewBack();
//				console.log('navigationview pop done;');
			}
		},
		navigationBar : {
			ui : 'dark',
			docked : 'top',
			backButton : {
				align : 'left',
				ui : 'normal',
				hidden : true
			},
			items : [ {
				name : 'homeBackBtn',
				ui : 'normal',
				align : 'left',
				locales : {
					text : 'navigationView.homeBackButtonText'
				}
			},{
				ui : 'roleBtn',
				iconCls : 'pmBtn',
				id : 'navBarRoleBtn',
				align : 'right',
				hidden : true
			}]
		},
		items : [ {
			xtype : 'projectList'
		} ]
	}
});