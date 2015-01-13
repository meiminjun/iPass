/**
 * 首页controller
 */
Ext.define('iPass.controller.ProjectList', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'main',
			projectListContainer : 'projectList',
			projectList : 'projectList list',
			appendixList : 'main appendixList',
			consultant : 'projectDetails textfield[name=consultant]',
			consultantLabel : 'projectDetails label[name=consultantLabel]',
			mainContractor : 'projectDetails textfield[name=mainContractor]',
			mainContLabel : 'projectDetails label[name=mainContractorLabel]',
			sub : 'projectDetails textfield[name=sub]',
			subLabel : 'projectDetails label[name=subLabel]',
			contractorList : 'contractorList'
		},
		control : {
			projectListContainer : {
				show : 'projectListShowFun'
			},
			projectList : {
				itemsingletap : 'onProjectListTap'
			},
			consultant : {
				focus : 'onConsultantFocus'
			},
			mainContractor : {
				focus : 'onMainContractorFocus'
			},
			sub : {
				focus : 'onSubFocus'
			},
			contractorList : {
				itemsingletap : 'contractorListTap'
			}
		}
	},
	/**
	 * 项目列表初始化
	 * @param obj
	 * @param eOpts
	 */
	projectListShowFun : function(obj,eOpts){
		var main = this.getMain(),navBar = main.getNavigationBar(),proList =  this.getProjectList(),store = Ext.getStore('ProjectList');
		if(iPass.util.PubOperation.isGoogleChrome()){
			// ajax or set store
			var param = {};
			// set Global param
			Global.proListPm = param;
			
			iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'projectList',function(){
				navBar.setTitle('iPass');
			});
			proList.setStore(store);
		}else{
			var callback = function(){
				// ajax or set store
				var param = {};
				// set Global param
				Global.proListPm = param;

				iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'projectList',function(){
					navBar.setTitle('iPass');
					
					if(Global.pushFlag == '1'){
						categoryListCtr.onInboxBtnTap();
					}
				});
				proList.setStore(store);
			};
			PhoneGapAPI.getLoginUserInfo(callback);
		}
	},
	/**
	 * 进入项目模板列表
	 * 
	 * @param list
	 * @param index
	 * @param item
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	onProjectListTap : function(list, index, item, record, e, eOpts) {
		var main = this.getMain(),navBar = main.getNavigationBar(), homeBackBtn = navBar.down('button[name=homeBackBtn]');
		// destroy back btn
		if(homeBackBtn){
			homeBackBtn.destroy();
		};
		
		if (!this.categoryList) {
			this.categoryList = Ext.widget('categoryList');
		}
		var categoryList = this.categoryList;
		categoryList.config.title = record.get('ProjectName');
		main.push(categoryList);
		navBar.setTitle(Global.loadingTpl.format(record.get('ProjectName')));
		
		var list = categoryList.down("list"),store = Ext.getStore('CategoryList'),param = {
			ProjectCode : record.get('ProjectCode')
		};
		// ajax or set store
		iPass.util.PubOperation.pubListLoad(store, param, true, true, false, 'categoryList'+record.get('ProjectCode'),function(){
			navBar.setTitle(record.get('ProjectName'));
		});
		list.setStore(store);
		// 缓存项目当前状态
		Global.projectStatus = record.get('ProjectStatus');
		Global.projectCode = record.get('ProjectCode');
		Global.projectListSub = 'categoryList';
	},
	/**
	 * 进入详细项目信息详细
	 * 
	 * @param index
	 * @param record
	 */
	goToProjectPhaseList : function(record, index) {
		var main = this.getMain(),navBar = main.getNavigationBar(), homeBackBtn = navBar.down('button[name=homeBackBtn]');
		// destroy back btn
		if(homeBackBtn){
			homeBackBtn.destroy();
		};
		
		if (!this.proDetails) {
			this.proDetails = Ext.widget('projectDetails');
		}
		var proDetails = this.proDetails,form = proDetails;

		proDetails.config.title = record.get('ProjectName');
		this.getMain().push(proDetails);
		
		// scroll to Top
		proDetails.getScrollable().getScroller().scrollToTop();
		
		//ajaxFun
		var url = Global.domain + '/api/GetProjectInfo.ashx';
		var params = {
				ProCode : record.get('ProjectCode')
		};
		var resultFun = function(responseText) {
           if(Ext.isEmpty(responseText)){
        	   form.reset();
        	   Global.projectInfo = null;
           }else{
        	   var resJson = Ext.JSON.decode(responseText);
        	   var consultantNameArr = [],mainContractorNameArr = [],subContractorNameArr = [];
        	   // set Global
        	   Global.projectInfo = resJson;
        	   
        	   // 人员arr
        	   if(resJson.ConsultantList.length > 0){
        		   Ext.Array.each(resJson.ConsultantList,function(Consultant){
        			   consultantNameArr.push(Consultant.SupplierName);
        		   });
        	   }
        	   
        	   // 总包arr
        	   if(resJson.MainContractorList.length > 0){
        		   Ext.Array.each(resJson.MainContractorList,function(MainContractor){
        			   mainContractorNameArr.push(MainContractor.SupplierName);
        		   });
        	   }
        	   
        	   // 分包arr
        	   if(resJson.SubContractorList.length > 0){
        		   Ext.Array.each(resJson.SubContractorList,function(SubContractor){
        			   subContractorNameArr.push(SubContractor.SupplierName);
        		   });
        	   }
        	   
        	   form.setValues({
					proName : resJson.ProjectDescription,
					country : resJson.CountryName,
					GFA : resJson.GFA,
					commencementDate : iPass.util.PubOperation.dateFormatFun(resJson.BeginTime),
					completeDate : iPass.util.PubOperation.dateFormatFun(resJson.FinishTime),
					consultant : resJson.ConsultantList.length > 0 ? consultantNameArr.join('、') : Global.getTipsMsg('consultantEmpty'),
					mainContractor : resJson.MainContractorList.length > 0 ? mainContractorNameArr.join('、') : Global.getTipsMsg('consultantEmpty'),
					sub : resJson.SubContractorList.length > 0 ? subContractorNameArr.join('、') : Global.getTipsMsg('consultantEmpty')
        	   });
           }
        };
	
		var failureFun = function() {
			iPass.util.PubOperation.showTips('requestErrorMsg','failure');
		};
		// 调用ajax
		iPass.util.PubOperation.ajaxFun(url, params, resultFun, failureFun, true, true, true , 'projectDetails'+params.ProCode);
		Global.projectListSub = 'projectPhaseList';
	},
	/**
	 * 进入人员列表页面（顾问）
	 * 
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	onConsultantFocus : function(obj, e, eOpts) {
		if(Global.projectInfo && Global.projectInfo.ConsultantList.length > 0){
			var main = this.getMain();
			if (!this.contractorList) {
				this.contractorList = Ext.widget('contractorList');
			}
			var contractorList = this.contractorList;
			contractorList.config.title = this.getConsultantLabel().getHtml();
			main.push(contractorList);  
			
			Ext.getStore('ContractorList').setData(Global.projectInfo.ConsultantList);
		}
	},
	/**
	 * 进入人员列表页面（总包）
	 * 
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	onMainContractorFocus : function(obj, e, eOpts) {
		if(Global.projectInfo && Global.projectInfo.MainContractorList.length > 0){
			var main = this.getMain();
			if (!this.contractorList) {
				this.contractorList = Ext.widget('contractorList');
			}
			var contractorList = this.contractorList;
			contractorList.config.title = this.getMainContLabel().getHtml();
			main.push(contractorList);
		
			Ext.getStore('ContractorList').setData(Global.projectInfo.MainContractorList);
		}
	},
	/**
	 * 进入人员列表页面（分包）
	 * 
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	onSubFocus : function(obj, e, eOpts) {
		if(Global.projectInfo && Global.projectInfo.SubContractorList.length > 0){
			var main = this.getMain();
			if (!this.contractorList) {
				this.contractorList = Ext.widget('contractorList');
			}
			var contractorList = this.contractorList;
			contractorList.config.title = this.getSubLabel().getHtml();
			main.push(contractorList);
		
			Ext.getStore('ContractorList').setData(Global.projectInfo.SubContractorList);
		}
	},
	/**
	 * 总包分包列表，点击拨打电话
	 * @param list
	 * @param index
	 * @param item
	 * @param record
	 * @param e
	 * @param eOpts
	 */
	contractorListTap : function(list, index, item, record, e, eOpts){
		var tellNum = record.get('SupplierContactTel');
		if (Ext.os.is.Android) {
			if(!Ext.isEmpty(tellNum)){
				navigator.app.loadUrl('tel:'+ tellNum, { openExternal:true } );
			}
		}else if(Ext.os.is.iOS){
			if(!Ext.isEmpty(tellNum)){
				window.location.href = 'tel:' + tellNum;
			}
		}
	}
});
