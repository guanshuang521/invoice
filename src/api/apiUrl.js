/**
 * @author Linzb
 * @date 2019/4/1
 * @Description: 接口配置文件
 */
const apiPath = {
  app: {
    changePassword: '/rbac/userInfo/updatePassword' // 修改密码
  },
  login: {
    login: '/rbac/userInfo/login',
    logout: '/rbac/userInfo/logout',
    dict: '/rbac/paramDetail/selectParamDetailsList',
    userInfo: '/rbac/userInfo/getUserInfo'
  },
  // 系统管理
  system: {
    // 组织机构管理
    organization: {
      list: '/rbac/organization/selectOrganizationsList',
      deleteNode: '/rbac/organization/deleteOrganization',
      updateNode: '/rbac/organization/updateOrganization',
      addNode: '/rbac/organization/insertOrganization',
      terminalList: '/rbac/terminal/selectByTerminal',
      deleteTerminal: '/rbac/terminal/deleteTerminal',
      addTerminal: '/rbac/terminal/insertTerminal',
      updateTerminal: '/rbac/terminal/updateTerminal',
      getOrgZs: '/rbac/organization/getOrganizationZs',
      updateOrgZs: '/rbac/organization/updateOrganizationByZs'
    },
    // 门店管理
    shop: {
      list: '/rbac/store/selectByStore',
      newAdd: '/rbac/store/insertStore',
      edit: '/rbac/store/updateStore',
      delete: '/rbac/store/deleteTicketList',
      detail: '/rbac/store/selectStoreByPrimaryKey'
    },
    // 用户管理
    user: {
      nodeList: '/rbac/user/getRoleList', // 获取权限树
      list: '/rbac/userInfo/selectByUserInfo', // 获取用户列表
      AllRolelist: '/rbac/user/selectByRole', // 获取所有角色列表
      add: '/rbac/userInfo/insertUserInfo', // 新增数据
      edit: '/rbac/userInfo/updateUserInfo', // 修改数据
      save: '/rbac/system/user/save.do', // 用户保存
      delete: '/rbac/userInfo/deleteUserInfo', // 删除用户
      detail: '/rbac/userInfo/selectUserInfoView', // 获取用户详情
      roleList: '/rbac/role/selectRoleList', // 查询全部角色列表
      assignRole: '/rbac/user/assignRole', // 用户关联角色
      selectTerminalsList: '/rbac/terminal/selectTerminalsList',
      updatePassword: '/rbac/userInfo/resetPassword',
      selectUserOrgList: '/rbac/userInfo/selectUserOrgList'
    },
    // 角色权限管理
    role: {
      selectByRole: '/rbac/role/selectByRole', // 角色信息查询
      deleteRole: '/rbac/role/deleteRole', // 角色信息删除
      insertRole: '/rbac/role/insertRole', // 角色信息新增
      detail: '/rbac/role/selectRoleInfo', // 获取角色信息
      updateRole: '/rbac/role/updateRole', // 角色信息编辑
      getRources: '/rbac/menu/selectResourcesList' // 获取所有菜单
    },
    // 开票规则模板
    template: {
      list: '/rbac/invoiceRule/selectByInvoiceRule',
      add: '/rbac/invoiceRule/insertInvoiceRule',
      edit: '/rbac/invoiceRule/updateInvoiceRule',
      delete: '/rbac/invoiceRule/deleteInvoiceRule'
    },
    // 商品信息维护
    InfoManagement: {
      list: '/rbac/commoditye/selectByCommodity', // 页面加载获取数据
      newAdd: '/rbac/commoditye/insertCommodity', // 添加数据
      editData: '/rbac/commoditye/updateCommodity', // 编辑数据(修改数据)
      exportModle: '/rbac/commoditye/downloadExcel', // 下载模板
      exportData: '/rbac/commoditye/exportCommodityExcel', // 导出数据
      importExcel: '/rbac/commoditye/importCommodityExcel', // 导入Excel
      commodityTypes: '/rbac/commodityType/selectCommodityTypesList', // 获取所有的税收分类编码,
      allList: '/rbac/commoditye/selectCommoditysList', // 获取所有商品列表
      getManagementCode: '/rbac/commoditye/getSpbmCode', // 根据税收分类名称获取商品编码
      updateCommodityByShflbm: '/rbac/commoditye/updateCommodityByShflbm' // 批量设置税收分类编码
    },
    codeManagement: {
      list: '/rbac/commodityType/selectByCommodityType', // 页面加载获取数据
      newAdd: '/rbac/commodityType/insertCommodityType', // 添加数据
      editData: '/rbac/commodityType/updateCommodityType', // 编辑数据(修改数据)
      exportModle: '/rbac/commodityType/downloadExcel', // 下载模板
      exportData: '/rbac/commodityType/exportCommodityTypeExcel', // 导出数据
      importExcel: '/rbac/commodityType/importCommodityTypeExcel' // 导入Excel
    },
    store: {
      list: '',
      add: '',
      edit: '',
      delete: ''
    },
    customer: {
      selectByCustomer: '/rbac/customer/selectByCustomer', // 购方信息查询
      selectCustomerList: '/rbac/customer/selectCustomersList', // 获取所有购方信息
      deleteCustomer: '/rbac/customer/deleteCustomer', // 购方信息删除
      insertCustomer: '/rbac/customer/insertCustomer', // 购方信息新增
      editCustomer: '/rbac/customer/updateCustomer',
      exportModle: '/rbac/customer/downloadCustomerExcel', // 导出模板
      importExcel: '/rbac/customer/importCustomerExcel' // 导入Excel数据
    },
    resource: {
      selectByResource: '/rbac/resource/selectByResource' // 获取菜单列表
    },
    invoiceModel: {
      list: ''
    }
  },
  order: {
    list: {
      erpList: '/invoice/erpOrder/findFwErpOrderByCondition',
      Commdylist: '/invoice/erpOrder/findSpErpOrderByCondition',
      delerpList: '/invoice/posOrder/deletePosOrderAndDetail',
      // 服务类导出
      exportErp: '/invoice/erpOrder/exportFwErpOrder',
      // 商品导出
      exportCommidyErp: '/invoice/erpOrder/exportSpErpOrder',
      getInvoices: '/invoice/erpOrder/biuldInvoiceByIds',
      buildInvoice: '/invoice/erpOrder/biuldInvoiceByGmf',
      dobuildInvoiceGmf: '/invoice/erpOrder/doBiuldInvoiceByGmf',
      dobuildInvoiceIds: '/invoice/erpOrder/doBiuldInvoiceByIds'
    },
    pos: {
      findList: '/invoice/posOrder/findAllPosOrderByCondition',
      delList: '/invoice/posOrder/batchDeletePosOrder',
      downPos: '/invoice/posOrder/downPosOrder',
      buildInvoicePre: '/invoice/posOrder/buildInvoicePre',
      exportPosOrder: '/invoice/posOrder/exportPosOrder',
      gfmcPos: '/invoice/posOrder/exportPosOrder',
      dobuildInvoicePre: '/invoice/posOrder/doBuildInvoicePre'
    }
  },
  queryStatistics: {
    orderOpenMessage: {
      getTableList: '/invoice/queryAndCount/getOrderList',
      getOrderList: '/invoice/queryAndCount/viewInvoiceFromOrder',
      orderInfo: '/invoice/queryAndCount/viewOrderFromInvoice'
      // getTableList: '/invoice/queryAndCount/getOrderList'
    }
  },

  invoiceOpening: {
    opening: {
      // 开具纸票
      makeInvoicePaper: '/invoice/invoice/makeInvoicePaper',
      // 开具电票
      makeEInvoice: '/invoice/invoice/makeEInvoice',
      // 下载
      download: '/invoice/invoice/downloadSinglePdf',
      // 获取未使用的发票代码、号码
      getNotInvoiceYetDmHm: '/invoice/invoice/getNotInvoiceYetDmHm'
    }
  },

  invoice: {
    invoicePre: {
      list: '/invoice/invoicePre/findAllInvoicePreByCondition',
      backInvoicePre: '/invoice/invoicePre/backInvoicePre',
      exportInvoicePre: '/invoice/invoicePre/exportInvoicePre',
      orderDetail: 'invoice/invoicePre/viewInvoicePreOrder'
    },
    wSpecial: {
      list: '/invoice/invoicePre/findAllInvoicePreByCondition',
      batchIssue: '/invoice/batchIssue',
      billSendBack: '/invoice/billSendBack',
      billDetail: 'invoice/billDetail'
    },
    oSpecial: {
      list: '/invoice/invoice/getInvoiceListPage',
      retrieve: '/invoice/invoice/getInvoiceBack',
      batchIssue: '/invoice/batchIssue',
      billSendBack: '/invoice/billSendBack',
      billDetail: '/invoice/billDetail',
      cancel: '/invoice/invoice/voidedCheck', // 作废
      exportAll: '/invoice/invoice/exportInvoiceAll', // 发票导出
      validate: '/invoice/invoice/validateInvoice', // 发票验证
      passBackInvoice: '/invoice/invoice/passBackInvoice', // 数据回传
      fpDetail: '/invoice/invoice/getInvoiceByHmDm', // 获取发票详情
      reInvoice: '/invoice/invoice/voidedCheckAndReInvoice', // 发票作废重开
      sendMsg: '/invoice/invoice/sendEInoviceEmail' // 发票推送
    },
    oOrdinary: {
      list: '/invoice/invoice/getInvoiceListPage',
      retrieve: '/invoice/invoice/getInvoiceBack',
      batchIssue: '/invoice/batchIssue',
      billSendBack: '/invoice/billSendBack',
      billDetail: '/invoice/billDetail',
      cancel: '/invoice/invoice/voidedCheck', // 作废
      exportAll: '/invoice/invoice/exportInvoiceAll', // 发票导出
      validate: '/invoice/invoice/validateInvoice' // 发票验证
    },
    redTable: {
      list: '/invoice/invoiceHzxxb/selectByInvoiceHzxxb', // 查询
      delete: '/invoice/invoiceHzxxb/deleteInvoiceHzxxb', // 删除
      detail: '/invoice/invoiceHzxxb/selectByInvoiceHzxxbByfp', // 详情
      insert: '/invoice/invoiceHzxxb/insertInvoiceHzxxb', // 保存
      apply: '/invoice/invoiceHzxxb/applyInvoiceHzxxb', // 申请
      sync: '/invoice/invoiceHzxxb/queryInvoiceHzxxb', // 同步
      upload: '/invoice/invoiceHzxxb/queryInvoiceHzxxb', // 上传
      editDetail: '/invoice/invoiceHzxxb/selectInvoiceHzxxbView', // 查看编辑详情
      editSave: '/invoice/invoiceHzxxb/updateInvoiceHzxxb' // 编辑保存
    },
    openInvoice: {
      opeinvoiceList: '/invoice/queryAndCount/queryIssuedInvoice', // 已开发票查询
      exportIssuedInvoice: '/invoice/queryAndCount/exportIssuedInvoice',
      fpSeeDetail: '/invoice/queryAndCount/getInvoiceByHmDm'
    }
  },
  // 数据同步
  dataSync: {
    taskQuery: {
      getList: 'invoiceJob/scheduleJobLog/queryScheduleJobLogList',
      exportExcel: 'invoiceJob/scheduleJobLog/exportScheduleJobLog'
    },
    taskSetting: {
      list: '/invoiceJob/scheduleJob/queryScheduleJobList',
      submitSync: '/invoiceJob/scheduleJob/syncOrder',
      add: '/invoiceJob/scheduleJob/addScheduleJob',
      edit: '/invoiceJob/scheduleJob/editScheduleJob'
    }
  }
}
export default apiPath
