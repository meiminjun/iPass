/**
 * 检查点model
 * 
 * @author yangkun
 * @create 2013-09-27
 */
Ext.define('iPass.model.CheckPointList', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			// 检查项/检查点ID
			name : 'ItemId',
			type : 'int'
		},{
			// 图纸url缩略图集合
			name : 'AttachList',
			type : 'auto'
		},{
			// 图纸url集合
			name : 'AttachListString',
			type : 'auto'
		}, {
			// 所属项目编码
			name : 'ProjectCode',
			type : 'string'
		}, {
			// 检查项/检查点code
			name : 'ItemCode',
			type : 'int'
		}, {
			// 查询字符串(后面的参数中需要使用到,不绑定到页面,与数据结构有关)
			name : 'ItemCodeDsc',
			type : 'string'
		}, {
			// 标题
			name : 'ItemName',
			type : 'string'
		}, {
			// 节点类型
			name : 'ItemType',
			type : 'string'
		}, {
			// 内容
			name : 'Content',
			type : 'string'
		}, {
			// 回复项格式(回复为普通回复时为空字符串,否则为回复项的标题,多个标题用"|"隔开,转成数组后内容需用decodeURI解码)
			name : 'ReplyItems',
			type : 'string'
		}, {
			// PM最后回复的信息
			name : 'ReplyItemsPMLastCheck',
			type : 'string'
		}, {
			// 是否适用
			name : 'UseAble',
			type : 'boolean'
		}, {
			// PM是否已检查
			name : 'PMChecked',
			type : 'boolean'
		}, {
			// DM是否已检查
			name : 'DMChecked',
			type : 'boolean'
		}, {
			// PM检查状态
			name : 'PMCheckStatus',
			type : 'string'
		}, {
			// DM检查状态
			name : 'DMCheckStatus',
			type : 'string'
		}, {
			// PM输入的Alternative
			name : 'PMAlternative',
			type : 'string'
		}, {
			// DM输入的Alternative
			name : 'DMAlternative',
			type : 'string'
		}, {
			// 最后检查时间
			name : 'LastCheckTime',
			type : 'string'
		}, {
			// 最后检查人员姓名
			name : 'LastCheckUserName',
			type : 'string'
		}, {
			//
			name : 'ScheduledTime',
			type : 'string'
		}, {
			// 检查点状态
			name : 'ItemStatus',
			type : 'string'
		} ]
	}
});