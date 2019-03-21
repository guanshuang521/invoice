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
      list: '/organization/list',
      nodeDetail: '/organization/nodeDetail',
      deleteNode: '/organization/delete',
      updateNode: '/organization/update',
      addNode: '/organization/add'
    },
    shop: {
      list: '/store/selectAll.do',
      newAdd: '/store/insertStore.do',
      editdata: '/store/updateStore.do',
      deletedata: '/store/deleteTicketList.do'
      // addNode: '/organization/add'
    },
    User: {
      list: '/store/selectAll.do'
    },
    store: {
      list: '',
      add: '',
      edit: '',
      delete: ''
    },
    user: {
      list: ''
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
