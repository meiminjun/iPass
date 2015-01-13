/**
 * 检查阶段列表controller
 */
Ext.define('iPass.controller.ProjectPhaseList', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'main',
			projectPhaseList : 'projectPhaseList',
			checkItemsListSeg : 'checkItemsList segmentedbutton',
			projectPhaseListSeg : 'projectPhaseList segmentedbutton'
		},
		control : {
			projectPhaseList : {
				itemsingletap : 'onprojectPhaseListTap'
			},
			projectPhaseListSeg : {
				toggle : 'projectPhaseListSegTap'
			}
		}
	},
	/**
	 * 进入检查项混合列表
	 * 
	 * @param list
	 * @param index
	 * @param item
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	onprojectPhaseListTap : function(list, index, item, record, e, eOpts) {
		var main = this.getMain(),navBar = main.getNavigationBar();
		if (!this.checkScopeList) {
			this.checkScopeList = Ext.widget('checkScopeList');
		}
		var checkScopeList = this.checkScopeList,
			scopeSegBtn = checkScopeList.down('toolbar > segmentedbutton'),
			projectPhasePressedBtn = this.getProjectPhaseListSeg().getPressedButtons(),
			pressedBtn = scopeSegBtn.getPressedButtons();
		
		checkScopeList.config.title = record.get('ItemName');
		checkScopeList.down('list').refresh();
		main.push(checkScopeList);
		
		if(projectPhasePressedBtn[0].config.name == pressedBtn[0].config.name){
			// set title
			navBar.setTitle(Global.loadingTpl.format(record.get('ItemName')));
			// ajax or set store
			var ckScopelist = checkScopeList.down('list'),store = Ext.getStore('CheckScopeList');
			var param = {
					ProjectCode : record.get('ProjectCode'),
					ItemCode : record.get('ItemCode'),
					TemplateCode : Global.templateCode,
					ItemDsc : '0,',
					// default All
					FilType : projectPhasePressedBtn[0].config.name
				};
			// set Global param
			Global.proScopePm = param;
			ckScopelist.setStore(store);
			iPass.util.PubOperation.pubListLoad(store, param, true, true,false, 'checkScopeList'+param.ProjectCode+param.ItemCode+param.FilType,function(){
				navBar.setTitle(record.get('ItemName'));
			});
		}else{
			// set filterCondition pressed
			iPass.util.PubOperation.setfilterPressed(scopeSegBtn,projectPhasePressedBtn[0].config.name);
		}
		
		// set Global
		Global.projectCode = record.get('ProjectCode');
		Global.scopeCode = record.get('ItemCode');
	},
	/**
	 * 加载项目阶段
	 * @param{}filType
 	 */
	loadProjectPhaseList : function(filType){
		var main = this.getMain(),navBar = main.getNavigationBar(),title = navBar.getTitle(),
			projectPhaseList = this.getProjectPhaseList(),store = Ext.getStore('ProjectPhaseList');
		var param = {
				ProjectCode : Global.projectCode,
				TemplateCode : Global.templateCode,
				ItemCode : Global.itemCode,
				ItemDsc : '0,',
				FilType : filType
			};
		// set Global param
		Global.proPhasePm = param;
		navBar.setTitle(Global.loadingTpl.format(title));
		projectPhaseList.setStore(store);
		iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'projectPhaseList'+param.ProjectCode+param.ItemCode,function(){
			navBar.setTitle(title);
		});
	},
	/**
	 * 根据不同的条件筛选项目阶段
	 * @param container
	 * @param button
	 * @param pressed
	 */
	projectPhaseListSegTap : function(container, button, pressed){
		var name = button.config.name;
		if(pressed){
			this.loadProjectPhaseList(name);
		}
	}
});
