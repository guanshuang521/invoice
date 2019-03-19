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
      list: ''
    },
    invoiceModel: {
      list: ''
    }
  },
  queryStatistics: {
    orderOpenMessage: {
      getTableList: '/orderOpenMessage/getTableList'
    }
  },
    invoiceOpening: {
        opening: {
        // 开具
          gmfGetList: '/mvc/customer/getList',//POST 查询客户信息列表
          spmcGetList: "rbac/mvc/commodityInfo/getList",//POST 查询商品信息列表
        }
    },
}
export default apiPath
