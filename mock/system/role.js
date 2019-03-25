var role = {
  'list': [
    {
      createId: 0,
      createTime: 'string',
      creator: 'string',
      deleteFlag: 'string',
      description: 'string',
      id: 0,
      modifiedId: 0,
      modifiedTime: 'string',
      modifier: 'string',
      orgId: 0,
      roleCode: '管理员',
      roleName: '管理员',
      status: 1,
      resourceId: [10]
    }, {
      createId: 0,
      createTime: 'string',
      creator: 'string',
      deleteFlag: 'string',
      description: 'string',
      id: 1,
      modifiedId: 0,
      modifiedTime: 'string',
      modifier: 'string',
      orgId: 0,
      roleCode: '认同',
      roleName: '对方v',
      status: 0,
      resourceId: []
    }, {
      createId: 0,
      createTime: 'string',
      creator: 'string',
      deleteFlag: 'string',
      description: 'string',
      id: 2,
      modifiedId: 0,
      modifiedTime: 'string',
      modifier: 'string',
      orgId: 0,
      roleCode: '如同',
      roleName: '额度',
      status: 1,
      resourceId: []
    }
  ],
  'node-tree': [
    {
      id: 1,
      parentId: 0,
      title: '进项管理',
      name: 'system',
      path: '/system',
      hidden: false
    }, {
      id: 10,
      parentId: 1,
      title: '发票采集管理',
      name: 'organization',
      path: 'organization',
      component: 'system/organization',
      hidden: false
    }, {
      id: 11,
      parentId: 1,
      title: '门店管理',
      name: 'shop',
      path: 'shop',
      component: 'system/shop',
      hidden: false
    }, {
      id: 12,
      parentId: 1,
      title: '用户管理',
      name: 'user',
      path: 'user',
      component: 'system/user',
      hidden: false
    }, {
      id: 13,
      parentId: 1,
      title: '角色权限管理',
      name: 'role',
      path: 'role',
      component: 'system/role',
      hidden: false
    }, {
      id: 14,
      parentId: 1,
      title: '开票规则模板',
      name: 'template',
      path: 'template',
      component: 'system/template',
      hidden: false
    }, {
      id: 15,
      parentId: 1,
      title: '购方信息维护',
      name: 'infoMaintenance',
      path: 'infoMaintenance',
      component: 'system/infoMaintenance',
      hidden: false
    }, {
      id: 16,
      parentId: 1,
      title: '税收分类编码管理',
      name: 'codeManagement',
      path: 'codeManagement',
      component: 'system/codeManagement',
      hidden: false
    }, {
      id: 17,
      parentId: 1,
      title: '商品信息管理',
      name: 'infoManagement',
      path: 'infoManagement',
      component: 'system/infoManagement',
      hidden: false
    }, {
      id: 2,
      parentId: 0,
      title: '订单管理',
      name: 'order',
      path: '/order',
      hidden: false
    }, {
      id: 20,
      parentId: 2,
      title: '服务类订单管理',
      name: 'service',
      path: 'service',
      component: 'order/service',
      hidden: false
    }, {
      id: 21,
      parentId: 2,
      title: 'POS订单管理',
      name: 'pos',
      path: 'pos',
      component: 'order/pos',
      hidden: false
    }, {
      id: 22,
      parentId: 2,
      title: '商品类订单管理',
      name: 'commodity',
      path: 'commodity',
      component: 'order/commodity',
      hidden: false
    }, {
      id: 3,
      parentId: 0,
      title: '发票管理',
      name: 'invoice',
      path: '/invoice',
      hidden: false
    }, {
      id: 30,
      parentId: 3,
      title: '待开专票管理',
      name: 'wSpecial',
      path: 'wSpecial',
      component: 'invoice/wSpecial',
      hidden: false
    }, {
      id: 31,
      parentId: 3,
      title: '待开普票管理',
      name: 'wOrdinary',
      path: 'wOrdinary',
      component: 'invoice/wOrdinary',
      hidden: false
    }, {
      id: 32,
      parentId: 3,
      title: '待开电子发票管理',
      name: 'wElectronic',
      path: 'wElectronic',
      component: 'invoice/wElectronic',
      hidden: false
    }, {
      id: 33,
      parentId: 3,
      title: '已开专票管理',
      name: 'oSpecial',
      path: 'oSpecial',
      component: 'invoice/oSpecial',
      hidden: false
    }, {
      id: 34,
      parentId: 3,
      title: '已开普票管理',
      name: 'oOrdinary',
      path: 'oOrdinary',
      component: 'invoice/oOrdinary',
      hidden: false
    }, {
      id: 35,
      parentId: 3,
      title: '已开电子发票管理',
      name: 'oElectronic',
      path: 'oElectronic',
      component: 'invoice/oElectronic',
      hidden: false
    }, {
      id: 36,
      parentId: 3,
      title: '红字信息表管理',
      name: 'redTable',
      path: 'redTable',
      component: 'invoice/redTable',
      hidden: false
    }, {
      id: 4,
      parentId: 0,
      title: '发票填开',
      name: 'invoiceOpening',
      path: '/invoiceOpening',
      hidden: false
    }, {
      id: 40,
      parentId: 4,
      title: '手工填开专票',
      name: 'special',
      path: 'special',
      component: 'invoiceOpening/special',
      hidden: false
    }, {
      id: 41,
      parentId: 4,
      title: '手工填开普票',
      name: 'ordinary',
      path: 'ordinary',
      component: 'invoiceOpening/ordinary',
      hidden: false
    }, {
      id: 42,
      parentId: 4,
      title: '手工填开电子发票',
      name: 'electronic',
      path: 'electronic',
      component: 'invoiceOpening/electronic',
      hidden: false
    }, {
      id: 43,
      parentId: 4,
      title: '手工填开农产品收购',
      name: 'buyFarm',
      path: 'buyFarm',
      component: 'invoiceOpening/buyFarm',
      hidden: false
    }, {
      id: 5,
      parentId: 0,
      title: '查询与统计',
      name: 'queryStatistics',
      path: '/queryStatistics',
      hidden: false
    }, {
      id: 51,
      parentId: 5,
      title: '已开发票查询',
      name: 'openInvoice',
      path: 'openInvoice',
      component: 'queryStatistics/openInvoice',
      hidden: false
    }, {
      id: 52,
      parentId: 5,
      title: '订单开票信息查询',
      name: 'orderOpenMessage',
      path: 'orderOpenMessage',
      component: 'queryStatistics/orderOpenMessage',
      hidden: false
    }, {
      id: 53,
      parentId: 5,
      title: '发票订单信息查询',
      name: 'invoiceOrderMessage',
      path: 'invoiceOrderMessage',
      component: 'queryStatistics/invoiceOrderMessage',
      hidden: false
    }, {
      id: 6,
      parentId: 0,
      title: '数据同步',
      name: 'dataSync',
      path: '/dataSync',
      hidden: false
    }, {
      id: 60,
      parentId: 6,
      title: '任务查询',
      name: 'taskQuery',
      path: '/taskQuery',
      component: 'dataSync/taskQuery',
      hidden: false
    }, {
      id: 61,
      parentId: 6,
      title: '任务设置',
      name: 'taskSettings',
      path: '/taskSettings',
      component: 'dataSync/taskSettings',
      hidden: false
    }
  ]
}
export default {
  selectByRole: res => {
    const info = role['list']
    const body = JSON.parse(res.body)
    console.log(body)
    var count = 0
    var list = []
    if (info) {
      count = info.length
      for (var i = 0; i < count; i++) {
        if (body.roleName && !body.status && info[i].roleName.match(body.match)) {
          list.push(info[i])
        }
        if (!body.roleName && body.status && info[i].status === Number(body.status)) {
          list.push(info[i])
        }
        if (body.roleName && body.status && info[i].roleName.match(body.match) && info[i].status === Number(body.status)) {
          list.push(info[i])
        }
      }
      if (list.length === 0) {
        list = info
      }
      count = list.length
      return {
        code: '0000',
        data: {
          count: count,
          currentPage: body.currentPage,
          list: list,
          pageSize: body.pageSize
        }
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  },
  deleteRole: res => {
    const body = JSON.parse(res.body)
    var info = role['list']
    console.log(body)
    if (info) {
      for (var i = 0; i < info.length; i++) {
        for (var j = 0; j < body.ids.length; j++) {
          if (info[i] && body.ids[j] === info[i].id) {
            info.splice(i, 1)
          }
        }
      }
      // role['list'] = info
      return {
        code: '0000',
        data: {},
        message: '已成功删除角色'
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  },
  insertRole: res => {
    const body = JSON.parse(res.body)
    var info = role['list']
    console.log(body)
    if (info) {
      var ind = info[info.length - 1].id + 1
      info[info.length] = {
        createId: 0,
        createTime: 'string',
        creator: 'string',
        deleteFlag: 'string',
        description: 'string',
        id: ind,
        modifiedId: 0,
        modifiedTime: 'string',
        modifier: 'string',
        orgId: 0,
        roleCode: '管理员',
        roleName: body.roleName,
        status: Number(body.status),
        resourceId: body.resourceId
      }
      return {
        code: '0000',
        data: {},
        message: '已新增角色'
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  },
  updateRole: res => {
    const body = JSON.parse(res.body)
    var info = role['list']
    console.log(body)
    if (info) {
      for (var i = 0; i < info.length; i++) {
        if (info[i].id === body.id) {
          for (var k in body) {
            if (info[i][k]) {
              info[i][k] = body[k]
            }
          }
        }
      }
      return {
        code: '0000',
        data: {},
        message: '已编辑角色'
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  },
  selectByResource: res => {
    const info = role['node-tree']
    const body = JSON.parse(res.body)
    console.log(body)
    if (info) {
      var tree = info
      return {
        code: '0000',
        data: {
          count: 1,
          currentPage: body.currentPage,
          list: tree,
          pageSize: body.pageSize
        }
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  }
}
