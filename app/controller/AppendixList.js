/**
 * 项目附录controller
 */
Ext.define('iPass.controller.AppendixList', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'main',
			appendixList : 'main appendixList',
			projectPhaseList : 'main projectPhaseList',
			appendixListSeg : 'appendixList segmentedbutton'
		},
		control : {
			appendixList : {
				itemsingletap : 'onAppendixListTap'
			},
			appendixListSeg : {
				toggle : 'appendixListSegTap'
			}
		}
	},
	/**
	 * 进入检查阶段列表
	 */
	onAppendixListTap : function(list, index, item, record, e, eOpts) {
		var main = this.getMain(),navBar = main.getNavigationBar();
		if (!this.projectPhaseList) {
			this.projectPhaseList = Ext.widget('projectPhaseList');
		}
		var projectPhaseList = this.projectPhaseList,
			itemSegBtn = projectPhaseList.down('toolbar > segmentedbutton'),
			appendListPressedBtn = this.getAppendixListSeg().getPressedButtons(),
			pressedBtn = itemSegBtn.getPressedButtons();
		
		projectPhaseList.config.title = record.get('ItemName');
		main.push(projectPhaseList);
		
		if(appendListPressedBtn[0].config.name == pressedBtn[0].config.name){
			// set title
			navBar.setTitle(Global.loadingTpl.format(record.get('ItemName')));
			// ajax or set store
			var projectPhaseList = this.getProjectPhaseList(),store = Ext.getStore('ProjectPhaseList');
			var param = {
					ProjectCode : record.get('ProjectCode'),
					TemplateCode : Global.templateCode,
					ItemCode : record.get('ItemCode'),
					ItemDsc : '0,',
					FilType : appendListPressedBtn[0].config.name
				};
			// set Global param
			Global.proPhasePm = param;
			projectPhaseList.setStore(store);
			iPass.util.PubOperation.pubListLoad(store, param, true, true,false, 'projectPhaseList'+param.ProjectCode+param.ItemCode,function(){
				navBar.setTitle(record.get('ItemName'));
			});
		}else{
			// set filterCondition pressed
			iPass.util.PubOperation.setfilterPressed(itemSegBtn,appendListPressedBtn[0].config.name);
		}
		
		// set Global
		Global.projectCode = record.get('ProjectCode');
		Global.itemCode = record.get('ItemCode');
	},
	/**
	 * 根据不同的条件筛选项目附录
	 * @param container
	 * @param button
	 * @param pressed
	 */
	appendixListSegTap : function(container, button, pressed){
		var name = button.config.name;
		if(pressed){
			var store = Ext.getStore('AppendixList');
			var main = this.getMain(),navBar = main.getNavigationBar(),title = navBar.getTitle(),
			params = {
				ProjectCode : Global.projectCode,
				TemplateCode :  Global.templateCode,
				FilType : name
			};
			categoryListCtr.appendListAjax(store,params,title);
			// set Global
			Global.proAppendPm = params;
			Global.appendListFilType = name;
		}
	}
});