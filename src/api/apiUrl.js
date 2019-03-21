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
  invoice: {
    wSpecial: {
      list: 'invoice/search',
      batchIssue: '/invoice/batchIssue',
      billSendBack: '/invoice/billSendBack'
    }
  }
}
export default apiPath
