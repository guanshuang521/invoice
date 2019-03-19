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
      selectByRole: '/role/selectByRole ' // 角色信息查询
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
