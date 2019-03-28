/*
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-19 09:38:33
 * @LastEditTime: 2019-03-21 17:44:27
 */
/**
 * Created by linzb on 2019/3/1.
 */
const apiPath = {
  login: {
    login: '/user/login'
  },
  system: {
    organization: {
      list: '/organization/selectOrganizationsList',
      // nodeDetail: '/organization/nodeDetail',
      deleteNode: '/organization/deleteOrganization',
      updateNode: '/organization/updateOrganization',
      addNode: '/organization/insertOrganization',
      terminalList: '/terminal/selectByTerminal',
      deleteTerminal: '/terminal/deleteTerminal'
    },
    shop: {
      list: '/store/selectAll.do',
      newAdd: '/store/insertStore.do',
      editdata: '/store/updateStore.do',
      deletedata: '/store/deleteTicketList.do'
      // addNode: '/organization/add'
    },
    user: {
      list: '/store/selectAll.do', // 获取用户列表
      save: '/system/user/save.do', // 用户保存
      delete: '/system/user/delete.do', // 删除用户
      detail: '/system/user/detail.do' // 获取用户详情
    },
    InfoManagement: {
      list: '/commoditye/selectByCommodity', // 页面加载获取数据
      newAdd: '/commoditye/insertCommodity', // 添加数据
      updateda: '/commoditye/updateCommodity' // 编辑数据(修改数据)
    },
    store: {
      list: '',
      add: '',
      edit: '',
      delete: ''
    },
    role: {
      selectByRole: '/role/selectByRole ', // 角色信息查询
      deleteRole: '/role/deleteRole', // 角色信息删除
      insertRole: '/role/insertRole', // 角色信息新增
      updateRole: '/role/updateRole' // 角色信息编辑
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
