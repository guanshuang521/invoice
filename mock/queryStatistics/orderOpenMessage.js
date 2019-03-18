/**
 * Created by wujy .
 */
const orderOpenMessage = {
  'getTableList': [{
    djsh: '管理员',
    xfmc: 1,
    gfmc: '北京市丰台科技园',
    xfsh: '12433323454',
    gfsh: '23543212343',
    je: '北京银行中关村支行',
    se: '123444321234567876',
    jshj: 0,
    ddzt: 0
  },{
    djsh: '管理员',
    xfmc: 1,
    gfmc: '北京市丰台科技园',
    xfsh: '12433323454',
    gfsh: '23543212343',
    je: '北京银行中关村支行',
    se: '123444321234567876',
    jshj: 0,
    ddzt: 0
  }],
  'node-tree': [{
    id: 1,
    label: 'Level one 1',
    children: [{
      id: 4,
      label: 'Level two 1-1',
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
  }]
}
export default {
  getTableList: res => {
    const info = orderOpenMessage['getTableList']
    if (info) {
      return {
        code: 20000,
        data: info
      }
    }
    return {
      code: 50008,
      message: '获取失败'
    }
  }
}
