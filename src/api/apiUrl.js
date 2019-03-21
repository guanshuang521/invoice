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
    InfoManagement: {
      list: '/commoditye/selectByCommodity', // 页面加载获取数据
      newAdd: '/commoditye/insertCommodity' // 添加数据
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
    },
    infoManagement: {
      list: '',
      newAdd: ''
    }
  },
  queryStatistics: {
    orderOpenMessage: {
      getTableList: '/orderOpenMessage/getTableList'
    }
  }
}
export default apiPath
