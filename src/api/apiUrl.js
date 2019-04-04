/**
 * @author Linzb
 * @date 2019/4/1
 * @Description: 接口配置文件
 */
const apiPath = {
  login: {
    login: '/user/login',
    dict: '/rbac/paramDetail/selectParamDetailsList'
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
      updateTerminal: '/rbac/terminal/updateTerminal'
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
      list: '/rbac/user/selectAll', // 获取用户列表
      add: '/rbac/user/insertUser', // 新增数据
      edit: '/rbac/user/updateUser', // 修改数据
      save: '/rbac/system/user/save.do', // 用户保存
      delete: '/rbac/user/deleteUser', // 删除用户
      detail: '/rbac/system/user/detail.do' // 获取用户详情
    },
    // 角色权限管理
    role: {
      selectByRole: '/rbac/role/selectByRole', // 角色信息查询
      deleteRole: '/rbac/role/deleteRole', // 角色信息删除
      insertRole: '/rbac/role/insertRole', // 角色信息新增
      detail: '/rbac/role/selectRoleInfo', // 获取角色信息
      updateRole: '/rbac/role/updateRole' // 角色信息编辑
    },
    // 开票规则模板
    template: {
      list: '/rbac/invoiceRule/selectByInvoiceRule',
      add: '/rbac/invoiceRule/insertInvoiceRule',
      delete: '/rbac/invoiceRule/deleteInvoiceRule'
    },
    // 商品信息维护
    InfoManagement: {
      list: '/rbac/commoditye/selectByCommodity', // 页面加载获取数据
      newAdd: '/rbac/commoditye/insertCommodity', // 添加数据
      editData: '/rbac/commoditye/updateCommodity', // 编辑数据(修改数据)
      exportModle: '/rbac/commoditye/downloadCommodityExcel', // 下载模板
      exportData: '/rbac/commoditye/exportCommodityExcel', // 导出数据
      importExcel: '/rbac/commoditye/importCommodityExcel' // 导入Excel
    },
    codeManagement: {
      list: '/rbac/commodityType/selectByCommodityType', // 页面加载获取数据
      newAdd: '/rbac/commodityType/insertCommodityType', // 添加数据
      editData: '/rbac/commodityType/updateCommodityType', // 编辑数据(修改数据)
      exportModle: '/rbac/commodityType/downloadCommodityTypeExcel', // 下载模板
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
      deleteCustomer: '/rbac/customer/deleteCustomer', // 购方信息删除
      insertCustomer: '/rbac/customer/insertCustomer', // 购方信息新增
      exportModle: '/rbac/customer/downloadCustomerExcel', // 导出模板
      importExcel: '/rbac/customer/importCustomerExcel' // 导入Excel数据
    },
    resource: {
      selectByResource: '/rbac/resource/selectByResource' // 获取菜单列表
    },
    invoiceModel: {
      list: ''
    },
    infoManagement: {
      list: '',
      newAdd: ''
    }
  },
  order: {
    list: '/order/list'
  },
  queryStatistics: {
    orderOpenMessage: {
      getTableList: '/orderOpenMessage/getTableList'
    }
  },

  invoiceOpening: {
    opening: {
      // 开具
      gmfGetList: 'rbac/mvc/customer/getList', // POST 查询客户信息列表
      spmcGetList: 'rbac/mvc/commodityInfo/getList' // POST 查询商品信息列表
    }
  },

  invoice: {
    wSpecial: {
      list: 'invoice/search',
      batchIssue: '/invoice/batchIssue',
      billSendBack: '/invoice/billSendBack',
      billDetail: 'invoice/billDetail'
    }
  }

}
export default apiPath
