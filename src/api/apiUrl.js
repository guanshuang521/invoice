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
      insertRole: '/role/insertRole' // 角色信息新增
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
  queryStatistics: {
    orderOpenMessage: {
      getTableList: '/orderOpenMessage/getTableList'
    }
  }
}
export default apiPath
