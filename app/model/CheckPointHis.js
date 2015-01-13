/**
 * 检查点历史model
 * 
 * @author yangkun
 * @create 2013-09-26
 */
Ext.define('iPass.model.CheckPointHis', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			// 编号
			name : 'RecodeID',
			type : 'int'
		}, {
			name : 'TimeStamp',
			type : 'string'
		}, {
			// 检查结果
			name : 'CheckResult',
			type : 'string'
		}, {
			// 回复内容
			name : 'CheckContent',
			type : 'string'
		}, {
			name : 'ItemCode',
			type : 'string'
		}, {
			// 检查者AD
			name : 'CheckUserAD',
			type : 'string'
		}, {
			// 检查者姓名
			name : 'CheckUserName',
			type : 'string'
		}, {
			// 检查者角色
			name : 'RoleType',
			type : 'string'
		}, {
			// 检查时间
			name : 'CheckTime',
			type : 'string'
		}, {
			name : 'Status',
			type : 'string'
		}, {
			// 附件数量
			name : 'AttachCount',
			type : 'int'
		}, {
			// 附件列表
			name : 'AttachList',
			type : 'object'
		}, {
			// 附件列表str
			name : 'ImgList',
			type : 'string'
		}, {
			// 是否只有一条记录
			name : 'isOnly',
			type : 'boolean',
			defaultValue : false
		},{
			name : 'AttachList2',
			type: 'object'
		},{
			name : 'AttachCount2',
			type : 'int'
		},{
			name : 'UserName',
			type : 'string'
		},{
			name : 'CreateTime',
			type : 'string'
		},{
			name : 'OldScheduleTime',
			type : 'string'
		},{
			name : 'NewScheduleTime',
			type : 'string'
		},{
			name : 'ChangeReason',
			type : 'string'
		},{
			name : 'UserRole',
			type : 'string'
		},{
			name : 'Uploadstatus',
			type : 'auto'
		}]
	}
});