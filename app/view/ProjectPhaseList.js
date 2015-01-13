/**
 * 项目阶段列表
 * 
 * @author duwei
 * @create 2013-09-25
 */
Ext.define('iPass.view.ProjectPhaseList', {
	extend : 'Ext.List',
	xtype : 'projectPhaseList',
	// requires : [ 'Ext.plugin.PullRefresh', 'Ext.plugin.ListPaging' ],
	requires : ['Ext.Toolbar','Ext.SegmentedButton'],
	config : {
		loadingText : false,
		scrollToTopOnRefresh : false,
		//ui : 'round',
		itemTpl : ['<div class="placeItemDiv defaultFont-style">',
					 '<div class="phaseDetails">',
						 '<div class="title">{ItemName}</div>',
					 	 '<div class="content">{Content}</div>',
					 '</div>',
					 '<div class="itemDiv_right">',
	                    '<div class="itemDiv_percente">' ,
		                    '<div style="height:100%;width: {PassedPercent}%;left:0%;background-color:#23903F;position: absolute;">' ,
		                    '</div>',
		                    '<div style="height:100%;width: {ExpiredPercent}%;left:{PassedPercent}%;;background-color: #FFFF01;position: absolute;">',
		                    '</div>',
		                    '<div style="height:100%;width: {NotPassPercent}%;left:{TwoLevelLeftPercent}%;background-color:#DA3A3A;position: absolute;">',
		                    '</div>',
		                    '<div style="height:100%;width: {UncheckedPercent}%;left:{ThreeLevelLeftPercent}%;background-color:#909193;position: absolute;">',
		                    '</div>',
	                    '</div>',
	                    '<div class="itemDiv_percente1">' ,
		                    '<div style="border-right:1px solid #ffffff;height:100%;width: {PassedPercent}%;left:0%;background-color:#485864;position: absolute;">' ,
			                    '<tpl if="PassedPercent &gt; 10">',
			                    	'{PassedPercent}%' ,
			                    '</tpl>',
		                    '</div>',
		                    '<div style="border-right:1px solid #ffffff;height:100%;width: {ExpiredPercent}%;left:{PassedPercent}%;background-color:#485864;position: absolute;">' ,
			                    '<tpl if="ExpiredPercent &gt; 10">',
			                    '{ExpiredPercent}%' ,
			                    '</tpl>',
		                    '</div>',
		                    '<div style="border-right:1px solid #ffffff;height:100%;width: {NotPassPercent}%;left:{TwoLevelLeftPercent}%;background-color: #485864;position: absolute;">' ,
			                    '<tpl if="NotPassPercent &gt; 10">',
			                    '{NotPassPercent}%' ,
			                    '</tpl>',
		                    '</div>',
		                    '<div style="height:100%;width: {UncheckedPercent}%;left:{ThreeLevelLeftPercent}%;background-color: #485864;position: absolute;">' ,
			                    '<tpl if="UncheckedPercent &gt; 10">',
			                    '{UncheckedPercent}%' ,
			                    '</tpl>',
		                    '</div>',
	                    '</div>',
                 '</div>',
                    '<div>',
                    '<div class="arrow-black" style="margin:-6.5em -1.2em auto auto"></div>',
                    '</div>',
                 '</div>'],
         items : [{
        	xtype : 'toolbar',
 	        docked: 'bottom',
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
