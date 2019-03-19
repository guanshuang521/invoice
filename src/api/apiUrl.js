/*
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-19 09:38:33
 * @LastEditTime: 2019-03-19 17:02:50
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
      updateNode: '/organization/update'
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
  order: {
    list: '/order/list'
  }
}
export default apiPath
