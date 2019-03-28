/*
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-19 17:11:23
 * @LastEditTime: 2019-03-28 16:36:54
 */
const orderConfig = {
  queryConditionsForm: [ // 服务类订单管理查询条件
    {
      title: '购方名称',
      code: 'buyyerName'
    },
    {
      title: '二级供应商编码',
      code: 'supplierCode'
    },
    {
      type: 'button'
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
      title: '传输起止日期',
      code1: 'dateStart',
      code2: 'dateEnd',
      type: 'datepicker'
    },
    {
      title: '单据起号',
      code: 'orderStart'
    },
    {
      title: '单据止号',
      code: 'orderEnd'
    }, {
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
  posForm: [// POS订单管理查询条件
    {
      title: '开票码',
      code: 'buyyerName'
    },
    {
      type: 'button',
      showbtn: true
    }
  ],
  commodityConditionsForm: [ // 服务类订单管理查询条件
    {
      title: '购方名称',
      code: 'buyyerName'
    },
    {
      title: '二级供应商编码',
      code: 'supplierCode'
    },
    {
      type: 'button',
      showbtn: true
    },
    {
      title: '费用单据编号',
      code: 'billCode'
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
    },
    {
      title: '传输起止日期',
      code1: 'dateStart',
      code2: 'dateEnd',
      type: 'datepicker'
    }
  ],
  columns: [ // 表头
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
      align: 'center',
      width: 120
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'se', // <String>  对应属性名
      label: '税额', // <String>   表头标签
      align: 'center',
      width: 100// 列宽
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
  ],
  commodityColumns: [ // 表头
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
      align: 'center',
      width: 120
    },
    {
      hasSort: true, // <Boolean> 是否排序
      isShow: true, // <Boolean> 是否展示
      prop: 'se', // <String>  对应属性名
      label: '税额', // <String>   表头标签
      align: 'center',
      width: 100// 列宽
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
  ],
  posOperation: { // 操作功能
    label: '操作', // 操作列的行首文字
    width: '200', // 操作列的宽度
    className: '', // 操作列的class名
    isShow: true,
    data: [ // 操作列数据
      {
        label: '删除', // 按钮文字
        Fun: 'handleDelete', // 点击按钮后触发的父组件事件
        size: 'mini', // 按钮大小
        id: '1', // 按钮循环组件的key值
        classname: 'show', // 按钮的类名
        type: 'danger' // 按钮的类型
      }
    ]
  }

}
export default
orderConfig
