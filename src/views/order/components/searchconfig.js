/*
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-19 17:11:23
 * @LastEditTime: 2019-03-19 17:44:15
 */
const searchconfig = {
  queryConditionsForm: [
    {
      title: '购方名称',
      code: 'buyyerName'
    },
    {
      title: '二级供应商编码',
      code: 'supplierCode'
    },
    {
      title: '费用单据编号',
      code: 'billCode'
    },
    {
      title: '结算单号',
      code: 'countOrderNum'
    },
    {
      title: '单据起号',
      code: 'orderStart'
    },
    {
      title: '单据止号',
      code: 'orderEnd'
    },
    {
      title: '传输起止日期',
      code1: 'dateStart',
      code2: 'dateEnd',
      type: 'datepicker'
    },
    {
      title: '订单状态',
      code: 'orderState',
      type: 'select',
      options: [
        {
          id: 0,
          text: '快车'
        },
        {
          id: 1,
          text: '专车'
        },
        {
          id: 2,
          text: '顺风车'
        },
        {
          id: 3,
          text: '出租车'
        }
      ]
    }
  ],
  columns: [
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'billCode', // <String>  对应属性名
      label: '单据编号', // <String>   表头标签
      align: 'center',
      width: '100'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'countOrderNum', // <String>  对应属性名
      label: '结算单号', // <String>   表头标签
      align: 'center',
      width: '100'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'datatype', // <String>  对应属性名
      label: '数据类型', // <String>   表头标签
      align: 'center',
      width: '100'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'ordertype', // <String>  对应属性名
      label: '单据类型', // <String>   表头标签
      align: 'center',
      width: '100'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'OrderNum', // <String>  对应属性名
      label: '费用单据编号', // <String>   表头标签
      align: 'center',
      width: '100'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'supplierCode', // <String>  对应属性名
      label: '二级供应商编码', // <String>   表头标签
      align: 'center'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'money', // <String>  对应属性名
      label: '金额（不含税）', // <String>   表头标签
      align: 'center'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'se', // <String>  对应属性名
      label: '税额', // <String>   表头标签
      align: 'center',
      width: 200 // 列宽
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'sjhj', // <String>  对应属性名
      label: '价税合计', // <String>   表头标签
      align: 'center'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'xfsh', // <String>  对应属性名
      label: '销方税号', // <String>   表头标签
      align: 'center'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'gfmc', // <String>  对应属性名
      label: '购方名称', // <String>   表头标签
      align: 'center'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'gfsh', // <String>  对应属性名
      label: '购方税号', // <String>   表头标签
      align: 'center'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'addtel', // <String>  对应属性名
      label: '购方地址电话', // <String>   表头标签
      align: 'center'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'account', // <String>  对应属性名
      label: '购方开户行及账号', // <String>   表头标签
      align: 'center'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'transferdate', // <String>  对应属性名
      label: '传输日期', // <String>   表头标签
      align: 'center'
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'bz', // <String>  对应属性名
      label: '备注', // <String>   表头标签
      align: 'center'
    }
  ]
}
export default
searchconfig
