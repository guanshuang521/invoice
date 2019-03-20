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
      status: 1
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
      status: 0
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
      status: 1
    }
  ],
  'node-tree': [
    {
      id: 1,
      label: '进项管理',
      children: [{
        id: 4,
        label: '发票采集管理',
        children: [{
          id: 9,
          label: 'Level three 1-1-1'
        }, {
          id: 10,
          label: 'Level three 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: 'Level one 2',
      children: [{
        id: 5,
        label: 'Level two 2-1'
      }, {
        id: 6,
        label: 'Level two 2-2'
      }]
    }, {
      id: 3,
      label: 'Level one 3',
      children: [{
        id: 7,
        label: 'Level two 3-1'
      }, {
        id: 8,
        label: 'Level two 3-2'
      }]
    }
  ]
}
export default {
  selectByRole: res => {
    const info = role['list']
    const body = JSON.parse(res.body)
    var count = 0
    var list = []
    if (info) {
      count = info.length
      // console.log(res)
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
        code: 20000,
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
        code: 20000,
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
        status: Number(body.status)
      }
      return {
        code: 20000,
        data: {},
        message: '已新增角色'
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
        code: 20000,
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
