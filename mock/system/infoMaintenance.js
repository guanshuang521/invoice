var infoMaintenance = {
  'list': [
    {
      createId: 0,
      createTime: 'string',
      creator: 'string',
      id: 0,
      khdz: '北京市丰台科技园',
      khh: '北京银行中关村支行',
      khmc: '管理员',
      khsh: '546786543567',
      lxdh: '010-89868989',
      lxry: '管理员',
      modifiedId: 0,
      modifiedTime: 'string',
      modifier: 'string',
      sjhm: '23543212343',
      status: 'string',
      yhzh: '123444321234567876',
      yx: 'aerefe@123.com'
    }, {
      createId: 0,
      createTime: 'string',
      creator: 'string',
      id: 1,
      khdz: '北京市丰台科技园',
      khh: '北京银行中关村支行',
      khmc: '附带v',
      khsh: '09876546675432',
      lxdh: '010-89868989',
      lxry: '地方',
      modifiedId: 0,
      modifiedTime: 'string',
      modifier: 'string',
      sjhm: '23543212343',
      status: 'string',
      yhzh: '123444321234567876',
      yx: 'aerefe@123.com'
    }, {
      createId: 0,
      createTime: 'string',
      creator: 'string',
      id: 2,
      khdz: '北京市丰台科技园',
      khh: '北京银行中关村支行',
      khmc: '而VS',
      khsh: '345678654324567',
      lxdh: '010-89868989',
      lxry: '额度',
      modifiedId: 0,
      modifiedTime: 'string',
      modifier: 'string',
      sjhm: '23543212343',
      status: 'string',
      yhzh: '123444321234567876',
      yx: 'aerefe@123.com'
    }
  ]
}
export default {
  selectByCustomer: res => {
    const info = infoMaintenance['list']
    const body = JSON.parse(res.body)
    // console.log(body)
    if (info) {
      var count = 0
      var list = []
      // console.log(res)
      for (var i = 0; i < info.length; i++) {
        if (body.khmc && !body.khsh && info[i].khmc.match(body.khmc)) {
          list.push(info[i])
        }
        if (!body.khmc && body.khsh && info[i].khsh.match(body.khsh)) {
          list.push(info[i])
        }
        if (body.khmc && body.khsh && info[i].khmc.match(body.match) && info[i].khsh.match(body.khsh)) {
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
  deleteCustomer: res => {
    const info = infoMaintenance['list']
    const body = JSON.parse(res.body)
    console.log(body)
    if (info) {
      for (var i = 0; i < info.length; i++) {
        for (var j = 0; j < body.ids.length; j++) {
          if (info[i] && body.ids[j] === info[i].id) {
            info.splice(i, 1)
          }
        }
      }
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
  insertCustomer: res => {
    const info = infoMaintenance['list']
    const body = JSON.parse(res.body)
    console.log(body)
    if (info) {
      var ind = info[info.length - 1].id + 1
      var obj = {
        createId: 0,
        createTime: '',
        creator: '',
        id: ind,
        khdz: '',
        khh: '',
        khmc: '',
        khsh: '',
        lxdh: '',
        lxry: '',
        modifiedId: 0,
        modifiedTime: '',
        modifier: '',
        sjhm: '',
        status: '',
        yhzh: '',
        yx: ''
      }
      for (var k in obj) {
        if (body[k]) {
          obj[k] = body[k]
        }
      }
      info.push(obj)
      return {
        code: '0000',
        data: {}
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  }
}
