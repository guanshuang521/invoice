/**
 * @author Linzb
 * @date 2019/4/1
 * @Description: 接口配置文件
 */
const apiPath = {
  login: {
    login: '/user/login',
    dict: '/paramDetail/selectParamDetailsList'
  },
  // 系统管理
  system: {
    // 组织机构管理
    organization: {
      list: '/organization/selectOrganizationsList',
      deleteNode: '/organization/deleteOrganization',
      updateNode: '/organization/updateOrganization',
      addNode: '/organization/insertOrganization',
      terminalList: '/terminal/selectByTerminal',
      deleteTerminal: '/terminal/deleteTerminal',
      updateTerminal: '/terminal/updateTerminal'
    },
    // 门店管理
    shop: {
      list: '/store/selectByStore',
      newAdd: '/store/insertStore',
      edit: '/store/updateStore',
      delete: '/store/deleteTicketList',
      detail: '/store/selectStoreByPrimaryKey'
    },
    // 用户管理
    user: {
      list: '/store/selectAll.do', // 获取用户列表
      save: '/system/user/save.do', // 用户保存
      delete: '/system/user/delete.do', // 删除用户
      detail: '/system/user/detail.do' // 获取用户详情
    },
    // 角色权限管理
    role: {
      selectByRole: '/role/selectByRole', // 角色信息查询
      deleteRole: '/role/deleteRole', // 角色信息删除
      insertRole: '/role/insertRole', // 角色信息新增
      detail: '/role/selectRoleInfo', // 获取角色信息
      updateRole: '/role/updateRole' // 角色信息编辑
    },
    // 开票规则模板
    template: {
      list: '/invoiceRule/selectByInvoiceRule',
      add: '/invoiceRule/insertInvoiceRule',
      delete: '/invoiceRule/deleteInvoiceRule'
    },
    // 商品信息维护
    InfoManagement: {
      list: '/commoditye/selectByCommodity', // 页面加载获取数据
      newAdd: '/commoditye/insertCommodity', // 添加数据
      editData: '/commoditye/updateCommodity', // 编辑数据(修改数据)
      exportModle: '/commoditye/downloadCommodityExcel', // 下载模板
      exportData: '/commoditye/exportCommodityExcel', // 导出数据
      importExcel: '/commoditye/importCommodityExcel' // 导入Excel
    },
    customer: {
      selectByCustomer: '/customer/selectByCustomer', // 购方信息查询
      deleteCustomer: '/customer/deleteCustomer', // 购方信息删除
      insertCustomer: '/customer/insertCustomer' // 购方信息新增
    },
    resource: {
      selectByResource: '/resource/selectByResource' // 获取菜单列表
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
