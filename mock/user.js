const users = {
  'user-info': {
    id: 1,
    name: 'admin',
    token: 'admin-token'
  },
  'admin-token': [{
    id: 1,
    fid: 0,
    title: '系统管理',
    name: 'system',
    path: '/system',
    hidden: false
  }, {
    id: 10,
    fid: 1,
    title: '组织机构管理',
    name: 'organization',
    path: 'organization',
    component: 'system/organization',
    hidden: false
  }, {
    id: 11,
    fid: 1,
    title: '门店管理',
    name: 'shop',
    path: 'shop',
    component: 'system/shop',
    hidden: false
  }, {
    id: 12,
    fid: 1,
    title: '用户管理',
    name: 'user',
    path: 'user',
    component: 'system/user',
    hidden: false
  }, {
    id: 13,
    fid: 1,
    title: '角色权限管理',
    name: 'role',
    path: 'role',
    component: 'system/role',
    hidden: false
  }, {
    id: 14,
    fid: 1,
    title: '开票规则模板',
    name: 'template',
    path: 'template',
    component: 'system/template',
    hidden: false
  }, {
    id: 15,
    fid: 1,
    title: '购方信息维护',
    name: 'infoMaintenance',
    path: 'infoMaintenance',
    component: 'system/infoMaintenance',
    hidden: false
  }, {
    id: 16,
    fid: 1,
    title: '税收分类编码管理',
    name: 'codeManagement',
    path: 'codeManagement',
    component: 'system/codeManagement',
    hidden: false
  }, {
    id: 17,
    fid: 1,
    title: '商品信息管理',
    name: 'infoManagement',
    path: 'infoManagement',
    component: 'system/infoManagement',
    hidden: false
  }, {
    id: 2,
    fid: 0,
    title: '订单管理',
    name: 'order',
    path: '/order',
    hidden: false
  }, {
    id: 20,
    fid: 2,
    title: '服务类订单管理',
    name: 'service',
    path: 'service',
    component: 'order/service',
    hidden: false
  }, {
    id: 21,
    fid: 2,
    title: 'POS订单管理',
    name: 'pos',
    path: 'pos',
    component: 'order/pos',
    hidden: false
  }, {
    id: 22,
    fid: 2,
    title: '商品类订单管理',
    name: 'commodity',
    path: 'commodity',
    component: 'order/commodity',
    hidden: false
  }, {
    id: 3,
    fid: 0,
    title: '发票管理',
    name: 'invoice',
    path: '/invoice',
    hidden: false
  }, {
    id: 30,
    fid: 3,
    title: '待开专票管理',
    name: 'wSpecial',
    path: 'wSpecial',
    component: 'invoice/wSpecial',
    hidden: false
  }, {
    id: 31,
    fid: 3,
    title: '待开普票管理',
    name: 'wOrdinary',
    path: 'wOrdinary',
    component: 'invoice/wOrdinary',
    hidden: false
  }, {
    id: 32,
    fid: 3,
    title: '待开电子发票管理',
    name: 'wElectronic',
    path: 'wElectronic',
    component: 'invoice/wElectronic',
    hidden: false
  }, {
    id: 33,
    fid: 3,
    title: '已开专票管理',
    name: 'oSpecial',
    path: 'oSpecial',
    component: 'invoice/oSpecial',
    hidden: false
  }, {
    id: 34,
    fid: 3,
    title: '已开普票管理',
    name: 'oOrdinary',
    path: 'oOrdinary',
    component: 'invoice/oOrdinary',
    hidden: false
  }, {
    id: 35,
    fid: 3,
    title: '已开电子发票管理',
    name: 'oElectronic',
    path: 'oElectronic',
    component: 'invoice/oElectronic',
    hidden: false
  }, {
    id: 36,
    fid: 3,
    title: '红字信息表管理',
    name: 'redTable',
    path: 'redTable',
    component: 'invoice/redTable',
    hidden: false
  }, {
    id: 4,
    fid: 0,
    title: '发票填开',
    name: 'invoiceOpening',
    path: '/invoiceOpening',
    hidden: false
  }, {
    id: 40,
    fid: 4,
    title: '手工填开专票',
    name: 'special',
    path: 'special',
    component: 'invoiceOpening/special',
    hidden: false
  }, {
    id: 41,
    fid: 4,
    title: '手工填开普票',
    name: 'ordinary',
    path: 'ordinary',
    component: 'invoiceOpening/ordinary',
    hidden: false
  }, {
    id: 42,
    fid: 4,
    title: '手工填开电子发票',
    name: 'electronic',
    path: 'electronic',
    component: 'invoiceOpening/electronic',
    hidden: false
  }, {
    id: 43,
    fid: 4,
    title: '手工填开农产品收购',
    name: 'buyFarm',
    path: 'buyFarm',
    component: 'invoiceOpening/buyFarm',
    hidden: false
  }, {
    id: 5,
    fid: 0,
    title: '查询与统计',
    name: 'queryStatistics',
    path: '/queryStatistics',
    hidden: false
  }, {
    id: 51,
    fid: 5,
    title: '已开发票查询',
    name: 'openInvoice',
    path: 'openInvoice',
    component: 'queryStatistics/openInvoice',
    hidden: false
  }, {
    id: 52,
    fid: 5,
    title: '订单开票信息查询',
    name: 'orderOpenMessage',
    path: 'orderOpenMessage',
    component: 'queryStatistics/orderOpenMessage',
    hidden: false
  }, {
    id: 53,
    fid: 5,
    title: '发票订单信息查询',
    name: 'invoiceOrderMessage',
    path: 'invoiceOrderMessage',
    component: 'queryStatistics/invoiceOrderMessage',
    hidden: false
  }, {
    id: 6,
    fid: 0,
    title: '数据同步',
    name: 'dataSync',
    path: '/dataSync',
    hidden: false
  }, {
    id: 60,
    fid: 6,
    title: '任务查询',
    name: 'taskQuery',
    path: 'taskQuery',
    component: 'dataSync/taskQuery',
    hidden: false
  }, {
    id: 61,
    fid: 6,
    title: '任务设置',
    name: 'taskSettings',
    path: 'taskSettings',
    component: 'dataSync/taskSettings',
    hidden: false
  }],
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  login: res => {
    const data = users['user-info']
    if (data) {
      return {
        code: '0000',
        data
      }
    }
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  },
  getInfo: res => {
    const info = users['user-info']
    if (info) {
      return {
        code: '0000',
        data: info
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  },
  logout: () => {
    return {
      code: '0000',
      data: 'success'
    }
  },
  getRoute: () => {
    const data = users['admin-token']
    return {
      code: '0000',
      data: data
    }
  }
}
