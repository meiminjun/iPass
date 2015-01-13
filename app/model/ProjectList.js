/**
 * 首页项目列表model
 * 
 * @author yangkun
 * @create 2013-09-24
 */
Ext.define('iPass.model.ProjectList', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			name : 'CountryName',
			type : 'string'
		},{
			name : 'CountryCode',
			type : 'string'
		}, {
			name : 'ProjectImage',
			type : 'string'
		}, {
			name : 'ProjectCode',
			type : 'string'
		}, {
			name : 'ProjectName',
			type : 'string'
		}, {
			name : 'Description',
			type : 'string'
		},{
			name : 'ProjectStatus',
			type : 'string'
		},
		// NotPassPercent,UncheckedPercent,FourLevelPercent后台返回，ThreeLevelPercent convert on left
		// 代表红色未通过检查NotPassPercent
		{name:"NotPassPercent",type:"int"},
		// 代表灰色未到期未检查UncheckedPercent
        {name:"UncheckedPercent",type:"int"},
        // 代表黄色超期检查ExpiredPercent
        {name:"ExpiredPercent",type:"int"},
        // 绿色百分比真实值
        {name:"PassedRealPercent",type:"int"},
        {
        	// 代表绿色检查通过 Passed
            name:'PassedPercent',
            type:'int'
//            convert: function(value, record) {
//                var one  = record.get('NotPassPercent'),two  = record.get('UncheckedPercent'),detect=record.get('ExpiredPercent'),three;
//                three = 100 - one - two - detect;
//                return three;
//            }
        },
        {
            name:'TwoLevelLeftPercent',
            type:'int',
            convert: function(value, record) {
                var twoleft  = 100 - record.get('UncheckedPercent') - record.get('NotPassPercent');
                return twoleft;
            }
        },
        {
            name:'ThreeLevelLeftPercent',
            type:'int',
            convert: function(value, record) {
                var threeleft  = 100 - record.get('UncheckedPercent');
                return threeleft;
            }
        }]
	}
});